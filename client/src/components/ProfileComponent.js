import React from 'react';

function ProfileContent(props) {
  return (
    <div></div>
  );
}

function Profile(props) {
  return (
    <div className="container2">
      <div className="row">
        <div className="col-12">
          <h1>Profile</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <profileContent props = {props}/>
      </div>
    </div>
  );
}

export default Profile;