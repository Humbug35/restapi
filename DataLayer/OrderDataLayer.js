const mongoose = require('mongoose');
const Order = require('./Schema/order');
const orders = require('../orders.json');


class OrderDataLayer {
  constructor() {
    this.Order = null;
    this._loadSchema();
    this.ordersToDatabase();
  }
  _connect() {
    mongoose.connect('mongodb+srv://admin:Omegapoint@cluster0-jtzfp.mongodb.net/BosseLinus?retryWrites=true', { useNewUrlParser: true })
       .then(console.log('Connected to MongoDB, Order'))
       .catch(err => console.log(err))
  }
  _loadSchema() {
    this.Order = mongoose.model('Orders')
  }
  ordersToDatabase() {
    let isSend = false;
    if(isSend){
        orders.forEach(order => {
          let orderObj = new Order({
                _id: mongoose.Types.ObjectId(),
                fullName: order.fullName,
                email: order.email,
                phonenumber: order.phonenumber,
                address: order.address,
                products: order.products
              }).save()
          })
    }
  }
  sendNewOrder(body) {
    return new Order({
      _id: mongoose.Types.ObjectId(),
      fullName: body.fullname,
      email: body.email,
      phonenumber: body.phone,
      address: body.address,
      cardInfo: body.cardInfo,
      products: body.products,
      totalPrice: body.totalPrice
    }).save()
  }
  getAllOrders() {
    return this.Order.find()
      .select('fullName address email products')
      .sort({ date: 1 })
  }
  getSingleOrder(orderId) {
    return this.Order.findById(orderId)
      .select('_id fullName address email phonenumber products date')
  }
}

module.exports = OrderDataLayer;
