'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '@/config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import Image from 'next/image';

export default function AdminPage() {
  const [user, loading] = useAuthState(auth);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        localStorage.setItem('vgc_return_url', '/vels-grace-crochet/admin');
        router.push('/vels-grace-crochet/auth');
      } else if (user.phoneNumber !== process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER) {
        toast.error('You do not have admin access');
        router.push('/vels-grace-crochet');
      } else {
        fetchProducts();
      }
    }
  }, [user, loading, router]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.imageUrl;

    try {
      const timestamp = Date.now();
      const storageRef = ref(storage, `products/${timestamp}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setUploading(true);
    
    try {
      const imageUrl = await uploadImage();
      
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        imageUrl: imageUrl || formData.imageUrl,
        updatedAt: serverTimestamp()
      };

      if (editingProduct) {
        // Update existing product
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
        toast.success('Product updated successfully!');
      } else {
        // Add new product
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp()
        });
        toast.success('Product added successfully!');
      }

      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description || '',
      category: product.category,
      imageUrl: product.imageUrl || ''
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteDoc(doc(db, 'products', productId));
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      imageUrl: ''
    });
    setImageFile(null);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    resetForm();
    setShowModal(true);
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

  if (!user || user.phoneNumber !== process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER) {
    return null;
  }

  return (
    <>
      <Header cartCount={0} />
      
      <main className="vgc-container" style={{ minHeight: 'calc(100vh - 200px)', paddingTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#5d4037' }}>
            Admin Panel
          </h1>
          <button onClick={handleAddNew} className="vgc-btn">
            <FiPlus style={{ display: 'inline', marginRight: '0.5rem' }} />
            Add Product
          </button>
        </div>

        <div className="vgc-admin-panel">
          {products.length === 0 ? (
            <div className="vgc-empty">
              <h3>No products yet</h3>
              <p>Click "Add Product" to create your first product</p>
            </div>
          ) : (
            <div className="vgc-admin-grid">
              {products.map(product => (
                <div key={product.id} className="vgc-card">
                  {product.imageUrl && (
                    <div style={{ position: 'relative', width: '100%', height: '150px', marginBottom: '1rem' }}>
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </div>
                  )}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#5d4037', marginBottom: '0.5rem' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#5d4037', marginBottom: '0.5rem' }}>
                    ₹{product.price}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#6d4c41', marginBottom: '1rem' }}>
                    {product.category}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleEdit(product)}
                      className="vgc-btn"
                      style={{ flex: 1, padding: '0.5rem' }}
                    >
                      <FiEdit2 style={{ display: 'inline' }} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="vgc-remove-btn"
                      style={{ flex: 1, padding: '0.5rem' }}
                    >
                      <FiTrash2 style={{ display: 'inline' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="vgc-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="vgc-modal" onClick={(e) => e.stopPropagation()}>
              <div className="vgc-modal-header">
                <h2 className="vgc-modal-title">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={() => setShowModal(false)} className="vgc-close-btn">
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="vgc-form-group">
                  <label className="vgc-label">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="vgc-input"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="vgc-form-group">
                  <label className="vgc-label">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="vgc-input"
                    placeholder="Enter price"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="vgc-form-group">
                  <label className="vgc-label">Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="vgc-input"
                    placeholder="e.g., Bags, Toys, Home Decor"
                    required
                  />
                </div>

                <div className="vgc-form-group">
                  <label className="vgc-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="vgc-textarea"
                    placeholder="Enter product description"
                  />
                </div>

                <div className="vgc-form-group">
                  <label className="vgc-label">Product Image</label>
                  <div className="vgc-image-upload">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                      {imageFile ? (
                        <p style={{ color: '#5d4037' }}>Selected: {imageFile.name}</p>
                      ) : formData.imageUrl ? (
                        <div>
                          <Image
                            src={formData.imageUrl}
                            alt="Current"
                            width={200}
                            height={200}
                            className="vgc-image-preview"
                          />
                          <p style={{ color: '#5d4037', marginTop: '0.5rem' }}>Click to change image</p>
                        </div>
                      ) : (
                        <p style={{ color: '#5d4037' }}>Click to upload image</p>
                      )}
                    </label>
                  </div>
                </div>

                <button type="submit" className="vgc-btn" style={{ width: '100%' }} disabled={uploading}>
                  {uploading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </>
  );
}
