import React, { Component } from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

class EmailContent extends Component {
  render(){
    if (!this.props.contentData){
      return(
        <Row className="email-background">
        <Col sm = {12} md = {12} lg ={12} className = "email-content">
            <div className = "placeholder-email-content">Click on an email to view it!</div>
          </Col>
        </Row>
      )
    }
    else{
      return(
        <Row className="email-background">
          <Col sm = {12} md = {12} lg ={12} className = "email-content">
            <div>
              <div className = "email-title">
                {this.props.contentData.subject}
              </div>
              <div className="email-header">
                <div className="email-header-item">
                    To: {this.props.contentData.to}<br></br>

                </div>
                <div className="email-header-item">
                    From: {this.props.contentData.from}<br></br>

                </div>
                <div className="email-header-item">
                    {this.props.contentData.date}<br></br>

                </div>

                </div>

            </div>
            <div className="email-body">
              {this.props.contentData.bodyText}
          </div>
          </Col>
        </Row>
      )
    }
  }
}

export default EmailContent
