require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const categories = require("../data/category.json");
const products = require("../data/product.json");

const prisma = new PrismaClient();

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: { name: category.name },
      create: category
    });
  }

  const categoryIdsByName = new Map(categories.map(({ id, name }) => [name, id]));

  for (const product of products) {
    const categoryId = categoryIdsByName.get(product.category);

    if (!categoryId) {
      throw new Error(`קטגוריה לא מוגדרת עבור המוצר: ${product.name}`);
    }

    const productData = {
      name: product.name,
      description: product.description,
      brand: product.brand,
      price: product.price,
      rating: product.rating,
      specs: product.specs,
      categoryId
    };

    await prisma.product.upsert({
      where: { id: product.id },
      update: productData,
      create: { id: product.id, ...productData }
    });
  }
}

main()
  .catch((error) => {
    console.error("טעינת נתוני הפתיחה נכשלה:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
