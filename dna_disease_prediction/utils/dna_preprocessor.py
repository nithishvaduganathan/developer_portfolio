"""
DNA Sequence Preprocessing Module
Implements k-mer feature extraction and sequence statistics.
"""

from collections import Counter


class DNAPreprocessor:
    """Preprocess DNA sequences for machine learning."""
    
    @staticmethod
    def extract_kmers(sequence, k=3):
        """
        Extract k-mers from a DNA sequence.
        
        Args:
            sequence (str): DNA sequence
            k (int): Length of k-mers
            
        Returns:
            list: List of k-mers
        """
        kmers = []
        for i in range(len(sequence) - k + 1):
            kmer = sequence[i:i+k]
            kmers.append(kmer)
        return kmers
    
    @staticmethod
    def sequence_to_kmer_string(sequence, k=3):
        """
        Convert DNA sequence to space-separated k-mer string.
        
        Args:
            sequence (str): DNA sequence
            k (int): Length of k-mers
            
        Returns:
            str: Space-separated k-mers
        """
        kmers = DNAPreprocessor.extract_kmers(sequence, k)
        return ' '.join(kmers)
    
    @staticmethod
    def calculate_gc_content(sequence):
        """
        Calculate GC content of a DNA sequence.
        
        Args:
            sequence (str): DNA sequence
            
        Returns:
            float: GC content percentage
        """
        if not sequence:
            return 0.0
        
        g_count = sequence.count('G')
        c_count = sequence.count('C')
        gc_content = ((g_count + c_count) / len(sequence)) * 100
        
        return round(gc_content, 2)
    
    @staticmethod
    def calculate_nucleotide_frequency(sequence):
        """
        Calculate nucleotide frequency in a DNA sequence.
        
        Args:
            sequence (str): DNA sequence
            
        Returns:
            dict: Nucleotide frequencies
        """
        counter = Counter(sequence)
        total = len(sequence)
        
        frequencies = {
            'A': round((counter.get('A', 0) / total) * 100, 2),
            'T': round((counter.get('T', 0) / total) * 100, 2),
            'C': round((counter.get('C', 0) / total) * 100, 2),
            'G': round((counter.get('G', 0) / total) * 100, 2)
        }
        
        return frequencies
    
    @staticmethod
    def get_sequence_statistics(sequence):
        """
        Get comprehensive statistics for a DNA sequence.
        
        Args:
            sequence (str): DNA sequence
            
        Returns:
            dict: Sequence statistics
        """
        return {
            'length': len(sequence),
            'gc_content': DNAPreprocessor.calculate_gc_content(sequence),
            'nucleotide_frequency': DNAPreprocessor.calculate_nucleotide_frequency(sequence)
        }
