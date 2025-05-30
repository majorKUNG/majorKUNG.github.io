// ... befintliga imports ...
const {
  getNextUserId,
  getNextTeamId,
  getNextPlayerId,
} = require("./utils/getNextId");

const generatePlayers = require("./utils/generatePlayers");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "dist")));

// ----- Data paths -----
const USERS_PATH = path.join(__dirname, "data", "users.json");
const TEAMS_PATH = path.join(__dirname, "data", "teams.json");
const PLAYERS_PATH = path.join(__dirname, "data", "players.json");
const SCHEDULE_PATH = path.join(__dirname, "data", "schedule.json");

// ----- Scheduler -----
const scheduleRouter = require("./routes/schedule");
app.use("/schedule", scheduleRouter);

// ----- Match -----
const matchRouter = require("./routes/match");
app.use("/match", matchRouter);

// ----- Teams -----
app.get("/teams", (req, res) => {
  const leagueId = Number(req.query.leagueId);
  const teams = readTeams();
  if (leagueId) {
    return res.json(teams.filter(t => t.leagueId === leagueId));
  }
  res.json(teams);
});

// ----- Players -----
const playersRouter = require("./routes/players");
app.use("/players", playersRouter);
app.get("/players", (req, res) => {
  const playersPath = path.join(__dirname, "data", "players.json");
  if (!fs.existsSync(playersPath)) return res.json([]);
  const data = fs.readFileSync(playersPath, "utf-8");
  let players = JSON.parse(data);
  if (req.query.teamId) {
    players = players.filter(p => String(p.teamId) === String(req.query.teamId));
  }
  res.json(players);
});
app.get("/players/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const playersPath = path.join(__dirname, "data", "players.json");
  if (!fs.existsSync(playersPath)) return res.status(404).json({ error: "No players file" });
  const data = fs.readFileSync(playersPath, "utf-8");
  const players = JSON.parse(data);
  const player = players.find(p => p.id === id);
  if (!player) return res.status(404).json({ error: "Player not found" });
  res.json(player);
});

// ----- Read/write helpers -----
function readUsers() {
  if (!fs.existsSync(USERS_PATH)) return [];
  const data = fs.readFileSync(USERS_PATH, "utf-8");
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

function readTeams() {
  if (!fs.existsSync(TEAMS_PATH)) return [];
  const data = fs.readFileSync(TEAMS_PATH, "utf-8");
  return JSON.parse(data);
}

function writeTeams(teams) {
  fs.writeFileSync(TEAMS_PATH, JSON.stringify(teams, null, 2));
}

/** use the function to find players */
function readPlayers() {
  if (!fs.existsSync(PLAYERS_PATH)) return [];
  const data = fs.readFileSync(PLAYERS_PATH, "utf-8"); 
  return JSON.parse(data);
}

function writePlayers(players) {
  fs.writeFileSync(PLAYERS_PATH, JSON.stringify(players, null, 2));
}

// ----- Schedule -----
function readSchedule() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "data", "schedule.json"), "utf-8"));
}
function writeSchedule(schedule) {
  fs.writeFileSync(path.join(__dirname, "data", "schedule.json"), JSON.stringify(schedule, null, 2));
}

