import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Nature from './NatureComponent';
import About from './AboutComponent';
import Traveller from './TravellerComponent';
import Favorite from './FavoriteComponent';
import Profile from './ProfileComponent';

import { fetchNatures } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    natures: state.natures
  }
}

const mapDispatchToProps = dispatch => ({
  fetchNatures: () => dispatch(fetchNatures())
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNatures();
  }

  render() {

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

    return (
      <div>
        <Header />
        <div>
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={250}>
              <Switch location={this.props.location}>
                <Route path='/home' component={HomePage} />
                <Route path='/about' component={About} />
                <Route path='/nature' component={NaturePage} />
                <Route path='/traveller' component={Traveller} />
                <Route path='/favorite' component={Favorite} />
                <Route path='/profile' component={Profile} />
                <Redirect to="/home" />
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