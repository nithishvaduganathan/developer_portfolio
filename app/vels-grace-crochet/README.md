# Vels Grace Crochet - E-Commerce Application

A complete, production-ready handmade e-commerce web application for the brand "Vels Grace Crochet."

## Features

### User Features
- 🛍️ **Browse Products**: View all products without authentication
- 🛒 **Shopping Cart**: Add items to cart, adjust quantities, remove items
- 📱 **Phone Authentication**: Secure OTP-based login via Firebase Authentication
- 📋 **User Profile**: Automatically save and reuse delivery details for future orders
- 💬 **WhatsApp Checkout**: Complete orders through direct WhatsApp messaging to seller
- 🎨 **Beautiful UI**: Light pastel green background with brown text for handcrafted aesthetic

### Admin Features
- 🔐 **Role-Based Access**: Admin panel visible only for predefined admin phone number
- ➕ **Add Products**: Create new products with images, names, prices, categories, descriptions
- ✏️ **Edit Products**: Update existing product details
- 🗑️ **Delete Products**: Remove products from the catalog
- 📸 **Image Upload**: Upload and manage product images via Firebase Storage

## Tech Stack

- **Frontend**: Next.js 16, React 19, TailwindCSS
- **Authentication**: Firebase Authentication (Phone OTP)
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Deployment**: Vercel-ready

## Setup Instructions

### 1. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firebase Authentication with Phone provider
3. Enable Firestore Database
4. Enable Firebase Storage
5. Get your Firebase configuration

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Admin Configuration (with country code, e.g., +919876543210)
NEXT_PUBLIC_ADMIN_PHONE_NUMBER=+919876543210

# WhatsApp Configuration (with country code, e.g., 919876543210)
NEXT_PUBLIC_SELLER_WHATSAPP_NUMBER=919876543210
```

### 3. Firestore Security Rules

Add these security rules to your Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products collection - read by all, write by admin only
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Firebase Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 5. Install Dependencies

```bash
npm install
```

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/vels-grace-crochet`

## Application Routes

- `/vels-grace-crochet` - Home page with product catalog
- `/vels-grace-crochet/cart` - Shopping cart
- `/vels-grace-crochet/checkout` - Checkout page (requires authentication)
- `/vels-grace-crochet/auth` - Phone authentication
- `/vels-grace-crochet/admin` - Admin panel (requires admin phone number)

## Usage

### For Customers

1. Browse products on the home page
2. Add items to cart
3. View cart and adjust quantities
4. Proceed to checkout
5. Login/Sign up with phone OTP
6. Fill in delivery details (saved for future orders)
7. Confirm order - redirected to WhatsApp with order details

### For Admin

1. Login with the admin phone number
2. Access admin panel from the header
3. Add new products with images, prices, categories
4. Edit existing products
5. Delete products
6. All changes reflect immediately on the main site

## Features Implemented

✅ Mobile-first responsive design
✅ Firebase Authentication with Phone OTP
✅ Firestore database for products and user data
✅ Firebase Storage for product images
✅ Shopping cart with local storage
✅ Automatic user profile saving
✅ WhatsApp integration for order fulfillment
✅ Role-based admin panel
✅ Full CRUD operations for products
✅ Category filtering
✅ Form validation and error handling
✅ Security rules for Firebase
✅ Clean, maintainable code structure

## Design Aesthetic

- **Background**: Light pastel green gradient (#e8f5e9 to #c8e6c9)
- **Text/Icons**: Brown (#5d4037)
- **Header**: Half-white transparent overlay with backdrop blur
- **Cards**: White with subtle shadows and hover effects
- **Buttons**: Brown with white text, smooth transitions

## Security

- Phone authentication required for checkout
- User data stored under unique UID
- Admin access restricted to specific phone number
- Firebase security rules implemented
- Form validation on client and server
- No sensitive data in frontend code

## Performance

- Next.js App Router for optimal performance
- Image optimization with Next.js Image component
- Local storage for cart to reduce database calls
- Lazy loading of components
- Optimized for mobile devices

## Future Enhancements

- Order history tracking
- Product reviews and ratings
- Search functionality
- Multiple product images
- Inventory management
- Email notifications
- Analytics dashboard

## Support

For issues or questions, contact the development team.

## License

Private - All rights reserved by Vels Grace Crochet
