import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kieswijzer | Summa Sport",
  description: "Ontdek welk Summa Sport profiel bij jou past",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{fontFamily: "'Open Sans', sans-serif"}}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <header style={{backgroundColor: '#20126E', color: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(32,18,110,0.2)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <span style={{fontWeight: 900, fontSize: '22px', letterSpacing: '2px', fontFamily: "'Open Sans', sans-serif"}}>SUMMA</span>
              <span style={{backgroundColor: '#DC1E50', color: 'white', padding: '2px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px'}}>
                sport
              </span>
            </div>
            <span style={{fontSize: '12px', opacity: 0.5}}>Kieswijzer Prototype</span>
          </header>
          <main style={{flex: 1, backgroundColor: '#F4F4F4'}}>{children}</main>
          <footer style={{backgroundColor: '#20126E', color: 'rgba(255,255,255,0.4)', fontSize: '12px', textAlign: 'center', padding: '12px'}}>
            Summa Sport · Kieswijzer Prototype · Summa ICT 2025/26
          </footer>
        </div>
      </body>
    </html>
  );
}
