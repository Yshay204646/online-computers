const cors = require("cors");
const express = require("express");
const categoryRoutes = require("./route/category");
const productRoutes = require("./route/product");

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api", productRoutes);

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
