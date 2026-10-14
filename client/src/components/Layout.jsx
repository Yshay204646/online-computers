import { NavLink } from "react-router-dom";

export default function Layout({ cartCount, comparisonCount, children }) {
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <NavLink className="brand" to="/" aria-label="מחשבים אונליין - דף הבית">
            <span className="brand-mark" aria-hidden="true">מו</span>
            <span>מחשבים<span className="brand-light"> אונליין</span></span>
          </NavLink>
          <nav className="main-nav" aria-label="ניווט ראשי" dir="rtl">
            <NavLink to="/" end>בית</NavLink>
            <NavLink to="/catalog">מוצרים</NavLink>
            <NavLink to="/support">שירות לקוחות</NavLink>
            <NavLink to="/login">כניסה</NavLink>
            <NavLink to="/register">הרשמה</NavLink>
            <NavLink to="/about">אודותנו</NavLink>
            <NavLink to="/contact">צור קשר</NavLink>
            <NavLink to="/compare" aria-label={`השוואת מוצרים, ${comparisonCount} פריטים`}>
              השוואה <span className="nav-count">{comparisonCount}</span>
            </NavLink>
            <NavLink to="/cart" aria-label={`עגלת קניות, ${cartCount} פריטים`}>
              עגלה <span className="nav-count">{cartCount}</span>
            </NavLink>
          </nav>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="page-container">מחשבים אונליין <span>·</span> הטכנולוגיה שלך, לכל יום</div>
      </footer>
    </>
  );
}
