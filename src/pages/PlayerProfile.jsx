import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function PlayerProfile() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/players/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Player not found");
        return res.json();
      })
      .then(data => setPlayer(data))
      .catch(() => setPlayer(null));
  }, [id]);

  if (!player) return <p>Loading...</p>;

  const posShort = {
    Center: "C",
    Winger: "W",
    Defender: "D",
    Goalie: "G"
  };

  return (
    <Layout title={`Player Profile: ${player.name}`}>
      <div className="box-left">
        <div className="finance-box">
          <h3 className="th2">Player Info</h3>
          <ul>
            <li><strong>Name:</strong> {player.name}</li>
            <li><strong>Position:</strong> {posShort[player.position] || player.position}</li>
            <li><strong>Country:</strong> {player.country?.toUpperCase()}</li>
            <li><strong>Team ID:</strong> {player.teamId}</li>
          </ul>
        </div>
        <div className="finance-box">
          <h3 className="th2">Attributes</h3>
          <ul>
            <li><strong>Age:</strong> {player.age}</li>
            <li><strong>Strength:</strong> {player.strength}</li>
            <li><strong>Experience:</strong> {player.experience}</li>
            <li><strong>Form:</strong> {player.form}</li>
          </ul>
        </div>
      </div>
      <div className="box-right">
        <div className="finance-box">
          <h3 className="th2">{player.name}</h3>
          <p>
            <strong>Position:</strong> {posShort[player.position] || player.position}<br />
            <strong>Country:</strong> {player.country?.toUpperCase()}<br />
            <strong>Team ID:</strong> {player.teamId}<br />
            <strong>Age:</strong> {player.age}<br />
            <strong>Strength:</strong> {player.strength}<br />
            <strong>Experience:</strong> {player.experience}<br />
            <strong>Form:</strong> {player.form}
          </p>
        </div>
      </div>
    </Layout>
  );
}