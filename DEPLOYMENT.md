# 🚀 Deployment Guide

## Quick Start

```bash
npm install
npm run build
vercel
```

## Step-by-Step Deployment

### 1. Prerequisites

- Node.js 18+ installed
- Vercel account (free): https://vercel.com/signup
- Telegram bot created via @BotFather

### 2. Build the App

```bash
# Install dependencies
npm install

# Test locally
npm run dev

# Build for production
npm run build
```

The build creates a static export in the `out/` folder.

### 3. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

#### Option B: GitHub + Vercel Dashboard

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Import in Vercel**:
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Get your URL**:
   - After deployment: `https://your-project.vercel.app`

#### Option C: Manual Deploy (Drag & Drop)

1. Build: `npm run build`
2. Go to https://vercel.com/new
3. Drag the `out/` folder
4. Vercel will deploy it

### 4. Configure Telegram Bot

#### Step 1: Create Bot (if you haven't)

Talk to [@BotFather](https://t.me/botfather):

```
/newbot
```

Example:
- Bot name: Recipe Catalog Bot
- Bot username: my_recipe_catalog_bot

Save the bot token (you won't need it for the Mini App, but keep it safe).

#### Step 2: Set Web App

In @BotFather:

```
/newapp
```

- Select your bot
- **Title**: Recipe Catalog
- **Short name**: recipes (lowercase, no spaces)
- **Description**: Browse 399+ delicious recipes from КЕРЦМАН channel
- **Photo**: Upload a 640x360 image (food photo)
- **Web App URL**: `https://your-app.vercel.app`

#### Step 3: Set Menu Button

```
/setmenubutton
```

- Select your bot
- Type: Web App
- Button text: 🍳 Открыть каталог
- Web App URL: `https://your-app.vercel.app`

#### Step 4: Test

1. Open Telegram
2. Find your bot
3. Click "Menu" button or send `/start`
4. The Mini App should open!

### 5. Custom Domain (Optional)

In Vercel Dashboard:
1. Go to your project → Settings → Domains
2. Add your domain (e.g., recipes.yourdomain.com)
3. Update DNS records as instructed
4. Update Web App URL in @BotFather

### 6. Environment Setup

No environment variables needed! Everything is static.

If you want analytics:

```bash
# Create .env.local
echo "NEXT_PUBLIC_ANALYTICS_ID=your-id" > .env.local

# Add to .gitignore
echo ".env.local" >> .gitignore
```

## 🔧 Advanced Configuration

### Custom Build Settings

If using Vercel Dashboard, set:

**Framework Preset**: Next.js  
**Build Command**: `npm run build`  
**Output Directory**: `out`  
**Install Command**: `npm install`

### Performance Optimization

Already included:
- ✅ Static export (no server needed)
- ✅ Automatic code splitting
- ✅ Image optimization (disabled for static export)
- ✅ CSS minification
- ✅ Tree shaking

### SEO (if needed later)

Edit `src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: 'Your Custom Title',
  description: 'Your description',
  keywords: ['recipes', 'cooking', 'food'],
};
```

## 🧪 Testing

### Local Testing

```bash
# Development
npm run dev
# Open: http://localhost:3000

# Production build test
npm run build
npx serve out
# Open: http://localhost:3000
```

### Test in Telegram (Development)

Use ngrok to expose localhost:

```bash
# Install ngrok
npm install -g ngrok

# Run dev server
npm run dev

# In another terminal
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Update in @BotFather temporarily
```

### Test on Mobile

1. Deploy to Vercel
2. Open Telegram on phone
3. Open your bot
4. Click Web App button

## 📊 Monitoring

### Vercel Analytics (Free)

1. Go to Vercel Dashboard → Your Project → Analytics
2. Enable "Vercel Analytics"
3. View page views, performance, etc.

### Custom Analytics

Add to `src/app/layout.tsx`:

```tsx
import Script from 'next/script';

// In layout:
<Script
  src="https://your-analytics.com/script.js"
  strategy="afterInteractive"
/>
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next out node_modules

# Reinstall
npm install

# Rebuild
npm run build
```

### Telegram Web App Doesn't Open

1. **Check HTTPS**: Telegram requires HTTPS
   - ✅ Vercel provides HTTPS automatically
   
2. **Check URL in BotFather**:
   - Must be exactly as deployed (with https://)
   
3. **Clear Telegram Cache**:
   - Settings → Data and Storage → Clear Cache

4. **Check Browser Console**:
   - Open Web App
   - Press F12 → Console
   - Look for errors

### Styles Not Loading

If styles don't load in production:

1. Check `next.config.js` has:
```js
output: 'export',
images: { unoptimized: true }
```

2. Rebuild: `npm run build`

### Back Button Not Working

Make sure Telegram SDK script loads:
```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

Already included in `src/app/layout.tsx`.

## 🔄 Updates

### Update Recipe Data

1. Edit `src/data/recipes_extracted.json`
2. Rebuild: `npm run build`
3. Redeploy: `vercel --prod`

### Update Code

```bash
# Make changes
git add .
git commit -m "Update: description"
git push

# If using GitHub integration, Vercel auto-deploys
# Or manually: vercel --prod
```

## 📋 Pre-Deployment Checklist

- [ ] All recipes data is in `src/data/recipes_extracted.json`
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Tested locally: `npm run dev`
- [ ] Telegram bot created
- [ ] Web App URL set in @BotFather
- [ ] Menu button configured
- [ ] Tested in Telegram (mobile)

## 🎉 Success!

Your Telegram Mini App is now live at:
```
https://your-app.vercel.app
```

Users can access it through your Telegram bot! 🚀

---

**Need help?** 
- Telegram Mini Apps: https://core.telegram.org/bots/webapps
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

