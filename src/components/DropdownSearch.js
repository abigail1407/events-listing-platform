'use client';  // Client-side component

import { useState, forwardRef, useImperativeHandle } from 'react';

const DropdownSearch = ({ onFilterChange }, ref) => {
  const [query, setQuery] = useState('');
  const [filterOption, setFilterOption] = useState('title'); // Default filter option is 'title'

  // Handle query change
  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onFilterChange(filterOption, value);
  };

  // Handle filter option change
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterOption(value);
    onFilterChange(value, query);
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onFilterChange(filterOption, query);
    }
  };

  // Reset function that clears both the filter and the query
  const clearSearch = () => {
    setQuery('');
    setFilterOption('title');
    onFilterChange('title', ''); // Reset the search in the parent component as well
  };

  // Expose the `clearSearch` method to the parent via ref
  useImperativeHandle(ref, () => ({
    clearSearch,
  }));

  return (
    <div className="flex items-center gap-4 w-full max-w-md">
      {/* Select wrapper */}
      <div className="w-full max-w-sm min-w-[150] relative">
        <select
          className="w-full bg-transparent placeholder-purple-200 text-purple-500 text-sm border border-purple-500 rounded pl-3 pr-8 py-2
            transition duration-300 ease-in-out
            focus:outline-none focus:border-purple-700 hover:border-purple-700 shadow-sm focus:shadow-md
            appearance-none h-[42px] cursor-pointer"
          value={filterOption}
          onChange={handleFilterChange}
        >
          <option value="title">Title</option>
          <option value="description">Description</option>
          <option value="location">Location</option>
          <option value="type">Event type</option>
        </select>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.2"
          stroke="currentColor"
          className="h-5 w-5 absolute top-2.5 right-2.5 text-purple-500 pointer-events-none"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </div>

      {/* Input wrapper */}
      <div className="w-full max-w-sm min-w-[150] relative">
        <input
          type="text"
          className="w-full px-4 py-2 border border-purple-500 rounded text-purple-500 placeholder-purple-200
            focus:outline-none focus:border-purple-700 hover:border-purple-700"
          placeholder={`Search by ${filterOption}...`}
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
        />

        {/* Clear button - only show when query is not empty */}
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default forwardRef(DropdownSearch);
