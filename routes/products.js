const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const ProductDataLayer = require('../DataLayer/ProductDataLayer');

let productDataLayer = new ProductDataLayer();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});


const upload = multer({ storage: storage });

router.get('/', (req, res, next) => {
  let skip = Number(req.query.skip);
  let limit = Number(req.query.limit);
  let category = req.query.category;
  let price = req.query.price;
  productDataLayer.getAllProducts(skip, limit, price, category)
    .then(products => {
      res.status(200).json(products)
  })
  .catch(() => {
    next()
  })
});


router.get('/:productId', (req, res, next) => {
  const productId = req.params.productId;
  productDataLayer.getSingleProduct(productId)
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

router.post('/', upload.single('productimage'), (req, res, next) => {
  let body;
  if(!req.body.product_name || '' && !req.body.price || '' && !req.body.Category || '') {
      res.status(403).send('Some field is empty')
  } else {
    body = {
      product_name: req.body.product_name,
      price: req.body.price,
      Category: req.body.Category.toLowerCase(),
      productImage: req.file.path
    }
  }
  productDataLayer.postProduct(body)
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
  productDataLayer.deleteProduct(productId)
    .then(product => {
      res.status(200).send(`Product with ID: ${productId} deleted`)
    })
    .catch(() => {
      next()
    })
});
module.exports = router;
