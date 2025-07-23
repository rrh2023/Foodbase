from config import db

class Recipe(db.Model):
    id = db.Column(db.String(80), primary_key=True)
    thumbnailUrl = db.Column(db.String(2000), unique=False, nullable=False)
    label = db.Column(db.String(80), unique=False, nullable=False)
    image = db.Column(db.String(2000), unique=False, nullable=False)
    cuisineType = db.Column(db.String(80), unique=False, nullable=False)
    source = db.Column(db.String(2000), unique=False, nullable=False)
    url = db.Column(db.String(2000), unique=False, nullable=False)
    shareAs = db.Column(db.String(2000), unique=False, nullable=False)
    recipeYield =  db.Column(db.Integer, unique=False, nullable=False)
    mealType = db.Column(db.String(2000), unique=False, nullable=False)
    dishType = db.Column(db.String(2000), unique=False, nullable=False)
    calories = db.Column(db.Integer, unique=False, nullable=False)
    fat = db.Column(db.Integer, unique=False, nullable=False)
    protein = db.Column(db.Integer, unique=False, nullable=False)
    carbohydrates = db.Column(db.Integer, unique=False, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "thumbnailUrl": self.thumbnailUrl,
            "label": self.label,
            "image": self.image,
            "cuisineType": self.cuisineType,
            "source": self.source,
            "url": self.url,
            "shareAs": self.shareAs,
            "recipeYield": self.recipeYield,
            "mealType": self.mealType,
            "dishType": self.dishType,
            "calories": self.calories,
            "fat": self.fat,
            "protein": self.protein,
            "carbohydrates": self.carbohydrates
        }