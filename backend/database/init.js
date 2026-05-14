const sqlite3 = require("sqlite3").verbose();

const path = require("path");

const dbPath = path.join(__dirname, "ev_data.db");

const db = new sqlite3.Database(dbPath);

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS sensor_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      battery REAL,
      currentSoc INTEGER,
      targetSoc INTEGER,
      temperature REAL,

      source TEXT,
      location TEXT,

      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Database initialized.");

});

db.close();