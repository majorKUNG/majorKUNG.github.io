// utils/generatePlayers.js

const { getNextPlayerId } = require("./getNextId");
const getRandomName = require("./nameGenerator");

function generatePlayer(position, teamId) {
  return {
    id: getNextPlayerId(),
    name: getRandomName(),
    country: "se",
    position,
    age: Math.floor(Math.random() * 15) + 18,          // 18–32 år
    strength: Math.floor(Math.random() * 16) + 20,     // 20–35
    experience: Math.floor(Math.random() * 11) + 10,   // 10–20
    form: Math.floor(Math.random() * 26) + 75,         // 75–100
    progress: 0,
    teamId,
  };
}

function generatePlayers(teamId) {
  const positions = [
    ...Array(2).fill("Goalie"),
    ...Array(6).fill("Defender"),
    ...Array(6).fill("Winger"),
    ...Array(3).fill("Center"),
  ];

  return positions.map((pos) => generatePlayer(pos, teamId));
}

module.exports = generatePlayers;
