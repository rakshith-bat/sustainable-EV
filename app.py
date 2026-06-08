from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder="frontend")
CORS(app)

# Stores latest sensor data
latest_data = {
    "voltage": 0,
    "current": 0,
    "power": 0,
    "soc": 100,
    "soh": 100,
    "lat": 12.9716,
    "lon": 77.5946
}

@app.route("/")
def home():
    return send_from_directory("frontend", "index.html")

@app.route("/api/data", methods=["GET", "POST"])
def data():
    global latest_data
    if request.method == "POST":
        latest_data = request.json
        return jsonify({"status": "ok"})
    else:
        # ESP32 sends as GET with query params
        for key in latest_data:
            if request.args.get(key):
                latest_data[key] = float(request.args.get(key))
        return jsonify(latest_data)

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory("frontend", path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)