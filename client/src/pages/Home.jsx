import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";

export default function Home({
  products,
  loading,
  comparisonIds,
  onToggleComparison,
  onAddToCart
}) {
  return (
    <main>
      <section className="hero">
        <div className="page-container hero-content">
          <p className="eyebrow hero-eyebrow">הטכנולוגיה שמתאימה בדיוק לך</p>
          <h1>הכירו את<br /><span>העמדה הבאה שלכם.</span></h1>
          <p className="hero-copy">מחשבים ואביזרים שנבחרו בקפידה לעבודה, ללימודים, לבילוי ולכל מה שביניהם.</p>
          <Link className="button button-primary hero-button" to="/catalog">לכל המוצרים <span aria-hidden="true">←</span></Link>
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="hero-device" aria-hidden="true"><div className="device-screen" /><div className="device-base" /></div>
        </div>
      </section>
      <section className="page-container featured-section">
        <div className="section-heading">
          <div><p className="eyebrow">נבחרו במיוחד בשבילכם</p><h2>מוצרים מומלצים</h2></div>
          <Link className="text-link" to="/catalog">לכל המוצרים <span aria-hidden="true">←</span></Link>
        </div>
        {loading ? <p className="muted">המוצרים נטענים…</p> : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isCompared={comparisonIds.includes(product.id)}
                onToggleComparison={onToggleComparison}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
