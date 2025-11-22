import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TelegramProvider from '@/components/TelegramProvider';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Recipe Catalog | Telegram Mini App',
  description: 'Каталог рецептов от канала КЕРЦМАН',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async></script>
      </head>
      <body className={inter.className}>
        <TelegramProvider>
          {children}
        </TelegramProvider>
      </body>
    </html>
  );
}

