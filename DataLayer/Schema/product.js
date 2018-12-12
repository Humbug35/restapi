const mongoose = require('mongoose');


    let ProductSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      productNumber: Number,
      product_name:  String,
      price:  String,
      Category: String,
      productImage: Object
    })

module.exports = mongoose.model('Product', ProductSchema)