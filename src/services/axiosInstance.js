import axios from 'axios';
import { refreshToken } from './api_auth';  // <-- Import here

// For authentication related endpoints
const authInstance = axios.create({
  baseURL: 'https://coachify-api.graytecknologies.com/api/auth',
  // baseURL: 'http://localhost:8000/api/auth',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // To include cookies in requests
});

// For data related endpoints
const dataInstance = axios.create({
  baseURL: 'https://coachify-api.graytecknologies.com/api',
  // baseURL: 'http://localhost:8000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
});

// Request Interceptor: Update headers dynamically
dataInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response Interceptor: Handle token expiration and retries
dataInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('axiosInstance')
    console.log(error)
    console.log(error.response.headers['x-expired'])
    console.log(error.response.headers)
    if (error.response.status === 401 && error.response.headers['x-expired'] === 'True') {
      console.log('made it to refresh if')
      try {
        // Refresh the token here, assuming you have a function `refreshToken` to do so
        const newToken = await refreshToken();
        
        if (newToken){
          // Update Axios headers
          dataInstance.defaults.headers['Authorization'] = `Bearer ${newToken}`;
          
          // Retry the original request
          const originalRequest = error.config;
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return dataInstance(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh token failure
        console.error('Refresh token expired, logging out...', refreshError);

        // Clear local storage and redirect to login or perform other logout operations
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        // Redirect to login page or emit an event to trigger this in your application
        window.location.href = '/signin';
      }
    }
    
    return Promise.reject(error);
  }
);



export { authInstance, dataInstance };
