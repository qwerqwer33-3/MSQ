import pi from "../../data/pi.json";
import Card from "../../components/Card";

export default function ContactPage() {
  return (
    <div className="contactPage">
      <section className="section">
        <div className="piCardWrapper">
          <h1 className="cardTitle">Contact</h1>
        </div>
      </section>

      <section className="section">
        <div className="grid">
          <div className="piCardWrapper">
            <Card
              title="General inquiries"
              meta="Email for collaboration, recruitment, or general questions."
              badges={["email", "collaboration"]}
            >
              <div className="cardMeta">
                <div><strong>Email:</strong> {pi.email}</div>
                <div><strong>Affiliation:</strong> {pi.affiliation}</div>
              </div>
            </Card>
          </div>

          <div className="piCardWrapper">
            <Card
              title="Directions"
              meta="Visit the Seogwan Building office when you?™re on campus."
              badges={["location"]}
            >
              <div className="cardMeta">
                <div><strong>Office:</strong> {pi.office}</div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
