import { Geist, Geist_Mono } from "next/font/google";
import "./../styles/globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer'

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
        <div
          className="flex min-h-screen flex-col absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/banner-bg.png')" }}
        >
        </div>

        <div className="flex-1 flex flex-col z-10 relative">
            <Header />
              <main>{children}</main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
