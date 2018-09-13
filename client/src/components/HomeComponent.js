import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';

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
        <CardImg src={item.image} alt={item.name} height="650px" />
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

  const HomeItemList = props.natures.map((nature) => {
    return (
      <div className="col-12 col-md m-1" key={nature._id}>
        <RenderCard
          item={nature}
          isLoading={props.naturesLoading}
          errMess={props.naturesErrMess}
        />
      </div>
    );
  });

  return (
    <div className="container2">
      <div className="row">
        <div className="col-12">
          <h1>Home</h1>
          <hr />
        </div>
      </div>
      <div className="row align-items-start">
        {HomeItemList}
      </div>
    </div>
  );
}

export default Home;