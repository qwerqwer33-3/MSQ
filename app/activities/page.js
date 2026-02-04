import activities from "../../data/activities.json";
import Card from "../../components/Card";
import { withBasePath } from "../../lib/basePath";

export default function ActivitiesPage() {
  const sorted = [...activities].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div>
      <section className="section">
        <h1>Activities</h1>
      </section>

      <section className="section">
        <div className="grid">
          {sorted.map((e) => (
            <Card
              key={`${e.date}-${e.title}`}
              title={`${e.date} · ${e.title}`}
              meta={e.description}
            >
              <div style={{ marginTop: 10 }}>
                <img
                  src={withBasePath(e.image)}
                  alt={e.title}
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 12,
                    border: "1px solid var(--border)"
                  }}
                />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
