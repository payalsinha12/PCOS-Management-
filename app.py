from flask import Flask, request, jsonify
import os
import numpy as np
import cv2
import tensorflow as tf
from tensorflow.keras.models import load_model
from werkzeug.utils import secure_filename
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)



app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
mongo_uri = os.getenv("MONGO_URI")
client=MongoClient(mongo_uri)
db = client["pcos_db"]  
users_collection = db["users"]

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

import bcrypt  # Import bcrypt for password hashing

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get("username")  # Ensure the correct key is used
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Check if user already exists
        existing_user = users_collection.find_one({"email": email})
        if existing_user:
            return jsonify({"error": "User already exists"}), 409

        # Hash the password before storing
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Insert into MongoDB
        user_data = {"email": email, "password": hashed_password.decode('utf-8')}
        users_collection.insert_one(user_data)

        return jsonify({"message": "User registered successfully!"}), 201

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    
    
    
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get("username")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Find user in the database
        user = users_collection.find_one({"email": email})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Check if the password is correct
        if not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
            return jsonify({"error": "Invalid credentials"}), 401

        return jsonify({"message": "Login successful!"}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500


UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Load the trained model
try:
    model = load_model("model (2).h5")
    print("✅ Model loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None  # Handle case when model fails to load

# Define class labels
class_labels = {0: 'infected', 1: 'non_infected'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return 'Welcome to the PCOS Detection API!'

@app.route("/upload", methods=["POST"])
def predict():
    try:
        print("🔍 Request received!")
        print(f"🔹 Content-Type: {request.content_type}")
        print(f"🔹 Form data: {request.form}")
        print(f"🔹 Files: {request.files}")
        
        if "file" not in request.files:
            print(f"❌ No 'file' key found! Available keys: {list(request.files.keys())}")
            return jsonify({"error": "No file part in request"}), 400

        image_file = request.files["file"]
        filename = secure_filename(image_file.filename)
        print(f"📂 Uploaded file: {image_file.filename}")

        if image_file.filename == '':
            print("❌ No selected file!")
            return jsonify({"error": "No selected file"}), 400
        
        # Check if file type is allowed
        if not allowed_file(image_file.filename):
            return jsonify({"error": "Invalid file type"}), 400
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image_file.save(filepath)

        # Read the saved image
        image = cv2.imread(filepath)
        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        # Convert to RGB if grayscale
        if len(image.shape) == 2:
            image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)

        # Resize and normalize the image
        image = cv2.resize(image, (224, 224))
        image = image / 255.0
        image = image.reshape(1, 224, 224, 3)

        # Check if model is loaded
        if model is None:
            return jsonify({"error": "Model failed to load"}), 500

        # Make prediction
        prediction = model.predict(image)
        predicted_class = np.argmax(prediction)
        probability = float(prediction[0][predicted_class])
        
        print(f"Raw model output: {prediction}")

        response = {
            "message": "Prediction successful",
            "pcos_infected": int(predicted_class),
            "label": class_labels[predicted_class],
            "probability": probability
        }
        
        print(f"🚀 Response to Postman: {response}")  # Debugging print
        return jsonify(response), 200  # Ensure it returns a JSON response

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__== "main":

    port = int(os.environ.get("PORT", 10000)) 

    app.run(host="0.0.0.0", port=port)