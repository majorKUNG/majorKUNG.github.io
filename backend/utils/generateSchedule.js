const fs = require("fs");
const path = require("path");

function getNextMatchId() {
  const idStorePath = path.join(__dirname, "../data/idStore.json");
  const idStore = JSON.parse(fs.readFileSync(idStorePath, "utf-8"));
  const nextId = idStore.lastMatchId + 1;
  idStore.lastMatchId = nextId;
  fs.writeFileSync(idStorePath, JSON.stringify(idStore, null, 2));
  return nextId;
}

function roundRobinAlternating(teams) {
  const n = teams.length;
  const rounds = n - 1;
  const half = n / 2;
  const schedule = [];

  // Copy to avoid mutation
  const teamList = [...teams];
  if (n % 2 !== 0) teamList.push({ id: null, name: "BYE" });

  for (let round = 0; round < rounds; round++) {
    const matches = [];
    for (let i = 0; i < half; i++) {
      let home, away;
      if (round % 2 === 0) {
        home = teamList[i];
        away = teamList[n - 1 - i];
      } else {
        home = teamList[n - 1 - i];
        away = teamList[i];
      }
      if (home.id && away.id) {
        matches.push({ home, away });
      }
    }
    schedule.push(matches);
    // Rotate teams except the first
    teamList.splice(1, 0, teamList.pop());
  }
  return schedule;
}

function generateSchedule(teams, leagueId = 1) {
  const firstHalf = roundRobinAlternating(teams);
  // Reverse home/away for second half
  const secondHalf = firstHalf.map(round =>
    round.map(match => ({
      home: match.away,
      away: match.home,
    }))
  );

  const allRounds = [...firstHalf, ...secondHalf];
  let matchDay = 1;
  const matches = [];

  for (const round of allRounds) {
    for (const match of round) {
      matches.push({
        id: getNextMatchId(),
        leagueId, // Add this line
        homeTeamName: match.home.name,
        awayTeamName: match.away.name,
        homeTeamId: match.home.id,
        awayTeamId: match.away.id,
        date: matchDay,
        played: false,
        homeScore: null,
        awayScore: null,
      });
    }
    matchDay++;
  }
  return matches;
}

module.exports = generateSchedule;