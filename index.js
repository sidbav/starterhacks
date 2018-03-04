/**
 * Module dependencies.
 */
'use strict';
const port = process.env.PORT || 8000;
const express = require('express');
const request = require('request');
const gmail = require('./gmail'); //get the gmail.js stuff from this dir

var app = express(); //module.exports = express.createServer();

app.listen(port, () => console.log(`port is: ${port}!`));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
    gmail.authorize()
    .then((oauth2)=>{
        return gmail.getAllEmails(oauth2);
    })
    .then((emailObjects) => {
        let requestsList = [];
        emailObjects.forEach(function(email){
            requestsList.push(new Promise((resolve, reject) =>{
                request(`https://urgentml.localtunnel.me/?message=${email.bodyText}`, function(error, response, body){
                    if (error){
                        reject(error);
                    }
                    email.actionable = body;
                    resolve(email);
                });
            }));
        });
        Promise
            .all(requestsList)
            .then((emailObjects) => {
                res.send(emailObjects);
            });
    })
    .catch((err)=>{
        console.log(err);
    });
});
