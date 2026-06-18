const newsItems = [
  {
    id: "2026-09-renewal",
    date: "2026-09-01",
    sortOrder: 0,
    title: "Homepage Renewal",
    text: "MSQ Lab homepage was renewed in September 2026."
  },
  {
    id: "2026-09-sungkyunkwan",
    date: "2026-09-01",
    sortOrder: 10,
    title: "A New Chapter at Sungkyunkwan University",
    text: "A new chapter begins: M-Square Laboratory takes off at Sungkyunkwan University. The journey has just begun."
  }
];

const sortedNewsItems = [...newsItems].sort((a, b) => {
  const dateOrder = b.date.localeCompare(a.date);
  if (dateOrder !== 0) return dateOrder;
  return (a.sortOrder ?? 50) - (b.sortOrder ?? 50);
});

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
        <div className="newsCardList">
          {sortedNewsItems.map((item) => (
            <article key={item.id} className="card newsSimpleItem newsSimpleCard">
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
