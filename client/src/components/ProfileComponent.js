import React from 'react';
import { Card, CardFooter, Media } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { defaultImgUrl } from '../shared/baseUrl';
import { FadeTransform} from 'react-animation-components';

function RenderUserItem({user}) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
      <Card>
        <Media className="mt-3">
          <Media left>
            <img className="mr-3" src={defaultImgUrl} alt={user.username} width="400px" height="500px" />
          </Media>
          <Media body>
            <Media heading>
              Username: {user.username} <p/>
            </Media>
            <Media heading>
              First Name: {user.firstname} <p/>
            </Media>
            <Media heading>
              Last Name: {user.lastname} <p/>
            </Media>
            <Media heading>
              The count of reviews: {user.numberOfComments} <p/>
            </Media>
            <Media heading>
              The count of favorite: {user.numberOfFavorite} <p/>
            </Media>
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
  if (props.profileLoading) {
    return (
      <Loading />
    );
  } else if(props.profileErrMess !== null) {
    return (
      <h4>{props.profileErrMess}</h4>
    );
  } else {
    return (
      <div className="col-12 col-md-5 m-1">
        <RenderUserItem user={props.profile} />
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