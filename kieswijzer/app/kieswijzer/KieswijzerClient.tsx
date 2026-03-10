"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Profiel = "TC" | "BSC" | "LC" | "BC";

interface Vraag {
  id: number;
  vraag: string;
  opties: {
    letter: string;
    tekst: string;
    profiel: Profiel;
  }[];
}

const vragen: Vraag[] = [
  {
    id: 1,
    vraag: "Wat spreekt jou het meeste aan in de sport?",
    opties: [
      { letter: "A", tekst: "Sporters begeleiden naar hun beste prestatie", profiel: "TC" },
      { letter: "B", tekst: "Iedereen in de buurt laten bewegen, ongeacht achtergrond", profiel: "BSC" },
      { letter: "C", tekst: "Mensen helpen gezonder en gelukkiger te leven", profiel: "LC" },
      { letter: "D", tekst: "Bewegen inzetten als middel voor welzijn en herstel", profiel: "BC" },
    ],
  },
  {
    id: 2,
    vraag: "In welke werkomgeving zie jij jezelf het liefst?",
    opties: [
      { letter: "A", tekst: "Een sportclub of atletiekvereniging", profiel: "TC" },
      { letter: "B", tekst: "Een buurtcentrum, school of gemeente", profiel: "BSC" },
      { letter: "C", tekst: "Een gezondheidscentrum, zorgverzekeraar of bedrijf", profiel: "LC" },
      { letter: "D", tekst: "Een zorginstelling of revalidatiecentrum", profiel: "BC" },
    ],
  },
  {
    id: 3,
    vraag: "Welke doelgroep trekt jou het meest aan?",
    opties: [
      { letter: "A", tekst: "Competitiesporters en prestatiegerichte atleten", profiel: "TC" },
      { letter: "B", tekst: "Kinderen, jongeren en diverse gemeenschappen", profiel: "BSC" },
      { letter: "C", tekst: "Volwassenen met een ongezonde leefstijl", profiel: "LC" },
      { letter: "D", tekst: "Senioren, revaliderende patiënten of mensen met beperking", profiel: "BC" },
    ],
  },
  {
    id: 4,
    vraag: "Wat motiveert jou het meest?",
    opties: [
      { letter: "A", tekst: "Winnen en topprestaties behalen met mijn sporter", profiel: "TC" },
      { letter: "B", tekst: "Een inclusieve buurt creëren waar iedereen meedoet", profiel: "BSC" },
      { letter: "C", tekst: "Gedragsverandering realiseren bij mensen die dat nodig hebben", profiel: "LC" },
      { letter: "D", tekst: "De kwaliteit van leven verbeteren bij mensen in zorg", profiel: "BC" },
    ],
  },
  {
    id: 5,
    vraag: "Wat is jouw sterkste eigenschap als begeleider?",
    opties: [
      { letter: "A", tekst: "Ik ben gedreven, analytisch en resultaatgericht", profiel: "TC" },
      { letter: "B", tekst: "Ik ben sociaal, verbindend en community-minded", profiel: "BSC" },
      { letter: "C", tekst: "Ik ben empathisch, motiverend en gezondheidsbewust", profiel: "LC" },
      { letter: "D", tekst: "Ik ben geduldig, zorgzaam en aanpassingsvermogend", profiel: "BC" },
    ],
  },
  {
    id: 6,
    vraag: "Hoe zie jij sport het liefst ingezet?",
    opties: [
      { letter: "A", tekst: "Als competitie — voor prestatie en winnende teams", profiel: "TC" },
      { letter: "B", tekst: "Als sociale activiteit — voor meedoen en verbinding", profiel: "BSC" },
      { letter: "C", tekst: "Als middel voor gezondheidsverbetering en preventie", profiel: "LC" },
      { letter: "D", tekst: "Als therapie — voor revalidatie en welzijn", profiel: "BC" },
    ],
  },
  {
    id: 7,
    vraag: "Welk type activiteit zou jij het liefst organiseren?",
    opties: [
      { letter: "A", tekst: "Een trainingsweek voor een sportteam richting competitie", profiel: "TC" },
      { letter: "B", tekst: "Een buurtolympiade voor alle leeftijden en achtergronden", profiel: "BSC" },
      { letter: "C", tekst: "Een workshop gezonde leefstijl voor een bedrijf", profiel: "LC" },
      { letter: "D", tekst: "Een beweegprogramma voor ouderen in een verzorgingshuis", profiel: "BC" },
    ],
  },
  {
    id: 8,
    vraag: "Waar haal jij de meeste voldoening uit?",
    opties: [
      { letter: "A", tekst: "Als een sporter zijn persoonlijk record breekt door mijn coaching", profiel: "TC" },
      { letter: "B", tekst: "Als een kind voor het eerst meedoet en erbij hoort", profiel: "BSC" },
      { letter: "C", tekst: "Als iemand zijn leefstijl structureel verandert", profiel: "LC" },
      { letter: "D", tekst: "Als een cliënt meer zelfstandigheid en mobiliteit terugkrijgt", profiel: "BC" },
    ],
  },
  {
    id: 9,
    vraag: "Welk aspect van begeleiding vind jij het belangrijkst?",
    opties: [
      { letter: "A", tekst: "Techniek, tactiek en prestatieverbetering", profiel: "TC" },
      { letter: "B", tekst: "Toegankelijkheid en inclusiviteit voor iedereen", profiel: "BSC" },
      { letter: "C", tekst: "Motivatie en gedragsverandering op lange termijn", profiel: "LC" },
      { letter: "D", tekst: "Veiligheid en aanpassing aan persoonlijke mogelijkheden", profiel: "BC" },
    ],
  },
  {
    id: 10,
    vraag: "Welk vak zou jij het leukst vinden op school?",
    opties: [
      { letter: "A", tekst: "Sportanalyse, trainingsleer en periodisering", profiel: "TC" },
      { letter: "B", tekst: "Sociaal-cultureel werk en community organizing", profiel: "BSC" },
      { letter: "C", tekst: "Voedingsleer, preventie en gezondheidscoaching", profiel: "LC" },
      { letter: "D", tekst: "Fysiologie, gezondheidszorg en beweegtherapie", profiel: "BC" },
    ],
  },
  {
    id: 11,
    vraag: "Hoe reageer jij als iemand moeite heeft met bewegen of sport?",
    opties: [
      { letter: "A", tekst: "Ik analyseer de techniek en maak een verbeterplan", profiel: "TC" },
      { letter: "B", tekst: "Ik zoek manieren om drempels weg te halen en iedereen mee te laten doen", profiel: "BSC" },
      { letter: "C", tekst: "Ik ga in gesprek over motivatie en onderliggende leefstijl", profiel: "LC" },
      { letter: "D", tekst: "Ik pas de activiteit aan op hun mogelijkheden en tempo", profiel: "BC" },
    ],
  },
  {
    id: 12,
    vraag: "Als jij over 5 jaar terugkijkt op je werk, wat wil je dan gezegd hebben bereikt?",
    opties: [
      { letter: "A", tekst: "Ik heb meerdere sporters naar een hoger niveau geholpen", profiel: "TC" },
      { letter: "B", tekst: "Ik heb sport in mijn wijk toegankelijk gemaakt voor iedereen", profiel: "BSC" },
      { letter: "C", tekst: "Ik heb tientallen mensen geholpen hun leefstijl te verbeteren", profiel: "LC" },
      { letter: "D", tekst: "Ik heb kwetsbare mensen meer kwaliteit van leven gegeven", profiel: "BC" },
    ],
  },
];

