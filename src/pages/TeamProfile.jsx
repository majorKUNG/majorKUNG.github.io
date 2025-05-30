import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function TeamProfile() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/teams/${id}`)
      .then(res => res.json())
      .then(data => setTeam(data));
    fetch(`http://localhost:4000/players`)
      .then(res => res.json())
      .then(data => setPlayers(data.filter(p => String(p.teamId) === String(id))));
  }, [id]);

function regionToCode(region) {
  const map = { Sweden: "se", Finland: "fi", Norway: "no", Denmark: "dk" };
  return map[region] || "se";
}
function getFlagUrl(code) {
  return `/assets/flags/${code}.png`;
}

  if (!team) return <p>Loading...</p>;

  const headers = ["Pos", "Name", "Age", "Str", "Exp", "Form"];

  // Helper for position short
  const posShort = {
    Center: "C",
    Winger: "W",
    Defender: "D",
    Goalie: "G"
  };

  return (
    <Layout title={`Team Office: ${team.name}`}>
      <div className="box-left">
        <div className="finance-box">
          <h3 className="th2">Team Info</h3>
          <ul>
            <li>Team: {team.name}</li>
            <li>
              Region: <img
                src={getFlagUrl(regionToCode(team.region))}
                alt={team.region}
                width={20}
                height={14}
                style={{ verticalAlign: "middle", marginRight: 6 }}
              /> {team.region}
            </li>
            <li>Division: {team.leagueId}</li>
            {team.isBot !== undefined && (
              <li>Type: {team.isBot ? "Bot" : "Human"}</li>
            )}
          </ul>
        </div>
        <div className="finance-box">
          <h3 className="th2">Team Logo</h3>
          <ul>
            <li>
              {team.managerId
                ? `Manager ID: ${team.managerId}`
                : "No manager assigned"}
            </li>
          </ul>
        </div>
        <div className="finance-box">
          <h3 className="th2">Actions</h3>
          <ul>
            <li>
              {/* You can add actions or links here if needed */}
              <em>View roster, stats, or challenge this team!</em>
            </li>
          </ul>
        </div>
      </div>
      <div className="box-right">
        <div className="finance-box">
          <h3 className="th2">{team.name}</h3>
          <p>
            <strong>Region:</strong> {team.region}
            <br />
            <strong>Division:</strong> {team.leagueId}
            <br />
            <strong>Team ID:</strong> {team.managerId ?? "None"}
            <br />
            <strong>Type:</strong> {team.isBot ? "Bot" : "Human"}
          </p>
        </div>
        <div className="finance-box">
          <h3 className="th2">{team.name} Roster</h3>
          <table className="team-table2">
            <thead>
              <tr>
                {headers.map(h => (
                  <th key={h} className="th1">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {players.length === 0 ? (
                <tr>
                  <td colSpan={headers.length} style={{ textAlign: "center" }}>
                    No players found.
                  </td>
                </tr>
              ) : (
                players.map(p => (
                  <tr key={p.id}>
                    <td>{posShort[p.position] || p.position}</td>
                    <td>
                      <img
                        src={getFlagUrl(p.country)}
                        alt={p.country?.toUpperCase()}
                        width={20}
                        height={14}
                        style={{ verticalAlign: "middle", marginRight: 6 }}
                      />
                      <Link to={`/player/${p.id}`}>{p.name}</Link>
                    </td>
                    <td>{p.age}</td>
                    <td>{p.strength}</td>
                    <td>{p.experience}</td>
                    <td>{p.form}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}