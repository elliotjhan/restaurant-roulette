const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

var jsonParser = bodyParser.json();

const server = app.listen(3000, '127.0.0.1', () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('app is listening at ', host, port);
});