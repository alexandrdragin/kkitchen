/**
 * Telegram Mini Apps SDK Helper
 */

export const initTelegramWebApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    
    // Initialize the app
    tg.ready();
    
    // Expand to full height
    tg.expand();
    
    // Set header color
    if (tg.headerColor) {
      tg.headerColor = tg.themeParams.bg_color || '#ffffff';
    }
    
    return tg;
  }
  
  return null;
};

export const useTelegramTheme = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    return {
      colorScheme: tg.colorScheme,
      themeParams: tg.themeParams,
      bgColor: tg.themeParams.bg_color || '#ffffff',
      textColor: tg.themeParams.text_color || '#000000',
      hintColor: tg.themeParams.hint_color || '#999999',
      linkColor: tg.themeParams.link_color || '#168acd',
      buttonColor: tg.themeParams.button_color || '#40a7e3',
      buttonTextColor: tg.themeParams.button_text_color || '#ffffff',
      secondaryBgColor: tg.themeParams.secondary_bg_color || '#f1f1f1',
    };
  }
  
  // Fallback theme
  return {
    colorScheme: 'light' as const,
    themeParams: {},
    bgColor: '#ffffff',
    textColor: '#000000',
    hintColor: '#999999',
    linkColor: '#168acd',
    buttonColor: '#40a7e3',
    buttonTextColor: '#ffffff',
    secondaryBgColor: '#f1f1f1',
  };
};

export const getTelegramWebApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    return window.Telegram.WebApp;
  }
  return null;
};

export const showBackButton = (callback: () => void) => {
  const tg = getTelegramWebApp();
  if (tg?.BackButton) {
    tg.BackButton.onClick(callback);
    tg.BackButton.show();
  }
};

export const hideBackButton = () => {
  const tg = getTelegramWebApp();
  if (tg?.BackButton) {
    tg.BackButton.hide();
  }
};

export const hapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
  const tg = getTelegramWebApp();
  if (tg?.HapticFeedback) {
    tg.HapticFeedback.impactOccurred(type);
  }
};

export const notificationFeedback = (type: 'error' | 'success' | 'warning') => {
  const tg = getTelegramWebApp();
  if (tg?.HapticFeedback) {
    tg.HapticFeedback.notificationOccurred(type);
  }
};

