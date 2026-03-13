import research from "../../data/research.json";
import Link from "next/link";
import { withBasePath } from "../../lib/basePath";

export default function ResearchPage() {
  return (
    <div>
      <section className="section">
        <h1>Topics</h1>
      </section>

      <section className="section">
        <div className="researchTopics">
          {research.map((topic, index) => (
            <Link
              className="researchTopic researchTopicLink"
              key={topic.title}
              href={`/research/${topic.slug}`}
            >
              <div className="researchTopicImage">
                <img
                  src={withBasePath(topic.image)}
                  alt={topic.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
              <div className="researchTopicContent">
                <h2 className="researchTopicTitle">{topic.title}</h2>
                <p className="researchTopicBody">{topic.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
