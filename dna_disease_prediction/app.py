"""
Flask Application for DNA Disease Prediction System
Main application with routes for input, prediction, and result visualization.
"""

from flask import Flask, render_template, request, jsonify, send_file, session
import pickle
import os
import io
from datetime import datetime
import sqlite3
from utils.dna_validator import DNAValidator
from utils.dna_preprocessor import DNAPreprocessor

app = Flask(__name__)
app.secret_key = 'dna_disease_prediction_secret_key_2024'

# Configuration
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'dna_disease_model.pkl')
VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), 'models', 'dna_vectorizer.pkl')
DB_PATH = os.path.join(os.path.dirname(__file__), 'data', 'predictions.db')

# Load model and vectorizer
model = None
vectorizer = None


def load_models():
    """Load trained model and vectorizer."""
    global model, vectorizer
    
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        with open(VECTORIZER_PATH, 'rb') as f:
            vectorizer = pickle.load(f)
        print("Models loaded successfully")
    else:
        print("Warning: Model files not found. Please run train_model.py first.")


def init_database():
    """Initialize SQLite database for prediction history."""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            sequence_length INTEGER NOT NULL,
            gc_content REAL NOT NULL,
            predicted_disease TEXT NOT NULL,
            confidence REAL NOT NULL,
            risk_level TEXT NOT NULL
        )
    ''')
    
    conn.commit()
    conn.close()


def save_prediction(sequence_length, gc_content, disease, confidence, risk_level):
    """Save prediction to database."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        cursor.execute('''
            INSERT INTO predictions 
            (timestamp, sequence_length, gc_content, predicted_disease, confidence, risk_level)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (timestamp, sequence_length, gc_content, disease, confidence, risk_level))
        
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error saving prediction: {e}")


def get_prediction_history(limit=10):
    """Get recent prediction history."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT timestamp, sequence_length, gc_content, predicted_disease, confidence, risk_level
            FROM predictions
            ORDER BY id DESC
            LIMIT ?
        ''', (limit,))
        
        rows = cursor.fetchall()
        conn.close()
        
        history = []
        for row in rows:
            history.append({
                'timestamp': row[0],
                'sequence_length': row[1],
                'gc_content': row[2],
                'predicted_disease': row[3],
                'confidence': row[4],
                'risk_level': row[5]
            })
        
        return history
    except Exception as e:
        print(f"Error fetching history: {e}")
        return []


def classify_risk_level(confidence):
    """
    Classify risk level based on confidence score.
    
    Args:
        confidence (float): Confidence score (0-1)
        
    Returns:
        str: Risk level (Low, Medium, High)
    """
    if confidence >= 0.7:
        return "High"
    elif confidence >= 0.4:
        return "Medium"
    else:
        return "Low"


def predict_disease(sequence):
    """
    Predict disease from DNA sequence.
    
    Args:
        sequence (str): DNA sequence
        
    Returns:
        dict: Prediction results
    """
    if model is None or vectorizer is None:
        return {
            'error': 'Model not loaded. Please train the model first by running train_model.py'
        }
    
    # Preprocess sequence
    kmer_string = DNAPreprocessor.sequence_to_kmer_string(sequence, k=4)
    
    # Vectorize
    X = vectorizer.transform([kmer_string])
    
    # Predict
    prediction = model.predict(X)[0]
    probabilities = model.predict_proba(X)[0]
    confidence = float(max(probabilities))
    
    # Get all disease probabilities
    disease_probabilities = {}
    for i, disease in enumerate(model.classes_):
        disease_probabilities[disease] = float(probabilities[i])
    
    # Sort by probability
    sorted_diseases = sorted(disease_probabilities.items(), key=lambda x: x[1], reverse=True)
    
    # Calculate statistics
    stats = DNAPreprocessor.get_sequence_statistics(sequence)
    
    # Classify risk level
    risk_level = classify_risk_level(confidence)
    
    # Save to database
    save_prediction(
        stats['length'],
        stats['gc_content'],
        prediction,
        confidence,
        risk_level
    )
    
    return {
        'predicted_disease': prediction,
        'confidence': round(confidence * 100, 2),
        'risk_level': risk_level,
        'disease_probabilities': {k: round(v * 100, 2) for k, v in sorted_diseases},
        'statistics': stats
    }


@app.route('/')
def index():
    """Home page with input form."""
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction request."""
    try:
        # Get input from form or file
        sequence = request.form.get('sequence', '').strip()
        
        # Handle file upload
        if 'file' in request.files:
            file = request.files['file']
            if file and file.filename:
                content = file.read().decode('utf-8')
                
                # Check if FASTA format
                if content.startswith('>'):
                    sequence = DNAValidator.parse_fasta(content)
                else:
                    sequence = DNAValidator.clean_sequence(content)
        
        # Clean sequence
        sequence = DNAValidator.clean_sequence(sequence)
        
        # Validate sequence
        is_valid, error_message = DNAValidator.validate_sequence(sequence)
        
        if not is_valid:
            return jsonify({'error': error_message}), 400
        
        # Make prediction
        result = predict_disease(sequence)
        
        if 'error' in result:
            return jsonify(result), 500
        
        # Store sequence in session for result page
        session['last_sequence'] = sequence[:200] + ('...' if len(sequence) > 200 else '')
        session['last_result'] = result
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


