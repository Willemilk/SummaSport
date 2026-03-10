import Link from "next/link";
import PrintButton from "./PrintButton";

const PROFIELEN = {
  TC: {
    naam: "Trainer-Coach",
    kleur: "#20126E",
    beschrijving: "Jij bent in je element als je sporters begeleidt naar betere prestaties. Je denkt analytisch, stelt trainingsschema's op en hebt oog voor techniek en tactiek.",
    icon: "🏅",
    kansen: ["Voetbal-, tennis- of zwemtrainer", "Personal trainer bij sportschool", "Coach bij een atletiekvereniging", "Sportprestatieanalist"],
  },
  BSC: {
    naam: "Buurtsportcoach",
    kleur: "#DC1E50",
    beschrijving: "Jij gelooft dat sport voor iedereen toegankelijk moet zijn. Je verbindt mensen, organiseert activiteiten in de wijk en zorgt dat ook kwetsbare groepen meedoen.",
    icon: "🤝",
    kansen: ["Buurtsportcoach bij gemeente", "Jongerenwerker met sportfocus", "Combinatiefunctionaris onderwijs-sport", "Sport- en activiteitencoördinator"],
  },
  LC: {
    naam: "Leefstijlcoach",
    kleur: "#47D7AC",
    beschrijving: "Jij richt je op de persoon achter de sport. Je voert gesprekken over voeding, stress en motivatie en helpt mensen hun leefstijl duurzaam te veranderen.",
    icon: "💚",
    kansen: ["Leefstijlcoach bij huisartsenpraktijk", "Vitaliteitscoach bij bedrijf", "Gezondheidscoach bij zorgverzekeraar", "Preventieadviseur"],
  },
  BC: {
    naam: "Bewegingscoach",
    kleur: "#FF8F1C",
    beschrijving: "Jij gebruikt beweging als middel voor welzijn en herstel. Je werkt geduldig met speciale doelgroepen en past activiteiten aan hun mogelijkheden aan.",
    icon: "🌟",
    kansen: ["Beweegcoach in verzorgingshuis", "Bewegingstherapeut bij revalidatiecentrum", "Sportcoach voor mensen met beperking", "GGZ sport- en beweegbegeleider"],
  },
};

function PieChart({ scores }: { scores: Record<string, number> }) {
  const kleuren: Record<string, string> = {
    TC: "#20126E", BSC: "#DC1E50", LC: "#47D7AC", BC: "#FF8F1C",
  };
  const cx = 100, cy = 100, r = 85;
  let cumulatief = 0;
  const totaal = Object.values(scores).reduce((a, b) => a + b, 0) || 100;

  const segmenten = Object.entries(scores).map(([key, waarde]) => {
    const pct = waarde / totaal;
    const startHoek = cumulatief * 2 * Math.PI - Math.PI / 2;
    cumulatief += pct;
    const eindHoek = cumulatief * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startHoek);
    const y1 = cy + r * Math.sin(startHoek);
    const x2 = cx + r * Math.cos(eindHoek);
    const y2 = cy + r * Math.sin(eindHoek);
    const largeArc = pct > 0.5 ? 1 : 0;
    const midHoek = startHoek + (eindHoek - startHoek) / 2;
    const labelR = r * 0.65;
    const labelX = cx + labelR * Math.cos(midHoek);
    const labelY = cy + labelR * Math.sin(midHoek);
    return { key, waarde, pct, x1, y1, x2, y2, largeArc, labelX, labelY, kleur: kleuren[key] };
  }).filter(s => s.waarde > 0);

  return (
    <svg viewBox="0 0 200 200" style={{ width: '100%', maxWidth: '220px' }}>
      {segmenten.map((s) => (
        <path
          key={s.key}
          d={`M ${cx} ${cy} L ${s.x1} ${s.y1} A ${r} ${r} 0 ${s.largeArc} 1 ${s.x2} ${s.y2} Z`}
          fill={s.kleur}
          stroke="white"
          strokeWidth="2"
        />
      ))}
      {segmenten.filter(s => s.pct > 0.08).map((s) => (
        <text key={`t-${s.key}`} x={s.labelX} y={s.labelY}
          textAnchor="middle" dominantBaseline="middle"
          fill="white" fontSize="11" fontWeight="bold" fontFamily="Open Sans, sans-serif">
          {Math.round(s.pct * 100)}%
        </text>
      ))}
    </svg>
  );
}

