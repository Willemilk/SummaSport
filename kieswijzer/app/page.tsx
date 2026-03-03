"use client";
import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "Wat spreekt jou het meest aan?",
    options: [
      { label: "Werken met mensen / coachen", tags: ["mensen", "coaching"] },
      { label: "Bewegen en fitness", tags: ["fitness", "bewegen"] },
      { label: "Natuur en buiten zijn", tags: ["natuur", "buiten"] },
      { label: "Organiseren en plannen", tags: ["organisatie"] },
    ],
  },
  {
    id: 2,
    question: "Wat voor omgeving spreekt jou aan?",
    options: [
      { label: "Sporthal / gym", tags: ["binnen", "fitness"] },
      { label: "Buiten in de natuur", tags: ["buiten", "natuur"] },
      { label: "Zwembad", tags: ["water", "zwemmen"] },
      { label: "Maakt me niet uit", tags: ["algemeen"] },
    ],
  },
  {
    id: 3,
    question: "Met wie wil je het liefst werken?",
    options: [
      { label: "Kinderen en jongeren", tags: ["jeugd", "coaching"] },
      { label: "Volwassenen", tags: ["volwassenen", "coaching"] },
      { label: "Ouderen", tags: ["ouderen", "bewegen"] },
      { label: "Topsporters", tags: ["topsport", "prestatie"] },
    ],
  },
  {
    id: 4,
    question: "Wat is jouw stijl?",
    options: [
      { label: "Actief meedoen en voordoen", tags: ["actief", "bewegen"] },
      { label: "Begeleiden en motiveren", tags: ["coaching", "mensen"] },
      { label: "Plannen en organiseren", tags: ["organisatie"] },
      { label: "Gezondheid en leefstijl adviseren", tags: ["gezondheid", "coaching"] },
    ],
  },
  {
    id: 5,
    question: "Wat trekt je aan in sport?",
    options: [
      { label: "Teamsport en samenwerken", tags: ["team", "mensen"] },
      { label: "Individuele sporten", tags: ["individueel", "prestatie"] },
      { label: "Avontuur en natuur", tags: ["natuur", "buiten"] },
      { label: "Gezondheid en welzijn", tags: ["gezondheid", "fitness"] },
    ],
  },
];

const keuzedelen = [
  { naam: "Leefstijlcoach", tags: ["coaching", "gezondheid", "mensen", "volwassenen"] },
  { naam: "Fitness trainer", tags: ["fitness", "bewegen", "actief", "volwassenen"] },
  { naam: "Jeugdsportleider", tags: ["jeugd", "coaching", "mensen", "team"] },
  { naam: "Zweminstructeur", tags: ["water", "zwemmen", "jeugd", "coaching"] },
  { naam: "Outdoor sportbegeleider", tags: ["buiten", "natuur", "actief"] },
  { naam: "Personal trainer", tags: ["fitness", "coaching", "volwassenen", "prestatie"] },
  { naam: "Sportorganisator", tags: ["organisatie", "team", "mensen"] },
  { naam: "Topsportbegeleider", tags: ["topsport", "prestatie", "coaching"] },
  { naam: "Beweegcoach ouderen", tags: ["ouderen", "bewegen", "gezondheid", "coaching"] },
  { naam: "Sportinstructeur binnen", tags: ["binnen", "fitness", "actief", "bewegen"] },
];

