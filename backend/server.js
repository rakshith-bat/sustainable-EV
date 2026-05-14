const express = require("express");

const cors = require("cors");

const sensorRoutes = require("./routes/sensors");

const app = express();

app.use(cors());

app.use(express.json());


app.use("/api/sensors", sensorRoutes);


app.get("/", (req, res) => {

  res.send("EV Charge India Backend Running");

});


const PORT = 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});