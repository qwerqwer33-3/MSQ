import pi from "../../data/pi.json";
import Card from "../../components/Card";
import { withBasePath } from "../../lib/basePath";

function isEducationEntry(entry) {
  return /B\.S\.|M\.S\.|Ph\.D\.|PhD|Master|Bachelor|Doctor/i.test(entry);
}

function splitTimeline(entry) {
  const parts = entry.split(" - ");
  if (parts.length === 1) {
    return { date: "", text: entry };
  }
  if (parts.length === 2) {
    return { date: parts[0], text: parts[1] };
  }
  return {
    date: `${parts[0]} - ${parts[1]}`,
    text: parts.slice(2).join(" - ")
  };
}

export default function PIPage() {
  const educationEntries = pi.education.filter(isEducationEntry);
  const professionalEntries = pi.education.filter((entry) => !isEducationEntry(entry));
  const signatureLeadIndex = pi.message ? pi.message.length - 2 : -1;
  const signatureNameIndex = pi.message ? pi.message.length - 1 : -1;

  const renderWithBold = (text) => {
    const parts = text.split("**");
    if (parts.length === 1) {
      return text;
    }
    return parts.map((part, index) =>
      index % 2 === 1 ? <strong key={`${part}-${index}`}>{part}</strong> : part
    );
  };

  return (
    <div>
      <section className="section">
        <h1>Principal Investigator</h1>
      </section>

      <section className="section">
        <div className="grid">
          <div className="piCardWrapper">
            <Card>
              <div className="piHeader">
                <div className="piPhoto">
                  <img src={withBasePath(pi.photo)} alt={pi.name} />
                </div>
                <div className="piHeaderInfo">
                  <h2 className="piName">{pi.name}</h2>
                  <div className="piTitleRole">{pi.title}</div>
                  <div className="piTitleAffiliation">{pi.affiliation}</div>
                  <div className="piContactBlock">
                    <div className="piSectionTitle">Contact Info</div>
                    <div className="piContactLine">
                      <span className="piContactLabel">Email</span>
                      <span>
                        <a href={`mailto:${pi.email}`}>{pi.email}</a>
                      </span>
                    </div>
                    <div className="piContactLine">
                      <span className="piContactLabel">Office</span>
                      <span>{pi.office}</span>
                    </div>
                    {pi.phone ? (
                      <div className="piContactLine">
                        <span className="piContactLabel">Tel</span>
                        <span>{pi.phone}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {pi.bio ? <p className="lead piBio">{pi.bio}</p> : null}
              <div className="piSectionStack">
                <div className="piSection">
                  <div className="piSectionTitle">Professional Experience</div>
                  <ul className="piTimeline">
                    {professionalEntries.map((entry) => {
                      const { date, text } = splitTimeline(entry);
                      return (
                        <li className="piTimelineItem" key={entry}>
                          <span className="piTimelineDate">{date}</span>
                          <span className="piTimelineText">{text || entry}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="piSection">
                  <div className="piSectionTitle">Education</div>
                  <ul className="piTimeline">
                    {educationEntries.map((entry) => {
                      const { date, text } = splitTimeline(entry);
                      return (
                        <li className="piTimelineItem" key={entry}>
                          <span className="piTimelineDate">{date}</span>
                          <span className="piTimelineText">{text || entry}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="piSection">
                  <div className="piSectionTitle">Awards</div>
                  <ul className="piAwardsList">
                    {pi.awards.map((entry) => {
                      const { date, text } = splitTimeline(entry);
                      const awardDate = date || "";
                      const awardText = text || entry;
                      return (
                        <li className="piAwardsItem" key={entry}>
                          <span className="piAwardsDate">{awardDate}</span>
                          <span className="piAwardsText">{awardText}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {pi.message && pi.message.length ? (
          <div className="piMessage">
            {pi.message.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === signatureLeadIndex
                    ? "piSignatureLead"
                    : index === signatureNameIndex
                      ? "piSignatureName"
                      : undefined
                }
              >
                {renderWithBold(paragraph)}
              </p>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
