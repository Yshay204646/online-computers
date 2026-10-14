const prisma = require("../lib/prisma");

function serializeProduct(product) {
  return {
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
    category: product.category.name
  };
}

async function getProducts(_request, response) {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { createdAt: "asc" }
  });

  return response.json(products.map(serializeProduct));
}

async function getProductById(request, response) {
  const product = await prisma.product.findFirst({
    where: { id: request.params.id, isActive: true },
    include: { category: true }
  });

  if (!product) {
    return response.status(404).json({ error: "המוצר לא נמצא." });
  }

  return response.json(serializeProduct(product));
}

async function compareProducts(request, response) {
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
  if (uniqueIds.length < 2) {
    return response.status(400).json({
      error: "יש לבחור לפחות שני מוצרים שונים להשוואה."
    });
  }

  const foundProducts = await prisma.product.findMany({
    where: { id: { in: uniqueIds }, isActive: true },
    include: { category: true }
  });

  if (foundProducts.length !== uniqueIds.length) {
    return response.status(404).json({ error: "אחד או יותר מהמוצרים שנבחרו לא נמצאו." });
  }

  const productsById = new Map(foundProducts.map((product) => [product.id, product]));
  return response.json(uniqueIds.map((id) => serializeProduct(productsById.get(id))));
}

module.exports = { getProducts, getProductById, compareProducts };
