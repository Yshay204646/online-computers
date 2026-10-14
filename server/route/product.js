const express = require("express");
const {
  getProducts,
  getProductById,
  compareProducts
} = require("../controller/product");
const asyncHandler = require("../lib/asyncHandler");

const router = express.Router();

router.get("/products", asyncHandler(getProducts));
router.get("/products/:id", asyncHandler(getProductById));
router.post("/compare", asyncHandler(compareProducts));

module.exports = router;
