# Vels Grace Crochet - Setup & Deployment Guide

## Quick Start

This e-commerce application is located at `/app/vels-grace-crochet` and is fully integrated with your existing Next.js portfolio.

### Access the Application

- **Development**: `http://localhost:3000/vels-grace-crochet`
- **Production**: `https://yourdomain.com/vels-grace-crochet`

## Prerequisites

1. **Firebase Project** - Create at [Firebase Console](https://console.firebase.google.com/)
2. **Node.js** - Version 16 or higher
3. **npm** or **yarn** - Package manager

## Step-by-Step Setup

### 1. Firebase Project Setup

#### a. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: "vels-grace-crochet"
4. Follow the setup wizard

#### b. Enable Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Phone** provider
3. Add your domain to authorized domains (for production)
4. Configure test phone numbers if needed (optional)

#### c. Create Firestore Database
1. Go to **Firestore Database** → **Create database**
2. Start in **test mode** (we'll add security rules later)
3. Choose a location (select closest to your users)

#### d. Enable Firebase Storage
1. Go to **Storage** → **Get Started**
2. Start in **test mode** (we'll add security rules later)
3. Same location as Firestore

#### e. Get Firebase Config
1. Go to **Project Settings** (gear icon)
2. Under "Your apps", click **Web** (</>)
3. Register app: "Vels Grace Crochet Web"
4. Copy the configuration object

### 2. Environment Configuration

#### a. Create `.env.local` file in root directory:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Admin Configuration (with country code)
# Example: +919876543210
NEXT_PUBLIC_ADMIN_PHONE_NUMBER=+91XXXXXXXXXX

# WhatsApp Configuration (without + symbol)
# Example: 919876543210
NEXT_PUBLIC_SELLER_WHATSAPP_NUMBER=91XXXXXXXXXX
```

**Important Notes:**
- Use `+` prefix for `ADMIN_PHONE_NUMBER`
- Do NOT use `+` for `SELLER_WHATSAPP_NUMBER`
- Replace X's with actual numbers

### 3. Firebase Security Rules

#### a. Firestore Rules

In Firebase Console → Firestore Database → Rules, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products collection - read by all, write by authenticated users
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **Publish**

#### b. Storage Rules

In Firebase Console → Storage → Rules, paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Product images - read by all, write by authenticated users
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024  // 5MB max
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

Click **Publish**

### 4. Install Dependencies

```bash
cd /path/to/developer_portfolio
npm install
```

The required dependencies are already in package.json:
- firebase
- react-firebase-hooks

### 5. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000/vels-grace-crochet`

### 6. Test the Application

#### a. Test Product Browsing (No Auth Required)
1. Visit `/vels-grace-crochet`
2. Should see empty state (no products yet)

#### b. Test Admin Login
1. Click "Login" in header
2. Enter the admin phone number (from .env.local)
3. Receive OTP via SMS
4. Enter OTP to verify
5. Should redirect to home page
6. "Admin" link should appear in header

#### c. Test Admin Panel
1. Click "Admin" in header
2. Click "Add Product"
3. Fill in product details:
   - Name: "Test Crochet Bag"
   - Price: 500
   - Category: "Bags"
   - Description: "Beautiful handmade bag"
   - Upload an image
4. Click "Add Product"
5. Product should appear in admin panel
6. Visit home page - product should be visible

#### d. Test Shopping Flow
1. Logout if logged in
2. Visit home page
3. Click "Add to Cart" on a product
4. Cart badge should show "1"
5. Click cart icon
6. Adjust quantity, verify calculations
7. Click "Proceed to Checkout"
8. Should redirect to login page
9. Login with your phone number
10. Fill in delivery details
11. Click "Place Order"
12. Should redirect to WhatsApp with order details

### 7. Production Deployment

#### a. For Vercel (Recommended)

1. **Add Environment Variables in Vercel**:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - Make sure they're available for Production, Preview, and Development

2. **Update Authorized Domains in Firebase**:
   - Firebase Console → Authentication → Settings
   - Add your Vercel domain: `your-app.vercel.app`

3. **Deploy**:
   ```bash
   git push origin main
   ```
   
   Or use Vercel CLI:
   ```bash
   vercel --prod
   ```

#### b. For Other Platforms

1. Add environment variables in your hosting platform
2. Update Firebase authorized domains
3. Deploy following platform's instructions

### 8. Post-Deployment Configuration

#### a. Update WhatsApp Number
Verify the WhatsApp number is correct and can receive messages.

#### b. Test Phone Authentication
Make sure phone authentication works in production:
- Firebase may require domain verification
- Check Firebase Console → Authentication → Settings → Authorized domains

#### c. Add reCAPTCHA Configuration (Production)
For production, you may need to configure reCAPTCHA:
1. Firebase Console → Authentication → Settings
2. Add reCAPTCHA configuration for phone auth

## Application Structure

```
app/vels-grace-crochet/
├── components/
│   ├── Header.js          # Navigation with cart badge
│   ├── Footer.js          # Footer component
│   └── ProductCard.js     # Product display card
├── admin/
│   └── page.js            # Admin panel (CRUD)
├── auth/
│   └── page.js            # Phone authentication
├── cart/
│   └── page.js            # Shopping cart
├── checkout/
│   └── page.js            # Checkout & WhatsApp
├── layout.js              # App layout
├── page.js                # Home/Products page
├── styles.css             # Custom styles
└── README.md              # Feature documentation

config/
└── firebase.js            # Firebase initialization

firestore.rules            # Firestore security rules
storage.rules             # Storage security rules
```

## Features Implemented

### User Features ✅
- Browse products without authentication
- Add to cart (local storage)
- Adjust quantities, remove items
- Phone OTP authentication
- Auto-save delivery details
- WhatsApp order fulfillment
- Category filtering

### Admin Features ✅
- Role-based access control
- Add products with images
- Edit product details
- Delete products
- Image upload to Firebase Storage
- Real-time updates

### Design Features ✅
- Pastel green background (#e8f5e9 to #c8e6c9)
- Brown text and accents (#5d4037)
- Half-transparent white header
- Mobile-first responsive
- Smooth animations
- Professional UI/UX

### Security Features ✅
- Firebase Authentication
- Firestore security rules
- Storage security rules
- Admin phone validation
- Form validation
- Error handling

## Troubleshooting

### Phone Authentication Not Working
- Check Firebase authorized domains
- Verify phone number format (+91XXXXXXXXXX)
- Check reCAPTCHA configuration
- Look for errors in browser console

### Images Not Uploading
- Check Firebase Storage rules
- Verify file size (< 5MB)
- Check file type (must be image)
- Look for errors in console

### Admin Panel Not Accessible
- Verify admin phone number in .env.local
- Must include country code with + prefix
- Login with exact number
- Check browser console for errors

### Build Errors
- Verify all dependencies installed: `npm install`
- Check environment variables are set
- Clear Next.js cache: `rm -rf .next`

### WhatsApp Link Not Working
- Verify WhatsApp number format (no + prefix)
- Must be a valid WhatsApp number
- Check if number can receive messages
- Test in browser first

## Customization

### Change Colors
Edit `app/vels-grace-crochet/styles.css`:
- Background: `.vgc-body` gradient
- Text: `color: #5d4037` (search & replace)
- Buttons: `.vgc-btn` background

### Add More Categories
Categories are automatically extracted from products. Just add products with new category names.

### Modify WhatsApp Message
Edit `generateWhatsAppMessage()` in `checkout/page.js`

### Change Logo
Edit header text in `components/Header.js` or add image logo

## Support & Maintenance

### Regular Tasks
1. Monitor Firebase usage (Authentication, Firestore, Storage)
2. Review and process WhatsApp orders
3. Add new products via admin panel
4. Update product information as needed

### Backup
- Firestore data can be exported via Firebase Console
- Download product images from Storage
- Keep environment variables secure

## Cost Considerations

### Firebase Free Tier (Spark Plan)
- **Authentication**: 10K verifications/month
- **Firestore**: 50K reads, 20K writes, 20K deletes/day
- **Storage**: 5GB storage, 1GB/day downloads

This is typically sufficient for small businesses. Monitor usage in Firebase Console.

### Scaling
If you exceed free tier:
- Upgrade to Firebase Blaze (pay-as-you-go)
- Optimize queries
- Add caching
- Consider CDN for images

## Next Steps

1. ✅ Complete Firebase setup
2. ✅ Configure environment variables
3. ✅ Deploy security rules
4. ✅ Test all features
5. ✅ Add initial products
6. ✅ Deploy to production
7. 📱 Start receiving orders!

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)
- [WhatsApp API](https://faq.whatsapp.com/1378167889205875/)

---

**Need Help?** Refer to the README.md in the vels-grace-crochet directory for feature details.
