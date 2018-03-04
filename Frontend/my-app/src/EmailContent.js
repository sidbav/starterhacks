import React, { Component } from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormGroup = require('react-boostrap/lib/FormGroup');
var FormControl = require('react-boostrap/lib/FormControl');
var ControlLabel = require('react-boostrap/lib/ControlLabel');


class EmailContent extends Component {
  render(){
      if(this.props.contentData && this.props.contentData.length > 1){
          return(
            <Row className="email-background">
              <Col sm = {12} md = {12} lg ={12} className = "email-content">
                <div>
                  <div className = "email-title">
                    {this.props.contentData[0].subject}
                  </div>
                  <div className="email-header">
                    <div className="email-header-item">
                        To: {this.props.contentData[0].to}<br></br>

                    </div>
                    <div className="email-header-item">
                        From: {this.props.contentData[0].from}<br></br>

                    </div>
                    <div className="email-header-item">
                        Date: {this.props.contentData[0].date}<br></br>

                    </div>
                </div>

                </div>
                <div className="email-body">
                  {this.props.contentData[0].bodyText}
              </div>
              <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Textarea</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="textarea" />
                </FormGroup>
              <button className="reply-button">&#10149; Reply</button>
              </Col>
            </Row>
          )
      }
      else if (!this.props.contentData){
      return(
        <Row className="email-background">
        <Col sm = {12} md = {12} lg ={12} className = "email-content">
            <div className = "placeholder-email-content">Loading...</div>
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
                    Date: {this.props.contentData.date}<br></br>

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
