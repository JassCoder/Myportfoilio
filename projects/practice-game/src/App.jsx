import { useState } from "react";
import "./App.css";

// pick every nth element helper
function pickEvery(arr, n) {
  const out = [];
  for (let i = n - 1; i < arr.length; i += n) {
    out.push(arr[i]);
  }
  return out;
}

// core thinning logic
function runGame(from, to, count) {
  let arr = [];

  // generate numbers
  for (let i = 0; i < count; i++) {
    arr.push(Math.floor(Math.random() * (to - from + 1)) + from);
  }

  // remove dups
  arr = [...new Set(arr)];

  // sort descending
  arr.sort((a, b) => b - a);

  const steps = [5, 4, 3, 2];
  let current = arr;
  const log = [{ label: "Initial sorted unique", values: [...current] }];

  for (let n of steps) {
    if (current.length <= 1) break;
    current = pickEvery(current, n);
    log.push({
      label: `After every ${n}th`,
      values: [...current],
    });
    if (current.length <= 1) break;
  }

  return {
    finalNumber: current[0],
    steps: log,
  };
}

export default function App() {
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1000);
  const [count, setCount] = useState(100);

  const [history, setHistory] = useState([]);
  const [selectedRound, setSelectedRound] = useState(null);
  const [error, setError] = useState("");

  const play = () => {
    setError("");

    if (from >= to) {
      setError("'From' must be smaller than 'To'.");
      return;
    }

    if (count <= 0) {
      setError("Count must be > 0.");
      return;
    }

    const { finalNumber, steps } = runGame(from, to, count);

    const round = {
      id: history.length + 1,
      timestamp: new Date().toLocaleString(),
      from,
      to,
      count,
      finalNumber,
      steps,
    };

    setHistory([round, ...history]);
  };

  return (
    <div className="container">
      <h1 className="title">Number Thinning Game</h1>
      <p className="subtitle">100 numbers enter. Only one escapes.</p>

      <div className="settings">
        <div className="input-group">
          <label>From</label>
          <input
            type="number"
            value={from}
            onChange={(e) => setFrom(+e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>To</label>
          <input
            type="number"
            value={to}
            onChange={(e) => setTo(+e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(+e.target.value)}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button className="play-btn" onClick={play}>
          Play Round
        </button>
      </div>

      <h2 className="history-title">History</h2>

      {history.length === 0 && <p className="empty">No rounds yet.</p>}

      <div className="history-list">
        {history.map((round) => (
          <div
            key={round.id}
            className="round-card"
            onClick={() => setSelectedRound(round)}
          >
            <h3>Round #{round.id}</h3>
            <p>{round.timestamp}</p>
            <div className="final-num">{round.finalNumber}</div>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {selectedRound && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedRound(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedRound(null)}
            >
              ✖
            </button>

            <h2>Round #{selectedRound.id}</h2>
            <p>{selectedRound.timestamp}</p>
            <div className="final-number-large">
              {selectedRound.finalNumber}
            </div>

            <h3>Steps</h3>

            <div className="steps">
              {selectedRound.steps.map((step, i) => (
                <div key={i} className="step-row">
                  <strong>{step.label}</strong>
                  <div className="step-values">
                    {step.values.slice(0, 50).join(", ")}
                    {step.values.length > 50 && " ..."}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
