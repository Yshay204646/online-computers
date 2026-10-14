const express = require("express");
const { getCategories, getCategoryById } = require("../controller/category");
const asyncHandler = require("../lib/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(getCategories));
router.get("/:id", asyncHandler(getCategoryById));

module.exports = router;
