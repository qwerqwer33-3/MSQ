"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "../lib/basePath";
import members from "../data/members.json";

const slides = [
  {
    title: "Battery Safety Modeling",
    description: "Thermo-electro-mechanical coupling for runaway prevention.",
    image: "/images/Home/Research_1.png"
  },
  {
    title: "Semiconductor Materials",
    description: "Atomic-scale modeling of oxide and dielectric stacks.",
    image: "/images/Home/Research_2.png"
  },
  {
    title: "AI-assisted Discovery",
    description: "Machine-learned potentials accelerate screening.",
    image: "/images/Home/Research_3.png"
  },
  {
    title: "Process & Manufacturing",
    description: "Simulation-guided electrode and device fabrication.",
    image: "/images/Home/Research_4.png"
  },
  {
    title: "Multiphysics Devices",
    description: "Coupled electro-thermal-mechanical device simulations.",
    image: "/images/Home/Research_5.png"
  },
  {
    title: "Energy Harvesting Systems",
    description: "Modeling low-power nodes from triboelectrics to thermoelectrics.",
    image: "/images/Home/Research_6.png"
  }
];

const focusGroups = [
  {
    key: "AI",
    label: "AI",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6.5" y="6.5" width="11" height="11" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M9 3.6v2.2M12 3.6v2.2M15 3.6v2.2M9 18.2v2.2M12 18.2v2.2M15 18.2v2.2M3.6 9h2.2M3.6 12h2.2M3.6 15h2.2M18.2 9h2.2M18.2 12h2.2M18.2 15h2.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
        <text x="12" y="14.1" textAnchor="middle" fontSize="4.8" fontWeight="700" fill="currentColor">AI</text>
      </svg>
    )
  },
  {
    key: "Multi-scale",
    label: "Multi-scale",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.3" y="5" width="17.4" height="3" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="5.2" y="10.5" width="13.6" height="3" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="7.1" y="16" width="9.8" height="3" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  },
  {
    key: "Nucleation",
    label: "Nucleation",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="7.5" ry="3.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="7.5" ry="3.4" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="7.5" ry="3.4" transform="rotate(-60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    )
  }
];

const memberOrder = [
  "Hyeon Woo Kim",
  "Han Uk Lee",
  "Min Sung Kang",
  "Dong Won Jeon",
  "Juhyun Ha",
  "Jeu Shin",
  "Jonghun Seo",
  "Junhyuk Kang",
  "Ji Hoon Hong",
  "Jimin Kim",
  "Jindong Hwang",
  "Jaeseok Hwang",
  "Seojun Moon",
  "Seongjun Kim",
  "Jaehwang Kim",
  "Jaeseon Yoo"
];

const memberTags = {
  "Hyeon Woo Kim": ["DFT/MD", "Nucleation"],
  "Han Uk Lee": ["DFT/MD", "AI", "Nucleation"],
  "Min Sung Kang": ["DFT/MD", "Multi-scale", "Nucleation"],
  "Dong Won Jeon": ["DFT/MD", "AI"],
  "Juhyun Ha": ["AI"],
  "Jeu Shin": ["DFT/MD", "Multi-scale"],
  "Jonghun Seo": ["Multi-scale"],
  "Junhyuk Kang": ["DFT/MD", "Multi-scale"],
  "Ji Hoon Hong": ["DFT/MD", "AI"],
  "Jimin Kim": ["DFT/MD", "Nucleation"],
  "Jindong Hwang": ["DFT/MD", "AI"],
  "Jaeseok Hwang": ["Multi-scale"],
  "Seojun Moon": ["DFT/MD", "Nucleation"],
  "Seongjun Kim": ["DFT/MD", "Nucleation"],
  "Jaehwang Kim": ["AI"],
  "Jaeseon Yoo": ["DFT/MD", "Nucleation"]
};

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const memberMap = new Map(members.map((member) => [member.name, member]));
  const focusProfiles = focusGroups.map((group) => {
    const people = memberOrder
      .filter((name) => {
        const member = memberMap.get(name);
        return member && member.category !== "Alumni" && (memberTags[name] || []).includes(group.key);
      })
      .map((name) => memberMap.get(name))
      .filter(Boolean);
    return { ...group, people };
  });

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("isVisible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
          } else {
            entry.target.classList.remove("isVisible");
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {showWelcome ? (
        <div
          className="welcomeOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome message"
          onClick={() => setShowWelcome(false)}
        >
          <div className="welcomeCard" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="welcomeClose"
              aria-label="Close welcome message"
              onClick={() => setShowWelcome(false)}
            >
              ×
            </button>
            <h2>Welcome</h2>
            <p>
              Welcome to our research team. We address industry and academic challenges across semiconductors,
              batteries, and other advanced fields by applying multiscale and multiphysics modeling to a wide
              range of materials, processes, and device systems.
            </p>
          </div>
        </div>
      ) : null}
      <section className="section hero">
        <div className="heroText">
          <h1 className="heroTitle">M-Square Laboratory</h1>
          <p className="heroSubtitle">Materials Modeling Laboratory</p>
          <p className="heroTagline">Simulating advanced materials, devices, and energy systems.</p>
        </div>
        <div className="heroSliderBox">
          <div className="heroSlider">
            <div className="sliderView">
              <div className="sliderOverlay">
                <button
                  type="button"
                  className="sliderOverlayButton sliderOverlayButton--left"
                  onClick={goPrev}
                  aria-label="Previous slide"
                >
                  <svg viewBox="0 0 24 24" role="presentation">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`sliderOverlayButton sliderOverlayButton--center ${
                    isPaused ? "isPlay" : "isPause"
                  }`}
                  onClick={() => setIsPaused((prev) => !prev)}
                  aria-pressed={isPaused}
                  aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                >
                  <svg className="iconPlay" viewBox="0 0 24 24" role="presentation">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <svg className="iconPause" viewBox="0 0 24 24" role="presentation">
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="sliderOverlayButton sliderOverlayButton--right"
                  onClick={goNext}
                  aria-label="Next slide"
                >
                  <svg viewBox="0 0 24 24" role="presentation">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
              <div className="sliderTrack">
                {slides.map((slide, index) => (
                  <div
                    className={`slide${index === currentIndex ? " isActive" : ""}`}
                    key={slide.title}
                  >
                    <img src={withBasePath(slide.image)} alt={slide.title} />
                  </div>
                ))}
              </div>
            </div>
            <div className="sliderDots" aria-label="Slideshow pagination">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className={`sliderDot${index === currentIndex ? " isActive" : ""}`}
                  aria-label={`Slide ${index + 1}`}
                  aria-pressed={index === currentIndex}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section homeFocusSection">
        <div className="sectionHeader reveal-on-scroll">
          <h2>Research Groups</h2>
          <p className="sectionDescription">Students grouped by core modeling approach.</p>
        </div>
        <div className="homeFocusGrid">
          {focusProfiles.map((group, index) => (
            <div
              className="homeFocusCard reveal-on-scroll"
              key={group.key}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="homeFocusHeader">
                <span className="homeFocusIcon" aria-hidden="true">
                  {group.icon}
                </span>
                <h3 className="homeFocusTitle">{group.label}</h3>
              </div>
              <div className="homeFocusAvatars">
                {group.people.map((person) => (
                  <div className="homeFocusAvatar" key={`${group.key}-${person.name}`}>
                    <img src={withBasePath(person.photo)} alt={person.name} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
