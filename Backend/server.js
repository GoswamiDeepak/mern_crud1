const express = require('express');
const app = express();;
const PORT = 5000;
const database = require('./database');

app.listen(PORT, function(){
    console.log(`Listening on ${PORT}`);
})