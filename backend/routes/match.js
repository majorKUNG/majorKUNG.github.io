const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/:id", (req, res) => {
  const schedulePath = path.join(__dirname, "../data/schedule.json");
  const matches = JSON.parse(fs.readFileSync(schedulePath, "utf-8"));
  const match = matches.find(m => m.id === parseInt(req.params.id));
  if (!match) return res.status(404).json({ error: "Match not found" });
  res.json(match);
});

module.exports = router;