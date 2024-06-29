const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const axios = require('axios');

require('dotenv').config();

router.get('/', (_req, res) => {
  res.send('App is running..');
});

router.get('/api/weather', (req, res) => {
  const options = {
    method: 'GET',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${req.query.q}&appid=${process.env.API_KEY}&units=metric`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err.response.data);
    });
});

router.get('/api/forecast', (req, res) => {
  const options = {
    method: 'GET',
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${req.query.q}&appid=${process.env.API_KEY}&units=metric`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err.response.data);
    });
});

app.use('/.netlify/functions/app', router);
module.exports.handler = serverless(app);