// ----- Register -----
app.post("/register", (req, res) => {
  const { managerName, region, teamName, email, password } = req.body;

  if (!managerName || !region || !teamName || !email || !password) {
    return res.status(400).json({ message: "Alla fält krävs" });
  }

  const users = readUsers();
  const teams = readTeams();
  const players = readPlayers();

  if (users.find(user => user.email === email)) {
    return res.status(409).json({ message: "E-post redan registrerad" });
  }

  // --- LEAGUE LOGIC START ---
  const LEAGUE_SIZE = 12;

  // 1. Count teams per league
  const leagueCounts = {};
  teams.forEach(t => {
    if (typeof t.leagueId === "number") {
      leagueCounts[t.leagueId] = (leagueCounts[t.leagueId] || 0) + 1;
    }
  });

  // 2. Try to find a league with a bot to replace
  let leagueId = 1;
  let botIndex = -1;
  let foundBot = false;
  const maxLeagueId = Math.max(1, ...Object.keys(leagueCounts).map(Number));

  for (let lid = 1; lid <= maxLeagueId; lid++) {
    const divisionTeams = teams.filter(t => t.leagueId === lid);
    if (divisionTeams.length >= LEAGUE_SIZE) {
      // Look for a bot in this league
      botIndex = teams.findIndex(t => t.leagueId === lid && t.isBot);
      if (botIndex !== -1) {
        leagueId = lid;
        foundBot = true;
        break;
      }
    } else {
      // This league has space, use it
      leagueId = lid;
      foundBot = false;
      break;
    }
  }

  // 3. If all leagues are full and no bots, create a new league
  if (!foundBot && leagueCounts[leagueId] >= LEAGUE_SIZE) {
    leagueId = maxLeagueId + 1;
  }

  // 4. Now, either replace a bot or add a new team
  const newUserId = getNextUserId();
  const newTeamId = getNextTeamId();

  if (foundBot && botIndex !== -1) {
    const oldBotTeam = teams[botIndex];
    teams[botIndex] = {
      id: oldBotTeam.id,
      name: teamName,
      region,
      managerId: newUserId,
      leagueId,
      isBot: false
    };

    // --- Update schedule ---
    const schedule = readSchedule(); // Add this function if you don't have it
    schedule.forEach(match => {
      if (match.homeTeamId === oldBotTeam.id) {
        match.homeTeamName = teamName;
      }
      if (match.awayTeamId === oldBotTeam.id) {
        match.awayTeamName = teamName;
      }
    });
    writeSchedule(schedule); // Add this function if you don't have it
  } else {
    teams.push({
      id: newTeamId,
      name: teamName,
      region,
      managerId: newUserId,
      leagueId
    });
  }
  // --- LEAGUE LOGIC END ---

  const newPlayers = generatePlayers(foundBot ? teams.find(t => t.managerId === newUserId).id : newTeamId).map(player => ({
    ...player,
    id: getNextPlayerId(),
  }));

  const newUser = {
    id: newUserId,
    managerName,
    email,
    password,
    teamId: foundBot ? teams.find(t => t.managerId === newUserId).id : newTeamId,
  };

  users.push(newUser);
  writeUsers(users);
  writeTeams(teams);
  writePlayers([...players, ...newPlayers]);

  res.status(201).json({
    message: "Användare registrerad",
    userId: newUserId,
    teamId: foundBot ? teams.find(t => t.managerId === newUserId).id : newTeamId,
    teamName: teamName,
    players: newPlayers,
  });
});

// ----- Login -----
app.post("/login", (req, res) => {
  const { managerName, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.managerName === managerName && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.status(200).json({
    message: "Login successful",
    userId: user.id,
    managerName: user.managerName,
    teamId: user.teamId,
  });
});

// ----- Get team and players for user -----
app.get("/teams/user/:userId", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const teams = readTeams();
  const players = readPlayers();

  const team = teams.find(t => t.managerId === userId);
  if (!team) {
    return res.status(404).json({ error: "Inget lag hittades för den användaren" });
  }

  const teamPlayers = players.filter(p => p.teamId === team.id);
  res.json({ ...team, players: teamPlayers });
});

// ----- Get single team by ID -----
app.get("/teams/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const teams = readTeams();
  const team = teams.find(t => t.id === id);
  if (!team) {
    return res.status(404).json({ error: "Team not found" });
  }
  res.json(team);
});

app.get("/schedule", (req, res) => {
  if (!fs.existsSync(SCHEDULE_PATH)) return res.json([]);
  if (!fs.existsSync(TEAMS_PATH)) return res.json([]);

  const schedule = JSON.parse(fs.readFileSync(SCHEDULE_PATH, "utf-8"));
  const teams = JSON.parse(fs.readFileSync(TEAMS_PATH, "utf-8"));

  // Helper to get team by id
  const getTeam = id => teams.find(t => t.id === Number(id));

  // Add region and name to each match
  const scheduleWithRegions = schedule.map(match => {
    const homeTeam = getTeam(match.homeTeamId);
    const awayTeam = getTeam(match.awayTeamId);
    return {
      ...match,
      homeTeamRegion: homeTeam ? homeTeam.region : "Sweden",
      homeTeamName: homeTeam ? homeTeam.name : "Unknown",
      awayTeamRegion: awayTeam ? awayTeam.region : "Sweden",
      awayTeamName: awayTeam ? awayTeam.name : "Unknown"
    };
  });

  res.json(scheduleWithRegions);
});

app.use((req, res, next) => {
  // If the request is not for an API route or static file, serve index.html
  if (
    !req.path.startsWith('/api') &&
    !req.path.startsWith('/players') &&
    !req.path.startsWith('/teams') &&
    !req.path.startsWith('/schedule') &&
    !req.path.startsWith('/match') &&
    !req.path.startsWith('/users') &&
    !req.path.startsWith('/finance') &&
    !req.path.startsWith('/training') &&
    !req.path.startsWith('/league') &&
    !req.path.startsWith('/static')
  ) {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  } else {
    next();
  }
});

// ----- Start server -----
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server kör på http://localhost:${PORT}`);
});
