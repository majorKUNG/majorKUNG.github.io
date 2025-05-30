const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const SCHEDULE_PATH = path.join(__dirname, "..", "data", "schedule.json");
const TEAMS_PATH = path.join(__dirname, "..", "data", "teams.json");

router.get("/", (req, res) => {
  if (!fs.existsSync(SCHEDULE_PATH)) return res.json([]);
  if (!fs.existsSync(TEAMS_PATH)) return res.json([]);

  const schedule = JSON.parse(fs.readFileSync(SCHEDULE_PATH, "utf-8"));
  const teams = JSON.parse(fs.readFileSync(TEAMS_PATH, "utf-8"));

  const getTeam = id => teams.find(t => t.id === Number(id));

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

module.exports = router;
