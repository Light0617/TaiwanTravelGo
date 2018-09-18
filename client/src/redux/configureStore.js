import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { Natures } from './natures';
import { Comments } from './comments';
import { Travellers } from './travellers';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      natures: Natures,
      comments: Comments,
      travellers: Travellers
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
}