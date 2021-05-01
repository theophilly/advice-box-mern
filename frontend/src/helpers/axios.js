import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../store';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  const { authReducer } = store.getState();

  if (authReducer.token) {
    const decodeToken = jwt_decode(authReducer.token);
    const expiresIn = new Date(decodeToken.exp * 1000);

    if (new Date() > expiresIn) {
      localStorage.clear();

      await store.dispatch({ type: 'SESSION_EXPIRED' });

      return Promise.reject();
    } else {
      return req;
    }
  } else {
    if (
      req.url === '/api/user/signin' ||
      req.url === '/api/user/signup' ||
      req.url === '/api/api/advice/get-all-advice' ||
      req.url === '/api/receivemail' ||
      req.url === '/api/user/getuser/:userName'
    ) {
      return req;
    }
    return Promise.reject();
  }
});

export default axiosInstance;
