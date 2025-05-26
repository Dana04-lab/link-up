// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './context/AuthContext';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Link-Up',
  description: 'Video calling App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk">
      <body className={`${inter.className} bg-[#161925] text-white`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
