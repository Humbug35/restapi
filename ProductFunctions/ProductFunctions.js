let json = require("../articles");

class ProductFunctions {

  getAllProducts(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'Products retrieved successfully',
      products: json
    })
  }

  getSingleProduct(req, res) {
    const id = req.params.id;
    console.log(id)
    let findProduct = json.find(product => {
      return product.id == id;
    })
    if(findProduct) {
      return res.status(200).send({
        success: 'true',
        message: 'SingleProduct retrieved successfully',
        findProduct
      })
    }
    return res.status(404).send({
      success: 'false',
      message: 'Product does not exist'
    })
  }
}


const productFunctions = new ProductFunctions();
export default productFunctions;
