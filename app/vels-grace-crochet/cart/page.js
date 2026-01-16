'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem('vgc_cart') || '[]');
    setCart(cartData);
    updateCartCount();
  };

  const updateCartCount = () => {
    const cartData = JSON.parse(localStorage.getItem('vgc_cart') || '[]');
    const count = cartData.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCart(updatedCart);
    localStorage.setItem('vgc_cart', JSON.stringify(updatedCart));
    updateCartCount();
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('vgc_cart', JSON.stringify(updatedCart));
    updateCartCount();
    toast.success('Item removed from cart');
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    router.push('/vels-grace-crochet/checkout');
  };

  return (
    <>
      <Header cartCount={cartCount} />
      
      <main className="vgc-container" style={{ minHeight: 'calc(100vh - 200px)', paddingTop: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#5d4037', marginBottom: '2rem' }}>
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="vgc-empty">
            <h3>Your cart is empty</h3>
            <p>Add some beautiful handmade crochet items to your cart!</p>
            <button onClick={() => router.push('/vels-grace-crochet')} className="vgc-btn" style={{ marginTop: '1rem' }}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            <div className="vgc-card">
              {cart.map(item => (
                <div key={item.id} className="vgc-cart-item">
                  <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0, background: '#e8f5e9' }}>
                    <Image
                      src={item.imageUrl || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%23e8f5e9"/%3E%3C/svg%3E'}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  
                  <div className="vgc-cart-item-info">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#5d4037', marginBottom: '0.25rem' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '1rem', color: '#6d4c41', marginBottom: '0.5rem' }}>
                      ₹{item.price} each
                    </p>
                    <div className="vgc-cart-item-actions">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="vgc-quantity-btn"
                      >
                        <FiMinus />
                      </button>
                      <span className="vgc-quantity">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="vgc-quantity-btn"
                      >
                        <FiPlus />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="vgc-remove-btn"
                        style={{ marginLeft: '1rem' }}
                      >
                        <FiTrash2 style={{ display: 'inline', marginRight: '0.25rem' }} />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ fontWeight: '700', fontSize: '1.25rem', color: '#5d4037' }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
              
              <div className="vgc-cart-total">
                <span>Total:</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button onClick={() => router.push('/vels-grace-crochet')} className="vgc-btn vgc-btn-outline">
                Continue Shopping
              </button>
              <button onClick={handleCheckout} className="vgc-btn">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </>
  );
}
