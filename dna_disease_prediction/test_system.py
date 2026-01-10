"""
Test script to validate DNA Disease Prediction System functionality.
Run this after training the model to ensure everything works correctly.
"""

import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from utils.dna_validator import DNAValidator
from utils.dna_preprocessor import DNAPreprocessor


def test_validation():
    """Test DNA sequence validation."""
    print("=" * 60)
    print("Testing DNA Sequence Validation")
    print("=" * 60)
    
    # Test valid sequence
    valid_seq = "ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG"
    is_valid, error = DNAValidator.validate_sequence(valid_seq)
    assert is_valid, "Valid sequence should pass validation"
    print("✓ Valid sequence test passed")
    
    # Test invalid sequence
    invalid_seq = "ATCGXYZ"
    is_valid, error = DNAValidator.validate_sequence(invalid_seq)
    assert not is_valid, "Invalid sequence should fail validation"
    print("✓ Invalid sequence test passed")
    
    # Test short sequence
    short_seq = "ATCG"
    is_valid, error = DNAValidator.validate_sequence(short_seq)
    assert not is_valid, "Short sequence should fail validation"
    print("✓ Short sequence test passed")
    
    # Test FASTA parsing
    fasta_content = ">test\nATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG"
    parsed = DNAValidator.parse_fasta(fasta_content)
    assert parsed == "ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG"
    print("✓ FASTA parsing test passed")
    
    print("\n✓ All validation tests passed!\n")


def test_preprocessing():
    """Test DNA sequence preprocessing."""
    print("=" * 60)
    print("Testing DNA Sequence Preprocessing")
    print("=" * 60)
    
    sequence = "ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG"
    
    # Test k-mer extraction
    kmers = DNAPreprocessor.extract_kmers(sequence, k=3)
    assert len(kmers) == len(sequence) - 2, "K-mer count should be correct"
    assert kmers[0] == "ATC", "First k-mer should be correct"
    print("✓ K-mer extraction test passed")
    
    # Test GC content calculation
    gc_content = DNAPreprocessor.calculate_gc_content(sequence)
    assert 0 <= gc_content <= 100, "GC content should be between 0 and 100"
    print(f"✓ GC content test passed (GC: {gc_content}%)")
    
    # Test nucleotide frequency
    frequencies = DNAPreprocessor.calculate_nucleotide_frequency(sequence)
    total = sum(frequencies.values())
    assert abs(total - 100.0) < 0.01, "Frequencies should sum to 100%"
    print("✓ Nucleotide frequency test passed")
    
    # Test sequence statistics
    stats = DNAPreprocessor.get_sequence_statistics(sequence)
    assert stats['length'] == len(sequence), "Length should be correct"
    assert 'gc_content' in stats, "Stats should include GC content"
    assert 'nucleotide_frequency' in stats, "Stats should include frequencies"
    print("✓ Sequence statistics test passed")
    
    print("\n✓ All preprocessing tests passed!\n")


def test_model_files():
    """Test that model files exist."""
    print("=" * 60)
    print("Testing Model Files")
    print("=" * 60)
    
    model_path = os.path.join(os.path.dirname(__file__), 'models', 'dna_disease_model.pkl')
    vectorizer_path = os.path.join(os.path.dirname(__file__), 'models', 'dna_vectorizer.pkl')
    
    if os.path.exists(model_path):
        print("✓ Model file exists")
    else:
        print("✗ Model file not found - run train_model.py first")
        return False
    
    if os.path.exists(vectorizer_path):
        print("✓ Vectorizer file exists")
    else:
        print("✗ Vectorizer file not found - run train_model.py first")
        return False
    
    print("\n✓ All model files present!\n")
    return True


def main():
    """Run all tests."""
    print("\n" + "=" * 60)
    print("DNA DISEASE PREDICTION SYSTEM - TEST SUITE")
    print("=" * 60 + "\n")
    
    try:
        test_validation()
        test_preprocessing()
        model_files_ok = test_model_files()
        
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print("✓ DNA Validation: PASSED")
        print("✓ DNA Preprocessing: PASSED")
        if model_files_ok:
            print("✓ Model Files: PRESENT")
            print("\n✓✓✓ ALL TESTS PASSED! ✓✓✓")
            print("\nYou can now run the Flask application:")
            print("  python app.py")
        else:
            print("✗ Model Files: MISSING")
            print("\nPlease run: python train_model.py")
        print("=" * 60 + "\n")
        
    except AssertionError as e:
        print(f"\n✗ Test failed: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\n✗ Unexpected error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
