'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = dateTime.toLocaleString('en-US', {
    month: 'long',   // "May"
    day: 'numeric',  // "25"
    year: 'numeric', // "2025"
    hour: '2-digit',
    minute: '2-digit',
    hour12: true     // AM/PM format
  });
// bg-[#190c27]
  return (
    <header className="text-white">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-2xl flex flex-col gap-0 items-center xs:flex-row sm:gap-1 sm:text-xl bg-gradient-to-r from-[#FF1E56] to-[#0196FF] bg-clip-text text-transparent antialiased">
          <Image
            src="/events.png"
            alt="Logo"
            width={100}
            height={100}
            className="absolute w-auto h-25 sm:left-6 left-8 top-4"
            priority
            quality={100}
          />
        </Link>
        <div className="hidden sm:flex absolute w-auto top-10 h-20 right-26 flex-col gap-0 items-end text-base sm:text-2xl bg-gradient-to-r from-[#F692D9] to-[#0196FF] bg-clip-text text-transparent">
          {formattedDate}
        </div>
        <Image
            src="/icon.png"
            alt="Logo"
            width={100}
            height={100}
            className="absolute w-auto top-7 h-15 right-10 sm:right-4"
            priority
            quality={100}
          />
      </nav>
    </header>
  );
}
