import Link from "next/link";
import PrintButton from "./PrintButton";

const PROFIELEN = {
  TC: {
    naam: "Trainer-Coach",
    kleur: "#20126E",
    beschrijving: "Jij bent in je element als je sporters begeleidt naar betere prestaties. Je denkt analytisch, stelt trainingsschema's op en hebt oog voor techniek en tactiek.",
    kansen: ["Voetbal-, tennis- of zwemtrainer", "Personal trainer bij sportschool", "Coach bij een atletiekvereniging", "Sportprestatieanalist"],
  },
  BSC: {
    naam: "Buurtsportcoach",
    kleur: "#DC1E50",
    beschrijving: "Jij gelooft dat sport voor iedereen toegankelijk moet zijn. Je verbindt mensen, organiseert activiteiten in de wijk en zorgt dat ook kwetsbare groepen meedoen.",
    kansen: ["Buurtsportcoach bij gemeente", "Jongerenwerker met sportfocus", "Combinatiefunctionaris onderwijs-sport", "Activiteitencoördinator"],
  },
  LC: {
    naam: "Leefstijlcoach",
    kleur: "#008273",
    beschrijving: "Jij richt je op de persoon achter de sport. Je voert gesprekken over voeding, stress en motivatie en helpt mensen hun leefstijl duurzaam te veranderen.",
    kansen: ["Leefstijlcoach bij huisartsenpraktijk", "Vitaliteitscoach bij bedrijf", "Gezondheidscoach bij zorgverzekeraar", "Preventieadviseur"],
  },
  BC: {
    naam: "Bewegingscoach",
    kleur: "#FF8F1C",
    beschrijving: "Jij gebruikt beweging als middel voor welzijn en herstel. Je werkt geduldig met speciale doelgroepen en past activiteiten aan hun mogelijkheden aan.",
    kansen: ["Beweegcoach in verzorgingshuis", "Bewegingstherapeut bij revalidatie", "Sportcoach voor mensen met beperking", "GGZ beweegbegeleider"],
  },
};

function PieChart({ scores }: { scores: Record<string, number> }) {
  const kleuren: Record<string, string> = {
    TC: "#20126E", BSC: "#DC1E50", LC: "#008273", BC: "#FF8F1C",
  };
  const cx = 100, cy = 100, r = 80;
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
    const labelR = r * 0.6;
    const labelX = cx + labelR * Math.cos(midHoek);
    const labelY = cy + labelR * Math.sin(midHoek);
    return { key, waarde, pct, x1, y1, x2, y2, largeArc, labelX, labelY, kleur: kleuren[key] };
  }).filter(s => s.waarde > 0);

  return (
    <svg viewBox="0 0 200 200" style={{ width: '100%', maxWidth: '200px' }}>
      {/* Donut segments */}
      {segmenten.map((s) => (
        <path
          key={s.key}
          d={`M ${cx} ${cy} L ${s.x1} ${s.y1} A ${r} ${r} 0 ${s.largeArc} 1 ${s.x2} ${s.y2} Z`}
          fill={s.kleur}
          stroke="white"
          strokeWidth="3"
        />
      ))}
      {/* Center circle for donut look */}
      <circle cx={cx} cy={cy} r="36" fill="white" />
      {/* Center text */}
      <text x={cx} y={cy - 4} textAnchor="middle" dominantBaseline="middle"
        fill="#20126E" fontSize="10" fontWeight="700" fontFamily="Open Sans, sans-serif">
        Jouw
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" dominantBaseline="middle"
        fill="#20126E" fontSize="10" fontWeight="700" fontFamily="Open Sans, sans-serif">
        verdeling
      </text>
      {/* Labels */}
      {segmenten.filter(s => s.pct > 0.1).map((s) => (
        <text key={`t-${s.key}`} x={s.labelX} y={s.labelY}
          textAnchor="middle" dominantBaseline="middle"
          fill="white" fontSize="12" fontWeight="800" fontFamily="Open Sans, sans-serif">
          {Math.round(s.pct * 100)}%
        </text>
      ))}
    </svg>
  );
}

