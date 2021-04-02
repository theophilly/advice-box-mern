import * as actionType from "../actionTypes/authActionsTypes";

const initialState = {
  loading: false,
  user: null,
  error: "",
};

export default function authReducer(state = initialState, action) {
  if (action.type === actionType.LOGIN_BEGIN) {
    return { ...state, loading: true };
  } else if (action.type === actionType.ON_LOGIN_ERROR) {
    return { ...state, error: action.payload.error, loading: false };
  } else if (action.type === actionType.ON_LOGIN_SUCCESS) {
    return { ...state, loading: false, user: action.payload.user };
  } else {
    return state;
  }
}
