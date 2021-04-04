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
  baseURL: 'http://127.0.0.1:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
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
      req.url == '/user/signin' ||
      req.url == '/user/signup' ||
      '/advice/get-all-advice'
    ) {
      return req;
    }
    return Promise.reject();
  }
});

export default axiosInstance;
