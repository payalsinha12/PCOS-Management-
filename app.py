from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
import tensorflow as tf
import numpy as np

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Load Model
try:
    model = tf.keras.models.load_model('model (2).h5')
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return 'Welcome to the Flask application!'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        print("No file part in request")
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    print("Received File:", file.filename)

    if file.filename == '':
        print("No selected file")
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        print("File saved at:", filepath)

        try:
            img = tf.keras.preprocessing.image.load_img(filepath, target_size=(224, 224))
            img_array = tf.keras.preprocessing.image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            img_array = img_array / 255.0

            prediction = model.predict(img_array)
            predicted_class = np.argmax(prediction[0])  # Get the class index
            prediction_probability = prediction[0][predicted_class] # Get the probability of the predicted class

            print("Prediction output:", prediction)

            # Convert to True/False based on a threshold (adjust as needed)
            threshold = 0.5 
    # Return the prediction message along with the probability
            prediction_result = int(prediction_probability > threshold)
            prediction_result = str(prediction_probability > threshold).lower()

            return jsonify({
                'message': 'File uploaded and processed successfully!',
                'prediction': prediction_result,  # Return True/False
                'probability': float(prediction_probability), # Return the probability
                'predicted_class': int(predicted_class)  # Return the predicted class index
            })
        except Exception as e:
            print(f"Error during prediction: {e}")
            return jsonify({'error': str(e)}), 500
    else:
        print("Invalid file type")
        return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')