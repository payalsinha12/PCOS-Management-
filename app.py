from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)

# Load the model
try:
    model = load_model('model (1).h5')
    print("Model loaded successfully.")
    print(model.summary()) 
except Exception as e:
    print(f"Error loading the model: {e}")

@app.route('/')
def home():
    return "Flask Server is Running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if not request.is_json:
            return jsonify({'error': 'Invalid input format. Please provide JSON data.'}), 400
        
        data = request.get_json()
        
        if 'symptoms' not in data:
            return jsonify({'error': "'symptoms' key is missing from the input."}), 400
        
        symptoms = np.array(data['symptoms'])
        
        if symptoms.ndim == 1:
            symptoms = symptoms.reshape(1, -1)  
        elif symptoms.ndim != 2:
            return jsonify({'error': 'Invalid input shape. Expected 1D or 2D array for symptoms.'}), 400

        prediction = model.predict(symptoms)
        result = np.argmax(prediction, axis=1) 
        
        return jsonify({'prediction': int(result[0])})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