function getResults(selectedTags: string[]) {
  return keuzedelen
    .map((k) => ({
      ...k,
      score: k.tags.filter((t) => selectedTags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleAnswer = (tags: string[]) => {
    const newTags = [...selectedTags, ...tags];
    if (current + 1 >= questions.length) {
      setSelectedTags(newTags);
      setDone(true);
    } else {
      setSelectedTags(newTags);
      setCurrent(current + 1);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelectedTags([]);
    setDone(false);
    setHoveredIndex(null);
  };

  const results = getResults(selectedTags);
  const progress = (current / questions.length) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Source Sans 3', sans-serif;
          background: #f5f5f5;
          min-height: 100vh;
        }

        .topbar {
          background: #fff;
          border-bottom: 1px solid #e8e8e8;
          padding: 0 32px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-badge {
          width: 36px;
          height: 36px;
          background: #CC0000;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 900;
          font-size: 16px;
          letter-spacing: -1px;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: -0.3px;
        }

        .logo-sub {
          font-size: 12px;
          color: #CC0000;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .page {
          min-height: calc(100vh - 64px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
        }

        .hero {
          text-align: center;
          margin-bottom: 36px;
        }

        .hero-tag {
          display: inline-block;
          background: #fff0f0;
          color: #CC0000;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          margin-bottom: 14px;
        }

        .hero h1 {
          font-size: 36px;
          font-weight: 900;
          color: #111;
          letter-spacing: -0.5px;
          line-height: 1.1;
        }

        .hero p {
          margin-top: 10px;
          font-size: 16px;
          color: #777;
          font-weight: 400;
        }

        .card {
          background: #fff;
          border-radius: 16px;
          padding: 36px;
          width: 100%;
          max-width: 560px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          border: 1px solid #efefef;
        }

        .progress-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #aaa;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .progress-bar {
          height: 4px;
          background: #f0f0f0;
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 28px;
        }

        .progress-fill {
          height: 100%;
          background: #CC0000;
          border-radius: 99px;
          transition: width 0.4s ease;
        }

        .question {
          font-size: 20px;
          font-weight: 700;
          color: #111;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .option-btn {
          background: #fff;
          border: 2px solid #ebebeb;
          border-radius: 10px;
          padding: 14px 18px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #333;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .option-btn:hover {
          border-color: #CC0000;
          background: #fff8f8;
          color: #CC0000;
        }

        .option-arrow {
          font-size: 16px;
          opacity: 0;
          transition: opacity 0.15s;
        }

        .option-btn:hover .option-arrow {
          opacity: 1;
        }

        .result-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .result-icon {
          width: 56px;
          height: 56px;
          background: #fff0f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          margin: 0 auto 14px;
        }

        .result-header h2 {
          font-size: 22px;
          font-weight: 800;
          color: #111;
          margin-bottom: 4px;
        }

        .result-header p {
          font-size: 14px;
          color: #999;
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }

        .result-item {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #fafafa;
          border: 1px solid #efefef;
          border-radius: 10px;
          padding: 14px 18px;
        }

        .result-rank {
          font-size: 22px;
          font-weight: 900;
          color: #CC0000;
          min-width: 32px;
        }

        .result-name {
          font-size: 16px;
          font-weight: 700;
          color: #111;
        }

        .result-tags {
          font-size: 12px;
          color: #bbb;
          margin-top: 2px;
        }

        .reset-btn {
          width: 100%;
          background: #CC0000;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s;
          letter-spacing: 0.01em;
        }

        .reset-btn:hover {
          background: #aa0000;
        }

        .footer-note {
          margin-top: 24px;
          font-size: 12px;
          color: #bbb;
          text-align: center;
        }
      `}</style>

      <div className="topbar">
        <div className="logo">
          <div className="logo-badge">S</div>
          <div>
            <div className="logo-text">Summa College</div>
            <div className="logo-sub">Sport &amp; Bewegen</div>
          </div>
        </div>
      </div>

      <div className="page">
        {!done && (
          <div className="hero">
            <div className="hero-tag">Keuzedelen Kieswijzer</div>
            <h1>Welk keuzedeel<br />past bij jou?</h1>
            <p>Beantwoord 5 vragen en ontdek jouw beste match.</p>
          </div>
        )}

        <div className="card">
          {!done ? (
            <>
              <div className="progress-row">
                <span>Vraag {current + 1} van {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="question">{questions[current].question}</div>
              <div className="options">
                {questions[current].options.map((opt, i) => (
                  <button
                    key={i}
                    className="option-btn"
                    onClick={() => handleAnswer(opt.tags)}
                  >
                    {opt.label}
                    <span className="option-arrow">→</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="result-header">
                <div className="result-icon">🎯</div>
                <h2>Jouw top keuzedelen</h2>
                <p>Op basis van jouw antwoorden raden wij aan:</p>
              </div>
              <div className="results-list">
                {results.map((r, i) => (
                  <div className="result-item" key={i}>
                    <div className="result-rank">#{i + 1}</div>
                    <div>
                      <div className="result-name">{r.naam}</div>
                      <div className="result-tags">{r.tags.join(" · ")}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="reset-btn" onClick={reset}>
                Opnieuw proberen
              </button>
            </>
          )}
        </div>

        <div className="footer-note">Prototype V1 · Summa ICT · Prototyping 2025/26</div>
      </div>
    </>
  );
}
