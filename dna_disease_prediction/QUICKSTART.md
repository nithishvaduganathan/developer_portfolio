# DNA Disease Prediction System - Quick Start Guide

## Overview
This is a complete end-to-end DNA-based disease prediction system built with Python and Flask. The system uses machine learning (Random Forest classifier) to predict potential diseases from DNA sequences.

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd dna_disease_prediction
pip install -r requirements.txt
```

### 2. Train the Model
```bash
python train_model.py
```
This generates synthetic genomic data and trains the Random Forest model (~30 seconds).

### 3. Run the Application
```bash
python app.py
```
Open your browser to: http://localhost:5000

### 4. Test with Sample DNA
Try this sample sequence:
```
ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG
```

## Disease Types
The system predicts 6 disease types:
1. Healthy
2. Cancer Risk
3. Diabetes Type 2
4. Heart Disease
5. Alzheimer's Risk
6. Parkinson's Risk

## Key Features
✅ DNA sequence input (text or file upload)  
✅ Sequence validation (A, T, C, G only)  
✅ K-mer feature extraction  
✅ Machine learning predictions  
✅ Confidence scores & risk levels  
✅ Downloadable reports  
✅ Prediction history  
✅ Responsive UI  

## Technical Details
- **Backend**: Python 3.8+, Flask 3.0
- **ML Model**: Random Forest (72.78% accuracy on synthetic data)
- **Features**: 4-mer k-mer extraction with CountVectorizer
- **Database**: SQLite (for history)
- **Frontend**: Bootstrap 5, HTML5, CSS3

## File Upload Format
Supports:
- Plain text files (.txt)
- FASTA format (.fasta, .fa)

Example FASTA:
```
>sequence_1
ATCGATCGATCGATCGATCG
ATCGATCGATCGATCGATCG
```

## Medical Disclaimer
⚠️ **IMPORTANT**: This tool is for **educational and research purposes only**. Do NOT use for medical diagnosis or treatment decisions. Always consult qualified healthcare professionals.

## Project Structure
```
dna_disease_prediction/
├── app.py                    # Flask application
├── train_model.py            # Model training
├── requirements.txt          # Dependencies
├── utils/                    # Utilities
│   ├── dna_validator.py     # Validation
│   └── dna_preprocessor.py  # Feature extraction
├── models/                   # Trained models
├── templates/                # HTML templates
├── static/                   # CSS/JS
└── data/                     # Database
```

## Troubleshooting

**Q: Model not found error?**  
A: Run `python train_model.py` first.

**Q: Invalid nucleotide error?**  
A: Use only A, T, C, G (case insensitive).

**Q: Sequence too short?**  
A: Minimum 50 nucleotides required.

## Production Deployment
For production, use a WSGI server:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Future Enhancements
- Deep learning models (CNN/RNN)
- Real genomic datasets
- PDF report generation
- User authentication
- Cloud deployment
- Batch processing

## Support
For issues or questions, refer to the main README.md file.

---
**Version**: 1.0.0  
**Academic Project** - Developed for final-year project demonstration
