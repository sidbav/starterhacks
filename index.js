/**
 * Module dependencies.
 */
'use strict';
const port = process.env.PORT || 8000;
const express = require('express');

var app = express(); //module.exports = express.createServer();

app.listen(port, () => console.log(`port is: ${port}!`));

app.get('/', (req, res) => {
    res.send(`Hey!`);
});
