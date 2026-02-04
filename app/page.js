"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "../lib/basePath";

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

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

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
    </div>
  );
}
