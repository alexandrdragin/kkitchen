# ⚡ Quick Start Guide

## 🚀 Get Running in 5 Minutes

### 1. Install Dependencies (1 minute)

```bash
cd telegram-recipe-app
npm install
```

### 2. Run Development Server (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 3. Test in Browser

The app works without Telegram SDK for testing:
- Browse recipes
- Use search and filters
- Click on recipes to see details
- Test responsive design (mobile view)

### 4. Deploy to Vercel (2 minutes)

```bash
# Install Vercel CLI (one time only)
npm install -g vercel

# Deploy
vercel
```

Follow the prompts:
- Set up and deploy: **Yes**
- Which scope: Select your account
- Link to existing project: **No**
- Project name: (press Enter to accept default)
- Directory: **.**
- Override settings: **No**

You'll get a URL like: `https://telegram-recipe-app-abc123.vercel.app`

### 5. Connect to Telegram Bot (2 minutes)

#### Create a Bot

1. Open Telegram
2. Search for **@BotFather**
3. Send: `/newbot`
4. Bot name: `Recipe Catalog Bot`
5. Username: `my_recipes_bot` (must end with 'bot')

#### Set Web App

1. In BotFather, send: `/newapp`
2. Select your bot
3. Title: `Recipe Catalog`
4. Short name: `recipes`
5. Description: `Browse 399+ recipes`
6. Upload a food photo (640x360)
7. Web App URL: Paste your Vercel URL

#### Set Menu Button

1. In BotFather, send: `/setmenubutton`
2. Select your bot
3. Button text: `🍳 Open Catalog`
4. Web App URL: Paste your Vercel URL

### 6. Test in Telegram

1. Open your bot in Telegram
2. Click the **Menu** button (bottom-left)
3. Your Mini App opens! 🎉

---

## 📝 Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Check code quality

# Deployment
vercel               # Deploy to preview
vercel --prod        # Deploy to production
```

---

## 🐛 Quick Fixes

### App doesn't open in Telegram?

1. Check URL is **HTTPS** (Vercel provides this automatically)
2. Make sure URL in BotFather matches exactly
3. Try clearing Telegram cache: Settings → Data → Clear Cache

### Search not working?

- Check browser console (F12) for errors
- Make sure `recipes_extracted.json` is in `src/data/`

### Styles look broken?

```bash
# Rebuild CSS
npm run dev
# Ctrl+C to stop
npm run build
```

---

## 📚 Next Steps

- **Customize**: Edit `src/app/globals.css` for colors
- **Add Features**: Check `README.md` for ideas
- **Deploy Updates**: Just run `vercel --prod` after changes
- **Monitor**: Check Vercel dashboard for analytics

---

## 🎯 Project Structure

```
telegram-recipe-app/
├── src/
│   ├── app/              # Pages (Next.js App Router)
│   ├── components/       # React components
│   ├── lib/              # Utilities (Telegram SDK, helpers)
│   ├── types/            # TypeScript types
│   └── data/             # recipes_extracted.json
├── public/               # Static files
├── package.json          # Dependencies
└── README.md            # Full documentation
```

---

## ✅ Checklist

Before deploying:
- [ ] `npm install` successful
- [ ] `npm run dev` works
- [ ] `npm run build` successful
- [ ] Telegram bot created
- [ ] Web App URL set
- [ ] Tested in Telegram

---

**That's it!** You now have a working Telegram Mini App. 🎉

For detailed deployment instructions, see **DEPLOYMENT.md**.

For full documentation, see **README.md**.

