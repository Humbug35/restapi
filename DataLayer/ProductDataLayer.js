const mongoose = require('mongoose');
const Product = require('./Schema/product');
const products = require('../articles.json');

class ProductDataLayer {
  constructor(){
    //this._connect();
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

  // patchProduct(productId, body){
  //   return this.Product.
  // }

  // updateProduct(req, res, next) {
  //   const productId = req.params.productId;
  //     this.Product.findById(productId)
  //       .then(product => {
  //         if(req.body.product_name && req.body.price && req.body.Category) {
  //             product.product_name = req.body.product_name;
  //             product.price = req.body.price;
  //             product.Category = req.body.Category.toLowerCase();
  //             product.save()
  //               .then(res.json(product))
  //         } else {
  //             res.status(404).send('Some field is empty')
  //         }
  //       })
  //       .catch(() => {
  //         next()
  //       })
  // };
};



module.exports = ProductDataLayer;






// getAllProducts() {
//   let skip = Number(req.query.skip);
//   let limit = Number(req.query.limit);
//   let category = req.query.category;
//   let price = req.query.price;
//   this.Product.find()
//     .select('_id product_name price Category')
//     .sort(price ? { price: price } : { _id: 1 })
//     .skip(skip)
//     .limit(limit)
//     .where(category ? Product.find({ 'Category': category }) : Product.find())
//     .then(products => {
//       let test = 23
//       console.log(test)
//       res.status(200).json({
//         message: 'From Class Mongo',
//         products
//       })
//     })
//     .catch(() => {
//       console.log('FEL')
//     })
// }
// getSingleProduct(req, res, next) {
//   const productId = req.params.productId;
//   return this.Product.findById(productId)
//       .select('_id product_name price Category')
//       .then(product => {
//         if(product) {
//             res.status(200).json(product)
//         } else {
//             next()
//         }
//       })
//       .catch(() => {
//         next()
//       })
// }
// postProduct(req, res, next) {
//   if(!req.body.product_name || '' && !req.body.price || '' && !req.body.Category || '') {
//     res.status(403).send('Some field is empty')
//   } else {
//     let product = new Product({
//       _id: mongoose.Types.ObjectId(),
//       product_name: req.body.product_name,
//       price: req.body.price,
//       Category: req.body.Category.toLowerCase()
//     })
//     product.save()
//       .then(
//         res.status(201).json({
//           message: 'Product Created',
//           product
//         })
//       )
//       .catch(() => {
//         next()
//       })
//   }
// }
// deleteProduct(productId) {
//   const productId = req.params.productId;
//   this.Product.findByIdAndDelete(productId)
//     .then(product => {
//       res.status(200).send(`Product with ID: ${productId} deleted`)
//     })
//     .catch(() => {
//       next()
//     })
// }
// patchProduct(req, res){
//   const productId = req.params.productId;
//     Product.findById({ _id: productId }, (err, product) => {
//       if(err) {
//         res.status(404).send('Product Not Found')
//       } else {
//         for (let prop in req.body) {
//             product[prop] = req.body[prop];
//         }
//         product.save()
//         res.json(product);
//       }
//     })
// }
