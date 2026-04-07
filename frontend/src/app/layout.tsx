import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Esencia | Tu Tienda de Moda',
  description: 'Encuentra la mejor ropa y zapatillas en Esencia. Nike, Adidas, Jordan y más.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-medium tracking-wide">ESENCIA</p>
            <p className="text-sm text-gray-400 mt-1">&copy; 2026 Todos los derechos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
