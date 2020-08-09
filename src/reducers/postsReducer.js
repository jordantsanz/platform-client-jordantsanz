import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POST:
      return { all: state.all, current: action.payload };
    case ActionTypes.FETCH_POSTS:
      return { all: action.payload, current: state.current };
    case ActionTypes.UPDATE_POST:
      return { all: state.all, current: action.payload };
    default:
      return state;
  }
};

export default postsReducer;
