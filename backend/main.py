import requests
from flask import request, jsonify
from config import app, db
from models import Recipe

@app.route("/search_recipes", methods=["GET"])
def get_recipes(text):
    # TBD
    url = 'https://api.edamam.com/api/recipes/v2?q=${text}&type=public&app_id=${VITE_APP_ID}&app_key=${VITE_APP_KEY}'
    res = requests.get(url)
    print(res.data.hits)

# @app.route("/recipes", methods=["GET"])
# def get_recipe():
#     # TBD