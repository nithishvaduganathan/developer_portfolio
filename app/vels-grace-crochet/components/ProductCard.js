'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [imageError, setImageError] = useState(false);
  
  // Fallback to a data URL placeholder if no image
  const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="250"%3E%3Crect width="250" height="250" fill="%23e8f5e9"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="20" fill="%235d4037"%3ENo Image%3C/text%3E%3C/svg%3E';
  
  return (
    <div className="vgc-product-card">
      <div style={{ position: 'relative', width: '100%', height: '250px', background: '#e8f5e9' }}>
        <Image
          src={imageError || !product.imageUrl ? placeholderImage : product.imageUrl}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImageError(true)}
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