@app.route('/result')
def result():
    """Display prediction result page."""
    result_data = session.get('last_result')
    sequence = session.get('last_sequence')
    
    if not result_data:
        return render_template('error.html', message='No prediction data available')
    
    return render_template('result.html', result=result_data, sequence=sequence)


@app.route('/history')
def history():
    """Display prediction history."""
    history_data = get_prediction_history(limit=20)
    return render_template('history.html', history=history_data)


@app.route('/download-report')
def download_report():
    """Generate and download prediction report."""
    result_data = session.get('last_result')
    sequence = session.get('last_sequence')
    
    if not result_data:
        return "No prediction data available", 404
    
    # Generate text report
    report = f"""
DNA DISEASE PREDICTION REPORT
{'=' * 60}

Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

SEQUENCE INFORMATION
{'-' * 60}
Sequence Length: {result_data['statistics']['length']} nucleotides
GC Content: {result_data['statistics']['gc_content']}%

Nucleotide Frequencies:
  A: {result_data['statistics']['nucleotide_frequency']['A']}%
  T: {result_data['statistics']['nucleotide_frequency']['T']}%
  C: {result_data['statistics']['nucleotide_frequency']['C']}%
  G: {result_data['statistics']['nucleotide_frequency']['G']}%

PREDICTION RESULTS
{'-' * 60}
Predicted Disease: {result_data['predicted_disease']}
Confidence: {result_data['confidence']}%
Risk Level: {result_data['risk_level']}

DISEASE PROBABILITIES
{'-' * 60}
"""
    
    for disease, prob in result_data['disease_probabilities'].items():
        report += f"{disease}: {prob}%\n"
    
    report += f"""
{'-' * 60}

MEDICAL DISCLAIMER
{'-' * 60}
This prediction is generated by a machine learning model for 
educational and research purposes only. It should NOT be used 
for medical diagnosis or treatment decisions. Always consult 
with qualified healthcare professionals for medical advice.

{'=' * 60}
"""
    
    # Create file-like object
    report_file = io.BytesIO(report.encode('utf-8'))
    report_file.seek(0)
    
    return send_file(
        report_file,
        mimetype='text/plain',
        as_attachment=True,
        download_name=f'dna_prediction_report_{datetime.now().strftime("%Y%m%d_%H%M%S")}.txt'
    )


@app.route('/api/validate', methods=['POST'])
def validate_sequence():
    """API endpoint to validate DNA sequence."""
    data = request.get_json()
    sequence = data.get('sequence', '')
    
    sequence = DNAValidator.clean_sequence(sequence)
    is_valid, error_message = DNAValidator.validate_sequence(sequence)
    
    if is_valid:
        stats = DNAPreprocessor.get_sequence_statistics(sequence)
        return jsonify({
            'valid': True,
            'statistics': stats
        })
    else:
        return jsonify({
            'valid': False,
            'error': error_message
        })


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return render_template('error.html', message='Page not found'), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    return render_template('error.html', message='Internal server error'), 500


if __name__ == '__main__':
    print("Initializing DNA Disease Prediction System...")
    init_database()
    load_models()
    print("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5000)
