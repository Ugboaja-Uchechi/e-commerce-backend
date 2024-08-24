const mongoose = require('mongoose');

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

exports.Product = mongoose.model('Product', productSchema);