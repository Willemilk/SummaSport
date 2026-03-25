"use client";

export default function ExportButton() {
  const handleExport = () => {
    // Demo CSV export
    const header = "Studentnummer,Beste Match,Trainer-Coach %,Buurtsportcoach %,Leefstijlcoach %,Bewegingscoach %,Datum";
    const rows = [
      "PS253300,Trainer-Coach,58,17,17,8,10-03-2026",
      "PS253301,Leefstijlcoach,8,25,50,17,10-03-2026",
      "PS253302,Buurtsportcoach,17,50,17,17,09-03-2026",
      "PS253303,Bewegingscoach,8,17,17,58,09-03-2026",
      "PS253304,Trainer-Coach,42,25,17,17,08-03-2026",
    ];
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kieswijzer_resultaten.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="btn-primary" style={{ fontSize: '14px', padding: '12px 24px' }} onClick={handleExport}>
      Exporteer CSV
    </button>
  );
}
