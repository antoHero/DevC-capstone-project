
const { pool } = require('./database/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const gifRoutes = require('./routes/gifs');
const gifCtrl = require('./controllers/Gif');
dotenv.config();

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.get('/', (req, res) => {
    res.send({
        message: 'Endpoint working'
    });
});

app.use('api/v1/gifs', gifRoutes);

module.exports = app;
