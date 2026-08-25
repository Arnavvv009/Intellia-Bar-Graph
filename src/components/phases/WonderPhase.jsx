import React, { useState, useEffect } from 'react';
import Mascot from '../shared/Mascot';
import GraphRotator from '../shared/GraphRotator';
import { SAMPLE_DATASET } from '../../data/graphData';

const teaserData = {
  ...SAMPLE_DATASET,
  bars: SAMPLE_DATASET.bars.map((b) => ({ ...b, value: 0 })), // silhouette: flat bars
};

export default function WonderPhase({ onNext, playSound, speak }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    speak("Class 3A asked their friends: what is your favourite fruit? They wrote tally marks on a page, but nobody could tell which fruit won at a glance. How can we turn these tally marks into a picture that tells the story instantly?");
  }, [speak]);

  const handleReveal = () => {
    if (revealed) {
      onNext();
      return;
    }
    setRevealed(true);
    playSound('shapeReveal');
    speak("A Bar Graph! Tall bars for popular fruits, short bars for less popular ones. Let's explore how to build one in the story.");
  };

  return (
    <div className="main-card">
      <Mascot
        mood={revealed ? 'happy' : 'thinking'}
        bubble={revealed ? "Aha! It's a Bar Graph — bars of different heights! 📊" : 'Hmm... I wonder...'}
      />

      <div className="wonder-stage-box">
        <div className={`wonder-silhouette ${revealed ? 'wonder-revealed' : ''}`}>
          <GraphRotator
            data={revealed ? SAMPLE_DATASET.bars : teaserData.bars}
            maxScale={SAMPLE_DATASET.maxScale}
            scaleStep={SAMPLE_DATASET.scaleStep}
            size={200}
            highlight={revealed ? 'bars' : null}
            autoRotate={true}
          />
        </div>
      </div>

      <h2 className="wonder-heading">
        Class 3A asked their friends: "What is your favourite fruit?" They wrote tally marks on a page, but nobody could tell which fruit won at a glance.
      </h2>

      <p className="wonder-subtitle">
        What if we turned each tally count into a bar — the taller the bar, the more popular the fruit?
      </p>

      <div className="hint-fact-pill">
        ✨ We could draw a rectangle for each fruit and make its height match the count! ✨
      </div>

      {revealed && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const size = Math.random() * 6 + 6;
            const color = ['#ffbe1a', '#22c55e', '#a78bfa', '#ff8a50'][i % 4];
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${left}%`,
                  top: '60%',
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  borderRadius: i % 2 === 0 ? '50%' : '0',
                  opacity: 0.8,
                  transform: 'translateY(0)',
                  animation: `floatUp 1.2s ease-out forwards`,
                  animationDelay: `${delay}s`
                }}
              />
            );
          })}
        </div>
      )}

      <button
        className="btn-gold"
        onClick={handleReveal}
        style={{ marginTop: 'auto', alignSelf: 'center' }}
      >
        {revealed ? "Let's Read the Story! ➔" : "I have a guess! 🔍 Let's Find Out!"}
      </button>
    </div>
  );
}
