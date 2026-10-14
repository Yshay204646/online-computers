const categories = require("../data/category.json");

function getCategories(_request, response) {
  return response.json(categories);
}

function getCategoryById(request, response) {
  const category = categories.find((item) => item.id === request.params.id);

  if (!category) {
    return response.status(404).json({ error: "הקטגוריה לא נמצאה." });
  }

  return response.json(category);
}

module.exports = { getCategories, getCategoryById };
