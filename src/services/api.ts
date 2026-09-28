import axios from 'axios';

// In-memory access token storage (kept out of LocalStorage for security)
let inMemoryAccessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  inMemoryAccessToken = token;
};

export const getAccessToken = () => inMemoryAccessToken;

// Base URL helper: ensures the URL always ends with '/api' even if omitted in environment variables
const getBaseUrl = (): string => {
  const envUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').trim().replace(/\/+$/, '');
  return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
};

export const API_BASE_URL = getBaseUrl();

// Base Axios instance configured for Context Cart Express REST API
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Authorization Bearer token to outgoing requests
api.interceptors.request.use(
  (config) => {
    if (inMemoryAccessToken && config.headers) {
      config.headers.Authorization = `Bearer ${inMemoryAccessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Concurrency lock and queue for refresh token requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Intercept 401 and transparently refresh access token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Do not attempt refresh if error is not 401, or if it is already a retry,
    // or if the request was to the auth endpoints themselves
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/refresh-token') ||
      originalRequest.url?.includes('/auth/login')
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Call refresh-token endpoint with cookies (handled via separate axios call to avoid interceptor loop)
      const { data } = await axios.post<{ accessToken: string }>(
        `${API_BASE_URL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );

      const newAccessToken = data.accessToken;
      setAccessToken(newAccessToken);
      processQueue(null, newAccessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      setAccessToken(null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
