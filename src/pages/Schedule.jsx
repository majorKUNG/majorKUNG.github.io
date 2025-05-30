import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "./table.css";
import "./finance.css";

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/schedule")
      .then(res => res.json())
      .then(data => setSchedule(data))
      .catch(err => console.error("Kunde inte hämta schema:", err));
  }, []);

  const tableHeaders = ["Home", "", "Away", "Result"];

  // Gruppera matcher efter dag
  const matchesPerDay = schedule.reduce((acc, match) => {
    if (!acc[match.date]) acc[match.date] = [];
    acc[match.date].push(match);
    return acc;
  }, {});

  // Get flags

  function regionToCode(region) {
    const map = { Sweden: "se", Finland: "fi", Norway: "no", Denmark: "dk" };
    return map[region] || "se";
  }
  function getFlagUrl(code) {
    return `/assets/flags/${code}.png`;
  }

  return (
    <Layout title="Matchschema">
      <div>
        <div className="finance-box">
        <table className="team-table">
          <thead>
            <tr>
              {tableHeaders.map(h => (
                <th key={h} className="th1">{h}</th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {Object.entries(matchesPerDay).map(([day, matches]) => (
              <>
                <tr
                  key={`day-${day}`}
                  className="line-separator"
                  style={{ background: "#fff" }}
                >
                  <td colSpan={4}>Day {day}</td>
                </tr>
                {matches.map(match => (
                  <tr key={match.id}>
                    <td>
                      <img
                        src={getFlagUrl(regionToCode(match.homeTeamRegion))}
                        alt={match.homeTeamRegion}
                        width={20}
                        height={14}
                        style={{ verticalAlign: "middle", marginRight: 6 }}
                      />
                      <Link to={`/team/${match.homeTeamId}`}>{match.homeTeamName}</Link>
                    </td>
                    <td>vs</td>
                    <td>
                      <img
                        src={getFlagUrl(regionToCode(match.awayTeamRegion))}
                        alt={match.awayTeamRegion}
                        width={20}
                        height={14}
                        style={{ verticalAlign: "middle", marginRight: 6 }}
                      />
                      <Link to={`/team/${match.awayTeamId}`}>{match.awayTeamName}</Link>
                    </td>
                    <td>
                      <Link to={`/match/${match.id}`}>
                        {match.played ? (
                          <strong>{match.homeScore} – {match.awayScore}</strong>
                        ) : (
                          <em>Match Room</em>
                        )}
                      </Link>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </Layout>
  );
}
