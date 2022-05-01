const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require ('axios');

app.use(cors());
app.options('*', cors());

var jsonParser = bodyParser.json();

const server = app.listen(3000, '127.0.0.1', () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('app is listening at ', host, port);
});

app.get('/yelp', (req, res) => {
  axios({
    method: 'get',
    url: 'https://api.yelp.com/v3/categories',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer w6a5yOrFUI42Y7kKdWDZvCT-SSIQmRTusNSK08EOZBE7TduWBjDCji0jMnM9Gz5KAcm9BM-HY5_Q7hoKHJgWtaeyhM9gi0y87g389yLJ3FC5GxAV1neaeTTVa7BtYnYx'
    }
  })
  .then(data => {
    console.log('data successfully retrieved', data);
    res.send(data.data).status(200).end();
  })

})