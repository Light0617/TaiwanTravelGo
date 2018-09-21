import React from 'react';
import { Card, CardFooter, Media } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { imgBaseUrl, defaultImgUrl } from '../shared/baseUrl';
import { FadeTransform} from 'react-animation-components';

function RenderUserItem({user}) {
  console.log(user);
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
      <Card>
        <Media className="mt-3">
          <Media left>
            <img className="mr-3" src={imgBaseUrl + defaultImgUrl} alt={user.username} width="400px" height="500px" />
          </Media>
          <Media body>
            <Media heading>
              user: {user.username}
            </Media>
            <p>the count of reviews: {user.numberOfComments}</p>
            <p>the count of favorite: {user.numberOfFavorite}</p>
          </Media>
        </Media>
        <CardFooter>
          <h3> {user.username} </h3>
        </CardFooter>
      </Card>
    </FadeTransform>
  );
}

function ProfileContent({props}) {
  if (!props.user) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Loading />
      </div>
    );
  } else{
    return (
      <div className="col-12 col-md-5 m-1">
        <RenderUserItem user={props.user} />
      </div>
    );
  }
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
        <ProfileContent props = {props}/>
      </div>
    </div>
  );
}

export default Profile;