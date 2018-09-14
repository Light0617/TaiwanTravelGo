import React from 'react';

function Favorite(props) {
  const favoriteContent = (props) => {
    return (
      <div></div>
    )
  }

  return(
    <div className="container2">
      <div className="row">
        <div className="col-12">
          <h1>Favorite</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        {favoriteContent(props)}
      </div>
    </div>
  );
}

export default Favorite;