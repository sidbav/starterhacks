import React, { Component } from 'react';
import EmailList from "./EmailList"
import EmailContent from "./EmailContent"
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

class PageBody extends Component{
  constructor(props){
    super(props);
      this.emailData;
  }

  componentWillMount(){
    fetch('https://email.localtunnel.me/')
    .then(results =>{
      return results.json();
    }).then(data =>{
      this.emailData = data;
    })
  }

  render(){
    return (
      <Grid>
        <Row>
          <Col sm ={3} md = {3} lg = {3} className="show-grid">
            <Row>
              <div className = "inbox-header">
                 INBOX:
              </div>
            </Row>
            <Row>
              <EmailList
                emailData = {this.emailData}
              />
            </Row>
          </Col>
          <Col sm={9} md = {9} lg = {9}>
            <EmailContent
              emailData = {this.emailData}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}
export default PageBody
