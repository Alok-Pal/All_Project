import axios from 'axios';
// import { notification } from 'antd';

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com'
});

// defining a custom error handler for all APIs
const errorHandler = (error: any) => {
  const statusCode = error.response?.status;

  if (error.code === 'ERR_CANCELED') {
    // notification.error("");
    return Promise.resolve();
  }

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error: any) => {
  return errorHandler(error);
});
