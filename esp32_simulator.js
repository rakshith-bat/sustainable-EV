const axios = require("axios");

setInterval(async () => {

  const fakeData = {

    battery: 40,

    currentSoc: Math.floor(Math.random() * 50),

    targetSoc: 80,

    temperature: 28 + Math.random() * 6,

    source: "solar",

    location: "Hosur"

  };


  try {

    const response = await axios.post(
      "http://localhost:5000/api/sensors",
      fakeData
    );

    console.log("Sent:", response.data);

  }

  catch (err) {

    console.log(err.message);

  }

}, 5000);