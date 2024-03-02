const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const router = require('./network/routes');
require('dotenv').config();


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(router);

router(app);

app.use('/app', express.static('public'));

// const url_db = process.env.DB_HOST;
db();

app.listen(3000);
console.log("La app está escuchando http://localhost:3000");