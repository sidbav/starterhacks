import React, { Component } from 'react';
import EmailList from "./EmailList"
import EmailContent from "./EmailContent"
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

function sortJson(data){
  var actionableData = []
  var nonActionableData = [];
  data.forEach(function(element){
    if(element.actionable === 'yes'){
      actionableData.push(element);
    }
    else {
      nonActionableData.push(element);
    }
  })

  actionableData.sort(function(a,b){
    return a.internalDate-b.internalDate
  });

  nonActionableData.sort(function(a,b){
    return a.internalDate-b.internalDate
  })

  var returnArray = actionableData.concat(nonActionableData);
  return returnArray
}

class PageBody extends Component{
  constructor(props){
    super(props);
      this.emailData;
      this.contentData;
      this.state={
        posts:[],
        update:""
      }
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick(data){
    this.contentData = data;
    this.setState({update:""})
  }

  componentDidMount(){
    fetch('https://email.localtunnel.me/')
    .then(results =>{
      return results.json();
    }).then(data =>{
      this.emailData = data;
    }).then( data =>{
      this.emailData = sortJson(this.emailData);
      this.contentData = this.emailData;
      this.setState({posts:[]})
  })
}

  render(){
    return (
      <Grid className="grid">
        <Row>
          <Col sm ={3} md = {3} lg = {3} className="show-grid">
          <div className = "email-list">
            <Row>
              <div className = "inbox-header">
                 INBOX
              </div>
            </Row>
            <Row>
              <EmailList
                handleClick = {this.handleClick}
                emailData = {this.emailData}
              />
            </Row>
          </div>
          </Col>
          <Col sm={9} md = {9} lg = {9}>
            <EmailContent
              contentData = {this.contentData}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}
export default PageBody
