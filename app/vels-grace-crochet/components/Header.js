'use client';

import Link from 'next/link';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/config/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Header({ cartCount = 0 }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/vels-grace-crochet');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAdmin = user?.phoneNumber === process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER;

  return (
    <header className="vgc-header">
      <div className="vgc-container">
        <nav className="vgc-nav">
          <Link href="/vels-grace-crochet" className="vgc-logo">
            🧶 Vels Grace Crochet
          </Link>
          
          <div className="vgc-nav-links">
            <Link href="/vels-grace-crochet" className="vgc-nav-link">
              Home
            </Link>
            
            {user && isAdmin && (
              <Link href="/vels-grace-crochet/admin" className="vgc-nav-link">
                Admin
              </Link>
            )}
            
            <Link href="/vels-grace-crochet/cart" className="vgc-cart-icon">
              <FiShoppingCart size={24} color="#5d4037" />
              {cartCount > 0 && (
                <span className="vgc-cart-badge">{cartCount}</span>
              )}
            </Link>
            
            {user ? (
              <button onClick={handleLogout} className="vgc-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                <FiLogOut size={18} style={{ display: 'inline', marginRight: '0.25rem' }} />
                Logout
              </button>
            ) : (
              <Link href="/vels-grace-crochet/auth" className="vgc-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                <FiUser size={18} style={{ display: 'inline', marginRight: '0.25rem' }} />
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
