import {
  Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
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
      isModalOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  handleLogin(event) {
    this.toggleModal();
    event.preventDefault();
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
              <NavItem>
                <NavLink className="nav-link" to='/favorite'><span className="fa fa-heart fa-lg"></span> Favorite</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to='/profile'><span className="fa fa-user fa-lg"></span> Profile</NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg loginButton"></span> 
                  <span className="loginButton"> Login </span>
                </Button>
              </NavItem>
            </Nav>
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
        
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader className="login" toggle={this.toggleModal}>Login</ModalHeader>
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
      </React.Fragment>
    );
  }
}

export default Header;