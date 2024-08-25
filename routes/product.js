const { Product } = require('../models/Product');
const { Category } = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(',') }
  }

  const productList = await Product.find(filter).populate('category');

  if (!productList) {
    res.status(500).json({ success: false })
  }
  res.send(productList);
})

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');

  if (!product) {
    res.status(500).json({ success: false })
  }
  res.send(product);
})

router.post(`/`, async (req, res) => {
  //To get data from the frontend we use res.body
  // middleware is a function that has control of the request and response of any API
  // const newProduct = req.body
  // console.log(newProduct);

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Invalid Category')

  let product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    countInStock: req.body.countInStock,
    category: req.body.category,
  })

  product = await product.save();

  if (!product)
    return res.status(500).send('The product cannot be created')

  res.send(product);
})

router.put('/:id',async (req, res)=> {
  if(!mongoose.isValidObjectId(req.params.id)) {
     return res.status(400).send('Invalid Product Id')
  }
  const category = await Category.findById(req.body.category);
  if(!category) return res.status(400).send('Invalid Category')

  const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        countInStock: req.body.countInStock,
        category: req.body.category,
      },
      { new: true}
  )

  if(!product)
  return res.status(500).send('the product cannot be updated!')

  res.send(product);
})

router.delete('/:id', (req, res)=>{
  Product.findByIdAndDelete(req.params.id).then(product =>{
      if(product) {
          return res.status(200).json({success: true, message: 'the product is deleted!'})
      } else {
          return res.status(404).json({success: false , message: "product not found!"})
      }
  }).catch(err=>{
     return res.status(500).json({success: false, error: err}) 
  })
})

module.exports = router;