const express = require("express");

const router = express.Router();

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./backend/database/ev_data.db");



router.post("/", (req, res) => {

  const {
    battery,
    currentSoc,
    targetSoc,
    temperature,
    source,
    location
  } = req.body;


  db.run(
    `
    INSERT INTO sensor_logs
    (
      battery,
      currentSoc,
      targetSoc,
      temperature,
      source,
      location
    )

    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      battery,
      currentSoc,
      targetSoc,
      temperature,
      source,
      location
    ],
    function(err) {

      if (err) {

        console.log("DATABASE ERROR:");
        console.log(err);

        return res.status(500).json({
          error: "Database insert failed"
        });

      }

      res.json({
        success: true,
        insertedId: this.lastID
      });

    }
  );

});



router.get("/latest", (req, res) => {

  db.get(
    `
    SELECT *
    FROM sensor_logs

    ORDER BY createdAt DESC

    LIMIT 1
    `,
    [],
    (err, row) => {

      if (err) {

        return res.status(500).json({
          error: err.message
        });

      }

      res.json(row);

    }
  );

});


module.exports = router;