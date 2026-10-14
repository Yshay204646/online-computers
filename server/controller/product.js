const products = require("../data/product.json");

function getProducts(_request, response) {
  return response.json(products);
}

function getProductById(request, response) {
  const product = products.find((item) => item.id === request.params.id);

  if (!product) {
    return response.status(404).json({ error: "המוצר לא נמצא." });
  }

  return response.json(product);
}

function compareProducts(request, response) {
  const { productIds } = request.body ?? {};

  if (
    !Array.isArray(productIds) ||
    productIds.length < 2 ||
    productIds.length > 4 ||
    productIds.some((id) => typeof id !== "string")
  ) {
    return response.status(400).json({
      error: "יש לבחור בין שניים לארבעה מוצרים להשוואה."
    });
  }

  const uniqueIds = [...new Set(productIds)];
  const selectedProducts = uniqueIds.map((id) => products.find((item) => item.id === id));

  if (selectedProducts.some((product) => !product)) {
    return response.status(404).json({ error: "אחד או יותר מהמוצרים שנבחרו לא נמצאו." });
  }

  return response.json(selectedProducts);
}

module.exports = { getProducts, getProductById, compareProducts };
