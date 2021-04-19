import * as actionTypes from '../actionTypes/postActionTypes';
import axios from '../../helpers/axios';

export const createAdvice = (advice) => {
  let token = localStorage.getItem('token');
  console.log(advice);

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return async (dispatch) => {
    let posts = null;
    try {
      posts = await axios.post('/advice/create-advice', { ...advice });
      if (posts) {
        dispatch({
          type: actionTypes.ON_FETCH_SUCCESS,
          payload: {
            posts: posts.data.allAdvices,
          },
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const updateAdvice = (advice) => {
  let token = localStorage.getItem('token');

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return async (dispatch) => {
    let post = null;
    try {
      post = await axios.put(`/advice/update/${advice._id}`, { ...advice });
    } catch (error) {
      console.log(error.response.data.message);
    }

    if (post) {
      await dispatch({
        type: actionTypes.ON_FETCH_SUCCESS,
        payload: {
          posts: post.data.allAdvices,
        },
      });
    }
  };
};

export const deleteAdvice = (_id) => {
  let token = localStorage.getItem('token');

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_BEGIN });
    let post;
    try {
      post = await axios.delete(`/advice/delete/${_id}`);
    } catch (error) {
      console.log(error);
    }

    if (post) {
      await dispatch({
        type: actionTypes.ON_FETCH_SUCCESS,
        payload: {
          posts: post.data.allAdvices,
        },
      });
    }
  };
};

export const getAllAdvice = () => {
  return async (dispatch) => {
    let post = null;
    try {
      post = await axios.get('/advice/get-all-advice');
      if (post) {
        dispatch({
          type: actionTypes.ON_FETCH_SUCCESS,
          payload: {
            posts: post.data.allAdvices,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
