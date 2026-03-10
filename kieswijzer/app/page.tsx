import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center py-16 px-4">
      {/* Hero section */}
      <div className="max-w-2xl w-full text-center mb-12">
        <div className="inline-block mb-6" style={{
          backgroundColor: '#DC1E50',
          color: 'white',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Summa Sport · Profielkeuze
        </div>

        <h1 style={{
          color: '#20126E',
          fontSize: '42px',
          fontWeight: 900,
          lineHeight: 1.15,
          marginBottom: '16px'
        }}>
          Welk sportprofiel past bij jou?
        </h1>

        <p style={{color: '#555', fontSize: '17px', lineHeight: 1.7, marginBottom: '8px'}}>
          Beantwoord 12 korte vragen en ontdek welk Summa Sport profiel het beste bij jou past.
          Je krijgt een persoonlijk advies met een overzicht van jouw scores.
        </p>
      </div>

      {/* Profile cards */}
      <div className="max-w-2xl w-full grid grid-cols-2 gap-4 mb-10">
        {[
          { naam: "Trainer-Coach", omschrijving: "Begeleid sporters naar topprestaties", icon: "🏅" },
          { naam: "Buurtsportcoach", omschrijving: "Maak sport toegankelijk in de wijk", icon: "🤝" },
          { naam: "Leefstijlcoach", omschrijving: "Help mensen gezonder te leven", icon: "💚" },
          { naam: "Bewegingscoach", omschrijving: "Beweegbegeleiding voor speciale doelgroepen", icon: "🌟" },
        ].map((p) => (
          <div key={p.naam} className="card" style={{padding: '20px', textAlign: 'left'}}>
            <div style={{fontSize: '28px', marginBottom: '8px'}}>{p.icon}</div>
            <div style={{fontWeight: 700, color: '#20126E', fontSize: '15px', marginBottom: '4px'}}>{p.naam}</div>
            <div style={{color: '#777', fontSize: '13px', lineHeight: 1.5}}>{p.omschrijving}</div>
          </div>
        ))}
      </div>

      {/* Start card */}
      <div className="card max-w-2xl w-full">
        <h2 style={{color: '#20126E', fontWeight: 800, fontSize: '22px', marginBottom: '8px'}}>
          Start de kieswijzer
        </h2>
        <p style={{color: '#777', fontSize: '14px', marginBottom: '24px'}}>
          Vul je studentnummer in en klik op starten. Je hebt geen account nodig.
        </p>

        <StartForm />
      </div>

      {/* Admin link */}
      <div className="mt-6">
        <Link href="/admin" style={{color: '#20126E', fontSize: '13px', opacity: 0.5, textDecoration: 'underline'}}>
          Docentenoverzicht →
        </Link>
      </div>
    </div>
  );
}

function StartForm() {
  return (
    <form action="/kieswijzer" method="get">
      <label style={{display: 'block', fontWeight: 600, fontSize: '14px', color: '#20126E', marginBottom: '6px'}}>
        Studentnummer
      </label>
      <div style={{display: 'flex', gap: '12px'}}>
        <input
          type="text"
          name="student"
          placeholder="PS123456"
          pattern="[Pp][Ss]\d{6}"
          required
          style={{flex: 1}}
        />
        <button type="submit" className="btn-primary" style={{whiteSpace: 'nowrap'}}>
          Start →
        </button>
      </div>
      <p style={{color: '#999', fontSize: '12px', marginTop: '8px'}}>
        Formaat: PS gevolgd door 6 cijfers, bijv. PS253300
      </p>
    </form>
  );
}
