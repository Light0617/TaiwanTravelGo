import * as ActionTypes from './ActionTypes';

export const Natures = (state = {isLoading: true, errMess: null, natures: []}, action) => {
  switch(action.type){
    case ActionTypes.ADD_NATURES:
      return {...state, isLoading: false, errMess: null, natures: action.payload};
    case ActionTypes.NATURES_LOADING:
      return {...state, isLoading: true, errMess: null, natures: []};
    case ActionTypes.NATURES_FAILED:
      return {...state, isLoading: false, errMess: action.payload};
    default:
      return state;
  }
}
