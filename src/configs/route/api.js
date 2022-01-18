import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}`,
  // headers: { 'Access-Control-Allow-Origin': '*' },
  // timeout: 1000,
});

// instance.interceptors.response.use((response) => response.data, errorHandler);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
// export { default as setHeader } from './setHeader';

export default instance;
