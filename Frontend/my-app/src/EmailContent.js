import React, { Component } from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

class EmailContent extends Component {
  render(){
    console.log(this.props)
    if (!this.props.contentData){
      return(
        <div> Choose an e-mail to view it!</div>
      )
    }
    else{
      return(
        <Row className="email-background">
          <Col sm = {1} md = {1} lg = {1}>
          </Col>
          <Col sm = {10} md = {10} lg ={10} className = "email-content">
            <div>
              <div className = "email-title">
                {this.props.contentData.subject}
              </div>
            </div>
              {this.props.contentData.bodyText}
          </Col>
          <Col sm ={1} md = {1} lg = {1}>
          </Col>
        </Row>
      )
    }
  }
}

export default EmailContent
