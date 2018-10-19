const bodyParser = require('body-parser');
const express = require("express");
const app = express();
let createError = require('http-errors');
const Mongo = require('./DataLayer/mongo');
const productsRoutes = require('./routes/products')

let mongo = new Mongo();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/products', productsRoutes);

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



















//const products = require('./articles.json');
//const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://admin:Omegapoint@cluster0-jtzfp.mongodb.net/BosseLinus?retryWrites=true', { useNewUrlParser: true });
// const db = mongoose.connection;
//
// db.once('open', () => {
//   console.log('Connected to MongoDB')
// })
//
// db.on('error', (error) => {
//   console.log(error)
// })


// let sendJsonFileToDatabase = false;
// function sendProductsToDatabase() {
//   if(sendJsonFileToDatabase) {
//     products.forEach(product => {
//       product = new Product({
//         _id: mongoose.Types.ObjectId(),
//         productNumber: product.id,
//         product_name: product.product_name,
//         price: product.price,
//         Category: product.Category.toLowerCase()
//       }).save()
//     })
//   } else {
//       console.log('False')
//   }
// }
// sendProductsToDatabase();
