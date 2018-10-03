let products = require("../articles");
const PostProduct = require('../models/product');
const mongoose = require('mongoose');

class Product {
  getProducts(req, res) {
    PostProduct.find()
    .then(docs => {
      let array = docs;
      let paginationArray = [];
      let skip = Number(req.query.skip) || 0;
      let limit = Number(req.query.limit) || docs.length;
      for(let i = skip; i <= limit; i++) {
        array.map(product => {
          if(i === product.id) {
            return paginationArray.push(product)
          }
        })
      }
      console.log('PaginationArray: ', paginationArray)
      res.status(200).send({
        success: 'true',
        message: 'Product retrieved from database',
        paginationArray
      })
    })
    .catch(err => console.log('Errormessage: ', err))
  }

  getSingleProduct(req, res) {
    const id = req.params.id;
    let findProduct = products.find(product => {
      return product.id == id;
    })
    if(findProduct) {
      return res.status(200).send({
        success: 'true',
        message: 'SingleProduct retrieved successfully',
        findProduct
      })
    }
    return res.status(404).send({
      success: 'false',
      message: 'Product does not exist'
    })
  }

  postProduct(req, res) {
    const product = new PostProduct({
      _id: new mongoose.Types.ObjectId(),
      id: products.length + 1,
      product_name: req.body.product_name,
      price: req.body.price,
      Category: req.body.Category
    })
    product.save()
    .then(
      res.status(200).send({
        success: 'true',
        message: 'Done',
        product
      })
    );
  }
}

const product = new Product();
export default product;
