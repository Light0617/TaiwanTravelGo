import React from 'react';

function TravellerContent(props) {
  return (
    <div></div>
  )
}

function Traveller(props) {
  

  return(
    <div className="container2">
      <div className="row">
        <div className="col-12">
          <h1>Traveller</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <TravellerContent props = {props}/>
      </div>
    </div>
  );
}

export default Traveller;