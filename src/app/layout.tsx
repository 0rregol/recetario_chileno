import './globals.css'; 
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Recipe App',
  description: 'Chilean Recipes for the world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}