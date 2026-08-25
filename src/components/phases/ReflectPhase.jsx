import React, { useEffect } from 'react';
import Mascot from '../shared/Mascot';

const getBadgeIcon = (id) => {
  switch (id) {
    case 'bar_spotter': return '🔍';
    case 'parts_pro': return '✏️';
    case 'data_master': return '👑';
    case 'perfect_world': return '🎯';
    case 'streak_legend': return '🔥';
    case 'real_world_champion': return '🌍';
    case 'graph_explorer': return '📊';
    case 'full_journey': return '🎓';
    default: return '⭐';
  }
};

const getBadgeLabel = (id) => {
  switch (id) {
    case 'bar_spotter': return 'Bar Spotter';
    case 'parts_pro': return 'Graph Parts Pro';
    case 'data_master': return 'Data Master';
    case 'perfect_world': return 'Perfect World';
    case 'streak_legend': return 'Streak Legend';
    case 'real_world_champion': return 'Real World Champion';
    case 'graph_explorer': return 'Graph Explorer';
    case 'full_journey': return 'Full Journey';
    default: return 'Badge Unlocked';
  }
};

const WORLD_DATA = [
  { name: "Favourite Fruits Farm", emoji: "🍉" },
  { name: "Pet Shop Parade", emoji: "🐶" },
  { name: "Weather Watch Tower", emoji: "🌦️" },
  { name: "Sports Day Stadium", emoji: "🏅" },
  { name: "Book Nook Library", emoji: "📚" },
  { name: "Ice-Cream Truck Fiesta", emoji: "🍦" },
  { name: "Traffic Counting Corner", emoji: "🚗" },
  { name: "Canteen Food Count", emoji: "🍱" },
  { name: "Class Survey Central", emoji: "🚌" },
  { name: "Mystery Data Detective", emoji: "🕵️" },
];

const REFLECTION_PROMPTS = [
  "Tell me one thing a bar graph's title tells you!",
  "Why must every bar be the same width?",
  "Can you name a survey you could turn into a bar graph?",
  "Why does the scale need equal jumps?",
  "What's the first step before drawing any bar graph?"
];

export default function ReflectPhase({
  xp,
  totalStars,
  unlockedBadges,
  worldScores,
  correctAnswers,
  onReset,
  playSound,
  speak,
  unlockBadge
}) {
  useEffect(() => {
    speak("Amazing work! Let's reflect on everything you've learned about bar graphs.");
    unlockBadge('full_journey');
  }, []);

  const getStarRating = (score) => {
    if (score === null) return 0;
    if (score >= 9) return 3;
    if (score >= 7) return 2;
    if (score >= 5) return 1;
    return 0;
  };

  const totalStarsEarned = worldScores.reduce((acc, score) => acc + getStarRating(score), 0);
  const worldsCompleted = worldScores.filter(score => score !== null).length;

  return (
    <div className="main-card" style={{ minHeight: '520px' }}>
      <Mascot
        mood="excited"
        bubble="Amazing work! Let's reflect a little! 📋"
      />

      <h2
        style={{
          color: 'var(--accent-gold)',
          fontSize: '28px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '24px'
        }}
      >
        Your Performance!
      </h2>

      {/* Stats Row */}
      <div className="results-stats-row" style={{ marginBottom: '32px' }}>
        <div className="results-stat-card">
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>⭐</div>
          <div className="results-stat-val">{totalStarsEarned}</div>
          <div className="results-stat-label">Total Stars</div>
        </div>
        <div className="results-stat-card">
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>✅</div>
          <div className="results-stat-val">{correctAnswers}</div>
          <div className="results-stat-label">Correct Answers</div>
        </div>
        <div className="results-stat-card">
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>📊</div>
          <div className="results-stat-val">{worldsCompleted}/10</div>
          <div className="results-stat-label">Worlds Completed</div>
        </div>
      </div>

      {/* World Progress Section */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{
          color: 'var(--text-primary)',
          marginBottom: '16px',
          fontSize: '20px',
          textAlign: 'center'
        }}>
          World Progress
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          justifyContent: 'center',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          {WORLD_DATA.map((world, idx) => {
            const stars = getStarRating(worldScores[idx]);
            const completed = worldScores[idx] !== null;
            return (
              <div
                key={idx}
                style={{
                  background: completed ? 'rgba(255, 190, 26, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span style={{ fontSize: '22px' }}>{world.emoji}</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      style={{ fontSize: '11px', opacity: i < stars ? 1 : 0.2 }}
                    >
                      ☆
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Section */}
      {unlockedBadges.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            color: 'var(--text-primary)',
            marginBottom: '16px',
            fontSize: '20px',
            textAlign: 'center'
          }}>
            Badges Earned
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {unlockedBadges.map((badgeId) => (
              <div key={badgeId} style={{
                background: 'rgba(255, 190, 26, 0.12)',
                border: '1px solid rgba(255, 190, 26, 0.3)',
                borderRadius: '12px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: '700',
                color: 'var(--accent-gold)'
              }}>
                <span style={{ fontSize: '20px' }}>{getBadgeIcon(badgeId)}</span>
                {getBadgeLabel(badgeId)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reflection Section */}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{
          color: 'var(--accent-gold)',
          fontSize: '22px',
          fontWeight: 'bold',
          marginBottom: '8px'
        }}>
          Time to Reflect!
        </h3>
        <p style={{
          color: 'var(--text-muted-lavender)',
          fontSize: '16px',
          marginBottom: '16px'
        }}>
          {REFLECTION_PROMPTS[0]}
        </p>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          padding: '16px',
          color: 'var(--text-muted-lavender)',
          fontSize: '15px',
          lineHeight: '1.5'
        }}>
          A bar graph's title tells me what the whole graph is about — like "Favourite Fruits in Class 3A" — so I know exactly what data I'm looking at before I even read a single bar!
        </div>
      </div>

      <button
        className="btn-gold"
        onClick={onReset}
        style={{ marginTop: '28px', alignSelf: 'center', padding: '14px 30px', fontSize: '16px' }}
      >
        🔄 Start a New Journey
      </button>
    </div>
  );
}
