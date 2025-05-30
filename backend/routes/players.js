const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const PLAYERS_PATH = path.join(__dirname, "../data/players.json");

// Helper to read/write players
function readPlayers() {
  if (!fs.existsSync(PLAYERS_PATH)) return [];
  return JSON.parse(fs.readFileSync(PLAYERS_PATH, "utf-8"));
}
function writePlayers(players) {
  fs.writeFileSync(PLAYERS_PATH, JSON.stringify(players, null, 2));
}

// Update a player's progress and strength
router.put("/:id/training", (req, res) => {
  const { progress, strength } = req.body;
  const players = readPlayers();
  const idx = players.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Player not found" });

  players[idx].progress = progress;
  players[idx].strength = strength;
  writePlayers(players);
  res.json(players[idx]);
});

router.get("/team/:teamId", (req, res) => {
  const playersPath = path.join(__dirname, "../data/players.json");
  if (!fs.existsSync(playersPath)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(playersPath, "utf-8"));
  const teamPlayers = data.filter(p => p.teamId === Number(req.params.teamId));
  res.json(teamPlayers);
});

module.exports = router;