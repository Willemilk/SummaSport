"use client";

export default function PrintButton() {
  return (
    <button className="btn-primary" onClick={() => window.print()}>
      Resultaat opslaan
    </button>
  );
}
