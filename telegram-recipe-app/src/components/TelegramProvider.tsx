'use client';

import { useEffect, ReactNode } from 'react';
import { initTelegramWebApp, useTelegramTheme } from '@/lib/telegram';

export default function TelegramProvider({ children }: { children: ReactNode }) {
  const theme = useTelegramTheme();
  
  useEffect(() => {
    // Initialize Telegram Web App
    const tg = initTelegramWebApp();
    
    if (tg) {
      console.log('Telegram WebApp initialized:', {
        version: tg.version,
        platform: tg.platform,
        colorScheme: tg.colorScheme,
      });
    }
    
    // Apply theme colors to CSS variables
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--tg-theme-bg-color', theme.bgColor);
      root.style.setProperty('--tg-theme-text-color', theme.textColor);
      root.style.setProperty('--tg-theme-hint-color', theme.hintColor);
      root.style.setProperty('--tg-theme-link-color', theme.linkColor);
      root.style.setProperty('--tg-theme-button-color', theme.buttonColor);
      root.style.setProperty('--tg-theme-button-text-color', theme.buttonTextColor);
      root.style.setProperty('--tg-theme-secondary-bg-color', theme.secondaryBgColor);
    }
  }, [theme]);
  
  return <>{children}</>;
}

