import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "./table.css";
import "./finance.css";

// Helper for flags
function regionToCode(region) {
  const map = { Sweden: "se", Finland: "fi", Norway: "no", Denmark: "dk" };
  return map[region] || "se";
}
function getFlagUrl(code) {
  try {
    return new URL(`../assets/flags/${code}.png`, import.meta.url).href;
  } catch {
    return null;
  }
}

// Hardcoded leagues for now
const LEAGUES = [
  { id: 1, name: "Division 1" },
  { id: 2, name: "Division 2" }
];

export default function League() {
  const [teams, setTeams] = useState([]);
  const [leagueId, setLeagueId] = useState(1);

  // Set leagueId based on user's team on first load
  useEffect(() => {
    const userTeamId = Number(localStorage.getItem("teamId"));
    fetch("http://localhost:4000/teams")
      .then(res => res.json())
      .then(allTeams => {
        const userTeam = allTeams.find(t => t.id === userTeamId);
        if (userTeam) {
          setLeagueId(userTeam.leagueId);
        }
      });
  }, []);

  // Fetch teams for selected league
  useEffect(() => {
    if (!leagueId) return;
    fetch(`http://localhost:4000/teams?leagueId=${leagueId}`)
      .then(res => res.json())
      .then(data => setTeams(data));
  }, [leagueId]);

  const tableHeaders = ["#", "Team", "Played", "Win", "Draw", "Loss", "GF - GA", "Pts"];

  return (
    <Layout title="Table">
      <div className="box-left">
        <div className="finance-box">
          <h3 className="column-header">League</h3>
          <ul>
            <li><strong>Sweden Premier Division</strong></li>
          </ul>
        </div>
        <div className="finance-box">
          <h3 className="th2">PRO</h3>
          <ul>
            <li>Signup for a PRO subscription</li>
          </ul>
        </div>
        <div className="finance-box">
          <h3 className="th2">Top Goalies</h3>
          <ul>
            <li><strong>Pekka Jarmonen 99.99%</strong></li>
          </ul>
        </div>
      </div>

      <div className="box-right">
        <div className="finance-box">
          {/* League selector */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="league-select" style={{ marginRight: 8 }}>Select League:</label>
            <select
              id="league-select"
              value={leagueId}
              onChange={e => setLeagueId(Number(e.target.value))}
            >
              {LEAGUES.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
          <table className="team-table2">
            <thead>
              <tr>
                {tableHeaders.map(h => (
                  <th key={h} className="th1">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => {
                const flag = getFlagUrl(regionToCode(team.region));
                return (
                  <tr key={team.id}>
                    <td>{idx + 1}</td>
                    <td>
                      {flag && (
                        <img
                          src={flag}
                          alt={team.region.toUpperCase()}
                          width="20"
                          height="14"
                          style={{ verticalAlign: "middle", marginRight: 8 }}
                        />
                      )}
                      <Link to={`/team/${team.id}`}>{team.name}</Link>
                    </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0 - 0</td>
                    <td>0</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}