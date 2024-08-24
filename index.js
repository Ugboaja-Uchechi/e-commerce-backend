const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

//middleware
//the backend would understand json sent from the frontend
app.use(bodyParser.json());
app.use(morgan('tiny'));



require('dotenv/config');

const api = process.env.API_URL;

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'Product 1',
    price: 100,
    image: 'url'
  }
  res.send(product);
})

app.post(`${api}/products`, (req, res) => {
  //To get data from the frontend we use res.body
  // middleware is a function that has control of the request and response of any API
  const newProduct = req.body
  console.log(newProduct);
  res.send(newProduct);
})

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
  console.log('Database connection is ready...');
})
.catch((err) => {
  console.log(err);
})

app.listen(3000, () => {
  console.log(api);
  console.log('Server is running on http://localhost:3000');
})