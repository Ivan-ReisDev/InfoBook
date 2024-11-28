import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
  baseURL: `${url}/api` || 'http://localhost:8080/api', 
  timeout: 60000, 
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
