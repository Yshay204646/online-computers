export default function InformationPage({ eyebrow, title, description }) {
  return (
    <main className="page-container page-content">
      <section className="information-page">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="muted">{description}</p>
      </section>
    </main>
  );
}
