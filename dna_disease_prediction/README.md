# DNA Disease Prediction System

A complete end-to-end machine learning-based DNA disease prediction system with a web-based user interface built using Python and Flask.

## Overview

This application allows users to input DNA sequences (via text input or file upload) and generates detailed disease prediction reports using machine learning. The system validates DNA sequences, extracts k-mer features, and uses a Random Forest classifier to predict potential diseases associated with the DNA sequence.

## Features

### Core Features
- ✅ **DNA Sequence Input**: Support for both text input and file upload (FASTA/plain text)
- ✅ **Sequence Validation**: Ensures only valid nucleotides (A, T, C, G) are accepted
- ✅ **K-mer Feature Extraction**: Character-level n-grams for sequence preprocessing
- ✅ **Machine Learning Model**: Random Forest classifier trained on genomic data
- ✅ **Disease Prediction**: Predicts disease with confidence scores and risk levels
- ✅ **Multi-Disease Probability**: Shows probability distribution across all diseases

### Advanced Features
- ✅ **DNA Statistics**: Sequence length, GC content, nucleotide frequencies
- ✅ **Downloadable Reports**: Generate and download text-based prediction reports
- ✅ **Prediction History**: SQLite database storing past predictions
- ✅ **Responsive Design**: Bootstrap-based UI that works on all devices
- ✅ **Medical Disclaimer**: Clear warning about educational purposes

## Project Structure

```
dna_disease_prediction/
├── app.py                      # Main Flask application
├── train_model.py              # Model training script
├── requirements.txt            # Python dependencies
├── README.md                   # This file
├── models/                     # Trained models directory
│   ├── dna_disease_model.pkl   # Trained Random Forest model
│   └── dna_vectorizer.pkl      # Fitted CountVectorizer
├── utils/                      # Utility modules
│   ├── __init__.py
│   ├── dna_validator.py        # DNA sequence validation
│   └── dna_preprocessor.py     # Feature extraction and statistics
├── templates/                  # HTML templates
│   ├── base.html              # Base template
│   ├── index.html             # Home page
│   ├── result.html            # Results page
│   ├── history.html           # Prediction history
│   └── error.html             # Error page
├── static/                     # Static assets
│   ├── css/
│   │   └── style.css          # Custom CSS
│   └── js/
└── data/                       # Data storage
    └── predictions.db          # SQLite database (auto-created)
```

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Setup Instructions

1. **Navigate to the project directory:**
   ```bash
   cd dna_disease_prediction
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Train the model:**
   ```bash
   python train_model.py
   ```
   This will generate synthetic training data and train the Random Forest model. The trained model and vectorizer will be saved in the `models/` directory.

5. **Run the Flask application:**
   ```bash
   python app.py
   ```
   The application will start on `http://localhost:5000`

## Usage

### Web Interface

1. **Access the application:**
   - Open your web browser and navigate to `http://localhost:5000`

2. **Input DNA Sequence:**
   - **Option 1**: Paste a DNA sequence directly into the text area
   - **Option 2**: Upload a FASTA or plain text file containing the DNA sequence
   - Minimum sequence length: 50 nucleotides
   - Valid nucleotides: A, T, C, G (case insensitive)

3. **View Results:**
   - Predicted disease with confidence score
   - Risk level classification (Low, Medium, High)
   - All disease probabilities
   - DNA sequence statistics (length, GC content, nucleotide frequencies)
   - Medical disclaimer

4. **Download Report:**
   - Click "Download Report" to get a text file with complete prediction details

5. **View History:**
   - Navigate to "History" to see past predictions

### Example DNA Sequences

**Example 1: Healthy Pattern**
```
ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG
```

**Example 2: Cancer Risk Pattern (High C content)**
```
CCGCCGCCGCCGCCGCCGCCGCCGCCGCCGCCGCCGCCGCCGCCGCCGCCGCCGCCGCCGCCG
```

**Example 3: Diabetes Pattern (High AT content)**
```
ATATATATATATATATATATATATATATATATATATATATATATATATATATATATAT
```

