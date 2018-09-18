import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

/**
 * Nature
 */
export const naturesLoading = () => ({
  type: ActionTypes.NATURES_LOADING
});

export const naturesFailed = (errMess) => ({
  type: ActionTypes.NATURES_FAILED,
  payload: errMess
});

export const addNatures = (natures) => ({
  type: ActionTypes.ADD_NATURES,
  payload: natures
});

export const fetchNatures = () => (dispatch) => {
  dispatch(naturesLoading(true));

  return fetch(baseUrl + 'natures')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errMess = new Error(error.message);
      throw errMess;
    })
    .then(response => response.json())
    .then(natures => dispatch(addNatures(natures)));
}

/**
 * Comments fetch
 */
export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess
});

export const commentsLoading = (errMess) => ({
  type: ActionTypes.COMMENTS_LOADING,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errMess = new Error(error.message);
      throw errMess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
}

/**
 * Comments post
 */
export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (natureId, rating, author, comment) => (dispatch) => {
  const newComment = {
    natureId: natureId,
    rating: rating,
    author: author,
    comment: comment
  };
  newComment.date=new Date().toISOString();

  return fetch(baseUrl + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
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
  .then(response => dispatch(addComment(response)))
  .catch(error => {
    console.log('post comments', error.message);
  });
};



/**
 * Traveller
 */

export const travellersLoading = () => ({
  type: ActionTypes.TRAVELLERS_LOADING
});

export const travellersFailed = (errMess) => ({
  type: ActionTypes.TRAVELLERS_FAILED,
  payload: errMess
});

export const addTravellers = (travellers) => ({
  type: ActionTypes.ADD_TRAVELLERS,
  payload: travellers
});

export const fetchTravellers = () => (dispatch) => {
  dispatch(travellersLoading(true));

  return fetch(baseUrl + 'users')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errMess = new Error(error.message);
      throw errMess;
    })
    .then(response => response.json())
    .then(travellers => dispatch(addTravellers(travellers)));
}