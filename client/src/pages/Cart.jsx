import { Link } from "react-router-dom";
import { formatPrice } from "../format.js";

export default function Cart({ products, cartIds, onRemove }) {
  const cartProducts = cartIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);
  const total = cartProducts.reduce((sum, product) => sum + product.price, 0);

  return (
    <main className="page-container page-content">
      <div className="page-heading">
        <div><p className="eyebrow">הבחירות שלכם מחכות לכם</p><h1>עגלת הקניות</h1></div>
        <p className="muted">{cartProducts.length === 1 ? "מוצר אחד" : `${cartProducts.length} מוצרים`}</p>
      </div>
      {cartProducts.length === 0 ? (
        <section className="empty-state">
          <div className="empty-icon" aria-hidden="true">⌑</div>
          <h2>עגלת הקניות ריקה</h2>
          <p>מצאו את המוצר הבא שלכם והוא יופיע כאן.</p>
          <Link className="button button-primary" to="/catalog">למעבר למוצרים</Link>
        </section>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartProducts.map((product) => (
              <article className="cart-item" key={product.id}>
                <div className="cart-item-art" aria-hidden="true">▱</div>
                <div className="cart-item-info">
                  <p className="eyebrow">{product.category}</p>
                  <h2>{product.name}</h2>
                  <button className="remove-link" onClick={() => onRemove(product.id)}>הסרה מהעגלה</button>
                </div>
                <strong>{formatPrice(product.price)}</strong>
              </article>
            ))}
          </div>
          <aside className="cart-summary">
            <h2>סיכום ההזמנה</h2>
            <div className="summary-row"><span>סכום ביניים</span><span>{formatPrice(total)}</span></div>
            <div className="summary-row"><span>משלוח</span><span className="free-shipping">חינם</span></div>
            <div className="summary-row summary-total"><strong>סה״כ לתשלום</strong><strong>{formatPrice(total)}</strong></div>
            <button className="button button-primary checkout-button" onClick={() => window.alert("אפשרות התשלום עדיין אינה זמינה.")}>
              מעבר לתשלום
            </button>
            <p className="muted summary-note">התשלום אינו זמין כרגע.</p>
          </aside>
        </div>
      )}
    </main>
  );
}
