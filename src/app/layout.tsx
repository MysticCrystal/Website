import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const customMontserrat = localFont({
  src: [
    {
      path: '../fonts/Montserrat-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: '../fonts/Montserrat-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-serif', // Aliasing to serif since all headlines are currently configured to use font-serif.
});

const montserrat = localFont({ // Keeping the sans variable pointing to the same font family in case it's used elsewhere
  src: '../fonts/Montserrat-VariableFont_wght.ttf',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Lane Banner | Premium Real Estate',
  description: 'Elevated real estate representation and visual marketing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${customMontserrat.variable} bg-brand-primary text-brand-dark antialiased`}>
        {children}
      </body>
    </html>
  );
}
