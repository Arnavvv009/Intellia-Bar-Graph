import React, { useState, useEffect } from 'react';
import Mascot from '../shared/Mascot';
import GraphRotator from '../shared/GraphRotator';
import { GRAPH_PARTS, DATASETS } from '../../data/graphData';

const DATASET_KEYS = ['fruits', 'pets', 'weather', 'sports'];

export default function SimulatePhase({ onNext, playSound, speak }) {
  const [station, setStation] = useState(0); // 0=Spinner, 1=Reader, 2=Match, 3=Sandbox
  const [completedStations, setCompletedStations] = useState([false, false, false, false]);

  useEffect(() => {
    if (station === 0) {
      speak("Welcome to the Graph Anatomy Spinner! Drag the graph to spin it, and toggle highlights to explore the title, axes, scale, bars and labels.");
    } else if (station === 1) {
      speak("In the Bar Value Reader, let's read the data. Tap on a bar or use the number pad to fill in its value.");
    } else if (station === 2) {
      speak("Let's match the graph parts. Match each description on the left with its correct part name on the right.");
    } else if (station === 3) {
      speak("Welcome to the Construction Sandbox! Tell me which bars are tallest, even, or above average, then click watch it to see them grow!");
    }
  }, [station, speak]);

  const markStationCompleted = (idx) => {
    setCompletedStations(prev => {
      const updated = [...prev];
      updated[idx] = true;
      return updated;
    });
  };

  // -------------------------------------------------------------
  // STATION A: Graph Anatomy Spinner
  // -------------------------------------------------------------
  const [activeDataset, setActiveDataset] = useState('fruits');
  const [highlightMode, setHighlightMode] = useState(null); // 'title' | 'scale' | 'bars' | 'labels'
  const [explorerTracks, setExplorerTracks] = useState({
    fruits: new Set(), pets: new Set(), weather: new Set(), sports: new Set()
  });

  const handleHighlightToggle = (mode) => {
    setHighlightMode(prev => (prev === mode ? null : mode));
    playSound('explore');

    setExplorerTracks(prev => {
      const updated = { ...prev };
      const currentSet = new Set(updated[activeDataset]);
      currentSet.add(mode);
      updated[activeDataset] = currentSet;

      const allExplored = ['title', 'scale', 'bars', 'labels'].every(part => currentSet.has(part));
      if (allExplored) markStationCompleted(0);
      return updated;
    });
  };

  // -------------------------------------------------------------
  // STATION B: Bar Value Reader
  // -------------------------------------------------------------
  const [readerDataset, setReaderDataset] = useState('fruits');
  const [tallyList, setTallyList] = useState([]);
  const [tallyAnswers, setTallyAnswers] = useState(() => {
    const init = {};
    DATASET_KEYS.forEach(k => {
      init[k] = {};
      DATASETS[k].bars.forEach(b => { init[k][b.label] = ''; });
    });
    return init;
  });
  const [activeCell, setActiveCell] = useState({ dataset: 'fruits', label: DATASETS.fruits.bars[0].label });

  const handleBarClick = (idx) => {
    const bar = DATASETS[readerDataset].bars[idx];
    setTallyList(prev => {
      if (prev.includes(idx)) return prev;
      const nextList = [...prev, idx];
      playSound('explore');
      setTallyAnswers(ans => {
        const nextAns = { ...ans, [readerDataset]: { ...ans[readerDataset], [bar.label]: bar.value } };
        checkStationBCompletion(nextAns);
        return nextAns;
      });
      return nextList;
    });
  };

  const handleNumPadInput = (num) => {
    setTallyAnswers(prev => {
      const nextAns = { ...prev, [activeCell.dataset]: { ...prev[activeCell.dataset] } };
      const currentVal = nextAns[activeCell.dataset][activeCell.label].toString();

      if (num === 'C') {
        nextAns[activeCell.dataset][activeCell.label] = '';
      } else if (num === '✓') {
        const bar = DATASETS[activeCell.dataset].bars.find(b => b.label === activeCell.label);
        const enteredVal = parseInt(nextAns[activeCell.dataset][activeCell.label], 10);
        if (bar && enteredVal === bar.value) {
          playSound('correct');
        } else {
          playSound('wrong');
        }
      } else {
        const nextVal = currentVal + num;
        if (parseInt(nextVal, 10) <= 20) {
          nextAns[activeCell.dataset][activeCell.label] = parseInt(nextVal, 10);
        }
      }
      checkStationBCompletion(nextAns);
      return nextAns;
    });
  };

  const checkStationBCompletion = (answersObj) => {
    const isComplete = DATASETS[readerDataset].bars.every(b => {
      const enteredVal = parseInt(answersObj[readerDataset][b.label], 10);
      return !isNaN(enteredVal) && enteredVal === b.value;
    });
    if (isComplete) markStationCompleted(1);
  };

  useEffect(() => {
    setTallyList([]);
  }, [readerDataset]);

  // -------------------------------------------------------------
  // STATION C: Match the Graph Parts
  // -------------------------------------------------------------
  const [selectedDesc, setSelectedDesc] = useState(null);
  const [selectedPartName, setSelectedPartName] = useState(null);
  const [matches, setMatches] = useState({});

  const leftDescriptions = [
    { text: "Names the graph, with a horizontal and a vertical line meeting at a corner", part: "title" },
    { text: "Equal number jumps, like 0, 2, 4, 6, 8, 10, used to measure height", part: "scale" },
    { text: "Rectangles of equal width — taller means a bigger number", part: "bars" },
    { text: "Names written under every bar, plus titles for each axis", part: "labels" }
  ];

  const rightPartNames = [
    { text: "Bars", id: "bars" },
    { text: "Labels & Key", id: "labels" },
    { text: "Title & Axes", id: "title" },
    { text: "Scale & Gridlines", id: "scale" }
  ];

  const handleMatchClick = (side, idx) => {
    if (side === 'left') {
      if (Object.keys(matches).includes(idx.toString())) return;
      setSelectedDesc(idx);
      if (selectedPartName !== null) verifyMatch(idx, selectedPartName);
    } else {
      if (Object.values(matches).includes(idx)) return;
      setSelectedPartName(idx);
      if (selectedDesc !== null) verifyMatch(selectedDesc, idx);
    }
  };

  const verifyMatch = (leftIdx, rightIdx) => {
    const desc = leftDescriptions[leftIdx];
    const name = rightPartNames[rightIdx];
    if (desc.part === name.id) {
      playSound('correct');
      setMatches(prev => {
        const nextMatches = { ...prev, [leftIdx]: rightIdx };
        if (Object.keys(nextMatches).length === 4) markStationCompleted(2);
        return nextMatches;
      });
    } else {
      playSound('wrong');
    }
    setSelectedDesc(null);
    setSelectedPartName(null);
  };

  // -------------------------------------------------------------
  // STATION D: Construction Sandbox
  // -------------------------------------------------------------
  const sandboxData = DATASETS.fruits.bars;
  const avgVal = sandboxData.reduce((a, b) => a + b.value, 0) / sandboxData.length;
  const maxVal = Math.max(...sandboxData.map(b => b.value));

  const [sandboxToggles, setSandboxToggles] = useState(() => {
    const init = {};
    sandboxData.forEach(b => { init[b.label] = { tallest: null, even: null, above: null }; });
    return init;
  });
  const [growingBar, setGrowingBar] = useState(null);
  const [growTrigger, setGrowTrigger] = useState(0);

  const correctFor = (bar, behavior) => {
    if (behavior === 'tallest') return bar.value === maxVal;
    if (behavior === 'even') return bar.value % 2 === 0;
    if (behavior === 'above') return bar.value > avgVal;
    return null;
  };

  const handleSandboxToggle = (label, behavior) => {
    setSandboxToggles(prev => {
      const next = { ...prev, [label]: { ...prev[label] } };
      const current = next[label][behavior];
      next[label][behavior] = current === null ? true : current === true ? false : null;

      const bar = sandboxData.find(b => b.label === label);
      const correctVal = correctFor(bar, behavior);
      if (next[label][behavior] === correctVal) {
        playSound('explore');
      } else if (next[label][behavior] !== null) {
        playSound('wrong');
      }
      checkStationDCompletion(next);
      return next;
    });
  };

  const checkStationDCompletion = (togglesObj) => {
    const isComplete = sandboxData.every(bar => {
      const row = togglesObj[bar.label];
      return row.tallest === correctFor(bar, 'tallest') &&
        row.even === correctFor(bar, 'even') &&
        row.above === correctFor(bar, 'above');
    });
    if (isComplete) markStationCompleted(3);
  };

  const triggerGrowIt = (label) => {
    setGrowingBar(label);
    setGrowTrigger(prev => prev + 1);
    playSound('shapeReveal');
    const bar = sandboxData.find(b => b.label === label);
    speak(`Watch the ${label} bar grow to ${bar.value}!`);
  };

  const currentStationComplete = completedStations[station];

  return (
    <div style={{ width: '100%' }}>
      <div className="simulate-header">
        <h2 className="simulate-heading">✏️ Simulate</h2>
        <p className="simulate-sub">Explore and discover — no wrong answers!</p>
      </div>

      <div className="simulate-tabs">
        {[
          { id: 0, label: "Graph Spinner", badge: "A", color: "#a78bfa" },
          { id: 1, label: "Bar Value Reader", badge: "B", color: "#34d399" },
          { id: 2, label: "Match the Parts", badge: "C", color: "#ffbe1a" },
          { id: 3, label: "Construction Sandbox", badge: "D", color: "#ff8a50" }
        ].map((tab) => (
          <div
            key={tab.id}
            className={`sim-tab ${station === tab.id ? 'sim-tab--active' : ''}`}
            onClick={() => setStation(tab.id)}
          >
            <div className="sim-tab-badge" style={{ backgroundColor: tab.color }}>
              {tab.badge}
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700' }}>{tab.label}</span>
            {completedStations[tab.id] && <span style={{ color: 'var(--accent-success-green)' }}>✓</span>}
          </div>
        ))}
      </div>

      <div className="main-card" style={{ minHeight: '520px' }}>

        {/* ================= STATION A: GRAPH ANATOMY SPINNER ================= */}
        {station === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 className="sim-station-title"><span>📊</span> Graph Anatomy Spinner</h3>
            <p className="sim-station-instruction">Drag the graph to spin it — look at it from all sides!</p>


            <GraphRotator
              data={DATASETS[activeDataset].bars}
              maxScale={DATASETS[activeDataset].maxScale}
              scaleStep={DATASETS[activeDataset].scaleStep}
              title={DATASETS[activeDataset].title}
              highlight={highlightMode}
              size={290}
            />

            <div className="highlight-controls">
              <button className={`btn-highlight-toggle ${highlightMode === 'title' ? 'btn-highlight-toggle--active' : ''}`} onClick={() => handleHighlightToggle('title')}>
                Highlight Title & Axes
              </button>
              <button className={`btn-highlight-toggle ${highlightMode === 'scale' ? 'btn-highlight-toggle--active' : ''}`} onClick={() => handleHighlightToggle('scale')}>
                Highlight Scale (0-{DATASETS[activeDataset].maxScale})
              </button>
              <button className={`btn-highlight-toggle ${highlightMode === 'bars' ? 'btn-highlight-toggle--active' : ''}`} onClick={() => handleHighlightToggle('bars')}>
                Highlight Bars ({DATASETS[activeDataset].bars.length})
              </button>
              <button className={`btn-highlight-toggle ${highlightMode === 'labels' ? 'btn-highlight-toggle--active' : ''}`} onClick={() => handleHighlightToggle('labels')}>
                Highlight Labels
              </button>
            </div>

            <div className="property-live-tally">
              <div className="tally-row">
                <span className="tally-item" style={{ color: 'var(--accent-gold)' }}>Bars: {DATASETS[activeDataset].bars.length}</span>
                <span>|</span>
                <span className="tally-item" style={{ color: 'var(--accent-alert-coral)' }}>Scale step: {DATASETS[activeDataset].scaleStep}</span>
                <span>|</span>
                <span className="tally-item" style={{ color: 'var(--accent-alert-coral)' }}>Max: {DATASETS[activeDataset].maxScale} {DATASETS[activeDataset].unit}</span>
              </div>
              <div className="tally-classification">
                "{DATASETS[activeDataset].title}" has {DATASETS[activeDataset].bars.length} bars, an x-axis for {DATASETS[activeDataset].xLabel.toLowerCase()}, and a y-axis for {DATASETS[activeDataset].yLabel.toLowerCase()}.
              </div>
            </div>

            <Mascot mood="thinking" bubble={GRAPH_PARTS[highlightMode]?.funFact || "Every part of a bar graph has a job — try highlighting each one!"} />
          </div>
        )}

        {/* ================= STATION B: BAR VALUE READER ================= */}
        {station === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 className="sim-station-title"><span>🎯</span> Bar Value Reader</h3>
            <p className="sim-station-instruction">Tap a bar on the spinning graph to read it, or fill in the table cells.</p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>

                <GraphRotator
                  data={DATASETS[readerDataset].bars}
                  maxScale={DATASETS[readerDataset].maxScale}
                  scaleStep={DATASETS[readerDataset].scaleStep}
                  highlight="bars"
                  size={250}
                  autoRotate={tallyList.length === 0}
                  onBarClick={handleBarClick}
                  tallyMode="bars"
                  activeTallyList={tallyList}
                  showValues
                />

                <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-gold)' }}>
                  Read: {tallyList.length} / {DATASETS[readerDataset].bars.length}
                </div>
              </div>

              <div style={{ flex: '1', minWidth: '450px', display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div className="table-scroll-container" style={{ flex: '1', minWidth: '220px', marginBottom: 0 }}>
                  <table className="property-match-table">
                    <thead>
                      <tr><th>Category</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                      {DATASETS[readerDataset].bars.map((b) => {
                        const val = tallyAnswers[readerDataset][b.label];
                        const cellStyle = () => {
                          if (val === '') return 'table-input-cell';
                          const isCorrect = val === b.value;
                          const isActive = activeCell.dataset === readerDataset && activeCell.label === b.label;
                          return `table-input-cell ${isCorrect ? 'table-input-cell--correct' : 'table-input-cell--incorrect'} ${isActive ? 'table-input-cell--active' : ''}`;
                        };
                        return (
                          <tr key={b.label}>
                            <td className="cell-shape-name">📊 {b.label}</td>
                            <td>
                              <div className={cellStyle()} onClick={() => setActiveCell({ dataset: readerDataset, label: b.label })}>
                                {val}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="num-pad-overlay" style={{ marginTop: 0, flexShrink: 0 }}>
                  <div className="num-pad-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10].map(n => (
                      <button key={n} className="num-btn" onClick={() => handleNumPadInput(n.toString())}>{n}</button>
                    ))}
                    <button className="num-btn num-btn--back" onClick={() => handleNumPadInput('C')}>Clear</button>
                    <button className="num-btn num-btn--submit" onClick={() => handleNumPadInput('✓')}>Check</button>
                  </div>
                </div>
              </div>
            </div>

            <Mascot mood="curious" bubble="Need help? Tap a bar to read its top, then check it against the scale on the left!" />
          </div>
        )}

        {/* ================= STATION C: MATCH THE GRAPH PARTS ================= */}
        {station === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 className="sim-station-title"><span>📐</span> Match the Graph Parts</h3>
            <p className="sim-station-instruction">Match each description with the correct part of a bar graph.</p>

            <div className="unfold-sandbox">
              <div style={{ width: '100%', height: '100px', backgroundColor: 'var(--surface-pill-darkest)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: 'var(--accent-gold)', fontWeight: '700', gap: '8px' }}>
                {selectedDesc !== null ? (
                  <><span>🔎 Description:</span><span>{leftDescriptions[selectedDesc].text}</span></>
                ) : (
                  <span>Select a card on the left to start matching!</span>
                )}
              </div>

              <div className="matching-game">
                <div className="match-left">
                  {leftDescriptions.map((desc, i) => {
                    const isMatched = Object.keys(matches).includes(i.toString());
                    const isSelected = selectedDesc === i;
                    return (
                      <div key={i} className={`match-card ${isSelected ? 'match-card--selected' : ''} ${isMatched ? 'match-card--completed' : ''}`} onClick={() => handleMatchClick('left', i)}>
                        <span>{desc.text}</span>
                        {isMatched && <span>✓</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="match-right">
                  {rightPartNames.map((name, i) => {
                    const matchValue = Object.values(matches).indexOf(i);
                    const isMatched = matchValue !== -1;
                    const isSelected = selectedPartName === i;
                    return (
                      <div key={i} className={`match-card ${isSelected ? 'match-card--selected' : ''} ${isMatched ? 'match-card--completed' : ''}`} onClick={() => handleMatchClick('right', i)}>
                        <span>{GRAPH_PARTS[name.id].emoji} {name.text}</span>
                        {isMatched && <span>Matched</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <Mascot mood="thinking" bubble="Title & Axes give the frame! Scale sets the steps! What about Bars and Labels?" />
          </div>
        )}

        {/* ================= STATION D: CONSTRUCTION SANDBOX ================= */}
        {station === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 className="sim-station-title"><span>🔍</span> Construction Sandbox</h3>
            <p className="sim-station-instruction">Is it the Tallest? Is it Even? Is it Above Average? Toggle YES/NO, then watch it grow.</p>

            <div className="physics-sandbox">
              <div className="sandbox-row" style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                <th>Fruit</th><th>Tallest?</th><th>Even?</th><th>Above Avg?</th>
              </div>

              {sandboxData.map((bar) => {
                const toggles = sandboxToggles[bar.label];
                const btnStyle = (behavior) => {
                  const expected = correctFor(bar, behavior);
                  const state = toggles[behavior];
                  if (state === null) return 'sandbox-toggle-btn';
                  if (state === true) return expected === true ? 'sandbox-toggle-btn sandbox-toggle-btn--yes' : 'sandbox-toggle-btn sandbox-toggle-btn--no';
                  return expected === false ? 'sandbox-toggle-btn sandbox-toggle-btn--no' : 'sandbox-toggle-btn sandbox-toggle-btn--yes';
                };

                return (
                  <div key={bar.label} className="sandbox-row">
                    <td className="physics-shape-name">📊 {bar.label} ({bar.value})</td>
                    {['tallest', 'even', 'above'].map((behavior) => (
                      <td key={behavior}>
                        <button className={btnStyle(behavior)} onClick={() => handleSandboxToggle(bar.label, behavior)}>
                          {toggles[behavior] === null ? 'Toggle' : toggles[behavior] ? 'YES' : 'NO'}
                        </button>
                        {toggles[behavior] === correctFor(bar, behavior) && (
                          <button className="watch-it-btn" onClick={() => triggerGrowIt(bar.label)} style={{ marginLeft: '4px', padding: '3px 6px', fontSize: '9px' }}>👀</button>
                        )}
                      </td>
                    ))}
                  </div>
                );
              })}

              <div className="physics-stage-viewport">
                <div className="physics-floor" />
                <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '10px', color: 'var(--text-muted-lavender)' }}>
                  Demo Arena: {growingBar ? `${growingBar} — growing to ${sandboxData.find(b => b.label === growingBar)?.value}` : 'Click the Eye 👀 icon to test'}
                </div>
                {growingBar && (
                  <div
                    key={growTrigger}
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '80px',
                      width: '36px',
                      backgroundColor: sandboxData.find(b => b.label === growingBar)?.color || '#ffbe1a',
                      borderRadius: '4px 4px 0 0',
                      animation: 'growBar 1.2s ease-out forwards',
                      '--bar-final-height': `${(sandboxData.find(b => b.label === growingBar)?.value || 1) * 8}px`
                    }}
                  />
                )}
              </div>
            </div>

            <Mascot mood="happy" bubble="The tallest bar has the biggest value! Even numbers land right on a gridline!" />
          </div>
        )}

      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <button className="btn-nav-outline" onClick={() => { if (station > 0) setStation(prev => prev - 1); }} disabled={station === 0}>
          🠔 Previous Station
        </button>

        {station < 3 ? (
          <button className="btn-nav-outline" onClick={() => setStation(prev => prev + 1)}>
            Next Station ➔
          </button>
        ) : (
          <button
            className="btn-gold"
            onClick={onNext}
            style={{ padding: '14px 30px', fontSize: '16px' }}
          >
            Begin Practice Game! ➔
          </button>
        )}
      </div>
    </div>
  );
}
