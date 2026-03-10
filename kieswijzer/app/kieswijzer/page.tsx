import KieswijzerClient from "./KieswijzerClient";

export default function KieswijzerPage({
  searchParams,
}: {
  searchParams: { student?: string };
}) {
  const studentnummer = searchParams.student?.toUpperCase() || "";
  return <KieswijzerClient studentnummer={studentnummer} />;
}
