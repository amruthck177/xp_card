import './globals.css';

export const metadata = {
  title: 'CodeVerse | The Developer Civilization',
  description: 'An immersive RPG universe where you evolve into a legendary developer.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="particles-overlay" />
        {children}
      </body>
    </html>
  );
}