## Model Details

### Training Data
- **Synthetic Dataset**: 1,800 samples (300 per disease type)
- **Disease Types**: Healthy, Cancer_Risk, Diabetes_Type2, Heart_Disease, Alzheimers_Risk, Parkinsons_Risk
- **Sequence Length**: 150-500 nucleotides per sample
- **Disease-Specific Patterns**: Each disease type has unique nucleotide distribution patterns

### Feature Extraction
- **Method**: K-mer extraction (k=4)
- **Vectorization**: CountVectorizer with max 1,000 features
- **Features**: 4-mer frequency counts

### Model Architecture
- **Algorithm**: Random Forest Classifier
- **Parameters**:
  - n_estimators: 100
  - max_depth: 20
  - random_state: 42

### Performance
- Training accuracy: ~95-98% (on synthetic data)
- Multi-class classification across 6 disease types

## API Endpoints

### Main Routes
- `GET /` - Home page with input form
- `POST /predict` - Handle prediction requests
- `GET /result` - Display prediction results
- `GET /history` - Show prediction history
- `GET /download-report` - Download prediction report

### API Routes
- `POST /api/validate` - Validate DNA sequence (JSON API)

## Risk Level Classification

Risk levels are determined based on prediction confidence:
- **High Risk**: Confidence ≥ 70%
- **Medium Risk**: Confidence 40-69%
- **Low Risk**: Confidence < 40%

## Medical Disclaimer

⚠️ **IMPORTANT**: This tool is for **educational and research purposes only**. It should NOT be used for medical diagnosis or treatment decisions. The predictions are based on synthetic training data and a simplified model. Always consult with qualified healthcare professionals for medical advice.

## Future Enhancements

### Potential Improvements
1. **Deep Learning Models**: Implement CNN or RNN architectures for better accuracy
2. **Real Genomic Data**: Train on actual genomic datasets (requires ethical approval)
3. **More Disease Types**: Expand to include more diseases and genetic conditions
4. **Advanced Statistics**: Add more bioinformatics metrics (mutation detection, etc.)
5. **PDF Reports**: Generate formatted PDF reports instead of text files
6. **User Authentication**: Add user accounts for personalized history
7. **Cloud Deployment**: Deploy on AWS, Google Cloud, or Heroku
8. **API Key System**: Provide REST API access with authentication
9. **Visualization**: Add charts and graphs for better data representation
10. **Batch Processing**: Allow multiple sequence predictions at once

## Technical Details

### Technologies Used
- **Backend**: Python 3.8+, Flask 3.0
- **Machine Learning**: scikit-learn 1.3
- **Database**: SQLite 3
- **Frontend**: HTML5, CSS3, Bootstrap 5
- **Icons**: Bootstrap Icons

### Security Considerations
- Input validation for all user inputs
- File upload size limits
- SQL injection prevention (parameterized queries)
- XSS protection through Flask's auto-escaping

## Troubleshooting

### Common Issues

**Issue**: Models not found error
```
Solution: Run `python train_model.py` to generate model files
```

**Issue**: Invalid nucleotide error
```
Solution: Ensure sequence contains only A, T, C, G (case insensitive)
```

**Issue**: Sequence too short error
```
Solution: Provide at least 50 nucleotides
```

**Issue**: Database locked error
```
Solution: Close any other connections to predictions.db
```

## Academic Context

This project is designed as a **final-year academic project** demonstrating:
- Machine learning application in bioinformatics
- Full-stack web development with Python
- Database integration and data persistence
- User interface design and user experience
- Software engineering best practices

## License

This project is intended for educational purposes. Please consult your institution's policies regarding code sharing and academic integrity.

## Contributing

This is an academic project, but suggestions and improvements are welcome for educational purposes.

## Contact

For questions or issues, please open an issue in the repository or contact the project maintainer.

## Acknowledgments

- Developed as part of a final-year academic project
- Uses synthetic data for demonstration purposes
- Inspired by real-world genomic medicine applications

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Status**: Educational/Academic Project
