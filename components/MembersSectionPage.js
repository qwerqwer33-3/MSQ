"use client";

import { useState } from "react";
import members from "../data/members.json";
import Card from "./Card";
import { withBasePath } from "../lib/basePath";

const currentSectionOrder = [
  { id: "postdoc", keys: ["Postdoc"], label: "Postdoctoral Researcher" },
  {
    id: "phd",
    keys: ["Ph.D.", "Integrated Ph.D."],
    label: "Ph.D. / Integrated Ph.D. Candidates"
  },
  { id: "masters", keys: ["Masters"], label: "M.S. Candidates" },
  { id: "undergrad", keys: ["Undergrad"], label: "Undergraduates" }
];

const alumniSectionOrder = [
  { id: "alumni", keys: ["Alumni"], label: "Alumni" }
];

function renderHighlightedText(text, highlights) {
  const safeText = text || "";
  const safeHighlights = Array.isArray(highlights) ? highlights.filter(Boolean) : [];
  if (!safeHighlights.length) {
    return safeText;
  }

  const highlighted = [];
  let cursor = 0;
  let keyIndex = 0;
  const orderedHighlights = [...safeHighlights].sort(
    (a, b) => safeText.indexOf(a) - safeText.indexOf(b)
  );

  orderedHighlights.forEach((segment) => {
    const start = safeText.indexOf(segment, cursor);
    if (start === -1) {
      return;
    }
    if (start > cursor) {
      highlighted.push(
        <span key={`text-${keyIndex++}`}>
          {safeText.slice(cursor, start)}
        </span>
      );
    }
    highlighted.push(
      <span key={`strong-${keyIndex++}`} className="memberOutcomeHighlight">
        {segment}
      </span>
    );
    cursor = start + segment.length;
  });

  if (cursor < safeText.length) {
    highlighted.push(
      <span key={`text-${keyIndex++}`}>
        {safeText.slice(cursor)}
      </span>
    );
  }

  return highlighted;
}

function parseYearMonth(value) {
  if (!value || typeof value !== "string") {
    return null;
  }
  const matches = [...value.matchAll(/(\d{4})[.\-/](\d{1,2})(?:[.\-/](\d{1,2}))?/g)];
  if (!matches.length) {
    return null;
  }
  const last = matches[matches.length - 1];
  const year = Number(last[1]);
  const month = Number(last[2]);
  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return null;
  }
  return year * 100 + month;
}

function getAlumniSortValue(member) {
  const fromExplicit = parseYearMonth(member.alumniSince);
  if (fromExplicit !== null) {
    return fromExplicit;
  }

  if (!Array.isArray(member.education) || !member.education.length) {
    return null;
  }

  const derived = member.education
    .map((entry) => parseYearMonth(entry))
    .filter((value) => value !== null);

  if (!derived.length) {
    return null;
  }
  return Math.max(...derived);
}

function sortAlumniByRecent(list) {
  return [...list].sort((a, b) => {
    const aValue = getAlumniSortValue(a);
    const bValue = getAlumniSortValue(b);

    if (aValue !== null && bValue === null) {
      return -1;
    }
    if (aValue === null && bValue !== null) {
      return 1;
    }
    if (aValue === bValue) {
      return b._sourceIndex - a._sourceIndex;
    }
    return bValue - aValue;
  });
}

