import * as actionTypes from '../actionTypes/postActionTypes';
import axios from '../../helpers/axios';

export const createAdvice = (advice) => {
  let token = localStorage.getItem('token');
  console.log(advice);

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return async (dispatch) => {
    let post = null;
    try {
      post = await axios.post('/advice/create-advice', { ...advice });
    } catch (error) {
      console.log(error.response.data.message);
    }
    console.log(post);

    let posts;
    try {
      posts = await axios.get('/advice/get-all-advice');
      if (posts) {
        dispatch({
          type: actionTypes.ON_FETCH_SUCCESS,
          payload: {
            posts: posts,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    console.log(posts);
  };
};

export const getAllAdvice = () => {
  return async (dispatch) => {
    let post = null;
    console.log('i was fired');
    try {
      post = await axios.get('/advice/get-all-advice');
      if (post) {
        dispatch({
          type: actionTypes.ON_FETCH_SUCCESS,
          payload: {
            posts: post,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    console.log(post);
  };
};
