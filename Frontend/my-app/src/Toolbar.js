import React, { Component } from 'react';

var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var logo = require('./urgentai.png');

class Toolbar extends Component{
  render (){
    return(
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
            <a href="#">
        <img src={logo} style={{width:100, marginTop: -7}} />
        </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem >
              Sign Out
            </NavItem>
          </Nav>
        </Navbar>
          <Navbar fixedBottom className="footer">
            <div className="footer-text"> Made with &#9829; at StarterHacks</div>
          </Navbar>
      </div>
    )
  }
}

export default Toolbar
