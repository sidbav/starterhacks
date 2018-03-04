import React, { Component } from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

class EmailList extends Component{

  render(){
    var data = this.props.emailData;
    var renderData = [];
    if (!data){
      return<div>loading...</div>
    }
    else{
      for (let i=0; i<data.length;i++)
        if(data[i].actionable === 'yes'){
            renderData.push(
                <Row>
                  <Col sm = {12} md = {12} lg ={12}>
                      <div className = "email email-actionable"
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
        }else{
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
        }

      return (
        <div>
          {renderData}
        </div>
      )
    }
  }
}

export default EmailList
