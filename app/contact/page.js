import pi from "../../data/pi.json";

export default function ContactPage() {
  const mapEmbedUrl = "https://maps.google.com/maps?q=37.2826,127.0462&z=17&output=embed";

  return (
    <div className="contactPage contactLayout">
      <section className="section contactIntroSection">
        <h1>Contact</h1>
        <div className="contactIntroBox">
          <p className="contactIntroText">
            For recruitment, research collaboration, technical consulting, and joint projects,
            please contact us through the channel below.
          </p>
        </div>
      </section>

      <section className="section contactPrimarySection">
        <div className="contactPrimaryBox">
          <div className="contactPrimaryRow">
            <a href={`mailto:${pi.email}`}>{pi.email}</a>
            <span className="contactDivider">|</span>
            <span>{pi.phone}</span>
          </div>
        </div>
      </section>

      <section className="section contactMapSection">
        <div className="contactMapCenter">
          <div className="contactMapCard">
            <iframe
              title="MSQ Lab location map"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
