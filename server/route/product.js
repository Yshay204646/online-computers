const express = require("express");
const {
  getProducts,
  getProductById,
  compareProducts
} = require("../controller/product");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/compare", compareProducts);

module.exports = router;
