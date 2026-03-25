import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kieswijzer | Summa Sport",
  description: "Ontdek welk Summa Sport profiel bij jou past",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* ===== HEADER ===== */}
          <header style={{
            backgroundColor: '#20126E',
            color: 'white',
            padding: '0 28px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            boxShadow: '0 2px 12px rgba(32,18,110,0.25)',
          }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white' }}>
              {/* SUMMA wordmark */}
              <svg width="110" height="28" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="23" fill="white" fontFamily="'Open Sans', sans-serif" fontWeight="900" fontSize="26" letterSpacing="1.5">SUMMA</text>
              </svg>
              {/* School badge - Summa Sport uses fuchsia */}
              <span style={{
                backgroundColor: '#DC1E50',
                color: 'white',
                padding: '3px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'lowercase',
              }}>
                sport
              </span>
            </a>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a href="/" style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '100px',
                transition: 'all 0.2s',
              }}>
                Kieswijzer
              </a>
              <a href="/admin" style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '100px',
                transition: 'all 0.2s',
              }}>
                Docenten
              </a>
            </nav>
          </header>

          {/* ===== MAIN ===== */}
          <main style={{ flex: 1, backgroundColor: '#FAFAFE' }}>
            {children}
          </main>

          {/* ===== FOOTER ===== */}
          <footer style={{
            backgroundColor: '#20126E',
            color: 'rgba(255,255,255,0.35)',
            fontSize: '12px',
            textAlign: 'center',
            padding: '20px 24px',
          }}>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>SUMMA</span>
              <span style={{ margin: '0 8px', opacity: 0.3 }}>·</span>
              <span>samen kun je meer</span>
            </div>
            <div>Kieswijzer Summa Sport · Summa ICT 2025/26</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
