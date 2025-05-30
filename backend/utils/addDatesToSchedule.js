const fs = require("fs");
const path = require("path");

const SCHEDULE_PATH = path.join(__dirname, "../data/schedule.json");

// Load schedule
const schedule = JSON.parse(fs.readFileSync(SCHEDULE_PATH, "utf-8"));

// Set the real-world start date (today at 19:00)
const startDate = new Date();
startDate.setHours(19, 0, 0, 0); // 19:00 today

// Find all unique "date" values in the schedule (e.g. 1, 2, 3...)
const uniqueDates = [...new Set(schedule.map(match => match.date))].sort((a, b) => a - b);

// Map each schedule "date" to a real-world date string
const dateMap = {};
uniqueDates.forEach((d, i) => {
  const matchDate = new Date(startDate);
  matchDate.setDate(startDate.getDate() + i);
  dateMap[d] = matchDate.toISOString(); // ISO format
});

// Assign real date to each match (overwrite "date" field)
schedule.forEach(match => {
  match.date = dateMap[match.date];
});

fs.writeFileSync(SCHEDULE_PATH, JSON.stringify(schedule, null, 2));
console.log('Schedule updated with real dates in "date" field!');