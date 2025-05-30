const fs = require("fs");
const path = require("path");

const ID_PATH = path.join(__dirname, "..", "data", "idStore.json");

function readIds() {
  if (!fs.existsSync(ID_PATH)) {
    return { lastUserId: 0, lastTeamId: 0, lastPlayerId: 0 };
  }
  const raw = fs.readFileSync(ID_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeIds(ids) {
  fs.writeFileSync(ID_PATH, JSON.stringify(ids, null, 2));
}

function getNextId(key) {
  const ids = readIds();
  ids[key]++;
  writeIds(ids);
  return ids[key];
}

module.exports = {
  getNextUserId: () => getNextId("lastUserId"),
  getNextTeamId: () => getNextId("lastTeamId"),
  getNextPlayerId: () => getNextId("lastPlayerId"),
};
