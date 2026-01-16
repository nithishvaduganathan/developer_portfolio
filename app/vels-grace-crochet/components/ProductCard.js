'use client';

import Image from 'next/image';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="vgc-product-card">
      <div style={{ position: 'relative', width: '100%', height: '250px' }}>
        <Image
          src={product.imageUrl || '/placeholder-product.jpg'}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="vgc-product-info">
        <h3 className="vgc-product-name">{product.name}</h3>
        <p className="vgc-product-price">₹{product.price}</p>
        <p className="vgc-product-description">
          {product.description?.substring(0, 100)}
          {product.description?.length > 100 ? '...' : ''}
        </p>
        <p style={{ fontSize: '0.85rem', color: '#8d6e63', marginBottom: '1rem' }}>
          Category: {product.category}
        </p>
        <button onClick={() => onAddToCart(product)} className="vgc-btn" style={{ width: '100%' }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
