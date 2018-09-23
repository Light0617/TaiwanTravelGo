import React from 'react';
import { Card, CardFooter, Media } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { imgBaseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderTravellerItem({ traveller }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
      <Card>
        <Media className="mt-3">
          <Media left>
            <img className="mr-3" src={imgBaseUrl + traveller.image} alt={traveller.username} width="400px" height="500px" />
          </Media>
          <Media body>
            <Media heading>
              user: {traveller.username} <p/>
            </Media>
            <Media heading>
              The count of reviews: {traveller.numberOfComments} <p/>
            </Media>
            <Media heading>
              The count of favorite: {traveller.numberOfFavorite} <p/>
            </Media>
          </Media>
        </Media>
        {/* <CardImg width="100%" height="600px" src={imgBaseUrl + traveller.image} alt={traveller.username} /> */}
        <CardFooter>
          <h3> {traveller.username} </h3>
        </CardFooter>
      </Card>
    </FadeTransform>
  );
}


function TravellerContent({ props }) {
  if (props.travellersLoading) {
    return (
      <Loading />
    );
  } else if (props.travellersErrMess !== null) {
    return (
      <h4>{props.naturesErrMess}</h4>
    );
  } else {
    //travellers
    const travellerList = props.travellers.map((traveller) => {
      return (
        <div className="col-12 col-md-5 m-1" key={traveller._id}>
          <RenderTravellerItem traveller={traveller} />
        </div>
      );
    });
    return travellerList;
  }
}

function Traveller(props) {

  return (
    <div className="container2">
      <div className="row">
        <div className="col-12">
          <h1>Traveller</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <TravellerContent props={props} />
      </div>
    </div>
  );
}

export default Traveller;