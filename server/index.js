const express   = require('express');
const app       = express();
const mongoose  = require('mongoose')

let db = require('./app/database.js')(mongoose);

app.listen(3000, () => console.log("Debugging on port 3000"));
