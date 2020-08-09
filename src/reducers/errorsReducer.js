import { ActionTypes } from '../actions';

const initialState = {
  error_message: '',
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ERROR_SET:
      return { error_message: action.payload };
    case ActionTypes.ERROR_DELETE:
      return { error_message: action.payload };
    case ActionTypes.ERROR_FETCH:
      return { error_message: action.payload };
    default:
      return { error_message: '' };
  }
};

export default postsReducer;