export default function MembersSectionPage({ view = "current" }) {
  const [openDetails, setOpenDetails] = useState({});
  const indexedMembers = members.map((member, index) => ({
    ...member,
    _sourceIndex: index
  }));
  const isAlumniView = view === "alumni";
  const pageTitle = isAlumniView ? "Alumni" : "Current Members";
  const sectionOrder = isAlumniView ? alumniSectionOrder : currentSectionOrder;

  const grouped = sectionOrder.map((section) => {
    const filtered = indexedMembers.filter((member) => section.keys.includes(member.category));
    return {
      ...section,
      members: section.id === "alumni" ? sortAlumniByRecent(filtered) : filtered
    };
  });

  return (
    <div>
      <section className="section">
        <div className="sectionHeader">
          <h1>{pageTitle}</h1>
          <div className="publicationFilter">
            <a
              href={withBasePath("/members/current")}
              className={`publicationFilterButton ${!isAlumniView ? "isActive" : ""}`}
            >
              Current Members
            </a>
            <a
              href={withBasePath("/members/alumni")}
              className={`publicationFilterButton ${isAlumniView ? "isActive" : ""}`}
            >
              Alumni
            </a>
          </div>
        </div>
      </section>

      {grouped.map((section) =>
        section.members.length ? (
          <section className="section" key={section.id}>
            {!isAlumniView ? <h2>{section.label}</h2> : null}
            <div className="grid membersGrid membersGrid--twoCol">
              {section.members.map((m, idx) => {
                const detailsId = `${section.id}-${idx}`;
                const isOpen = Boolean(openDetails[detailsId]);
                const application = m.application || (m.research && m.research[0]);
                const summaryTags = m.summaryTags && m.summaryTags.length ? m.summaryTags : null;
                const applicationItems =
                  m.applicationDetails && m.applicationDetails.length
                    ? m.applicationDetails
                    : null;
                const hasApplicationDetails = Boolean(applicationItems);
                const outcomes = m.outcomes && m.outcomes.length ? m.outcomes : null;
                const hasOutcomes = Boolean(outcomes);
                const hasMoreDetails =
                  (m.education && m.education.length) ||
                  hasApplicationDetails ||
                  hasOutcomes;
                const scholarUrl = m.scholar_url || m.scholar || m.google_scholar;

                return (
                  <Card key={m.name}>
                    <div className="memberHeader">
                      <div className="cardTitle">
                        {m.name}
                        {m.titleBadge ? ` (${m.titleBadge})` : ""}
                      </div>
                      <div className="memberWebsite">
                        {scholarUrl ? (
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
                        ) : (
                          <span
                            className="memberScholarLink memberScholarLink--disabled"
                            aria-label="Google Scholar not available"
                            title="Google Scholar not available"
                          >
                            <span className="scholarBadge" aria-hidden="true">
                              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                                <path d="M12 4.6 3.2 8.7 12 12.8 20.8 8.7 12 4.6z" />
                                <path d="M6.1 12.1v3.4c0 1.2 2.7 2.2 5.9 2.2s5.9-1 5.9-2.2v-3.4l-5.9 2.9-5.9-2.9z" />
                              </svg>
                            </span>
                          </span>
                        )}
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
                          {summaryTags
                            ? summaryTags.map((tag) => <li key={tag}>{tag}</li>)
                            : application
                              ? <li>{application}</li>
                              : null}
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
                                <strong className="memberDetailLabel memberDetailLabel--emphasis">
                                  Education
                                </strong>
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
                            {hasApplicationDetails ? (
                              <div className="memberDetailBlock">
                                <strong className="memberDetailLabel memberDetailLabel--emphasis">
                                  {m.applicationLabel || "Research Interests"}
                                </strong>
                                <ul className="researchDetailList">
                                  {applicationItems.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                            {hasOutcomes ? (
                              <div className="memberDetailBlock">
                                <strong className="memberDetailLabel memberDetailLabel--emphasis">
                                  {m.outcomesLabel || "Outcomes"}
                                </strong>
                                <ul className="researchDetailList">
                                  {outcomes.map((item) => {
                                    if (typeof item === "string") {
                                      return <li key={item}>{item}</li>;
                                    }
                                    if (item && item.title) {
                                      const key = `${item.title}-${item.url || ""}`;
                                      return (
                                        <li key={key}>
                                          {item.url ? (
                                            <a
                                              href={item.url}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="memberOutcomeLink"
                                            >
                                              {item.title}
                                            </a>
                                          ) : (
                                            <span>{item.title}</span>
                                          )}
                                          {item.detail ? (
                                            <span className="memberOutcomeDetail">
                                              , {renderHighlightedText(item.detail, item.highlights)}
                                            </span>
                                          ) : null}
                                        </li>
                                      );
                                    }
                                    const text = item.text || "";
                                    const highlights = Array.isArray(item.highlights)
                                      ? item.highlights.filter(Boolean)
                                      : [];
                                    return <li key={text}>{renderHighlightedText(text, highlights)}</li>;
                                  })}
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