export default function ResultaatPage({
  searchParams,
}: {
  searchParams: { student?: string; TC?: string; BSC?: string; LC?: string; BC?: string };
}) {
  const student = (searchParams.student || "Onbekend").toUpperCase();
  const scores = {
    TC: parseInt(searchParams.TC || "0"),
    BSC: parseInt(searchParams.BSC || "0"),
    LC: parseInt(searchParams.LC || "0"),
    BC: parseInt(searchParams.BC || "0"),
  };

  const gesorteerd = (Object.entries(scores) as [keyof typeof PROFIELEN, number][]).sort(([, a], [, b]) => b - a);
  const topKey = gesorteerd[0][0];
  const top = PROFIELEN[topKey];

  return (
    <div style={{ maxWidth: '740px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Top banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #20126E 0%, #3a1f9e 100%)',
        color: 'white', marginBottom: '24px', textAlign: 'center', padding: '40px 32px',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>{top.icon}</div>
        <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Jouw beste match
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px' }}>{top.naam}</h1>
        <p style={{ opacity: 0.85, fontSize: '15px', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 16px' }}>
          {top.beschrijving}
        </p>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', padding: '4px 16px', borderRadius: '20px', fontSize: '13px', opacity: 0.8 }}>
          Studentnummer: {student}
        </div>
      </div>

      {/* Chart + scores */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#20126E', fontWeight: 800, fontSize: '18px', marginBottom: '20px' }}>Jouw profielverdeling</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 auto' }}>
            <PieChart scores={scores} />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            {gesorteerd.map(([key, score]) => {
              const p = PROFIELEN[key];
              return (
                <div key={key} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: '#20126E' }}>{p.icon} {p.naam}</span>
                    <span style={{ fontWeight: 800, fontSize: '14px', color: p.kleur }}>{score}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div style={{ width: `${score}%`, height: '100%', backgroundColor: p.kleur, borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Career options */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#20126E', fontWeight: 800, fontSize: '18px', marginBottom: '16px' }}>Mogelijke functies</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {top.kansen.map((k) => (
            <div key={k} style={{ padding: '12px 16px', backgroundColor: '#F4F4F4', borderRadius: '8px', fontSize: '14px', color: '#20126E', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#DC1E50', fontWeight: 800 }}>→</span>
              {k}
            </div>
          ))}
        </div>
      </div>

      {/* Rankings */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#20126E', fontWeight: 800, fontSize: '18px', marginBottom: '16px' }}>Alle profielen</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {gesorteerd.map(([key, score], i) => {
            const p = PROFIELEN[key];
            return (
              <div key={key} style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px',
                border: i === 0 ? `2px solid ${p.kleur}` : '2px solid #f0f0f0',
                backgroundColor: i === 0 ? '#F9F9FF' : 'white',
              }}>
                <span style={{ fontSize: '20px' }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#20126E' }}>
                    {p.naam}
                    {i === 0 && <span style={{ marginLeft: '8px', backgroundColor: '#DC1E50', color: 'white', padding: '1px 8px', borderRadius: '4px', fontSize: '11px' }}>Beste match</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: '#777', marginTop: '2px' }}>{score}% overeenkomst</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="btn-secondary" style={{ textDecoration: 'none' }}>
          ← Opnieuw beginnen
        </Link>
        <PrintButton />
      </div>
    </div>
  );
}
