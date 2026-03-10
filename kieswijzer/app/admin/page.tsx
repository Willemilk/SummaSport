import Link from "next/link";
import ExportButton from "./ExportButton";

const DEMO_RESULTATEN = [
  { student: "PS253300", topProfiel: "Trainer-Coach", TC: 58, BSC: 17, LC: 17, BC: 8, datum: "10-03-2026" },
  { student: "PS253301", topProfiel: "Leefstijlcoach", TC: 8, BSC: 25, LC: 50, BC: 17, datum: "10-03-2026" },
  { student: "PS253302", topProfiel: "Buurtsportcoach", TC: 17, BSC: 50, LC: 17, BC: 17, datum: "09-03-2026" },
  { student: "PS253303", topProfiel: "Bewegingscoach", TC: 8, BSC: 17, LC: 17, BC: 58, datum: "09-03-2026" },
  { student: "PS253304", topProfiel: "Trainer-Coach", TC: 42, BSC: 25, LC: 17, BC: 17, datum: "08-03-2026" },
];

const KLEUR: Record<string, string> = {
  "Trainer-Coach": "#20126E",
  "Buurtsportcoach": "#DC1E50",
  "Leefstijlcoach": "#47D7AC",
  "Bewegingscoach": "#FF8F1C",
};

export default function AdminPage() {
  const verdeling = DEMO_RESULTATEN.reduce((acc, r) => {
    acc[r.topProfiel] = (acc[r.topProfiel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#DC1E50', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
            Docentenpaneel
          </div>
          <h1 style={{ color: '#20126E', fontWeight: 900, fontSize: '28px', margin: 0 }}>Kieswijzer Overzicht</h1>
          <p style={{ color: '#777', fontSize: '14px', marginTop: '4px' }}>Demo data · V3 koppelt dit aan Supabase</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <ExportButton />
          <Link href="/" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '14px', padding: '10px 18px' }}>
            ← Kieswijzer
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: "Ingevuld", waarde: DEMO_RESULTATEN.length, kleur: "#20126E" },
          { label: "Trainer-Coach", waarde: verdeling["Trainer-Coach"] || 0, kleur: "#20126E" },
          { label: "Buurtsportcoach", waarde: verdeling["Buurtsportcoach"] || 0, kleur: "#DC1E50" },
          { label: "Leefstijlcoach / BC", waarde: (verdeling["Leefstijlcoach"] || 0) + (verdeling["Bewegingscoach"] || 0), kleur: "#47D7AC" },
        ].map((s) => (
          <div key={s.label} className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 900, color: s.kleur }}>{s.waarde}</div>
            <div style={{ fontSize: '12px', color: '#777', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Verdeling */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#20126E', fontWeight: 800, fontSize: '17px', marginBottom: '20px' }}>Profielverdeling</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(verdeling).sort(([,a],[,b]) => b - a).map(([profiel, aantal]) => {
            const pct = Math.round((aantal / DEMO_RESULTATEN.length) * 100);
            return (
              <div key={profiel}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px', color: '#20126E' }}>{profiel}</span>
                  <span style={{ fontWeight: 800, fontSize: '14px', color: KLEUR[profiel] }}>{aantal} student{aantal !== 1 ? 'en' : ''} ({pct}%)</span>
                </div>
                <div className="progress-bar-bg">
                  <div style={{ width: `${pct}%`, height: '100%', backgroundColor: KLEUR[profiel], borderRadius: '3px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabel */}
      <div className="card">
        <h2 style={{ color: '#20126E', fontWeight: 800, fontSize: '17px', marginBottom: '20px' }}>Alle resultaten</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                {['Studentnr.', 'Beste match', 'TC', 'BSC', 'LC', 'BC', 'Datum', ''].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#20126E', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEMO_RESULTATEN.map((r) => (
                <tr key={r.student} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#20126E' }}>{r.student}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ backgroundColor: KLEUR[r.topProfiel] + '22', color: KLEUR[r.topProfiel], padding: '3px 10px', borderRadius: '4px', fontWeight: 700, fontSize: '13px' }}>
                      {r.topProfiel}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#555' }}>{r.TC}%</td>
                  <td style={{ padding: '10px 12px', color: '#555' }}>{r.BSC}%</td>
                  <td style={{ padding: '10px 12px', color: '#555' }}>{r.LC}%</td>
                  <td style={{ padding: '10px 12px', color: '#555' }}>{r.BC}%</td>
                  <td style={{ padding: '10px 12px', color: '#999', fontSize: '12px' }}>{r.datum}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <Link href={`/resultaat?student=${r.student}&TC=${r.TC}&BSC=${r.BSC}&LC=${r.LC}&BC=${r.BC}`}
                      style={{ color: '#DC1E50', fontSize: '12px', textDecoration: 'underline' }}>
                      Bekijk →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#FFF8F0', borderRadius: '8px', fontSize: '13px', color: '#888' }}>
          ℹ️ Dit is demo data. In V3 worden echte resultaten opgeslagen via Supabase.
        </div>
      </div>
    </div>
  );
}
