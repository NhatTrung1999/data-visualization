import type { AxiosInstance } from 'axios';
import axios from 'axios';

const axiosConfig: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default axiosConfig;
