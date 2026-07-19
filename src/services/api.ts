import axios from 'axios';

// Base instance configured for the DummyJSON API.
// In future phases, this baseURL can be switched to the custom FastAPI backend.
const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
