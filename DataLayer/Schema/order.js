const mongoose = require('mongoose');
const Product = require('./product');


let orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullName: String,
  email: String,
  phonenumber: Number,
  address: [
    {
      _id: false,
      streetAddress: String,
      city: String,
      country: String,
      zipcode: Number
    }
  ],
  cardInfo: [
    {
      _id: false,
      fullname: String,
      carNumber: Number,
      expireMonth: Number,
      expireYear: Number,
      cvc: Number
    }
  ],
  products:
      [
        {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        product_name: String,
        price: String,
        Category: String,
        quantity: { type: Number, default: 1 }

      }
    ],
  date: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Orders', orderSchema);
