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
        <rect x="7" y="7" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      </svg>
    )
  },
  {
    key: "Continuum",
    label: "Continuum",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3 8c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M3 16c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    )
  },
  {
    key: "Nucleation",
    label: "Nucleation",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6" cy="8" r="1.5" fill="currentColor" />
        <circle cx="18" cy="8" r="1.5" fill="currentColor" />
        <circle cx="6" cy="16" r="1.5" fill="currentColor" />
        <circle cx="18" cy="16" r="1.5" fill="currentColor" />
      </svg>
    )
  }
];

const memberOrder = [
  "Hyunwoo Kim",
  "Hanwook Lee",
  "Minseong Kang",
  "Dongwon Jeon",
  "Juhyun Ha",
  "Jeu Shin",
  "Jonghun Seo",
  "Junhyuk Kang",
  "Jihoon Hong",
  "Jimin Kim",
  "Jindong Hwang",
  "Jaeseok Hwang",
  "Seojun Moon",
  "Seongjun Kim",
  "Jaehwang Kim",
  "Jaeseon Yoo"
];

const memberTags = {
  "Hyunwoo Kim": ["DFT/MD", "Nucleation"],
  "Hanwook Lee": ["DFT/MD", "AI"],
  "Minseong Kang": ["DFT/MD", "Continuum", "Nucleation"],
  "Dongwon Jeon": ["DFT/MD", "AI"],
  "Juhyun Ha": ["AI"],
  "Jeu Shin": ["DFT/MD", "Continuum"],
  "Jonghun Seo": ["Continuum"],
  "Junhyuk Kang": ["DFT/MD", "Continuum"],
  "Jihoon Hong": ["DFT/MD", "AI"],
  "Jimin Kim": ["DFT/MD", "Nucleation"],
  "Jindong Hwang": ["DFT/MD", "AI", "Nucleation"],
  "Jaeseok Hwang": ["Continuum"],
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
      .filter((name) => (memberTags[name] || []).includes(group.key))
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
          <h2>Research Focus</h2>
          <p className="sectionDescription">Students aligned by methodology focus.</p>
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
