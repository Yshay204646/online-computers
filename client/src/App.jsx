import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getProducts } from "./api.js";
import Layout from "./components/Layout.jsx";
import Cart from "./pages/Cart.jsx";
import Catalog from "./pages/Catalog.jsx";
import Compare from "./pages/Compare.jsx";
import Home from "./pages/Home.jsx";
import InformationPage from "./pages/InformationPage.jsx";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [comparisonIds, setComparisonIds] = useState([]);
  const [cartIds, setCartIds] = useState([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((error) => setLoadError(error.message))
      .finally(() => setLoading(false));
  }, []);

  function toggleComparison(productId) {
    setComparisonIds((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId);
      }
      if (current.length >= 4) {
        return current;
      }
      return [...current, productId];
    });
  }

  function addToCart(productId) {
    setCartIds((current) => (current.includes(productId) ? current : [...current, productId]));
  }

  function removeFromCart(productId) {
    setCartIds((current) => current.filter((id) => id !== productId));
  }

  return (
    <Layout cartCount={cartIds.length} comparisonCount={comparisonIds.length}>
      {loadError ? (
        <main className="page-container">
          <p className="notice notice-error" role="alert">{loadError}</p>
        </main>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products.slice(0, 3)}
                loading={loading}
                comparisonIds={comparisonIds}
                onToggleComparison={toggleComparison}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/catalog"
            element={
              <Catalog
                products={products}
                loading={loading}
                comparisonIds={comparisonIds}
                onToggleComparison={toggleComparison}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/compare"
            element={
              <Compare
                products={products}
                comparisonIds={comparisonIds}
                onToggleComparison={toggleComparison}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                products={products}
                cartIds={cartIds}
                onRemove={removeFromCart}
              />
            }
          />
          <Route
            path="/support"
            element={
              <InformationPage
                eyebrow="אנחנו כאן לעזור"
                title="שירות לקוחות"
                description="צוות שירות הלקוחות שלנו ישמח לעזור. אפשר לפנות אלינו דרך עמוד צור קשר."
              />
            }
          />
          <Route
            path="/login"
            element={
              <InformationPage
                eyebrow="ברוכים השבים"
                title="כניסה לחשבון"
                description="התחברות לחשבון עדיין אינה זמינה. אפשר להמשיך בינתיים ולגלוש בקטלוג המוצרים."
              />
            }
          />
          <Route
            path="/register"
            element={
              <InformationPage
                eyebrow="מצטרפים אלינו"
                title="הרשמה"
                description="פתיחת חשבון עדיין אינה זמינה. אפשר להמשיך בינתיים ולגלוש בקטלוג המוצרים."
              />
            }
          />
          <Route
            path="/about"
            element={
              <InformationPage
                eyebrow="נעים להכיר"
                title="אודותנו"
                description="מחשבים אונליין היא חנות למחשבים ולאביזרי מחשוב לעבודה, ללימודים ולשעות הפנאי."
              />
            }
          />
          <Route
            path="/contact"
            element={
              <InformationPage
                eyebrow="נשמח לשמוע מכם"
                title="צור קשר"
                description="פרטי יצירת קשר יפורסמו כאן בקרוב. בינתיים אפשר להיעזר בעמוד שירות הלקוחות."
              />
            }
          />
          <Route path="*" element={<main className="page-container page-content"><h1>העמוד לא נמצא</h1><p>העמוד שחיפשת אינו קיים.</p></main>} />
        </Routes>
      )}
    </Layout>
  );
}
