import React from 'react';

const CheckEvents = ({ onFilterChange, currentFilter }) => {
  const baseClass = "px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base cursor-pointer select-none text-center border-b-2";

  const activeColors = {
    all: "border-[#1ba7ff] text-[#1ba7ff]",
    ongoing: "border-[#24f99d] text-[#24f99d]",
    upcoming: "border-[#fe5e00] text-[#fe5e00]",
    expired: "border-[#f8191f] text-[#f8191f]",
  };

  const inactiveClass = "border-transparent text-gray-500 hover:text-gray-700";

  const labels = {
    all: "Explore every event — ongoing, upcoming, or past. Find your next adventure here!",
    ongoing: "Dive into events happening right now. Don’t miss out on the excitement!",
    upcoming: "Get ready! Discover upcoming events and plan your calendar ahead.",
    expired: "Take a look back at events that have wrapped up recently.",
  };

  return (
    <div className="mb-6">
      <nav className="flex flex-wrap justify-start sm:justify-start items-center gap-x-2 gap-y-1 sm:gap-x-6">
        {['all', 'ongoing', 'upcoming', 'expired'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onFilterChange(type)}
            className={`${baseClass} ${currentFilter === type ? activeColors[type] : inactiveClass} font-medium`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Events
          </button>
        ))}
      </nav>

      <div className="mt-4 sm:mt-6 text-left bg-gradient-to-r from-[#FF1E56] to-[#0196FF] text-transparent bg-clip-text font-extrabold text-2xl sm:text-4xl italic">
        {labels[currentFilter]}
      </div>
    </div>
  );
};

export default CheckEvents;
