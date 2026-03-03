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
  { naam: "Outdoor sportbegeleider", tags: ["buiten", "natuur", "avontuur", "actief"] },
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
  };

  const results = getResults(selectedTags);
  const progress = ((current) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-[#0a0f1e] text-white flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <span className="text-xs tracking-[0.3em] uppercase text-[#00e5a0] font-semibold">Summa Sport</span>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Keuzedelen Kieswijzer</h1>
        <p className="mt-2 text-sm text-white/50">Ontdek welk keuzedeel het beste bij jou past.</p>
      </div>

      <div className="w-full max-w-xl">
        {!done ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-white/40 mb-2">
                <span>Vraag {current + 1} van {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00e5a0] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-xl font-bold mb-6">{questions[current].question}</h2>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.tags)}
                  className="w-full text-left px-5 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-[#00e5a0]/10 hover:border-[#00e5a0]/50 transition-all duration-200 text-sm font-medium"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <span className="text-3xl">🎯</span>
              <h2 className="text-2xl font-black mt-2">Jouw top keuzedelen</h2>
              <p className="text-sm text-white/50 mt-1">Op basis van jouw antwoorden raden wij aan:</p>
            </div>

            <div className="flex flex-col gap-4">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4"
                >
                  <span className="text-2xl font-black text-[#00e5a0]">#{i + 1}</span>
                  <div>
                    <p className="font-bold">{r.naam}</p>
                    <p className="text-xs text-white/40">{r.tags.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={reset}
              className="mt-8 w-full py-3 rounded-xl bg-[#00e5a0] text-[#0a0f1e] font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Opnieuw proberen
            </button>
          </div>
        )}
      </div>

      <p className="mt-8 text-xs text-white/20">Prototype V1 — Summa ICT · Prototyping 2025/26</p>
    </main>
  );
}
