import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "./table.css";
import "./finance.css";
import "./office.css";
import { calculateMarketValue } from "../utils";

// Helper to get flag image URL
function getFlagUrl(code) {
  try {
    return new URL(`../assets/flags/${code.toLowerCase()}.png`, import.meta.url).href;
  } catch {
    return null;
  }
}

const posShort = {
  Center: "C",
  Winger: "W",
  Defender: "D",
  Goalie: "G"
};

export default function Team() {
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("userId");
    if (!raw) return;
    const userId = JSON.parse(raw);

    fetch(`http://localhost:4000/teams/user/${userId}`)
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(err => console.error("Kunde inte hämta laget:", err));
  }, []);

  if (!team) return <p>Ingen data, vänligen logga in.</p>;

  /* -------- hjälpfunktioner -------- */
  function assignLines(players = []) {
    const centers   = players.filter(p => p.position === "Center");
    const wingers   = players.filter(p => p.position === "Winger");
    const defenders = players.filter(p => p.position === "Defender");
    const goalies   = players.filter(p => p.position === "Goalie");

    const lines = [];
    let lineNr = 1;

    // Outfielders: 3 lines, each needs 1C, 2W, 2D
    while (
      lineNr <= 3 &&
      centers.length >= 1 &&
      wingers.length >= 2 &&
      defenders.length >= 2
    ) {
      lines.push(
        { ...centers.shift(),   line: lineNr },
        { ...wingers.shift(),   line: lineNr },
        { ...wingers.shift(),   line: lineNr },
        { ...defenders.shift(), line: lineNr },
        { ...defenders.shift(), line: lineNr }
      );
      lineNr++;
    }

    // Goalies section: first goalie is starter (line: 1), others are backups (line: "-")
    const goaliesSection = goalies.map((g, idx) => ({
      ...g,
      line: idx === 0 ? 1 : "-",
    }));

    // All remaining outfielders go to the bench (line: "-")
    const bench = [...centers, ...wingers, ...defenders].map(p => ({
      ...p,
      line: "-",
    }));

    return [
      ...lines,
      ...goaliesSection,
      ...bench
    ];
  }

  const headers = [
    "Line", "Pos", "Name", "Age", "Str", "Exp", "Form", "Val"
  ];
  const players = assignLines(team.players);

  return (
    <Layout title="Team Management">
      <div className="box-left">
        <div className="finance-box">
          <h3 className="th2">Team Info</h3>
          <ul>
            <li>Team: {team.name}</li>
            <li>Region: {team.region}</li>
            <li>Division: {team.leagueId}</li>
          </ul>
        </div>
        <div className="finance-box">
          <h3 className="th2">Tips</h3>
          <ul>
            <li>Set your best players in lines 1-3.</li>
            <li>Bench players are reserves.</li>
          </ul>
        </div>
        <div className="finance-box">
          <h3 className="th2">Coach</h3>
          <ul>
            <li>Upgrade your coach for better results!</li>
          </ul>
        </div>
      </div>

      <div className="box-right">
        <div className="finance-box">
          <h3 className="th2">{team.name || "Your Team"}</h3>
          <table className="team-table2">
            <thead>
              <tr>{headers.map(h => <th key={h} className="th1">{h}</th>)}</tr>
            </thead>
            <tbody>
              {players.map((p, idx, arr) => {
                const flag = getFlagUrl(p.country);

                // Section header logic
                let sectionLabel = null;
                if (
                  idx === 0 ||
                  (p.line !== arr[idx - 1].line &&
                    (typeof p.line === "number" || p.line === "Goalies" || p.line === "-"))
                ) {
                  if (typeof p.line === "number") sectionLabel = `Line ${p.line}`;
                  else if (p.line === "Goalies") sectionLabel = "Goalies";
                  else if (p.line === "-") sectionLabel = "Bench";
                }

                return (
                  <React.Fragment key={p.id}>
                    {sectionLabel && (
                      <tr
                        className="line-separator"
                        style={
                          sectionLabel === "Bench"
                            ? { background: "#fff", color: "#000", fontWeight: "bold" }
                            : undefined
                        }
                      >
                        <td colSpan={headers.length} style={{ fontWeight: "bold" }}>
                          {sectionLabel}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>
                        {p.line === "Goalies"
                          ? ""
                          : typeof p.line === "number"
                          ? p.line
                          : "-"}
                      </td>
                      <td>{posShort[p.position] || p.position}</td>
                      <td>
                        {flag && (
                          <img
                            src={flag}
                            alt={p.country?.toUpperCase()}
                            width="20"
                            height="14"
                            style={{ verticalAlign: "middle", marginRight: 8 }}
                          />
                        )}
                        <Link to={`/player/${p.id}`}>{p.name}</Link>
                      </td>
                      <td>{p.age}</td>
                      <td>{p.strength}</td>
                      <td>{p.experience}</td>
                      <td>{p.form}</td>
                      <td>{calculateMarketValue(p)}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
