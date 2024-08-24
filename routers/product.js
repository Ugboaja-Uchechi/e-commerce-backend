const {Product} = require('../models/Product');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if(!productList) {
    res.status(500).json({success: false})
  }
  res.send(productList);
})

router.post(`/`, (req, res) => {
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

module.exports = router;