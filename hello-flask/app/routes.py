from app import app
from flask import request
from datetime import datetime


@app.route("/")
def index():
    return "Hello, World!"


@app.get("/fetch")
def fetch_datetime():
    return {"currentDatetime": datetime.now().astimezone().isoformat()}


@app.post("/compute")
def convert_usd_to_inr():
    value_inr = float(request.json["valueInr"])
    usd_inr_exchange_rate = 75.75
    return {"valueUsd": round(value_inr / usd_inr_exchange_rate, 2)}
