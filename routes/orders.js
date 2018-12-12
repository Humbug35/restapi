const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const OrderDataLayer = require('../DataLayer/OrderDataLayer');

let orderDataLayer = new OrderDataLayer();


router.get('/', (req, res) => {
  orderDataLayer.getAllOrders()
    .then(orders => {
      res.json(orders)
    })
})

router.post('/', (req, res) => {
  let body = req.body;
  orderDataLayer.sendNewOrder(body)
    .then(order => {
      console.log(order._id)
      if(order) {
        res.status(201).json({
          success: true,
          message: 'Order created',
          orderId: order._id
        })
      } else {
        res.status(400).json({
          success: false,
          message: 'Something went wrong'
        })
      }
    })
})

router.get('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId;
  orderDataLayer.getSingleOrder(orderId)
    .then(order => {
      if(order) {
        res.status(200).json(order)
      } else {
        next()
      }
    })
    .catch(() => {
      next()
    })
})

module.exports = router;
