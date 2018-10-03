import router from './routes/index.js';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let json = require('./articles.json');
let PostProduct = require('./models/product')
const express = require("express");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(router);

const db = mongoose.connect('mongodb+srv://admin:Omegapoint@cluster0-jtzfp.mongodb.net/BosseLinus?retryWrites=true');
const dataBase = mongoose.connection;

   json.forEach((product, res) => {
       product = new PostProduct({
         _id: new mongoose.Types.ObjectId(),
         id: product.id,
         product_name: product.product_name,
         price: product.price,
         Category: product.Category
       }).save()
         // .then(producten => console.log(producten))
         // .catch(error => console.log('errormessage: ', error))
     });

const port = 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})



// obj = {
//   id: product.id,
//   name: product.product_name,
//   price: product.price,
//   Category: product.Category,
// }
// let schema = mongoose.Schema({ id: Number, name: String, price: String, Category: String }),
// productSchema = mongoose.model('Article', schema),
// Products = new productSchema({ id: obj.id, name: obj.name, price: obj.price, Category: obj.Category });
// console.log('obj', obj)

 //let obj = {};
