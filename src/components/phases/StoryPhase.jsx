import React, { useState, useEffect } from 'react';
import Mascot from '../shared/Mascot';

const Slide1Illustration = () => (
  <img
    src="/assets/slide1-survey.png"
    alt="Robo helps Class 3A collect survey data with tally marks"
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
);

const Slide2Illustration = () => (
  <img
    src="/assets/slide2-axes.png"
    alt="Robo drawing the title and two axes of a bar graph"
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
);

const Slide3Illustration = () => (
  <img
    src="/assets/slide3-bars.png"
    alt="Robo drawing bars that match the scale and data"
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
);

const Slide4Illustration = () => (
  <img
    src="/assets/slide4-reading.png"
    alt="Robo reading and comparing the finished bar graph"
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
);

const slidesData = [
  {
    title: "Robo's Class Survey",
    body: "Class 3A asked their friends about their favourite fruit and made tally marks. Robo says every survey needs to be collected fairly and counted carefully before it becomes a graph!",
    fact: "Step 1: Collect and count the data first!",
    nudge: "Let's turn these tally marks into something everyone can read at a glance!",
    Illustration: Slide1Illustration
  },
  {
    title: "Building the Frame",
    body: "Every bar graph needs a Title, a horizontal x-axis for categories, and a vertical y-axis for the scale. Robo always draws these first, like building the frame of a house before decorating it.",
    fact: "Title & Axes: 1 title, 1 x-axis, 1 y-axis",
    nudge: "A graph without a title and axes is like a puzzle with no picture on the box!",
    Illustration: Slide2Illustration
  },
  {
    title: "Choosing the Scale, Drawing the Bars",
    body: "Robo picks a scale that goes up in equal jumps — 0, 2, 4, 6, 8, 10 — then draws each bar to match its data value. Every bar is the same width, with the same gap in between, only the height changes!",
    fact: "Bars: same width, same spacing, height = value",
    nudge: "Watch closely — the taller the bar, the bigger the number!",
    Illustration: Slide3Illustration
  },
  {
    title: "Reading the Finished Graph",
    body: "Once every bar is labelled, the graph tells its own story! Banana got the tallest bar with 10 votes, and Papaya the shortest with just 2. Now anyone can read the results in seconds — no counting tallies needed!",
    fact: "Labels & Key: a name under every bar",
    nudge: "Now you know all 4 parts of a bar graph — let's go practise building one!",
    Illustration: Slide4Illustration
  }
];

export default function StoryPhase({ onNext, speak }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const currentSlide = slidesData[slideIdx];

  useEffect(() => {
    speak(currentSlide.body);
  }, [slideIdx, speak]);

  const handleNext = () => {
    if (slideIdx < slidesData.length - 1) {
      setSlideIdx(prev => prev + 1);
    } else {
      onNext();
    }
  };

  const handlePrev = () => {
    if (slideIdx > 0) {
      setSlideIdx(prev => prev - 1);
    }
  };

  const pct = Math.round(((slideIdx + 1) / slidesData.length) * 100);
  const CurrentIllustration = currentSlide.Illustration;

  return (
    <div style={{ width: '100%' }}>
      <div className="story-header">
        <span>Slide {slideIdx + 1} of 4</span>
        <div className="story-dots">
          {slidesData.map((_, idx) => (
            <div
              key={idx}
              className={`story-dot ${idx === slideIdx ? 'story-dot--active' : ''}`}
            />
          ))}
        </div>
        <span>{pct}%</span>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="main-card" style={{ paddingBottom: '32px' }}>
        <div className="story-img-bleed">
          <CurrentIllustration />
        </div>

        <div className="story-content-section">
          <h2 className="story-title">{currentSlide.title}</h2>

          <p className="story-body">{currentSlide.body}</p>

          <div className="hint-fact-pill" style={{ alignSelf: 'flex-start' }}>
            ✨ {currentSlide.fact} ✨
          </div>

          <Mascot mood="idle" bubble={currentSlide.nudge} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <button
          className="btn-nav-outline"
          onClick={handlePrev}
          disabled={slideIdx === 0}
          style={{ opacity: slideIdx === 0 ? 0.5 : 1 }}
        >
          ← Previous
        </button>
        <button className="btn-nav-outline" onClick={handleNext}>
          {slideIdx < slidesData.length - 1 ? "Next ➔" : "Go to Practice ➔"}
        </button>
      </div>
    </div>
  );
}
