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

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
  image: String,
  description: String,
  countInStock: Number,
})

const Product = mongoose.model('Product', productSchema);

app.get(`${api}/products`, async (req, res) => {
  const productList = await Product.find();

  if(!productList) {
    res.status(500).json({success: false})
  }
  res.send(productList);
})

app.post(`${api}/products`, (req, res) => {
  //To get data from the frontend we use res.body
  // middleware is a function that has control of the request and response of any API
  // const newProduct = req.body
  // console.log(newProduct);

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    countInStock: req.body.countInStock
  })

  product.save().then((createdProduct) => {
    res.status(201).json(createdProduct)
  }).catch((err) => {
    res.status(500).json({
      error: err,
      success: false
    })
  })

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