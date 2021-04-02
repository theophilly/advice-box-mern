import * as actionType from "../actionTypes/authActionsTypes";
export const login = (user) => {
  console.log(user);
  return async (dispatch) => {
    await dispatch({ type: actionType.LOGIN_BEGIN });
  };
};
