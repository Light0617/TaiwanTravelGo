import React from 'react';
import { Card, CardImg, CardFooter, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function RenderNatureItem ({nature, onClick}) {
  return (
    <Card>
      <Link to = {`/nautre/${nature._id}`}>
        <CardImg width="100%" height="600px" src = {nature.image} alt={nature.name} />
        <CardFooter>
          <h3> {nature.name} </h3>  
        </CardFooter>
      </Link>
    </Card>
  );
}


function Nature(props) {
  const natureContent = (props) => {
    if (props.naturesLoading) {
      return (
        <div className="container2">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (props.naturesErrMess !== null) {
      <div className="container2">
        <div className="row">
          <div className="col-12">
            <h4>{props.naturesErrMess}</h4>
          </div>
        </div>
      </div>
    } else {
      const natureList = props.natures.map((nature) => {
        return (
          <div className="col-12 col-md-5 m-1" key={nature._id}>
            <RenderNatureItem nature={nature} />
          </div>
        );
      });
      return  natureList;
    }
  }

  
  return (
    <div className="container2">
      <div className="row">
        <div className="col-12">
          <h1>Nature</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        {natureContent(props)}
      </div>
    </div>
  );
}
export default Nature;