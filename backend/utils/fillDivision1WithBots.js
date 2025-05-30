const fs = require("fs");
const path = require("path");

const TEAMS_PATH = path.join(__dirname, "../data/teams.json");
const LEAGUE_ID = 1;
const LEAGUE_SIZE = 12;

// Helper to generate a random bot team name
function randomBotName(existingNames = new Set()) {
  const prefixes = [
    "North", "South", "East", "West", "Central", "Lake", "River", "Mountain", "Forest", "Valley",
    "Golden", "Silver", "Iron", "Rapid", "Royal", "Mighty", "Thunder", "Polar", "Blue", "Red"
  ];
  const animals = [
    "Bears", "Wolves", "Eagles", "Lions", "Sharks", "Hawks", "Tigers", "Panthers", "Falcons", "Dragons",
    "Moose", "Owls", "Foxes", "Ravens", "Bulls", "Coyotes", "Stallions", "Gulls", "Otters", "Bisons"
  ];

  let name;
  let tries = 0;
  do {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    name = `${prefix} ${animal} ✚`;
    tries++;
  } while (existingNames.has(name) && tries < 100);

  existingNames.add(name);
  return name;
}

// Read teams
const teams = JSON.parse(fs.readFileSync(TEAMS_PATH, "utf-8"));
const division1Teams = teams.filter(t => t.leagueId === LEAGUE_ID);
const existingBotNames = new Set(teams.map(t => t.name));
let nextId = Math.max(...teams.map(t => t.id)) + 1;

while (division1Teams.length < LEAGUE_SIZE) {
  const botTeam = {
    id: nextId++,
    name: randomBotName(existingBotNames),
    region: "Sweden",
    managerId: null,
    leagueId: LEAGUE_ID,
    isBot: true
  };
  teams.push(botTeam);
  division1Teams.push(botTeam);
  console.log("Added bot team:", botTeam.name);
}

fs.writeFileSync(TEAMS_PATH, JSON.stringify(teams, null, 2));
console.log("Division 1 now has", division1Teams.length, "teams.");