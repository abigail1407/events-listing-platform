import { useState } from 'react';
import Image from 'next/image';

const CardGrid = ({ events }) => {
  const [imageError, setImageError] = useState({});

  if (!Array.isArray(events)) {
    console.warn('CardGrid expected an array but got:', events);
    return <p className="text-center text-sky-500 my-20 py-20">No events available.</p>;
  }

  const handleImageError = (eventId) => {
    setImageError((prev) => ({ ...prev, [eventId]: true }));
  };

  const getCountdownText = (event) => {
    const now = new Date();
    const start = new Date(event.starts_at);
    const end = new Date(event.expires_at);

    const getTimeDiff = (future) => {
      const diff = future - now;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      return { days, hours, minutes };
    };

    if (end < now) {
      return { label: 'Expired', className: 'text-[#ff3130]' };
    } else if (start <= now && end >= now) {
      const { days, hours, minutes } = getTimeDiff(end);
      return {
        label: `Ending in ${days} days : ${hours} hours : ${minutes} minutes`,
        className: 'text-yellow-400',
      };
    } else {
      const { days, hours, minutes } = getTimeDiff(start);
      return {
        label: `Starting in ${days} days : ${hours} hours : ${minutes} minutes`,
        className: 'text-[#01ffc3]',
      };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
      {events.map((event) => {
        const imageUrl = imageError[event.id] ? '/no-bg.png' : event.image_url;
        const { label, className } = getCountdownText(event);

        return (
          <div
            key={event.id}
            className="bg-[#0f0f1a] shadow-lg overflow-hidden"
          >
            <div className="relative w-full h-72">
              <Image
                src={imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                onError={() => handleImageError(event.id)}
                priority
              />
            </div>
            <div className="p-4 text-[#b0f7ff]">
              <h2 className="text-3xl font-extrabold bg-gradient-to-l from-[#FF1E56] to-[#0196FF] py-4 text-transparent bg-clip-text truncate">
                {event.title}
              </h2>
              <p className="text-base flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-[#00e5ff] mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {event.location}
                </span>
                <span className="inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-[#ff5fc6] mx-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 
                        5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 
                        1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 
                        7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273
                        -4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 
                        2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {event.type}
                </span>
              </p>
              <p className="text-amber-50 mb-3 line-clamp-3 text-lg">
                {event.description}
              </p>
              <p className="text-sm text-[#7afcff] mb-2">
                {new Date(event.starts_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })} — <span>
                  {new Date(event.expires_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </span>
              </p>
              <p className={`text-sm font-semibold ${className}`}>{label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardGrid;
