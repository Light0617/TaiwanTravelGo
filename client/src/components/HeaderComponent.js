import {
  Navbar, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isLoginModalOpen: false,
      isSignupModalOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.loginToggleModal = this.loginToggleModal.bind(this);
    this.signupToggleModal = this.signupToggleModal.bind(this);

    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loginToggleModal() {
    this.setState({
      isLoginModalOpen: !this.state.isLoginModalOpen
    });
  }

  signupToggleModal() {
    this.setState({
      isSignupModalOpen: !this.state.isSignupModalOpen
    });
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  handleLogin(event) {
    this.loginToggleModal();
    this.props.loginUser({ username: this.username.value, password: this.password.value });
    event.preventDefault();
  }

  handleSignup(event) {
    this.signupToggleModal();
    console.log('user= ' + this.username.value);
    console.log('password= ' + this.password.value);
    this.props.signupUser({
      username: this.username.value,
      password: this.password.value
    });
    event.preventDefault();
  }


  handleLogout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to='/about'><span className="fa fa-info fa-lg"></span> About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to='/nature'><span className="fa fa-map-marker fa-lg"></span> Nature</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to='/traveller'><span className="fa fa-user-secret fa-lg"></span> Traveller</NavLink>
              </NavItem>
              {this.props.auth.isAuthenticated
                ?
                <NavItem>
                  <NavLink className="nav-link" to='/favorite'><span className="fa fa-heart fa-lg"></span> Favorite</NavLink>
                </NavItem>
                :
                <NavItem></NavItem>
              }
              {this.props.auth.isAuthenticated
                ?
                <NavItem>
                  <NavLink className="nav-link" to='/profile'><span className="fa fa-user fa-lg"></span> Profile</NavLink>
                </NavItem>
                :
                <NavItem></NavItem>
              }
            </Nav>
            {!this.props.auth.isAuthenticated
              ?
              <Nav className="ml-auto">
                <NavItem>
                  <Button outline onClick={this.signupToggleModal}><span className="fa fa-sign-up fa-lg signupButton"></span>
                    <span className="signupButton"> Sign up </span>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button outline onClick={this.loginToggleModal}><span className="fa fa-sign-in fa-lg loginButton"></span>
                    <span className="loginButton"> Login </span>
                    {this.props.auth.isFetching
                      ? <span className="fa fa-spinner fa-pulse fa-fw"></span>
                      : null
                    }
                  </Button>
                </NavItem>
              </Nav>
              :
              <Nav className="ml-auto">
                <NavItem>
                  <span>{this.props.auth.user.username},  </span>
                  <Button outline onClick={this.handleLogout}>
                    <span className="fa fa-sign-out fa-lg"></span> Logout
                        {this.props.auth.isFetching
                      ? <span className="fa fa-spinner fa-pulse fa-fw"></span>
                      : null
                    }
                  </Button>
                </NavItem>
              </Nav>

            }
          </Collapse>
        </Navbar>
        <Jumbotron className="header">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Taiwan Travel Go</h1>
              <p>We take inspiration from the Taiwan's best attraction!</p>
            </div>
          </div>
        </Jumbotron>
        
        <Modal isOpen={this.state.isLoginModalOpen} toggle={this.loginToggleModal}>
          <ModalHeader className="login" toggle={this.loginToggleModal}>Login</ModalHeader>
          <ModalBody className="login">
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username"
                  innerRef={(input) => this.username = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"
                  innerRef={(input) => this.password = input} />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="remember"
                    innerRef={(input) => this.remember = input} />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Login</Button>
            </Form>
          </ModalBody>
        </Modal>
      
        <Modal isOpen={this.state.isSignupModalOpen} toggle={this.signupToggleModal}>
          <ModalHeader className="signup" toggle={this.signupToggleModal}>Sign up</ModalHeader>
          <ModalBody className="signup">
            <Form onSubmit={this.handleSignup}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username"
                  innerRef={(input) => this.username = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"
                  innerRef={(input) => this.password = input} />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="remember"
                    innerRef={(input) => this.remember = input} />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Sign up</Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;