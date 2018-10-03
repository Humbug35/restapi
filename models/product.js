const mongoose = require('mongoose');

    let postProductSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      id: Number,
      product_name: String,
      price: String,
      Category: String
    })

module.exports = mongoose.model('Product', postProductSchema)
