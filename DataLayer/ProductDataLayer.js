const mongoose = require('mongoose');
const Product = require('./Schema/product');
const products = require('../articles.json');

class ProductDataLayer {
  constructor(){
    this.Product = null;
    this._loadSchema();
  }

  _connect(){
    mongoose.connect('mongodb+srv://admin:Omegapoint@cluster0-jtzfp.mongodb.net/BosseLinus?retryWrites=true', { useNewUrlParser: true })
       .then(console.log('Connected to MongoDB, Product'))
       .catch(err => console.log(err))
  }

  _loadSchema() {
    this.Product = mongoose.model('Product')
  }

  postJsonFileToDatabase() {
    let sendJsonFileToDatabase = false;
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
    }
  }

  getAllProducts(skip, limit, price, category) {
    return this.Product.find()
      .select('_id product_name price Category productImage')
      .sort(price ? { price: price } : { _id: 1 })
      .skip(skip)
      .limit(limit)
      .where(category ? Product.find({ 'Category': category }) : Product.find())
  }


  getSingleProduct(productId) {
    return this.Product.findById(productId)
        .select('_id product_name price Category productImage')
  }

  postProduct(body) {
    return new Product({
          _id: mongoose.Types.ObjectId(),
          product_name: body.product_name,
          price: body.price,
          Category: body.Category.toLowerCase(),
          productImage: body.productImage
        }).save()
  }

  deleteProduct(productId) {
    return this.Product.findByIdAndDelete(productId)
  }
};
module.exports = ProductDataLayer;
