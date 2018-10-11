const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/productModel');


router.get('/', (req, res, next) => {
  let skip = Number(req.query.skip);
  let limit = Number(req.query.limit);
  let category = req.query.category;
  let price = req.query.price;
  Product.find()
    .sort(price ? { price: price } : { _id: 1 })
    .skip(skip)
    .limit(limit)
    .where(category ? Product.find({ 'Category': category }) : Product.find())
    .then(products => {
      res.status(200).json(products)
    })
    .catch(() => {
      next()
    })
});

router.get('/:productId', (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      if(product) {
        res.status(200).json(product)
      }
    })
    .catch(() => {
      const error = new Error('Product Not Found');
      error.status = 404;
      next(error)
    })
});

router.post('/', (req, res, next) => {
  if(!req.body.product_name) {
    res.status(403).send('Product Name is required')
  } else if(!req.body.price) {
      res.status(403).send('Price is required')
  } else if(!req.body.Category) {
      res.status(403).send('Category is required')
  } else {
    let product = new Product({
      _id: mongoose.Types.ObjectId(),
      product_name: req.body.product_name,
      price: req.body.price,
      Category: req.body.Category.toLowerCase()
    })
    product.save()
      .then(
        res.status(201).send({
          message: 'Product Created',
          product
        })
      )
      .catch(error => {
        res.status(400).send('ErrorMessage: ', error)
      })
  }
});

module.exports = router;
