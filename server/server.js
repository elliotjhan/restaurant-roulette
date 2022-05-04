const express = require('express');
const app = express();
const cors = require('cors');
const axios = require ('axios');
const bodyParser = require('body-parser');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

const server = app.listen(3000, '127.0.0.1', () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('app is listening at ', host, port);
});

app.get('/categories', (req, res) => {
  axios({
    method: 'get',
    url: 'https://api.yelp.com/v3/categories',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer w6a5yOrFUI42Y7kKdWDZvCT-SSIQmRTusNSK08EOZBE7TduWBjDCji0jMnM9Gz5KAcm9BM-HY5_Q7hoKHJgWtaeyhM9gi0y87g389yLJ3FC5GxAV1neaeTTVa7BtYnYx'
    }
  })
  .then(data => {
    res.send(data.data).status(200).end();
  })
})

app.post('/restaurants', (req, res) => {
  let categories = req.body.categories;
  let location = req.body.location;
  let url = 'https://api.yelp.com/v3/businesses/search?';
  axios({
    method: 'get',
    params: {
      categories,
      location
    },
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer w6a5yOrFUI42Y7kKdWDZvCT-SSIQmRTusNSK08EOZBE7TduWBjDCji0jMnM9Gz5KAcm9BM-HY5_Q7hoKHJgWtaeyhM9gi0y87g389yLJ3FC5GxAV1neaeTTVa7BtYnYx'
    }
  })
  .then(data => {
    res.send(data.data).status(200).end();
  })
})