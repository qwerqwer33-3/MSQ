const newsItems = [
  {
    id: "2026-03-renewal",
    date: "2026-03-01",
    title: "Homepage Renewal",
    text: "MSQ Lab homepage was renewed in March 2026."
  }
];

function formatDate(date) {
  return date.replaceAll("-", ".");
}

export default function NewsPage() {
  return (
    <div>
      <section className="section">
        <h1>News</h1>
      </section>

      <section className="section newsSection">
        <div className="card newsSimple">
          {newsItems.map((item) => (
            <article key={item.id} className="newsSimpleItem">
              <p className="newsSimpleHead">
                <span className="newsSimpleDate">{formatDate(item.date)}</span>
                <span className="newsSimpleTitle">{item.title}</span>
              </p>
              <p className="newsSimpleText">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
