from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import json
import os

DATA_FILE = "latest_data.json"

latest_data = {
    "voltage": 0,
    "current": 0,
    "power": 0,
    "soc": 100,
    "soh": 100,
    "lat": 12.9716,
    "lon": 77.5946
}

# Load persisted data if available and non-empty
if os.path.exists(DATA_FILE):
    with open(DATA_FILE, "r") as f:
        content = f.read().strip()
        if content:
            latest_data = json.loads(content)

app = Flask(__name__, static_folder="frontend")
CORS(app)

@app.route("/")
def home():
    return send_from_directory("frontend", "index.html")

@app.route("/api/data", methods=["GET", "POST"])
def data():
    global latest_data
    if request.method == "POST":
        latest_data = request.json
        with open(DATA_FILE, "w") as f:
            json.dump(latest_data, f)
        return jsonify({"status": "ok"})
    else:
        for key in latest_data:
            if request.args.get(key):
                latest_data[key] = float(request.args.get(key))
        with open(DATA_FILE, "w") as f:
            json.dump(latest_data, f)
        return jsonify(latest_data)

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory("frontend", path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)