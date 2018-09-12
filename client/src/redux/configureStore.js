import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { Natures } from './natures';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      natures: Natures,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
}