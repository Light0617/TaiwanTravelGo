import React from 'react';
import { Media, Button } from 'reactstrap';

import { FadeTransform } from 'react-animation-components';

import { Loading } from './LoadingComponent';
import { imgBaseUrl } from '../shared/baseUrl';

function RenderMenuItem({ nature, deleteFavorite }) {
  return (
    <Media tag="li">
      <Media left middle>
        <Media object src={imgBaseUrl + nature.image} alt={nature.name} />
      </Media>
      <Media body className="ml-5">
        <Media heading>{nature.name}</Media>
        <p>{nature.description}</p>
        <Button outline color="danger" onClick={() => deleteFavorite(nature._id)}>
          <span className="fa fa-times"></span>
        </Button>
      </Media>
    </Media>
  );
}

function FavoriteContent({ props }) {
  if (props.favorites.isLoading) {
    return (
      <div className="container2">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.favorites.errMess != null) {
    return (
      <div className="container2">
        <div className="row">
          <h4>{props.favorites.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.favorites.favorites) {
    const favorites = props.favorites.favorites.natures.map((nature) => {
      return (
        <div key={nature._id} className="col-12 mt-5">
        <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
            <RenderMenuItem
              nature={nature} deleteFavorite={props.deleteFavorite}
            />
        </FadeTransform>
        </div>
      )
    })

    return (
      <div className="container2">
        <div className="row">
          <Media list>
            {favorites}
          </Media>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container2">
        <div className="row">
          <h4>You do not have favorites</h4>
        </div>
      </div>
    );
  }
}

function Favorite(props) {
  return (
    <div className="container2">
      <div className="row">
        <div className="col-12">
          <h1>Favorite</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <FavoriteContent props={props} />
      </div>
    </div>
  );
}

export default Favorite;