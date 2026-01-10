"""
Model Training Script for DNA Disease Prediction
Generates sample genomic dataset and trains a Random Forest classifier.
"""

import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import classification_report, accuracy_score
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.dna_preprocessor import DNAPreprocessor


# Disease types for prediction
DISEASES = [
    'Healthy',
    'Cancer_Risk',
    'Diabetes_Type2',
    'Heart_Disease',
    'Alzheimers_Risk',
    'Parkinsons_Risk'
]


def generate_sample_sequence(disease_type, length=200):
    """
    Generate a sample DNA sequence with disease-specific patterns.
    
    Args:
        disease_type (str): Type of disease
        length (int): Length of sequence
        
    Returns:
        str: Generated DNA sequence
    """
    # Define disease-specific nucleotide biases
    disease_patterns = {
        'Healthy': {'A': 0.25, 'T': 0.25, 'C': 0.25, 'G': 0.25},
        'Cancer_Risk': {'A': 0.2, 'T': 0.2, 'C': 0.35, 'G': 0.25},  # Higher C content
        'Diabetes_Type2': {'A': 0.3, 'T': 0.3, 'C': 0.2, 'G': 0.2},  # Higher AT content
        'Heart_Disease': {'A': 0.22, 'T': 0.28, 'C': 0.28, 'G': 0.22},  # Balanced but biased
        'Alzheimers_Risk': {'A': 0.2, 'T': 0.25, 'C': 0.25, 'G': 0.3},  # Higher G content
        'Parkinsons_Risk': {'A': 0.28, 'T': 0.22, 'C': 0.22, 'G': 0.28}  # Specific pattern
    }
    
    nucleotides = ['A', 'T', 'C', 'G']
    probs = [disease_patterns[disease_type][n] for n in nucleotides]
    
    sequence = ''.join(np.random.choice(nucleotides, size=length, p=probs))
    
    return sequence


def generate_training_data(samples_per_disease=300):
    """
    Generate synthetic training data for all disease types.
    
    Args:
        samples_per_disease (int): Number of samples per disease
        
    Returns:
        tuple: (sequences, labels)
    """
    sequences = []
    labels = []
    
    for disease in DISEASES:
        for _ in range(samples_per_disease):
            # Vary sequence lengths
            length = np.random.randint(150, 500)
            seq = generate_sample_sequence(disease, length)
            sequences.append(seq)
            labels.append(disease)
    
    return sequences, labels


def train_model(sequences, labels, k=4):
    """
    Train a Random Forest classifier on DNA sequences.
    
    Args:
        sequences (list): List of DNA sequences
        labels (list): List of disease labels
        k (int): K-mer length
        
    Returns:
        tuple: (model, vectorizer, accuracy, report)
    """
    print("Converting sequences to k-mers...")
    kmer_sequences = [DNAPreprocessor.sequence_to_kmer_string(seq, k) for seq in sequences]
    
    print("Vectorizing k-mers...")
    vectorizer = CountVectorizer(max_features=1000)
    X = vectorizer.fit_transform(kmer_sequences)
    
    print("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, labels, test_size=0.2, random_state=42, stratify=labels
    )
    
    print("Training Random Forest model...")
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=20,
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train, y_train)
    
    print("Evaluating model...")
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)
    
    return model, vectorizer, accuracy, report


def save_model(model, vectorizer, model_dir='models'):
    """
    Save trained model and vectorizer.
    
    Args:
        model: Trained model
        vectorizer: Fitted vectorizer
        model_dir (str): Directory to save models
    """
    os.makedirs(model_dir, exist_ok=True)
    
    model_path = os.path.join(model_dir, 'dna_disease_model.pkl')
    vectorizer_path = os.path.join(model_dir, 'dna_vectorizer.pkl')
    
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    
    with open(vectorizer_path, 'wb') as f:
        pickle.dump(vectorizer, f)
    
    print(f"Model saved to {model_path}")
    print(f"Vectorizer saved to {vectorizer_path}")


def main():
    """Main training pipeline."""
    print("=" * 60)
    print("DNA Disease Prediction Model Training")
    print("=" * 60)
    
    print("\nGenerating synthetic training data...")
    sequences, labels = generate_training_data(samples_per_disease=300)
    print(f"Generated {len(sequences)} sequences across {len(DISEASES)} disease types")
    
    print("\nTraining model...")
    model, vectorizer, accuracy, report = train_model(sequences, labels, k=4)
    
    print("\n" + "=" * 60)
    print(f"Model Accuracy: {accuracy:.4f}")
    print("=" * 60)
    print("\nClassification Report:")
    print(report)
    
    # Save model
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_dir = os.path.join(script_dir, 'models')
    save_model(model, vectorizer, model_dir)
    
    print("\n" + "=" * 60)
    print("Training completed successfully!")
    print("=" * 60)


if __name__ == '__main__':
    main()
