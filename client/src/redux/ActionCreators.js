import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

/**
 * Profile
 */
export const profileLoading = () => ({
  type: ActionTypes.PROFILE_LOADING
});

export const profileFailed = (errMess) => ({
  type: ActionTypes.PROFILE_FAILED,
  payload: errMess
});

export const addProfile = (profile) => ({
  type: ActionTypes.ADD_PROFILE,
  payload: profile
});

export const fetchProfile = () => (dispatch) => {
  dispatch(profileLoading(true));

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'profile/', {
    headers: {
      'Authorization': bearer
    },
  })
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
  .then(profile => dispatch(addProfile(profile)))
  .catch(error => {
    console.log('fetch profile', error.message);
  });
}

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
    .then(natures => dispatch(addNatures(natures)))
    .catch(error => {
      console.log('fetch natures', error.message);
    });
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
    .then(comments => dispatch(addComments(comments)))
    .catch(error => {
      console.log('fetch comments', error.message);
    });
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
  console.log('new comment= ' + JSON.stringify(newComment));
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
  .then(response => {
    console.log('Comment Added');
    dispatch(fetchComments());
    dispatch(addComment(response));
  })
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
    .then(travellers => dispatch(addTravellers(travellers)))
    .catch(error => {
      console.log('fetch travellers', error.message);
    });
}

/**
 * Signup
 * 
 */
export const requestSignup = (creds) => {
  return {
    type: ActionTypes.SIGNUP_REQUEST,
    payload: creds
  }
}

export const receiveSignup = (response) => {
  return {
    type: ActionTypes.SIGNUP_SUCCESS,
    paylaod: response.token
  }
}

export const signupError = (message) => {
  return {
      type: ActionTypes.SIGNUP_FAILURE,
      payload: message
  }
}

export const signupUser = (creds) => (dispatch) => {
  dispatch(requestSignup(creds));

  return fetch(baseUrl + 'users/signup', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json' 
    },
    body: JSON.stringify(creds)
  })
  .then(response => {
    if(response.ok){
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  }, error => {
    throw error;
  })
  .then(response => response.json())
  .then(response => {
    if(response.success){
      console.log('Sign Up Succeed!');
      const userInfo = {username: creds.username, password: creds.password};
      console.log('creds= ' + JSON.stringify(creds));
      console.log('userInfo= ' + JSON.stringify(userInfo));
      console.log('response= ' + JSON.stringify(response));
      localStorage.setItem('token', response.token);
      localStorage.setItem('creds', JSON.stringify(userInfo));
      dispatch(receiveSignup(response));
      dispatch(fetchFavorites());
      dispatch(fetchProfile());
    } else {
      var error = new Error('Error ' + response.status);
      error.response = response;
      throw error;
    }
  })
  .catch(error => dispatch(signupError(error.message)));
};


/**
 * Login
 * 
 */
export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    payload: creds
  }
}

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: response.token
  }
}

export const loginError = (message) => {
  return {
      type: ActionTypes.LOGIN_FAILURE,
      payload: message
  }
}

export const loginUser = (creds) => (dispatch) => {
  dispatch(requestLogin(creds));

  return fetch(baseUrl + 'users/login', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json' 
    },
    body: JSON.stringify(creds)
  })
  .then(response => {
    if(response.ok){
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  }, error => {
    throw error;
  })
  .then(response => response.json())
  .then(response => {
    if(response.success){
      // If login was successful, set the token in local storage
      localStorage.setItem('token', response.token);
      localStorage.setItem('creds', JSON.stringify(creds));
      // Dispatch the success action
      dispatch(fetchFavorites());
      dispatch(fetchProfile());
      dispatch(receiveLogin(response));
    } else {
      var error = new Error('Error ' + response.status);
      error.response = response;
      throw error;
    }
  })
  .catch(error => dispatch(loginError(error.message)));
};

/**
 * Logout
 * 
 */
export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  dispatch(favoritesFailed('Error 401: Unauthorized'));
  dispatch(profileFailed('Error 401: Unauthorized'));
  dispatch(receiveLogout());
}


/**
 * Favorite
 * 
 */
export const favoritesLoading = () => ({
  type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errMess) => ({
  type: ActionTypes.FAVORITES_FAILED,
  payload: errMess
});

export const addFavorites = (favorites) => ({
  type: ActionTypes.ADD_FAVORITES,
  payload: favorites
});


export const postFavorite = (natureId) => (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'favorites/' + natureId, {
    method: "POST",
    body: JSON.stringify({"_id": natureId}),
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
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
    throw error;
  })
  .then(response => response.json())
  .then(favorites => {
    console.log('Favorite Added', favorites);
    dispatch(fetchFavorites());
    dispatch(addFavorites(favorites));
  })
  .catch(error => dispatch(favoritesFailed(error.message)));
};

export const deleteFavorite = (natureId) => (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'favorites/' + natureId, {
    method: "DELETE",
    headers: {
      'Authorization': bearer
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
    throw error;
  })
  .then(response => response.json())
  .then(favorites => {
    console.log('Favorite Deleted', favorites);
    dispatch(fetchFavorites());
    dispatch(addFavorites(favorites));
  })
  .catch(error => dispatch(favoritesFailed(error.message)));
}

export const fetchFavorites = () => (dispatch) => {
  dispatch(favoritesLoading(true));

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'favorites/', {
    headers: {
      'Authorization': bearer
    },
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
    throw error;
  })
  .then(response => response.json())
  .then(favorites => dispatch(addFavorites(favorites)))
  .catch(error => dispatch(favoritesFailed(error.message)));
}