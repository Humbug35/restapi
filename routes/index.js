let express = require('express');
import product from '../ProductFunctions/productFunctions.js';


const router = express.Router();


router.get('/products', product.getAllProducts);
router.get('/products/:id', product.getSingleProduct);

export default router;
