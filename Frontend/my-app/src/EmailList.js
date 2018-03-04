import React, { Component } from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

class EmailList extends Component{

  render(){
    var data = this.props.emailData;
    var renderData = [];
    if (!data){
      return<div></div>
    }
    else{
      for (let i=0; i<data.length;i++)
        renderData.push(
          <Row>
            <Col sm = {12} md = {12} lg ={12}>
              <div className = "email"
                onClick = {()=>{this.props.handleClick(data[i])}}>
                <div className = "email-subject">
                  {data[i].subject}
                </div>
                <div className = "email-preview">
                  {data[i].bodyText}
                </div>
              </div>
            </Col>
          </Row>
        );
      return (
        <div>
          {renderData}
        </div>
      )
    }
  }
}

export default EmailList
