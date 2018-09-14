import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { Natures } from './natures';
import { Comments } from './comments';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      natures: Natures,
      comments: Comments,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
}