import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { Auth } from './auth';

import { Natures } from './natures';
import { Comments } from './comments';
import { Travellers } from './travellers';
import { Favorites } from './favorites';
import { Profile } from './profile';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth: Auth,
      natures: Natures,
      comments: Comments,
      travellers: Travellers,
      favorites: Favorites,
      profile: Profile
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
}