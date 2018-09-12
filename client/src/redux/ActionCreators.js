import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const naturesLoading = () => ({
  type: ActionTypes.NATURES_LOADING
});

export const naturesFailed = (errmess) => ({
  type: ActionTypes.NATURES_FAILED,
  payload: errmess
});

export const addNatures = (natures) => ({
  type: ActionTypes.ADD_NATURES,
  payload: natures
})

export const fetchNatures = () => (dispatch) => {
  dispatch(naturesLoading(true));

  return fetch(baseUrl + 'natures')
    .then(response => {
      if(response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(natures => dispatch(addNatures(natures)));
}