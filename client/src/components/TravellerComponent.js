import React from 'react';

function Traveller(props) {
  const travellerContent = (props) => {
    return (
      <div></div>
    )
  }

  return(
    <div className="container2">
      <div className="row">
        <div className="col-12">
          <h1>Traveller</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        {travellerContent(props)}
      </div>
    </div>
  );
}

export default Traveller;