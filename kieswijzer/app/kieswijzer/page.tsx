import KieswijzerClient from "./KieswijzerClient";

export default async function KieswijzerPage({
  searchParams,
}: {
  searchParams: Promise<{ student?: string }>;
}) {
  const params = await searchParams;
  const studentnummer = (params.student || "").toUpperCase();

  if (!studentnummer) {
    return (
      <div style={{ maxWidth: '500px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div className="card">
          <h2 style={{ fontFamily: "'Bitter', serif", marginBottom: '12px' }}>Geen studentnummer</h2>
          <p style={{ color: '#777', marginBottom: '24px', fontSize: '15px' }}>
            Je hebt nog geen studentnummer ingevuld. Ga terug naar de startpagina.
          </p>
          <a href="/" className="btn-primary" style={{ textDecoration: 'none' }}>← Terug naar start</a>
        </div>
      </div>
    );
  }

  return <KieswijzerClient studentnummer={studentnummer} />;
}
