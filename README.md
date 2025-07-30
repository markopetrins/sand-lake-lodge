# Sand Lake Lodge - Booking System

A secure, optimized booking system for Sand Lake Lodge with comprehensive admin management capabilities.

## 🚀 GitHub Pages Demo

**Demo Site**: [https://markopetrina.github.io/sand-lake-lodge](https://markopetrins.github.io/sand-lake-lodge)

**Note**: For the GitHub Pages demo, booking and email functionality has been temporarily disabled. The admin page is fully functional for demonstration purposes.

### Demo Features:
- ✅ Complete website with all pages (Home, About, Features, Gallery)
- ✅ Interactive booking calendar (demo mode - no actual bookings)
- ✅ Admin panel with full functionality
- ✅ Responsive design and animations

### Temporarily Disabled for Demo:
- ❌ Actual booking submissions
- ❌ Email notifications
- ❌ Server-side booking management

---

## 🔒 Security Features

- **JWT Authentication**: Secure admin access with token-based authentication
- **Input Validation**: Comprehensive server-side validation for all user inputs
- **Rate Limiting**: Protection against brute force attacks on admin login
- **CORS Protection**: Configured for production with specific allowed origins
- **Environment Variables**: All sensitive data stored in environment variables
- **Error Handling**: Secure error responses that don't expose internal details

## 🚀 Performance Optimizations

- **Removed Debug Logging**: Clean production logs without sensitive data exposure
- **Optimized Dependencies**: Removed unused packages to reduce bundle size
- **Error Boundaries**: React error boundaries prevent app crashes
- **Efficient State Management**: Optimized API calls and state updates

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gmail account with App Password (for email notifications)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sand-lake-lodge
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cd server
   cp env.example .env
   ```

4. **Configure your `.env` file**
   ```env
   # Email Configuration (Gmail)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # Server Configuration
   PORT=5000
   NODE_ENV=production

   # Security: JWT Secret (REQUIRED - Generate a strong random string)
   JWT_SECRET=your-super-secure-jwt-secret-key-here

   # Admin Credentials (REQUIRED - Change these immediately)
   ADMIN_EMAIL=admin@sandlakelodge.com
   ADMIN_PASSWORD=your-secure-admin-password

   # CORS Configuration (for production)
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

## 🚀 Deployment

### For Production (Full Functionality)
1. Set up your environment variables
2. Deploy the server to your hosting provider
3. Deploy the client to your domain

### For GitHub Pages Demo
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Update homepage in `client/package.json`
3. Run: `npm run deploy`

## 🔧 Development

### Start Development Server
```bash
# Start both client and server
npm run dev

# Start only client
npm run client

# Start only server
npm run server
```

### Build for Production
```bash
# Build client
npm run build

# Build and deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
sand-lake-lodge/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/               # React components and pages
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend
│   ├── index.js          # Main server file
│   ├── data.json         # Booking data storage
│   └── package.json      # Backend dependencies
└── README.md             # This file
```

## 🔐 Admin Access

- **URL**: `/admin`
- **Default Email**: Set in your `.env` file
- **Default Password**: Set in your `.env` file

**Important**: Change the default admin credentials immediately after setup!

## 📧 Email Configuration

The system uses Gmail SMTP for email notifications. To set up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Use the App Password in your `.env` file

## 🛡️ Security Checklist

- [ ] Change default admin credentials
- [ ] Generate a strong JWT secret
- [ ] Configure CORS for your domain
- [ ] Set up proper email credentials
- [ ] Review and update environment variables
- [ ] Test all security features

## 📞 Support

For questions or issues, please refer to the documentation or contact the development team.

---

**Note**: This is a demo version for GitHub Pages. For full functionality, deploy with a proper backend server and email configuration. 