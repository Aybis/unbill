import users from '../route/api';
import notify from 'helpers/hooks/toast';
import axios, { setAuthorizationHeader } from './index';

export default function errorHandler(error) {
  if (error) {
    let message;
    if (error.response) {
      const originalRequest = error.config;
      // if (error.response.status === 500) {
      //   message = "Something went terribly wrong";
      // } else

      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const session = localStorage['session']
          ? JSON.parse(localStorage['session'])
          : null;
        return users.refresh().then((res) => {
          if (res.data) {
            setAuthorizationHeader(`Bearer ${res.data.token}`);

            localStorage.setItem(
              'session',
              JSON.stringify({
                ...session,
                token: res.data.token,
              }),
            );

            originalRequest.headers.authorization = res.data.token;

            return axios(originalRequest);
          } else {
            window.location.href = '/login';
            localStorage.removeItem('session');
          }
        });
      } else {
        message = error.response.data.message;
      }

      if (typeof message === 'string') {
        notify('error', message);
      }

      return Promise.reject(error);
    }
  }
}
