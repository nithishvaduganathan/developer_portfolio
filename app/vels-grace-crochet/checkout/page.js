'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const [user, loading] = useAuthState(auth);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    location: ''
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      localStorage.setItem('vgc_return_url', '/vels-grace-crochet/checkout');
      router.push('/vels-grace-crochet/auth');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadUserData();
      loadCart();
    }
  }, [user]);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem('vgc_cart') || '[]');
    if (cartData.length === 0) {
      router.push('/vels-grace-crochet/cart');
    }
    setCart(cartData);
  };

  const loadUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setFormData(userDoc.data());
      } else {
        // Pre-fill phone from auth
        setFormData(prev => ({ ...prev, phone: user.phoneNumber || '' }));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const generateWhatsAppMessage = () => {
    const orderDetails = cart.map(item => 
      `- ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');
    
    const message = `🧶 *New Order from Vels Grace Crochet*\n\n` +
      `*Customer Details:*\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Address: ${formData.address}\n` +
      `Location: ${formData.location}\n\n` +
      `*Order Details:*\n${orderDetails}\n\n` +
      `*Total Amount: ₹${calculateTotal()}*`;
    
    return encodeURIComponent(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.location) {
      toast.error('Please fill in all fields');
      return;
    }

    setSaving(true);
    
    try {
      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), formData, { merge: true });
      
      // Generate WhatsApp link
      const whatsappNumber = process.env.NEXT_PUBLIC_SELLER_WHATSAPP_NUMBER || '919876543210';
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      
      // Clear cart
      localStorage.removeItem('vgc_cart');
      
      // Redirect to WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast.success('Order details sent! Redirecting to WhatsApp...');
      
      // Redirect to home after a delay
      setTimeout(() => {
        router.push('/vels-grace-crochet');
      }, 2000);
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header cartCount={0} />
        <main className="vgc-container" style={{ minHeight: 'calc(100vh - 200px)', paddingTop: '2rem' }}>
          <div className="vgc-loading">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header cartCount={cart.length} />
      
      <main className="vgc-container" style={{ minHeight: 'calc(100vh - 200px)', paddingTop: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#5d4037', marginBottom: '2rem' }}>
          Checkout
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <div className="vgc-card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#5d4037', marginBottom: '1.5rem' }}>
              Delivery Details
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="vgc-form-group">
                <label className="vgc-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="vgc-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="vgc-form-group">
                <label className="vgc-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="vgc-input"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div className="vgc-form-group">
                <label className="vgc-label">Delivery Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="vgc-textarea"
                  placeholder="Enter your complete delivery address"
                  required
                />
              </div>
              
              <div className="vgc-form-group">
                <label className="vgc-label">Location/City *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="vgc-input"
                  placeholder="Enter your city/location"
                  required
                />
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(93, 64, 55, 0.05)', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#5d4037', marginBottom: '1rem' }}>
                  Order Summary
                </h3>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#6d4c41' }}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div style={{ borderTop: '2px solid rgba(93, 64, 55, 0.2)', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700', color: '#5d4037' }}>
                  <span>Total:</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>
              
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 193, 7, 0.1)', borderRadius: '8px', border: '1px solid rgba(255, 193, 7, 0.3)' }}>
                <p style={{ fontSize: '0.9rem', color: '#5d4037', marginBottom: '0.5rem' }}>
                  <strong>📱 WhatsApp Order Confirmation</strong>
                </p>
                <p style={{ fontSize: '0.85rem', color: '#6d4c41' }}>
                  On clicking "Place Order", you'll be redirected to WhatsApp to confirm your order with the seller.
                </p>
              </div>
              
              <button type="submit" className="vgc-btn" style={{ width: '100%', marginTop: '1.5rem' }} disabled={saving}>
                {saving ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
