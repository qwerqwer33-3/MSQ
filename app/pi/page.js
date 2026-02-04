import pi from "../../data/pi.json";
import Card from "../../components/Card";
import { withBasePath } from "../../lib/basePath";

export default function PIPage() {
  return (
    <div>
      <section className="section">
        <h1>Principal Investigator</h1>
      </section>

      <section className="section">
        <div className="grid">
          <div className="piCardWrapper">
            <Card title={pi.name} meta={`${pi.title} - ${pi.affiliation}`}>
              <div className="piProfileTop">
                <div className="piPhoto">
                  <img src={withBasePath(pi.photo)} alt={pi.name} />
                </div>
              </div>
              {pi.bio ? (
                <p className="lead piBio" style={{ marginTop: 12 }}>
                  {pi.bio}
                </p>
              ) : null}
              <div className="piListGroup">
                <div className="piContactBlock">
                  <strong>Contact</strong>
                  <ul className="bioList">
                    <li>
                      <span>Email: </span>
                      <span>{pi.email}</span>
                    </li>
                    <li>
                      <span>Office: </span>
                      <span>{pi.office}</span>
                    </li>
                  </ul>
                </div>
                <div className="piBiographyBlock">
                  <strong>Biography</strong>
                  <ul className="bioList">
                    {pi.education.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: 12 }}>
                  <strong>Awards</strong>
                  <ul className="bioList">
                    {pi.awards.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {pi.message && pi.message.length ? (
          <div className="piMessage">
            {pi.message.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
