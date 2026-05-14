async function getLatestSensorData() {

  const response = await fetch(
    "http://localhost:5000/api/sensors/latest"
  );

  return await response.json();

}