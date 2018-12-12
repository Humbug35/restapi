const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const ProductDataLayer = require('../DataLayer/ProductDataLayer');

let productDataLayer = new ProductDataLayer();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log('Destianation', file)
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});


const upload = multer({ storage: storage });
console.log('Upload', upload)

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
  console.log('Body', req.body)
  console.log('File', req.file)
  let body;
  if(!req.body.product_name || '' && !req.body.price || '' && !req.body.Category || '') {
    console.log('IF')
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

// router.patch('/:productId', (req, res, next) => {
//   const productId = req.params.productId;
//   const body = {
//     product_name: req.body.product_name,
//     price: req.body.price,
//     Category: req.body.Category
//   }
//   mongo.patchProduct(productId, body)
//    .then(product => {
//      console.log('Product', product)
//      if(product) {
//         res.json(product)
//      } else {
//        console.log('ELSE')
//      }
//    })
//    .catch(() => {
//      next()
//    })
// });
//
// router.put('/:productId', (req, res, next) => {
//   mongo.updateProduct(req, res, next)
// })

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
