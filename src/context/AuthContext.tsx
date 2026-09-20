import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials, RegisterData } from '../types/auth';
import api, { setAccessToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check initial authentication session on app load using httpOnly refresh cookie
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        // Attempt silent refresh using the httpOnly cookie
        const { data } = await api.post<{ accessToken: string }>('/auth/refresh-token');
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          // Fetch current user profile with the new access token
          const profileRes = await api.get<{ user: User }>('/auth/me');
          if (isMounted) {
            setUser(profileRes.data.user);
          }
        }
      } catch {
        // No active session or expired cookie
        if (isMounted) {
          setUser(null);
          setAccessToken(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await api.post<{
      message: string;
      accessToken: string;
      user: User;
    }>('/auth/login', credentials);

    const { accessToken, user: loggedInUser } = response.data;

    // Securely keep access token in memory and update state
    setAccessToken(accessToken);
    setUser(loggedInUser);
  };

  const register = async (data: RegisterData): Promise<User> => {
    const response = await api.post<{
      message: string;
      user: User;
    }>('/auth/register', data);

    return response.data.user;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
