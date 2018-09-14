import React from 'react';

function FavoriteContent(props) {
  return (
    <div></div>
  )
}

function Favorite(props) {

  return(
    <div className="container2">
      <div className="row">
        <div className="col-12">
          <h1>Favorite</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <favoriteContent props = {props}/>
      </div>
    </div>
  );
}

export default Favorite;