"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PROFIELEN = [
  {
    naam: "Trainer-Coach",
    omschrijving: "Begeleid sporters naar topprestaties en overwinningen.",
    kleur: "#20126E",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#20126E" strokeWidth="2.5" fill="rgba(32,18,110,0.06)"/><path d="M16 8l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="#20126E"/></svg>
    ),
  },
  {
    naam: "Buurtsportcoach",
    omschrijving: "Maak sport toegankelijk voor iedereen in de wijk.",
    kleur: "#DC1E50",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#DC1E50" strokeWidth="2.5" fill="rgba(220,30,80,0.06)"/><circle cx="12" cy="14" r="3" fill="#DC1E50"/><circle cx="20" cy="14" r="3" fill="#DC1E50"/><path d="M10 22c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#DC1E50" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
  },
  {
    naam: "Leefstijlcoach",
    omschrijving: "Help mensen gezonder en gelukkiger te leven.",
    kleur: "#008273",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#008273" strokeWidth="2.5" fill="rgba(0,130,115,0.06)"/><path d="M16 10c-3 0-6 3-6 6s3 6 6 6 6-3 6-6-3-6-6-6z" fill="none" stroke="#008273" strokeWidth="2"/><path d="M16 13v6M13 16h6" stroke="#008273" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
  },
  {
    naam: "Bewegingscoach",
    omschrijving: "Beweegbegeleiding voor bijzondere doelgroepen.",
    kleur: "#FF8F1C",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#FF8F1C" strokeWidth="2.5" fill="rgba(255,143,28,0.06)"/><path d="M12 20l4-8 4 8M14 17h4" stroke="#FF8F1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
];

export default function Home() {
  const router = useRouter();
  const [studentnummer, setStudentnummer] = useState("");
  const [error, setError] = useState("");

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const pattern = /^[Pp][Ss]\d{6}$/;
    if (!pattern.test(studentnummer)) {
      setError("Vul een geldig studentnummer in (bijv. PS253300)");
      return;
    }
    setError("");
    router.push(`/kieswijzer?student=${studentnummer.toUpperCase()}`);
  };

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section style={{
        background: 'linear-gradient(160deg, #20126E 0%, #3a1f9e 40%, #DC1E50 100%)',
        color: 'white',
        padding: '80px 24px 96px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-120px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(244,145,200,0.1)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-40px',
          width: '240px', height: '240px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }} />

        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="fade-in-up" style={{ animationDelay: '0ms' }}>
            <span className="badge" style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              color: 'white',
              marginBottom: '20px',
              display: 'inline-flex',
            }}>
              Summa Sport · Profielkeuze
            </span>
          </div>

          <h1 className="fade-in-up" style={{
            fontFamily: "'Bitter', serif",
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '20px',
            animationDelay: '80ms',
          }}>
            Welk sportprofiel<br />past bij jou?
          </h1>

          <p className="fade-in-up" style={{
            fontSize: '18px',
            lineHeight: 1.7,
            opacity: 0.85,
            maxWidth: '540px',
            marginBottom: '40px',
            animationDelay: '160ms',
          }}>
            Beantwoord 12 korte vragen en ontdek welk Summa Sport profiel
            het beste bij jou past. Je krijgt direct een persoonlijk advies.
          </p>

          {/* Start form */}
          <form onSubmit={handleStart} className="fade-in-up" style={{ animationDelay: '240ms' }}>
            <div style={{
              display: 'flex', gap: '12px',
              maxWidth: '440px',
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <input
                  type="text"
                  value={studentnummer}
                  onChange={(e) => { setStudentnummer(e.target.value); setError(""); }}
                  placeholder="Studentnummer (PS123456)"
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '100px',
                    border: error ? '2px solid #FF6B6B' : '2px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.12)',
                    color: 'white',
                    fontSize: '16px',
                    fontFamily: "'Open Sans', sans-serif",
                    outline: 'none',
                    backdropFilter: 'blur(8px)',
                  }}
                />
                {error && (
                  <p style={{ color: '#FFB4B4', fontSize: '13px', marginTop: '8px', paddingLeft: '20px' }}>
                    {error}
                  </p>
                )}
              </div>
              <button type="submit" style={{
                background: 'white',
                color: '#DC1E50',
                padding: '16px 36px',
                borderRadius: '100px',
                border: 'none',
                fontWeight: 800,
                fontSize: '16px',
                fontFamily: "'Open Sans', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.25s',
                whiteSpace: 'nowrap',
              }}>
                Start →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ===== PROFIELEN SECTION ===== */}
      <section style={{
        maxWidth: '880px',
        margin: '-48px auto 0',
        padding: '0 24px 64px',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '16px',
        }} className="stagger">
          {PROFIELEN.map((p, i) => (
            <div key={p.naam} className="card card-hover fade-in-up" style={{
              padding: '28px 24px',
              textAlign: 'left',
              animationDelay: `${i * 80}ms`,
              borderTop: `3px solid ${p.kleur}`,
            }}>
              <div style={{ marginBottom: '14px' }}>{p.icon}</div>
              <div style={{
                fontFamily: "'Bitter', serif",
                fontWeight: 700,
                color: p.kleur,
                fontSize: '16px',
                marginBottom: '6px',
                lineHeight: 1.3,
              }}>
                {p.naam}
              </div>
              <div style={{ color: '#777', fontSize: '13px', lineHeight: 1.6 }}>
                {p.omschrijving}
              </div>
            </div>
          ))}
        </div>

        {/* ===== HOW IT WORKS ===== */}
        <div style={{ marginTop: '64px', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: "'Bitter', serif",
            fontSize: '28px',
            color: '#20126E',
            marginBottom: '12px',
          }}>
            Hoe werkt het?
          </h2>
          <p style={{ color: '#777', fontSize: '15px', marginBottom: '40px' }}>
            In drie simpele stappen naar jouw profieladvies.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            {[
              { stap: "1", titel: "Vul je studentnummer in", tekst: "Zo kunnen docenten je resultaat terugzien." },
              { stap: "2", titel: "Beantwoord 12 vragen", tekst: "Kies het antwoord dat het beste bij jou past." },
              { stap: "3", titel: "Bekijk je advies", tekst: "Je ziet direct welk profiel het beste bij je past." },
            ].map((s) => (
              <div key={s.stap} style={{ textAlign: 'center', padding: '8px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #DC1E50, #F491C8)',
                  color: 'white',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '20px',
                  fontFamily: "'Bitter', serif",
                  marginBottom: '14px',
                }}>
                  {s.stap}
                </div>
                <div style={{
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#20126E',
                  marginBottom: '6px',
                }}>
                  {s.titel}
                </div>
                <div style={{ color: '#999', fontSize: '13px', lineHeight: 1.6 }}>
                  {s.tekst}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
