# DNA Disease Prediction System

## Project Overview

A complete end-to-end machine learning-based DNA disease prediction system with a professional web interface. This academic project demonstrates the application of bioinformatics, machine learning, and full-stack web development.

## Quick Links

- **Live Demo**: See screenshots below
- **Documentation**: [README.md](dna_disease_prediction/README.md)
- **Quick Start**: [QUICKSTART.md](dna_disease_prediction/QUICKSTART.md)
- **Application**: `dna_disease_prediction/app.py`

## Features at a Glance

🧬 **DNA Analysis**
- Validates DNA sequences (A, T, C, G)
- Calculates GC content
- Computes nucleotide frequencies
- Supports FASTA file format

🤖 **Machine Learning**
- Random Forest classifier
- K-mer feature extraction (k=4)
- 6 disease types prediction
- 72.78% accuracy on synthetic data

💻 **Web Application**
- Flask-based backend
- Bootstrap responsive UI
- File upload support
- Downloadable reports
- Prediction history

## System Architecture

```
┌─────────────────┐
│   Web Browser   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Flask Server   │
│  - Routes       │
│  - Session Mgmt │
└────────┬────────┘
         │
         ├──────────────────┐
         ▼                  ▼
┌─────────────────┐  ┌──────────────┐
│  ML Pipeline    │  │   SQLite DB  │
│  - Validator    │  │  - History   │
│  - Preprocessor │  └──────────────┘
│  - Model        │
│  - Vectorizer   │
└─────────────────┘
```

## Disease Types

1. **Healthy** - Normal genetic profile
2. **Cancer Risk** - Potential cancer markers
3. **Diabetes Type 2** - T2D susceptibility
4. **Heart Disease** - Cardiovascular risk
5. **Alzheimer's Risk** - Neurodegenerative markers
6. **Parkinson's Risk** - PD susceptibility

## Technical Stack

| Component | Technology |
|-----------|-----------|
| Backend | Python 3.8+, Flask 3.0 |
| ML/AI | scikit-learn 1.4.0 |
| Database | SQLite 3 |
| Frontend | Bootstrap 5, HTML5, CSS3 |
| Icons | Bootstrap Icons |

## Installation

```bash
cd dna_disease_prediction
pip install -r requirements.txt
python train_model.py
python app.py
```

Access at: `http://localhost:5000`

## Usage Example

### 1. Input DNA Sequence
```
ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG...
```

### 2. Get Results
- **Predicted Disease**: Cancer Risk
- **Confidence**: 85%
- **Risk Level**: High
- **GC Content**: 50%
- **Sequence Length**: 200 nucleotides

### 3. Download Report
Text-based report with full analysis

### 4. View History
Browse past predictions

## Screenshots

### Home Page
Clean, intuitive interface for DNA sequence input:
![Home Page](https://github.com/user-attachments/assets/d1e10e61-60a4-49dd-b52d-6b34319454c6)

### Results Page
Comprehensive prediction results with statistics:
![Results](https://github.com/user-attachments/assets/5656022b-b241-4b66-8650-6f993b79e578)

### History Page
Track all predictions:
![History](https://github.com/user-attachments/assets/c9b17b8d-813c-4e8c-a8fd-7b42c6a134f0)

## Project Structure

```
dna_disease_prediction/
├── app.py                 # Flask application
├── train_model.py         # Model training
├── test_system.py         # Test suite
├── requirements.txt       # Dependencies
├── models/               # Trained models
├── utils/                # Utilities
├── templates/            # HTML templates
├── static/               # CSS/JS
└── data/                 # Database
```

## Model Details

**Training Data:**
- 1,800 synthetic samples
- 300 samples per disease type
- Sequence length: 150-500 bp

**Features:**
- 4-mer frequency counts
- CountVectorizer (1000 features)

**Performance:**
- Accuracy: 72.78%
- Model: Random Forest (100 trees)

## Security

✅ Input validation  
✅ SQL injection prevention  
✅ XSS protection  
✅ Debug mode disabled  
✅ File upload validation  

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Home page |
| `/predict` | POST | Make prediction |
| `/result` | GET | View results |
| `/history` | GET | View history |
| `/download-report` | GET | Download report |
| `/api/validate` | POST | Validate sequence |

## Testing

Run automated tests:
```bash
python test_system.py
```

Output:
```
✓ DNA Validation: PASSED
✓ DNA Preprocessing: PASSED
✓ Model Files: PRESENT
✓✓✓ ALL TESTS PASSED! ✓✓✓
```

## Medical Disclaimer

⚠️ **IMPORTANT**: This tool is for **educational and research purposes only**. 

It should **NOT** be used for:
- Medical diagnosis
- Treatment decisions
- Clinical applications

Always consult qualified healthcare professionals for medical advice.

## Future Enhancements

### Short Term
- [ ] PDF report generation
- [ ] User authentication
- [ ] Batch processing

### Long Term
- [ ] Deep learning models (CNN/RNN)
- [ ] Real genomic datasets
- [ ] Cloud deployment
- [ ] REST API with authentication
- [ ] Advanced visualizations

## Academic Context

This project demonstrates:
- ✅ Full-stack development
- ✅ Machine learning application
- ✅ Bioinformatics techniques
- ✅ Database integration
- ✅ UI/UX design
- ✅ Security best practices
- ✅ Documentation standards

**Ideal for:**
- Final year projects
- Capstone projects
- Portfolio demonstrations
- Academic presentations

## License

Educational/Academic Project

## Contributing

This is an academic project. Feedback and suggestions welcome for educational purposes.

## Support

See detailed documentation:
- [Full README](dna_disease_prediction/README.md)
- [Quick Start Guide](dna_disease_prediction/QUICKSTART.md)

## Credits

Developed as a final-year academic project demonstrating the integration of:
- Bioinformatics
- Machine Learning
- Web Development
- Database Management
- UI/UX Design

---

**Version**: 1.0.0  
**Status**: Production Ready (Educational)  
**Last Updated**: January 2024
