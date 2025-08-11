# GitHub Pages Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `sand-lake-shores` (or your preferred name)
3. Make it public (required for GitHub Pages)

### 2. Push Your Code
```bash
# Initialize git (if not already done)
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/kumas-cottage.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Sand Lake Shores website"

# Push to GitHub
git push -u origin main
```

### 3. Deploy to GitHub Pages
```bash
# Navigate to client directory
cd client

# Deploy to GitHub Pages
npm run deploy
```

### 4. Configure GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch
6. Click "Save"

### 5. Access Your Site
Your site will be available at: `https://YOUR_USERNAME.github.io/kumas-cottage`

## 🔧 Configuration Notes

### Homepage URL
Make sure the homepage in `client/package.json` matches your repository:
```json
"homepage": "https://YOUR_USERNAME.github.io/kumas-cottage"
```

### Demo Features
- ✅ Complete website with all pages
- ✅ Interactive booking calendar (demo mode)
- ✅ Admin panel (fully functional)
- ✅ Responsive design

### Disabled for Demo
- ❌ Actual booking submissions
- ❌ Email notifications
- ❌ Server-side functionality

## 🛠️ Troubleshooting

### Common Issues

1. **404 Errors**: Make sure the homepage URL in package.json is correct
2. **Build Errors**: Run `npm run build` first to check for issues
3. **Deployment Fails**: Check that gh-pages is installed and configured

### Re-deploying
```bash
cd client
npm run deploy
```

## 📝 Next Steps

After deployment:
1. Test all pages work correctly
2. Test the admin panel functionality
3. Share the URL with your aunt
4. When ready for production, re-enable booking/email functionality

## 🔄 Re-enabling Full Functionality

To restore full booking and email functionality:

1. **Re-enable booking submission** in `client/src/pages/Booking.js`
2. **Re-enable email sending** in `server/index.js`
3. **Deploy with a proper backend server**
4. **Configure email settings**

---

**Note**: This demo version is perfect for showing the website design and admin functionality without requiring a backend server. 