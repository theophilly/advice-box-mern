import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../store';

const token = localStorage.getItem('token');

const verifyToken = async () => {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    const decodeToken = jwt_decode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      await store.dispatch({ type: 'SESSION_EXPIRED' });

      return false;
    } else {
      return true;
    }
  } else {
    await store.dispatch({ type: 'SESSION_EXPIRED' });
    return false;
  }
};

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
  proxy: {
    host: '127.0.0.1',
    port: 5000,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  const { authReducer } = store.getState();

  if (authReducer.token) {
    console.log('pritt this');
    const decodeToken = jwt_decode(authReducer.token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    console.log(new Date());
    console.log(expiresIn);
    if (new Date() > expiresIn) {
      localStorage.clear();

      await store.dispatch({ type: 'SESSION_EXPIRED' });

      return Promise.reject();
    } else {
      return req;
    }
  } else {
    if (
      req.url == '/api/user/signin' ||
      req.url == '/api/user/signup' ||
      req.url == '/api/api/advice/get-all-advice' ||
      req.url == '/api/receivemail' ||
      req.url == '/api/user/getuser/:userName'
    ) {
      return req;
    }
    return Promise.reject();
  }
});

export default axiosInstance;
