const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
// const Product = require('./models/Product');
const productsRouter = require('./routes/product');
const categoriesRoutes = require('./routes/categories');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(cors());
app.options('*', cors());

//middleware
//the backend would understand json sent from the frontend
app.use(bodyParser.json());
app.use(morgan('tiny'));

const api = process.env.API_URL;

//Routers
app.use (`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


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