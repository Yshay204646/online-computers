import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { compareProducts } from "../api.js";
import { formatPrice } from "../format.js";

const comparisonRows = [
  ["קטגוריה", (product) => product.category],
  ["מותג", (product) => product.brand],
  ["מחיר", (product) => formatPrice(product.price)],
  ["דירוג", (product) => `${product.rating} ★`],
  ["מעבד", (product) => product.specs.processor],
  ["זיכרון", (product) => product.specs.memory],
  ["אחסון", (product) => product.specs.storage],
  ["מסך", (product) => product.specs.screen]
];

export default function Compare({ products, comparisonIds, onToggleComparison }) {
  const [comparedProducts, setComparedProducts] = useState([]);
  const [error, setError] = useState("");
  const selectedIds = comparisonIds.slice(0, 4);

  useEffect(() => {
    let active = true;
    setError("");
    setComparedProducts([]);

    if (selectedIds.length < 2) {
      return () => { active = false; };
    }

    compareProducts(selectedIds)
      .then((result) => {
        if (active) setComparedProducts(result);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => { active = false; };
  }, [selectedIds.join("|")]);

  return (
    <main className="page-container page-content">
      <div className="page-heading">
        <div><p className="eyebrow">בוחרים את המוצר המתאים</p><h1>השוואת מוצרים</h1></div>
        <p className="muted">בחרו עד ארבעה מוצרים מהקטלוג והשוו בין המפרטים שלהם.</p>
      </div>
      {error && <p className="notice notice-error" role="alert">{error}</p>}
      {selectedIds.length < 2 ? (
        <section className="empty-state">
          <div className="empty-icon" aria-hidden="true">⇄</div>
          <h2>הוסיפו מוצרים להשוואה</h2>
          <p>בחרו לפחות שני מוצרים מהקטלוג כדי להשוות ביניהם ולראות את המפרט של כל אחד.</p>
          <Link className="button button-primary" to="/catalog">מעבר למוצרים</Link>
          {selectedIds.length === 1 && (
            <p className="muted selected-hint">
              נבחר: {products.find((product) => product.id === selectedIds[0])?.name}
            </p>
          )}
        </section>
      ) : comparedProducts.length === 0 && !error ? (
        <p className="muted">ההשוואה נטענת…</p>
      ) : comparedProducts.length > 0 ? (
        <div className="comparison-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">מאפיין</th>
                {comparedProducts.map((product) => (
                  <th scope="col" key={product.id}>
                    <span>{product.name}</span>
                    <button className="remove-link" onClick={() => onToggleComparison(product.id)}>
                      הסרה
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([label, getValue]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {comparedProducts.map((product) => <td key={product.id}>{getValue(product)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </main>
  );
}
