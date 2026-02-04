import research from "../../data/research.json";
import { withBasePath } from "../../lib/basePath";

export default function ResearchPage() {
  return (
    <div>
      <section className="section">
        <h1>Topics</h1>
      </section>

      <section className="section">
        <div className="researchTopics">
          {research.map((topic) => (
            <a
              className="researchTopic researchTopicLink"
              key={topic.title}
              href={withBasePath(`/research/${topic.slug}`)}
            >
              <div className="researchTopicImage">
                <img src={withBasePath(topic.image)} alt={topic.title} />
              </div>
              <div className="researchTopicContent">
                <h2 className="researchTopicTitle">{topic.title}</h2>
                <p className="researchTopicBody">{topic.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
