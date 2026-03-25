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
  "Leefstijlcoach": "#008273",
  "Bewegingscoach": "#FF8F1C",
};

export default function AdminPage() {
  const verdeling = DEMO_RESULTATEN.reduce((acc, r) => {
    acc[r.topProfiel] = (acc[r.topProfiel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 20px 64px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <span className="badge badge-fuchsia" style={{ marginBottom: '8px', display: 'inline-flex' }}>
            Docentenpaneel
          </span>
          <h1 style={{
            fontFamily: "'Bitter', serif",
            color: '#20126E',
            fontSize: '32px',
            marginTop: '8px',
          }}>
            Kieswijzer Overzicht
          </h1>
          <p style={{ color: '#999', fontSize: '14px', marginTop: '4px' }}>
            Demo data · V3 koppelt dit aan Supabase
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <ExportButton />
          <Link href="/" className="btn-secondary" style={{
            textDecoration: 'none',
            fontSize: '14px',
            padding: '12px 24px',
          }}>
            ← Kieswijzer
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '14px',
        marginBottom: '24px',
      }}>
        {[
          { label: "Totaal ingevuld", waarde: DEMO_RESULTATEN.length, kleur: "#20126E" },
          { label: "Trainer-Coach", waarde: verdeling["Trainer-Coach"] || 0, kleur: "#20126E" },
          { label: "Buurtsportcoach", waarde: verdeling["Buurtsportcoach"] || 0, kleur: "#DC1E50" },
          { label: "Leefstijlcoach", waarde: verdeling["Leefstijlcoach"] || 0, kleur: "#008273" },
          { label: "Bewegingscoach", waarde: verdeling["Bewegingscoach"] || 0, kleur: "#FF8F1C" },
        ].map((s) => (
          <div key={s.label} className="card" style={{ padding: '24px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 900, color: s.kleur, fontFamily: "'Bitter', serif" }}>
              {s.waarde}
            </div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '6px', fontWeight: 600 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Distribution bars */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: "'Bitter', serif", fontSize: '18px', marginBottom: '24px' }}>
          Profielverdeling
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {Object.entries(verdeling).sort(([,a],[,b]) => b - a).map(([profiel, aantal]) => {
            const pct = Math.round((aantal / DEMO_RESULTATEN.length) * 100);
            return (
              <div key={profiel}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#20126E' }}>{profiel}</span>
                  <span style={{ fontWeight: 800, fontSize: '14px', color: KLEUR[profiel] }}>
                    {aantal} ({pct}%)
                  </span>
                </div>
                <div className="progress-bar-bg" style={{ height: '10px', borderRadius: '5px' }}>
                  <div style={{
                    width: `${pct}%`, height: '100%',
                    backgroundColor: KLEUR[profiel],
                    borderRadius: '5px',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results table */}
      <div className="card">
        <h2 style={{ fontFamily: "'Bitter', serif", fontSize: '18px', marginBottom: '20px' }}>
          Alle resultaten
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="summa-table">
            <thead>
              <tr>
                {['Studentnr.', 'Beste match', 'TC', 'BSC', 'LC', 'BC', 'Datum', ''].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEMO_RESULTATEN.map((r) => (
                <tr key={r.student}>
                  <td style={{ fontWeight: 700 }}>{r.student}</td>
                  <td>
                    <span style={{
                      backgroundColor: KLEUR[r.topProfiel] + '18',
                      color: KLEUR[r.topProfiel],
                      padding: '4px 12px',
                      borderRadius: '100px',
                      fontWeight: 700,
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                    }}>
                      {r.topProfiel}
                    </span>
                  </td>
                  <td style={{ color: '#666' }}>{r.TC}%</td>
                  <td style={{ color: '#666' }}>{r.BSC}%</td>
                  <td style={{ color: '#666' }}>{r.LC}%</td>
                  <td style={{ color: '#666' }}>{r.BC}%</td>
                  <td style={{ color: '#999', fontSize: '12px' }}>{r.datum}</td>
                  <td>
                    <Link href={`/resultaat?student=${r.student}&TC=${r.TC}&BSC=${r.BSC}&LC=${r.LC}&BC=${r.BC}`}
                      style={{ color: '#DC1E50', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                      Bekijk →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '14px 18px',
          backgroundColor: '#F8F7FC',
          borderRadius: '10px',
          fontSize: '13px',
          color: '#999',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            backgroundColor: '#DC1E50', flexShrink: 0,
          }} />
          Dit is demo data. In de volgende versie worden echte resultaten opgeslagen via Supabase.
        </div>
      </div>
    </div>
  );
}
