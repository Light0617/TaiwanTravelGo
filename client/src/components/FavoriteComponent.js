import React from 'react';
import { Media, Button, Card, CardImg, CardFooter } from 'reactstrap';

import { FadeTransform } from 'react-animation-components';

import { Loading } from './LoadingComponent';
import { imgBaseUrl } from '../shared/baseUrl';

function RenderMenuItem({ nature, deleteFavorite }) {
  return (
    <Card>
      <CardImg object width="100%" height="600px" src={imgBaseUrl + nature.image} alt={nature.name} />
      <CardFooter>
        <Button outline color="danger" onClick={() => deleteFavorite(nature._id)}>
          <span className="fa fa-times"></span>
        </Button>
        <h3> {nature.name} </h3>
      </CardFooter>
    </Card>
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
        <div key={nature._id} className="col-12 col-md-5 m-1">
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