import research from "../../../data/research.json";
import { notFound } from "next/navigation";
import { withBasePath } from "../../../lib/basePath";

export const dynamicParams = false;

export function generateStaticParams() {
  return research.map((topic) => ({ slug: topic.slug }));
}

export function generateMetadata({ params }) {
  const topic = research.find((item) => item.slug === params.slug);
  if (!topic) {
    return { title: "Research | MSQ Lab" };
  }
  return { title: `${topic.title} | MSQ Lab` };
}

export default function ResearchDetailPage({ params }) {
  const topic = research.find((item) => item.slug === params.slug);
  if (!topic) {
    return notFound();
  }

  return (
    <div>
      <section className="section">
        <div className="sectionHeader">
          <p className="sectionDescription">
            <a className="researchBackLink" href={withBasePath("/research")}>
              {"\u2190 Back to Topics"}
            </a>
          </p>
          <h1>{topic.title}</h1>
          <p className="sectionDescription">{topic.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="researchDetailGrid">
          <div className="researchTopicImage">
            <img src={withBasePath(topic.image)} alt={topic.title} />
          </div>
          <div className="researchDetailCard">
            <h2>Details</h2>
            <p className="sectionDescription">
              Details coming soon. This page is a placeholder for objectives, methods, key results,
              and related publications.
            </p>
            <ul className="researchDetailList">
              <li>Overview and scope</li>
              <li>Methods and workflows</li>
              <li>Representative results</li>
              <li>Publications and datasets</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

