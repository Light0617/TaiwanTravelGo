import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Nature from './NatureComponent';
import About from './AboutComponent';
import Traveller from './TravellerComponent';
import Favorites from './FavoriteComponent';
import Profile from './ProfileComponent';
import NatureDetail from './NatureDetailComponent';

import { fetchNatures, fetchComments, postComment, fetchTravellers, 
  loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    auth: state.auth,
    natures: state.natures,
    comments: state.comments,
    travellers: state.travellers,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),

  fetchNatures: () => dispatch(fetchNatures()),
  fetchComments: () => dispatch(fetchComments()),
  fetchTravellers: () => dispatch(fetchTravellers()),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),

  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (natureId) => dispatch(postFavorite(natureId)),
  deleteFavorite: (natureId) => dispatch(deleteFavorite(natureId)),
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNatures();
    this.props.fetchComments();
    this.props.fetchTravellers();
    this.props.fetchFavorites();
  }

  render() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
    );

    const HomePage = () => {
      return (
        <Home
          natures={this.props.natures.natures.filter((nature) => nature.featured).slice(0, 3)}
          naturesLoading={this.props.natures.isLoading}
          naturesErrMess={this.props.natures.errMess}
        />
      );
    }

    const NaturePage = () => {
      return (
        <Nature
          natures={this.props.natures.natures}
          naturesLoading={this.props.natures.isLoading}
          naturesErrMess={this.props.natures.errMess}
        />
      );
    }

    const TravellerPage = () => {
      return (
        <Traveller
          travellers={this.props.travellers.travellers.filter((person) => person.admin === false)}
          travellersLoading={this.props.travellers.isLoading}
          travellersErrMess={this.props.travellers.errMess}
        />
      )
    }

    const FavoritePage = () => {
      <Favorites
        favorites={this.props.favorites}
        deleteFavorite={this.props.deleteFavorite}
      />
    }

    const NatureWithId = ({match}) => {
      return (
        <NatureDetail
          nature={this.props.natures.natures.filter((nature) => nature._id === match.params.natureId)[0]}
          isLoading={this.props.natures.isLoading}
          errMess={this.props.natures.errMess}

          comments={this.props.comments.comments.filter((comment)=>comment.natureId === match.params.natureId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      )
    }

    return (
      <div>
        <Header 
          auth = {this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
        />
        <div>
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={250}>
              <Switch location={this.props.location}>
                <Route path='/home' component={HomePage} />
                <Route path='/about' component={About} />
                <Route exact path='/nature' component={NaturePage} />
                <Route path='/nature/:natureId' component={NatureWithId} />
                <Route path='/traveller' component={TravellerPage} />
                <PrivateRoute exact path='/favorite' component={FavoritePage} />
                <PrivateRoute exact path='/profile' component={() => <Profile user={this.props.auth.user}/>} />
                <Redirect to='/home' />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));