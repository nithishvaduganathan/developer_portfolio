'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import { toast } from 'react-toastify';

export default function VelsGraceCrochetHome() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchProducts();
    updateCartCount();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setProducts(productsData);
      setFilteredProducts(productsData);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(productsData.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
      setLoading(false);
    }
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('vgc_cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('vgc_cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('vgc_cart', JSON.stringify(cart));
    updateCartCount();
    toast.success('Added to cart!');
  };

  return (
    <>
      <Header cartCount={cartCount} />
      
      <main className="vgc-container" style={{ minHeight: 'calc(100vh - 200px)', paddingTop: '2rem' }}>
        {/* Hero Section */}
        <section className="vgc-hero">
          <h1 className="vgc-hero-title">Welcome to Vels Grace Crochet</h1>
          <p className="vgc-hero-subtitle">
            Discover beautiful handmade crochet creations crafted with love and care
          </p>
        </section>

        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="vgc-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`vgc-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="vgc-loading">Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="vgc-product-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="vgc-empty">
            <h3>No products available yet</h3>
            <p>Check back soon for beautiful handmade crochet items!</p>
          </div>
        )}
      </main>
      
      <Footer />
    </>
  );
}
