const prisma = require("../lib/prisma");

async function getCategories(_request, response) {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" }
  });

  return response.json(categories);
}

async function getCategoryById(request, response) {
  const category = await prisma.category.findUnique({
    where: { id: request.params.id }
  });

  if (!category) {
    return response.status(404).json({ error: "הקטגוריה לא נמצאה." });
  }

  return response.json(category);
}

module.exports = { getCategories, getCategoryById };
