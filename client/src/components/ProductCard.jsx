import { Link } from "react-router-dom";
import { formatPrice } from "../format.js";

export default function ProductCard({
  product,
  isCompared,
  onToggleComparison,
  onAddToCart
}) {
  return (
    <article className="product-card">
      <div className="product-art" aria-hidden="true">
        <span>{product.category === "אביזרים" ? "⌘" : "▱"}</span>
      </div>
      <div className="product-card-body">
        <p className="eyebrow">{product.category} <span>·</span> {product.brand}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span className="rating">★ {product.rating}</span>
          <span className="price">{formatPrice(product.price)}</span>
        </div>
        <div className="card-actions">
          <button className="button button-primary" onClick={() => onAddToCart(product.id)}>
            הוספה לעגלה
          </button>
          <button
            className={`button button-secondary${isCompared ? " is-selected" : ""}`}
            aria-pressed={isCompared}
            onClick={() => onToggleComparison(product.id)}
          >
            {isCompared ? "נבחר להשוואה" : "השוואה"}
          </button>
        </div>
        <Link className="text-link product-detail-link" to="/catalog">לצפייה בקטלוג</Link>
      </div>
    </article>
  );
}
