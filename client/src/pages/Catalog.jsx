import ProductCard from "../components/ProductCard.jsx";

export default function Catalog({
  products,
  loading,
  comparisonIds,
  onToggleComparison,
  onAddToCart
}) {
  return (
    <main className="page-container page-content">
      <div className="page-heading">
        <div><p className="eyebrow">מבחר המוצרים שלנו</p><h1>מוצרים</h1></div>
        <p className="muted">גלו את מגוון המחשבים והאביזרים שלנו לכל יום.</p>
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
    </main>
  );
}
