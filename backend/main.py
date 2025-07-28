from flask import request, jsonify
from config import app, db, APP_ID, APP_KEY
from models import Recipe
import urllib.request
import json

@app.route("/search_recipes/<string:text>", methods=["GET"])
def get_recipes(text):
    url = f'https://api.edamam.com/api/recipes/v2?q={text}&type=public&app_id={APP_ID}&app_key={APP_KEY}'
    res = urllib.request.urlopen(url).read()
    jsonRes = json.loads(res.decode('utf-8'))
    return jsonRes["hits"]

@app.route("/get_recipe/<string:recipe_id>", methods=["GET"])
def get_recipe(recipe_id):
    url = f'https://api.edamam.com/api/recipes/v2/{recipe_id}?app_id={APP_ID}&app_key={APP_KEY}'
    res = urllib.request.urlopen(url).read()
    jsonRes = json.loads(res.decode('utf-8'))
    return jsonRes["recipe"]

@app.route("/get_favorite_recipes", methods=["GET"])
def get_favorite_recipes():
    db_recipes = db.session.query(Recipe).all()
    return jsonify([recipe.to_json() for recipe in db_recipes])

@app.route("/favorite_recipe/<string:recipe_id>", methods=["POST"])
def favorite_recipe(recipe_id):
    recipe = get_recipe(recipe_id)
    new_recipe = Recipe(
        id = recipe_id,
        thumbnailUrl = recipe["images"]["THUMBNAIL"]["url"],
        label = recipe["label"],
        image = recipe["image"],
        cuisineType = recipe["cuisineType"][0],
        source = recipe["source"],
        url = recipe["url"],
        shareAs = recipe["shareAs"],
        recipeYield = recipe["yield"],
        mealType = recipe["mealType"][0],
        dishType = recipe["dishType"][0],
        calories = recipe["calories"],
        fat = recipe["digest"][0]["total"],
        protein = recipe["digest"][2]["total"],
        carbohydrates = recipe["digest"][1]["total"]
    )
    try:
        db.session.add(new_recipe)
        db.session.commit()
    except:
        return jsonify({"message": "Failed to favorite."}), 400
    
    return jsonify({"message": "Recipe favorited!"}), 201

@app.route("/delete_recipe/<string:recipe_id>", methods=["DELETE"])
def delete_recipe(recipe_id):
    recipe = db.session.query(Recipe).filter_by(id=recipe_id).first()
    try:
        db.session.delete(recipe)
        db.session.commit()
    except:
        return jsonify({"message": "Failed to delete."}), 400
    
    return jsonify({"message": "Recipe deleted!"}), 201

@app.route("/clear_recipes", methods=["DELETE"])
def clear_recipes():
    db.session.query(Recipe).delete()
    db.session.commit()
    return jsonify({"message": "Recipes deleted!"}), 200
    
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)