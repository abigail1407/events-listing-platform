'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/events');
  };

  return (
    <>
      <Head>
        <title>Event Hub</title>
        <meta name="description" content="Search and filter events by date" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-[95vh] p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-6xl rounded-2xl p-4 sm:p-6 shadow-md">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold italic my-4 sm:my-6 md:my-8">
            Find Events That Inspire You
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold italic my-4 sm:my-6 md:my-8 bg-gradient-to-r from-[#FF1E56] to-[#0196FF] py-2 sm:py-4 text-transparent bg-clip-text">
            Explore a variety of exciting events including music festivals, art shows, tech conferences,
            food fairs, and more. Discover new experiences, connect with others, and enjoy unforgettable
            moments!
          </h2>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleExploreClick}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white text-base sm:text-lg md:text-xl rounded-xl shadow-lg hover:bg-blue-700 transition-all"
            >
              Explore Events
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
