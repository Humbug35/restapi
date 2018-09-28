let express = require('express');
import productFunctions from '../ProductFunctions/productFunctions.js';


const router = express.Router();


router.get('/products', productFunctions.getAllProducts);
router.get('/products/:id', productFunctions.getSingleProduct);

export default router;
