import { Geist, Geist_Mono } from "next/font/google";
import "./../styles/globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Events Listing Platform",
  description: "A platform to list and manage events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#190c27] antialiased`}
      >
        {/* Background image container with fixed height */}
        <div
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/banner-bg.png')",
            width: '100%',
            height: '100vh',
          }}
        ></div>

        {/* App container with z-index to appear above background */}
        <div className="relative z-10 flex flex-col min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
