import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./table.css";
import "./finance.css";
import "./office.css";
import Layout from "../components/Layout";

// Helper to get flag image URL
function getFlagUrl(code) {
  try {
    return new URL(`../assets/flags/${code.toLowerCase()}.png`, import.meta.url).href;
  } catch {
    return null;
  }
}

// En enkel bar-komponent
function ProgressBar({ progress }) {
  return (
    <div style={{ background: "#ddd", borderRadius: "4px", height: "16px", width: "100%" }}>
      <div
        style={{
          width: `${progress}%`,
          background: "#1f4f82",
          height: "100%",
          borderRadius: "4px"
        }}
      />
    </div>
  );
}

function updatePlayerTraining(id, progress, strength) {
  fetch(`http://localhost:4000/players/${id}/training`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ progress, strength }),
  });
}

export default function Training() {
  const [players, setPlayers] = useState([]);
  const userTeamId = Number(localStorage.getItem("teamId")); // <-- FIXED

  useEffect(() => {
    if (!userTeamId) return;
    fetch(`http://localhost:4000/players/team/${userTeamId}`)
      .then(res => res.json())
      .then(data => {
        const initialized = data.map((p) => ({
          ...p,
          progress: p.progress ?? Math.floor(Math.random() * 100)
        }));
        setPlayers(initialized);
      })
      .catch(err => console.error("Kunde inte hämta spelare:", err));
  }, [userTeamId]);

  // Simulera daglig progression (du kan byta till riktig "tick" sen)
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((prev) =>
        prev.map((p) => {
          let newProgress = p.progress + 1; // Öka progression med 1% varje "dag"
          let newStrength = p.strength; // Behåll styrkan

          if (newProgress >= 100) {
            newProgress = 0;
            newStrength += 1;
          }

          // Update backend
          updatePlayerTraining(p.id, newProgress, newStrength);

          return {
            ...p,
            strength: newStrength,
            progress: newProgress,
          };
        })
      );
    }, 300000); // Var 3:e sekund = 1 "dag"

    return () => clearInterval(interval);
  }, []);

  const headers = ["Name", "Position", "Strength", "Experience", "Form", "Training Progress"];

  return (
    <Layout title="Training Center">
      <div className="box-left">
        <div className="finance-box">
          <h3 className="th2">Training Info</h3>
          <ul>
            <li>Players gain +1 strength every 100% progress.</li>
            <li>Progress increases every day.</li>
          </ul>
        </div>
        <div className="finance-box">
          <h3 className="th2">Tips</h3>
          <ul>
            <li>Players with high form train faster.</li>
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
          <h3 className="th2">Irsta Vikings</h3>
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
                    No players loaded.
                  </td>
                </tr>
              ) : (
                players.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.country && (
                        <img
                          src={getFlagUrl(p.country)}
                          alt={p.country.toUpperCase()}
                          width="20"
                          height="14"
                          style={{ verticalAlign: "middle", marginRight: 8 }}
                        />
                      )}
                      {p.name}
                    </td>
                    <td>{p.position}</td>
                    <td>{p.strength}</td>
                    <td>{p.experience}</td>
                    <td>{p.form}</td>
                    <td>
                      <ProgressBar progress={p.progress} />
                    </td>
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
