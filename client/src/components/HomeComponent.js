import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({ item, isLoading, errMess }) {
  if (isLoading) {
    return (
      <Loading />
    );
  } else if (errMess) {
    return (
      <h4>{errMess}</h4>
    );
  } else {
    return (
      <Card>
        <CardImg src={item.image} alt={item.name} height="650px"/>
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    )
  }
}

function Home(props) {
  console.log(props.natures);
  return (
    <div className="row align-items-start">
      <div className="col-12 col-md m-1">
        <RenderCard
          item={props.natures[0]}
          isLoading={props.naturesLoading}
          errMess={props.naturesErrMess}
        />
      </div>
      <div className="col-12 col-md m-1">
        <RenderCard
          item={props.natures[1]}
          isLoading={props.naturesLoading}
          errMess={props.naturesErrMess}
        />
      </div>
      <div className="col-12 col-md m-1">
        <RenderCard
          item={props.natures[2]}
          isLoading={props.naturesLoading}
          errMess={props.naturesErrMess}
        />
      </div>
    </div>
  );
}

export default Home;