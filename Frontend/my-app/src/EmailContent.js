import React, { Component } from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

class EmailContent extends Component {
  render(){
    return(
      <Row className="email-background">
        <Col sm = {1} md = {1} lg = {1}>
        </Col>
        <Col sm = {10} md = {10} lg ={10} className = "email-content">
          <div>
            <div className = "email-title">
              Email Title?
            </div>
          </div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ligula, luctus et augue vel, aliquet consequat nisl. Nullam sit amet felis lectus. Integer sit amet rutrum felis, at ultricies sem. Vivamus mi diam, commodo at arcu et, vehicula dignissim diam. Cras blandit quam sit amet sagittis elementum. Aenean ac ultricies neque. Quisque quis odio mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec quis malesuada enim.
        </Col>
        <Col sm ={1} md = {1} lg = {1}>
        </Col>
      </Row>
    )
  }
}

export default EmailContent
