import * as ActionTypes from './ActionTypes';

export const Travellers = (state={isLoading: true, errMess: null, travellers: []}, action) => {
  switch(action.type) {
    case ActionTypes.TRAVELLERS_LOADING:
      return {...state, isLoading: true, errMess: null, travellers: []}
    case ActionTypes.TRAVELLERS_FAILED: 
      return {...state, isLoading: false, errMess: action.payload}
    case ActionTypes.ADD_TRAVELLERS:
      return {...state, isLoading: false, errMess:  null, travellers: action.payload}
    default:
      return state;
  }
}