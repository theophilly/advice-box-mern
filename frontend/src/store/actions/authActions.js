import * as actionType from "../actionTypes/authActionsTypes";
import axios from "../../helpers/axios";

export const login = (user) => {
  console.log(user);
  return async (dispatch) => {
    await dispatch({ type: actionType.LOGIN_BEGIN });
  };
};

export const signUp = (user) => {
  return async (dispatch) => {
    dispatch({ type: actionType.LOGIN_BEGIN });

    await axios
      .post("/user/signup", { ...user })
      .then((res) => {
        dispatch({
          type: actionType.ON_LOGIN_SUCCESS,
          payload: {
            ...res.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: actionType.ON_LOGIN_ERROR,
          payload: {
            error: error.response.data.message,
          },
        });
      });
  };
};
