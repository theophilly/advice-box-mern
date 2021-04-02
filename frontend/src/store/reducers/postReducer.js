import * as actionType from "../actionTypes/postActionTypes";

const intialState = {
  posts: [],
  loading: false,
  error: "",
};
export default function postReducer(state = intialState, action) {
  if (action.type === actionType.FETCH_BEGIN) {
    return { ...state, loading: true };
  } else if (action.type === actionType.ON_FETCH_ERROR) {
    return { ...state, error: action.payload.error, loading: false };
  } else if (action.type === actionType.ON_FETCH_SUCCESS) {
    return { ...state, posts: action.payload.posts, loading: false };
  } else {
  }

  return state;
}