export default async function ResultaatPage({
  searchParams,
}: {
  searchParams: Promise<{ student?: string; TC?: string; BSC?: string; LC?: string; BC?: string }>;
}) {
  const params = await searchParams;
  const student = (params.student || "Onbekend").toUpperCase();
  const scores = {
    TC: parseInt(params.TC || "0"),
    BSC: parseInt(params.BSC || "0"),
    LC: parseInt(params.LC || "0"),
    BC: parseInt(params.BC || "0"),
  };

  const gesorteerd = (Object.entries(scores) as [keyof typeof PROFIELEN, number][]).sort(([, a], [, b]) => b - a);
  const topKey = gesorteerd[0][0];
  const top = PROFIELEN[topKey];

  return (
    <div style={{ maxWidth: '740px', margin: '0 auto', padding: '32px 20px 64px' }}>

      {/* ===== HERO RESULT ===== */}
      <div className="card fade-in-up" style={{
        background: `linear-gradient(150deg, #20126E 0%, ${top.kleur} 100%)`,
        color: 'white',
        marginBottom: '20px',
        textAlign: 'center',
        padding: '48px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255,255,255,0.15)',
          padding: '6px 18px',
          borderRadius: '100px',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}>
          Jouw beste match
        </div>

        <h1 style={{
          fontFamily: "'Bitter', serif",
          fontSize: 'clamp(28px, 5vw, 40px)',
          fontWeight: 700,
          marginBottom: '12px',
        }}>
          {top.naam}
        </h1>

        <p style={{
          opacity: 0.85,
          fontSize: '15px',
          lineHeight: 1.7,
          maxWidth: '480px',
          margin: '0 auto 20px',
        }}>
          {top.beschrijving}
        </p>

        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.12)',
          padding: '6px 20px',
          borderRadius: '100px',
          fontSize: '13px',
          fontWeight: 600,
        }}>
          Studentnummer: {student}
        </div>
      </div>

      {/* ===== CHART + BARS ===== */}
      <div className="card fade-in-up" style={{ marginBottom: '20px', animationDelay: '100ms' }}>
        <h2 style={{ fontFamily: "'Bitter', serif", fontSize: '20px', marginBottom: '24px' }}>
          Jouw profielverdeling
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 auto' }}>
            <PieChart scores={scores} />
          </div>
          <div style={{ flex: 1, minWidth: '220px' }}>
            {gesorteerd.map(([key, score]) => {
              const p = PROFIELEN[key];
              return (
                <div key={key} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#20126E' }}>{p.naam}</span>
                    <span style={{ fontWeight: 800, fontSize: '14px', color: p.kleur }}>{score}%</span>
                  </div>
                  <div className="progress-bar-bg" style={{ height: '10px', borderRadius: '5px' }}>
                    <div style={{
                      width: `${score}%`,
                      height: '100%',
                      backgroundColor: p.kleur,
                      borderRadius: '5px',
                      transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== CAREER OPTIONS ===== */}
      <div className="card fade-in-up" style={{ marginBottom: '20px', animationDelay: '200ms' }}>
        <h2 style={{ fontFamily: "'Bitter', serif", fontSize: '20px', marginBottom: '20px' }}>
          Mogelijke functies als {top.naam}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          {top.kansen.map((k) => (
            <div key={k} style={{
              padding: '14px 18px',
              backgroundColor: '#F8F7FC',
              borderRadius: '10px',
              fontSize: '14px',
              color: '#20126E',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              lineHeight: 1.4,
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                backgroundColor: top.kleur, flexShrink: 0,
              }} />
              {k}
            </div>
          ))}
        </div>
      </div>

      {/* ===== ALL PROFILES RANKED ===== */}
      <div className="card fade-in-up" style={{ marginBottom: '32px', animationDelay: '300ms' }}>
        <h2 style={{ fontFamily: "'Bitter', serif", fontSize: '20px', marginBottom: '20px' }}>
          Alle profielen
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {gesorteerd.map(([key, score], i) => {
            const p = PROFIELEN[key];
            return (
              <div key={key} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 20px',
                borderRadius: '12px',
                border: i === 0 ? `2px solid ${p.kleur}` : '2px solid #F0EEF5',
                backgroundColor: i === 0 ? '#FAFAFE' : 'white',
                transition: 'all 0.2s',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  backgroundColor: p.kleur + '15',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '16px', color: p.kleur,
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: '#20126E' }}>
                    {p.naam}
                    {i === 0 && (
                      <span style={{
                        marginLeft: '10px',
                        backgroundColor: p.kleur,
                        color: 'white',
                        padding: '2px 10px',
                        borderRadius: '100px',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}>
                        Beste match
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '13px', color: '#999', marginTop: '2px' }}>
                    {score}% overeenkomst
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="no-print" style={{
        display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap',
      }}>
        <Link href="/" className="btn-secondary" style={{ textDecoration: 'none' }}>
          ← Opnieuw beginnen
        </Link>
        <PrintButton />
      </div>
    </div>
  );
}
