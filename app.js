const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require("express");
const app = express();
let createError = require('http-errors');
const products = require('./articles.json');

const productsRoutes = require('./routes/products')

mongoose.connect('mongodb+srv://admin:Omegapoint@cluster0-jtzfp.mongodb.net/BosseLinus?retryWrites=true', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB')
})

db.on('error', (error) => {
  console.log(error)
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.get('/', (req, res) => {
  res.redirect('/products')
})
app.use('/products', productsRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
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





let sendJsonFileToDatabase = false;
function sendProductsToDatabase() {
  if(sendJsonFileToDatabase) {
    products.forEach(product => {
      product = new Product({
        _id: mongoose.Types.ObjectId(),
        productNumber: product.id,
        product_name: product.product_name,
        price: product.price,
        Category: product.Category.toLowerCase()
      }).save()
    })
  } else {
      console.log('False')
  }
}
sendProductsToDatabase();



const port = 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
