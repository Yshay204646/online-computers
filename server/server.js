const cors = require("cors");
const express = require("express");

const app = express();
const port = Number(process.env.PORT) || 5000;

const products = [
  {
    id: "laptop-pro-14",
    name: "פרובוק 14",
    category: "מחשבים ניידים",
    price: 5299,
    brand: "נובה",
    rating: 4.8,
    description: "מחשב נייד וקל לעבודה, ללימודים וליצירה.",
    specs: { processor: "Core i7", memory: "16 ג״ב", storage: "512 ג״ב SSD", screen: "14 אינץ׳" }
  },
  {
    id: "laptop-air-15",
    name: "איירבוק 15",
    category: "מחשבים ניידים",
    price: 4299,
    brand: "נובה",
    rating: 4.6,
    description: "מחשב נייד דק לשימוש יומיומי, עם מסך גדול ובהיר.",
    specs: { processor: "Core i5", memory: "16 ג״ב", storage: "512 ג״ב SSD", screen: "15.6 אינץ׳" }
  },
  {
    id: "desktop-studio",
    name: "מחשב שולחני סטודיו",
    category: "מחשבים שולחניים",
    price: 6499,
    brand: "ורטקס",
    rating: 4.7,
    description: "תחנת עבודה שולחנית חזקה למשימות תובעניות.",
    specs: { processor: "Ryzen 7", memory: "32 ג״ב", storage: "1 טרה־בייט SSD", screen: "לא כלול" }
  },
  {
    id: "monitor-ultra-27",
    name: "אולטרה־ויו 27",
    category: "מסכים",
    price: 1599,
    brand: "ויוופוינט",
    rating: 4.5,
    description: "מסך חד בגודל 27 אינץ׳ לעבודה ולבידור.",
    specs: { processor: "4K UHD", memory: "60 הרץ", storage: "פאנל IPS", screen: "27 אינץ׳" }
  },
  {
    id: "keyboard-mech",
    name: "מקלדת מכנית",
    category: "אביזרים",
    price: 399,
    brand: "קייוורקס",
    rating: 4.4,
    description: "מקלדת מכנית נוחה עם מקשים מהירים ומדויקים.",
    specs: { processor: "מכנית", memory: "87 מקשים", storage: "USB-C", screen: "לא רלוונטי" }
  },
  {
    id: "mouse-wireless",
    name: "עכבר אלחוטי מדויק",
    category: "אביזרים",
    price: 249,
    brand: "קייוורקס",
    rating: 4.3,
    description: "עכבר אלחוטי אמין עם רמת דיוק מתכווננת.",
    specs: { processor: "אופטי", memory: "1600 DPI", storage: "Bluetooth", screen: "לא רלוונטי" }
  }
];

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/products", (_request, response) => {
  response.json(products);
});

app.get("/api/products/:id", (request, response) => {
  const product = products.find((item) => item.id === request.params.id);

  if (!product) {
    return response.status(404).json({ error: "המוצר לא נמצא." });
  }

  return response.json(product);
});

app.post("/api/compare", (request, response) => {
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
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
