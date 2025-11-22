# 🍳 Telegram Recipe Catalog Mini App

A complete Telegram Mini App (Web App) for browsing 399+ recipes from the КЕРЦМАН cooking channel.

## 🚀 Features

- **Search**: Find recipes by title, ingredients, or description
- **Filters**: Filter by category, cuisine, difficulty, cooking time
- **Recipe of the Day**: Daily featured recipe
- **Detailed Recipe Pages**: Ingredients, steps, tags, and more
- **Telegram Integration**: Native theme support, back button, haptic feedback
- **Mobile-First**: Optimized for Telegram mobile experience
- **Fast & Lightweight**: Static export, no backend required

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Telegram**: Official Telegram Mini Apps SDK
- **Deployment**: Vercel (static export)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Method 2: GitHub Integration

1. Push code to GitHub
2. Import repository in [Vercel Dashboard](https://vercel.com/new)
3. Vercel will auto-detect Next.js and deploy

### Method 3: Manual Deploy

```bash
# Build the project
npm run build

# The static export will be in the 'out' folder
# Upload the 'out' folder to any static hosting
```

## 🤖 Telegram Bot Setup

### 1. Create a Bot

Talk to [@BotFather](https://t.me/botfather):

```
/newbot
```

Follow instructions to create your bot.

### 2. Set Web App URL

After deploying to Vercel, you'll get a URL like:
```
https://your-app.vercel.app
```

Tell BotFather to set the Web App:

```
/newapp
```

Select your bot, then provide:
- **Web App URL**: `https://your-app.vercel.app`
- **Title**: Recipe Catalog
- **Description**: Browse 399+ delicious recipes
- **Photo**: Upload a nice food photo

### 3. Create Menu Button (Optional)

```
/setmenubutton
```

Select your bot, then:
- Button text: "🍳 Открыть каталог"
- Web App URL: `https://your-app.vercel.app`

### 4. Test Your Mini App

Open your bot in Telegram and click the menu button or send:

```
/start
```

The Web App should open!

## 🎨 Customization

### Change Theme Colors

Edit `src/app/globals.css`:

```css
:root {
  --tg-theme-bg-color: #ffffff;
  --tg-theme-button-color: #40a7e3;
  /* ... other colors */
}
```

### Modify Recipe Data

Edit `src/data/recipes_extracted.json` to add/remove/modify recipes.

### Add New Filters

Edit `src/components/FilterPanel.tsx` to add custom filters.

## 📱 Testing Locally

### Option 1: Telegram Web

1. Open [Telegram Web](https://web.telegram.org/)
2. Open your bot
3. Click the Web App button

### Option 2: ngrok (for mobile testing)

```bash
# Install ngrok
npm install -g ngrok

# Run dev server
npm run dev

# In another terminal, expose localhost
ngrok http 3000

# Use the ngrok HTTPS URL in BotFather
```

### Option 3: Browser DevTools

Open in browser: `http://localhost:3000?tgWebAppPlatform=ios`

## 🔧 Environment Variables

No environment variables required! The app is fully static.

## 📂 Project Structure

```
telegram-recipe-app/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx           # Main catalog page
│   │   ├── recipe/[id]/       # Recipe detail page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/             # React components
│   │   ├── TelegramProvider.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── RecipeCard.tsx
│   │   └── RecipeOfTheDay.tsx
│   ├── lib/                    # Utilities
│   │   ├── telegram.ts        # Telegram WebApp helpers
│   │   └── recipeHelpers.ts   # Recipe filtering/search
│   ├── types/                  # TypeScript types
│   │   ├── recipe.ts
│   │   └── telegram.d.ts
│   └── data/                   # Data files
│       └── recipes_extracted.json
├── public/                     # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 Features Breakdown

### Main Page (`/`)
- Search bar with real-time filtering
- Filter panel (category, cuisine, difficulty, time)
- "Recipe of the Day" featured card
- Recipe grid with cards
- Results count
- Reset filters button

### Recipe Page (`/recipe/[id]`)
- Hero image
- Title and description
- Meta info badges (difficulty, time, cuisine)
- Categories tags
- Ingredients list with bullet points
- Step-by-step instructions with numbered steps
- Related tags
- Telegram back button integration

### Telegram Integration
- `window.Telegram.WebApp.ready()` on init
- Theme color adaptation (light/dark mode)
- Back button with navigation
- Haptic feedback on interactions
- Expandable viewport
- Query params support (`?id=recipe_1234`)

## 🐛 Troubleshooting

### Web App doesn't open in Telegram

- Make sure the URL is HTTPS (required by Telegram)
- Check that the URL is correctly set in BotFather
- Try clearing Telegram cache

### Theme colors not working

- Telegram WebApp SDK script must load first
- Check browser console for errors
- Fallback colors are applied if SDK unavailable

### Build errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Recipe images not showing

- Images are placeholders with colored backgrounds
- To add real images, update the `images` array in recipes JSON

## 📖 Documentation

- [Telegram Mini Apps Docs](https://core.telegram.org/bots/webapps)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 🤝 Contributing

Feel free to:
- Add more recipes
- Improve filtering logic
- Enhance UI/UX
- Add new features (favorites, share, etc.)

## 📝 License

Original recipes content © КЕРЦМАН Telegram channel  
App code: Free to use and modify

## 🙏 Credits

- Recipe data extracted from [@kerzmaneat](https://t.me/kerzmaneat)
- Built with Next.js, Tailwind CSS, and Telegram Mini Apps SDK

---

**Need help?** Open an issue or check the [Telegram Mini Apps documentation](https://core.telegram.org/bots/webapps).

**Happy cooking! 🍳👨‍🍳**