export default function KieswijzerClient({ studentnummer }: { studentnummer: string }) {
  const router = useRouter();
  const [huidigeVraag, setHuidigeVraag] = useState(0);
  const [antwoorden, setAntwoorden] = useState<Record<number, Profiel>>({});
  const [geselecteerd, setGeselecteerd] = useState<Profiel | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setGeselecteerd(antwoorden[huidigeVraag] || null);
  }, [huidigeVraag, antwoorden]);

  const handleKeuze = (profiel: Profiel) => {
    setGeselecteerd(profiel);
  };

  const handleVolgende = () => {
    if (!geselecteerd) return;
    const nieuweAntwoorden = { ...antwoorden, [huidigeVraag]: geselecteerd };
    setAntwoorden(nieuweAntwoorden);

    if (huidigeVraag < vragen.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setHuidigeVraag(huidigeVraag + 1);
        setAnimating(false);
      }, 200);
    } else {
      // Bereken resultaten
      const scores: Record<Profiel, number> = { TC: 0, BSC: 0, LC: 0, BC: 0 };
      Object.values(nieuweAntwoorden).forEach((p) => scores[p]++);
      const totaal = vragen.length;
      const params = new URLSearchParams({
        student: studentnummer,
        TC: Math.round((scores.TC / totaal) * 100).toString(),
        BSC: Math.round((scores.BSC / totaal) * 100).toString(),
        LC: Math.round((scores.LC / totaal) * 100).toString(),
        BC: Math.round((scores.BC / totaal) * 100).toString(),
      });
      router.push(`/resultaat?${params.toString()}`);
    }
  };

  const handleTerug = () => {
    if (huidigeVraag > 0) {
      setHuidigeVraag(huidigeVraag - 1);
    } else {
      router.push(`/?student=${studentnummer}`);
    }
  };

  const vraag = vragen[huidigeVraag];
  const voortgang = ((huidigeVraag) / vragen.length) * 100;

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Header info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '13px', color: '#20126E', fontWeight: 600, opacity: 0.6 }}>
          Studentnummer: {studentnummer || '—'}
        </span>
        <span style={{ fontSize: '13px', color: '#20126E', fontWeight: 700 }}>
          {huidigeVraag + 1} / {vragen.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="progress-bar-bg" style={{ marginBottom: '32px' }}>
        <div className="progress-bar-fill" style={{ width: `${voortgang}%` }} />
      </div>

      {/* Question card */}
      <div className="card fade-in" key={huidigeVraag} style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.2s' }}>
        <div style={{ marginBottom: '8px' }}>
          <span style={{
            backgroundColor: '#20126E',
            color: 'white',
            padding: '2px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 700
          }}>
            Vraag {huidigeVraag + 1}
          </span>
        </div>
        <h2 style={{
          color: '#20126E',
          fontSize: '22px',
          fontWeight: 800,
          lineHeight: 1.3,
          marginBottom: '24px',
          marginTop: '12px'
        }}>
          {vraag.vraag}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {vraag.opties.map((optie) => (
            <button
              key={optie.letter}
              className={`option-btn ${geselecteerd === optie.profiel ? 'selected' : ''}`}
              onClick={() => handleKeuze(optie.profiel)}
            >
              <span className="option-letter">{optie.letter}</span>
              <span>{optie.tekst}</span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px', gap: '12px' }}>
          <button className="btn-secondary" onClick={handleTerug} style={{ fontSize: '14px', padding: '10px 20px' }}>
            ← Terug
          </button>
          <button
            className="btn-primary"
            onClick={handleVolgende}
            disabled={!geselecteerd}
            style={{
              opacity: geselecteerd ? 1 : 0.4,
              cursor: geselecteerd ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              padding: '10px 24px'
            }}
          >
            {huidigeVraag === vragen.length - 1 ? 'Bekijk resultaat →' : 'Volgende →'}
          </button>
        </div>
      </div>

      {/* Answered dots */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
        {vragen.map((_, i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: i === huidigeVraag ? '#DC1E50' : antwoorden[i] ? '#20126E' : '#e0e0e0',
              transition: 'background-color 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
