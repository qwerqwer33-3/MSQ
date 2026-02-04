"use client";

import { useState } from "react";
import members from "../../data/members.json";
import pubs from "../../data/publications.json";
import Card from "../../components/Card";
import { withBasePath } from "../../lib/basePath";

const sectionOrder = [
  { id: "postdoc", keys: ["Postdoc"], label: "Postdoctoral Researcher" },
  {
    id: "phd",
    keys: ["Ph.D.", "Integrated Ph.D."],
    label: "Ph.D. / Integrated Ph.D. Candidates"
  },
  { id: "masters", keys: ["Masters"], label: "M.S. Candidates" },
  { id: "undergrad", keys: ["Undergrad"], label: "Undergraduates" },
  { id: "alumni", keys: ["Alumni"], label: "Alumni" }
];

export default function MembersPage() {
  const [openDetails, setOpenDetails] = useState({});

  const grouped = sectionOrder.map((section) => ({
    ...section,
    members: members.filter((m) => section.keys.includes(m.category))
  }));

  return (
    <div>
      <section className="section">
        <div className="sectionHeader">
          <h1>Members</h1>
        </div>
      </section>

      {grouped.map((section) =>
        section.members.length ? (
          <section className="section" key={section.id}>
            <h2>{section.label}</h2>
            <div className="grid membersGrid membersGrid--twoCol">
              {section.members.map((m, idx) => {
                const detailsId = `${section.id}-${idx}`;
                const isOpen = Boolean(openDetails[detailsId]);
                const application = m.application || (m.research && m.research[0]);
                const methodology =
                  m.methodology || (m.research ? m.research.slice(1) : []);
                const hasMethodology = methodology && methodology.length > 0;
                const hasMoreDetails =
                  (m.education && m.education.length) ||
                  hasMethodology;
                const scholarUrl =
                  m.scholar_url || m.scholar || m.google_scholar || pubs.google_scholar_url;

                return (
                  <Card
                    key={m.name}
                  >
                    <div className="memberHeader">
                      <div className="cardTitle">
                        {m.name}
                        {m.titleBadge ? ` (${m.titleBadge})` : ""}
                      </div>
                      <div className="memberWebsite">
                        <a
                          className="memberScholarLink"
                          href={scholarUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open Google Scholar"
                          title="Open Google Scholar"
                        >
                          <span className="scholarBadge" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                              <path d="M12 4.6 3.2 8.7 12 12.8 20.8 8.7 12 4.6z" />
                              <path d="M6.1 12.1v3.4c0 1.2 2.7 2.2 5.9 2.2s5.9-1 5.9-2.2v-3.4l-5.9 2.9-5.9-2.9z" />
                            </svg>
                          </span>
                        </a>
                        {m.website ? (
                          <a
                            className="memberHomeLink"
                            href={m.website}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Open personal site"
                            title="Open personal site"
                          >
                            <span className="memberHomeBadge" aria-hidden="true">
                              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                                <path d="M12 4.2 3 11.6h2.6V20h4.8v-5.2h3.2V20h4.8v-8.4H21L12 4.2z" />
                              </svg>
                            </span>
                          </a>
                        ) : (
                          <span
                            className="memberHomeLink memberHomeLink--disabled"
                            aria-label="Personal site not available"
                            title="Personal site not available"
                          >
                            <span className="memberHomeBadge" aria-hidden="true">
                              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                                <path d="M12 4.2 3 11.6h2.6V20h4.8v-5.2h3.2V20h4.8v-8.4H21L12 4.2z" />
                              </svg>
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="memberCardContent memberCardContent--details">
                      <div className="memberPhoto">
                        <img src={withBasePath(m.photo)} alt={m.name} />
                      </div>
                      <div className="memberInfo">
                        <ul className="memberSummaryList">
                          {m.category !== "Alumni" && m.role ? <li>{m.role}</li> : null}
                          {application ? <li>{application}</li> : null}
                          {m.email ? (
                            <li className="memberEmailInline">
                              <a href={`mailto:${m.email}`}>{m.email}</a>
                            </li>
                          ) : null}
                          {m.currentAffiliation ? (
                            <li>Current: {m.currentAffiliation}</li>
                          ) : null}
                        </ul>
                        {hasMoreDetails ? (
                          <button
                            type="button"
                            className="memberDetailsButton"
                            aria-expanded={isOpen}
                            aria-controls={`${detailsId}-details`}
                            onClick={() =>
                              setOpenDetails((prev) => ({
                                ...prev,
                                [detailsId]: !prev[detailsId]
                              }))
                            }
                          >
                            More details
                          </button>
                        ) : null}
                      </div>
                      {hasMoreDetails && isOpen ? (
                        <div
                          id={`${detailsId}-details`}
                          className="memberDetailsRow"
                          role="region"
                          aria-label={`${m.name} details`}
                        >
                          <div className="memberDetailStack">
                            {m.education && (
                              <div className="memberDetailBlock">
                                <strong className="memberDetailLabel memberDetailLabel--emphasis">Education</strong>
                                <ul className="bioList">
                                  {m.education.map((entry) => {
                                    const [date, rest] = entry.split(": ");
                                    return (
                                      <li key={entry}>
                                        {rest ? (
                                          <>
                                            <span className="educationDate">{date}:</span>{" "}
                                            <span>{rest}</span>
                                          </>
                                        ) : (
                                          entry
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                            {hasMethodology ? (
                              <div className="memberDetailBlock">
                                <strong className="memberDetailLabel memberDetailLabel--emphasis">Methodology</strong>
                                <ul className="researchDetailList">
                                  {methodology.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
