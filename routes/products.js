const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mongo = require('../DataLayer/mongo');

let mongo = new Mongo();

router.get('/', (req, res, next) => {
  let skip = Number(req.query.skip);
  let limit = Number(req.query.limit);
  let category = req.query.category;
  let price = req.query.price;
  mongo.getAllProducts(skip, limit, price, category)
    .then(products => {
      console.log('then')
      res.status(200).json(products)
  })
  .catch(() => {
    next()
  })
});

router.get('/:productId', (req, res, next) => {
  const productId = req.params.productId;
  mongo.getSingleProduct(productId)
    .then(product => {
      if(product) {
          res.status(200).json(product)
      } else {
          next()
      }
    })
    .catch(() => {
      next()
    })
});

router.post('/', (req, res, next) => {
  let body;
  if(!req.body.product_name || '' && !req.body.price || '' && !req.body.Category || '') {
      res.status(403).send('Some field is empty')
  } else {
    body = {
      product_name: req.body.product_name,
      price: req.body.price,
      Category: req.body.Category.toLowerCase()
    }
  }
  mongo.postProduct(body)
   .then(product => {
     res.status(201).json({
       message: 'Product Created',
       product
     })
   })
   .catch(() => {
     next()
   })
});

router.delete('/:productId', (req, res, next) => {
  const productId = req.params.productId;
  mongo.deleteProduct(productId)
    .then(product => {
      res.status(200).send(`Product with ID: ${productId} deleted`)
    })
    .catch(() => {
      next()
    })
});

router.patch('/:productId', (req, res, next) => {
  mongo.patchProduct(req, res, next)
});

router.put('/:productId', (req, res, next) => {
  mongo.updateProduct(req, res, next)
})

module.exports = router;












































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



  // let skip = Number(req.query.skip);
  // let limit = Number(req.query.limit);
  // let category = req.query.category;
  // let price = req.query.price;
  // Product.find()
  //   .sort(price ? { price: price } : { _id: 1 })
  //   .skip(skip)
  //   .limit(limit)
  //   .where(category ? Product.find({ 'Category': category }) : Product.find())
  //   .then(products => {
  //     res.status(200).json(products)
  //   })
  //   .catch(() => {
  //     next()
  //   })



  // const productId = req.params.productId;
  // Product.findById(productId)
  //   .then(product => {
  //     if(product) {
  //       res.status(200).json(product)
  //     }
  //   })
  //   .catch(() => {
  //     const error = new Error('Product Not Found');
  //     error.status = 404;
  //     next(error)
  //   })
