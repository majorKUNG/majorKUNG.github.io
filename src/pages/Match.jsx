import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Match() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/match/${id}`)
      .then(res => res.json())
      .then(data => setMatch(data));
  }, [id]);

  if (!match) return <Layout title="Match">Laddar...</Layout>;

  return (
    <Layout title={`Match ${match.id}`}>
      <div className="finance-box">
        <h2>{match.homeTeamName} vs {match.awayTeamName}</h2>
        <p>Resultat: {match.played ? `${match.homeScore} – ${match.awayScore}` : "Ej spelad"}</p>
        {/* Add more match info here */}
      </div>
    </Layout>
  );
}