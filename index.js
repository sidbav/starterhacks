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

app.get('/', (req, res) => {
    gmail.authorize().then((oauth2)=>{
        res.send(gmail.listLabels(oauth2));
    });
});
