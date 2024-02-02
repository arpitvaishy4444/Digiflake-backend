const express = require("express");

const router = express.Router();
const {createProduct, getAllProducts, updateProduct, deleteProduct} = require("../Controllers/productController")

router.route("/product/new").post(createProduct);
router.route("/products").get(getAllProducts);
router.route("/product/:id").put(updateProduct)
.delete(deleteProduct);


module.exports = router;