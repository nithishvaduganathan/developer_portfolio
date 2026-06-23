"""
DNA Sequence Validation Module
Validates DNA sequences to ensure only valid nucleotides (A, T, C, G) are accepted.
"""

import re


class DNAValidator:
    """Validates DNA sequences for proper nucleotide composition."""
    
    VALID_NUCLEOTIDES = set('ATCG')
    MIN_SEQUENCE_LENGTH = 50
    
    @staticmethod
    def validate_sequence(sequence):
        """
        Validate a DNA sequence.
        
        Args:
            sequence (str): DNA sequence to validate
            
        Returns:
            tuple: (is_valid (bool), error_message (str or None))
        """
        if not sequence:
            return False, "Empty sequence provided"
        
        # Remove whitespace and convert to uppercase
        sequence = sequence.strip().upper()
        
        if len(sequence) < DNAValidator.MIN_SEQUENCE_LENGTH:
            return False, f"Sequence too short. Minimum length is {DNAValidator.MIN_SEQUENCE_LENGTH} nucleotides"
        
        # Check for invalid characters
        invalid_chars = set(sequence) - DNAValidator.VALID_NUCLEOTIDES
        if invalid_chars:
            return False, f"Invalid nucleotides found: {', '.join(sorted(invalid_chars))}"
        
        return True, None
    
    @staticmethod
    def clean_sequence(sequence):
        """
        Clean and normalize a DNA sequence.
        
        Args:
            sequence (str): Raw DNA sequence
            
        Returns:
            str: Cleaned sequence in uppercase
        """
        # Remove whitespace, newlines, and convert to uppercase
        sequence = re.sub(r'\s+', '', sequence)
        sequence = sequence.upper()
        
        # Remove common FASTA header lines if present
        if sequence.startswith('>'):
            lines = sequence.split('\n')
            sequence = ''.join(lines[1:])
        
        return sequence
    
    @staticmethod
    def parse_fasta(fasta_content):
        """
        Parse FASTA format content.
        
        Args:
            fasta_content (str): FASTA formatted content
            
        Returns:
            str: DNA sequence
        """
        lines = fasta_content.strip().split('\n')
        sequence = ''
        
        for line in lines:
            line = line.strip()
            if not line.startswith('>'):
                sequence += line
        
        return sequence.upper()
