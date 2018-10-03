let products = require("../articles");
const PostProduct = require('../models/product');
let mongoose = require('mongoose');





class Product {

  getProducts(req, res) {
    let array;
    PostProduct.find()
    .then(docs => {
      array = docs;
      res.status(200).json(docs)
      console.log(array)
    })
    .catch(err => console.log('Errormessage: ', err))
  }

  getAllProducts(req, res) {
    let paginationArray = [];
    let skip = Number(req.query.skip) || 0;
    let limit = Number(req.query.limit) || products.length;
    for(let i = skip; i <= limit; i++) {
      products.map((product) => {
        if(i === product.id) {
          return paginationArray.push(product)
        }
      })
    }
    if(skip > limit) {
      return res.status(400).send({
        success: 'false',
        message: 'Skip are higher than limit'
      })
    }
      return res.status(200).send({
        success: 'true',
        message: 'Products retrieved successfully',
        products: paginationArray
      })
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
    products.push(product);
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
