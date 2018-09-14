import React from 'react';

function Profile(props) {
  const profileContent = (props) => {
    return (
      <div></div>
    );
  }

  return (
    <div className="container2">
      <div className="row">
        <div className="col-12">
          <h1>Profile</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        {profileContent(props)}
      </div>
    </div>
  );
}

export default Profile;