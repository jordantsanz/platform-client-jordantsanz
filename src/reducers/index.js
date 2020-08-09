// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import errorsReducer from './errorsReducer';

import postsReducer from './postsReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  errors: errorsReducer,
});

export default rootReducer;
