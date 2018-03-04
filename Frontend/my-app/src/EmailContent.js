import React, { Component } from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

class EmailContent extends Component {
  render(){
    if (!this.props.contentData){
      return(
        <Row className="email-background">
          <Col sm = {1} md = {1} lg = {1}>
          </Col>
          <Col sm = {10} md = {10} lg ={10} className = "email-content">
            <div className = "placeholder-email-content">Click on an email to view it!</div>
          </Col>
          <Col sm ={1} md = {1} lg = {1}>
          </Col>
        </Row>
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
              <div>
                To: {this.props.contentData.to}<br></br>
                From: {this.props.contentData.from}<br></br>
                {this.props.contentData.date}<br></br><br></br>
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
