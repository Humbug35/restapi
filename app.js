const bodyParser = require('body-parser');
const express = require("express");
const app = express();
let createError = require('http-errors');
const ProductDataLayer = require('./DataLayer/ProductDataLayer');
const OrderDataLayer = require('./DataLayer/OrderDataLayer');
const productsRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');
const session = require('express-session');

//let productDataLayer = new ProductDataLayer();
//let orderDataLayer = new OrderDataLayer();

mongoose.connect('mongodb+srv://admin:Omegapoint@cluster0-jtzfp.mongodb.net/BosseLinus?retryWrites=true', { useNewUrlParser: true })
   .then(console.log('Connected to MongoDB'))
   .catch(err => console.log(err))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, sid"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/products', productsRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

app.use('*', (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  res.status(error.status).json({
    message: error.message,
    status: error.status
  })
  next();
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status
    },
  })
})

const port = 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
