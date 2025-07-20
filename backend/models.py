from config import db

class Recipe(db.Model):
    id = db.Column(db.String(80), primary_key=True)
    label = db.Column(db.String(80), unique=False, nullable=False)
    thumbnail_url = db.Column(db.String(2000), unique=False, nullable=False)
    

    def to_json(self):
        return {
            "id": self.id
        }