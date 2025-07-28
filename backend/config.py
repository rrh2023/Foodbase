from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env.local')

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['APP_ID']= os.environ.get('APP_ID')
app.config['APP_KEY']= os.environ.get('APP_KEY')

APP_ID = app.config['APP_ID']
APP_KEY = app.config['APP_KEY']

db = SQLAlchemy(app)