const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const cors = require("cors");
const express = require("express");
const categoryRoutes = require("./route/category");
const productRoutes = require("./route/product");
const prisma = require("./lib/prisma");

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api", productRoutes);

app.get("/api/health", async (_request, response, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return response.json({ status: "ok", database: "connected" });
  } catch (error) {
    return next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error("שגיאה בטיפול בבקשת API:", error);
  return response.status(500).json({ error: "אירעה שגיאה פנימית בשרת." });
});

async function startServer() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL חסר. יש להגדיר אותו בקובץ server/.env.");
  }

  await prisma.$connect();

  const server = app.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });

  async function shutdown() {
    server.close(async (error) => {
      if (error) {
        console.error("סגירת שרת ה־API נכשלה:", error);
        process.exitCode = 1;
      }

      await prisma.$disconnect();
    });
  }

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

startServer().catch(async (error) => {
  console.error("הפעלת שרת ה־API נכשלה. יש לבדוק את חיבור MySQL ואת DATABASE_URL:", error);
  await prisma.$disconnect();
  process.exitCode = 1;
});
