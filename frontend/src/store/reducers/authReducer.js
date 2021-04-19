import * as actionType from '../actionTypes/authActionsTypes';

const initialState = {
  loading: false,
  user: null,
  error: '',
  token: '',
  authenticated: false,
};

export default function authReducer(state = initialState, action) {
  if (action.type === actionType.LOGIN_BEGIN) {
    return { ...state, loading: true };
  } else if (action.type === actionType.ON_LOGIN_ERROR) {
    return { ...state, error: action.payload.error, loading: false };
  } else if (action.type === actionType.ON_LOGIN_SUCCESS) {
    return {
      ...state,
      loading: false,
      user: action.payload.user,
      token: action.payload.token,
      authenticated: true,
    };
  } else if (action.type === 'SESSION_EXPIRED') {
    return { ...initialState };
  } else if (action.type === 'SIGN_OUT') {
    return state;
  } else {
    return state;
  }
}
