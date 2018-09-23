import React from 'react';
import { Button, Card, CardImg, CardFooter } from 'reactstrap';

import { FadeTransform } from 'react-animation-components';

import { Loading } from './LoadingComponent';
import { imgBaseUrl } from '../shared/baseUrl';

function RenderMenuItem({ nature, deleteFavorite }) {
  return (
    <Card>
      <CardImg width="100%" height="600px" src={imgBaseUrl + nature.image} alt={nature.name} />
      <CardFooter>
        <Button outline color="danger" onClick={() => deleteFavorite(nature._id)}>
          <span className="fa fa-times"></span>
        </Button>
        <h3> {nature.name} </h3>
      </CardFooter>
    </Card>
  );
}

function Favorite(props) {
  const favoriteContent = (props) => {
    if (props.favorites.isLoading) {
      return (
        <Loading />
      );
    } else if (props.favorites.errMess) {
      return (
        <h4>{props.favorites.errMess}</h4>
      );
    } else if (props.favorites.favorites === null || props.favorites.favorites.natures.length === 0){
      return (
        <h4>You do not have favorites</h4>
      );
    } else {
      const favoriteList = props.favorites.favorites.natures.map((nature) => {
        return (
          <div className="col-12 col-md-5 m-1" key={nature._id}>
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
        );
      });
      return favoriteList;
    }
  }

  return (
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