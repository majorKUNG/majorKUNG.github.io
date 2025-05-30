// node backend/utils/resetData.js

const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");

const filesToEmpty = [
  "users.json",
  "teams.json",
  "schedule.json",
  "players.json"
];

filesToEmpty.forEach(filename => {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, "[]", "utf-8");
  console.log(`Emptied ${filename}`);
});

// Reset all numbers to 0 in idStore.json
const idStorePath = path.join(dataDir, "idStore.json");
if (fs.existsSync(idStorePath)) {
  const idStore = JSON.parse(fs.readFileSync(idStorePath, "utf-8"));
  Object.keys(idStore).forEach(key => {
    if (typeof idStore[key] === "number") {
      idStore[key] = 0;
    }
  });
  fs.writeFileSync(idStorePath, JSON.stringify(idStore, null, 2), "utf-8");
  console.log("Reset all numbers in idStore.json to 0");
} else {
  console.log("idStore.json not found.");
}