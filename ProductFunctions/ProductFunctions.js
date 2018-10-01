let products = require("../articles");




class Product {

  getAllProducts(req, res) {
    let paginationArray = [];
    let skip = req.query.skip || 0;
    let limit = req.query.limit || products.length;
    for(let i = skip; i <= limit; i++) {
      products.map(product => {
        if(i == product.id) {
          return paginationArray.push(product)
        }
      })
    }
      return res.status(200).send({
        success: 'true',
        message: 'Products retrieved successfully',
        products: paginationArray
      })
  }

  getSingleProduct(req, res) {
    const id = req.params.id;
    let findProduct = products.find(product => {
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


const product = new Product();
export default product;
