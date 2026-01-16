'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/config/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        },
        'expired-callback': () => {
          // Reset reCAPTCHA
          window.recaptchaVerifier = null;
        }
      });
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = `+91${phoneNumber}`;
      
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      window.confirmationResult = confirmationResult;
      toast.success('OTP sent to your phone!');
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP. Please try again.');
      
      // Reset recaptcha on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    
    try {
      const result = await window.confirmationResult.confirm(otp);
      toast.success('Successfully logged in!');
      
      // Redirect to checkout or home
      const returnUrl = localStorage.getItem('vgc_return_url') || '/vels-grace-crochet';
      localStorage.removeItem('vgc_return_url');
      router.push(returnUrl);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header cartCount={0} />
      
      <main className="vgc-container" style={{ minHeight: 'calc(100vh - 200px)', paddingTop: '2rem' }}>
        <div className="vgc-auth-container">
          <div className="vgc-card">
            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#5d4037', marginBottom: '1.5rem', textAlign: 'center' }}>
              {verificationId ? 'Verify OTP' : 'Login / Sign Up'}
            </h1>
            
            {!verificationId ? (
              <form onSubmit={handleSendOTP}>
                <div className="vgc-form-group">
                  <label className="vgc-label">Phone Number</label>
                  <div className="vgc-phone-input-group">
                    <input
                      type="text"
                      value="+91"
                      disabled
                      className="vgc-input vgc-country-code"
                      style={{ background: '#f5f5f5' }}
                    />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').substring(0, 10))}
                      placeholder="Enter 10-digit mobile number"
                      className="vgc-input"
                      required
                      maxLength={10}
                    />
                  </div>
                </div>
                
                <div id="recaptcha-container"></div>
                
                <button type="submit" className="vgc-btn" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP}>
                <div className="vgc-form-group">
                  <label className="vgc-label">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    className="vgc-input"
                    required
                    maxLength={6}
                    style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }}
                  />
                  <p style={{ fontSize: '0.85rem', color: '#6d4c41', marginTop: '0.5rem', textAlign: 'center' }}>
                    OTP sent to +91{phoneNumber}
                  </p>
                </div>
                
                <button type="submit" className="vgc-btn" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setVerificationId('');
                    setOtp('');
                  }}
                  className="vgc-btn vgc-btn-outline"
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Change Phone Number
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
