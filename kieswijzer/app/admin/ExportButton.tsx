"use client";

export default function ExportButton() {
  return (
    <button
      className="btn-primary"
      style={{ fontSize: '14px', padding: '10px 18px' }}
      onClick={() => alert("Excel export beschikbaar in V3 (Supabase-koppeling)")}
    >
      📊 Exporteer Excel
    </button>
  );
}
