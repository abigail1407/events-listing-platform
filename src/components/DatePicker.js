'use client';

import React, { useEffect, useState } from 'react';

const DatePicker = ({ selectedDate, onDateChange }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (selectedDate) {
      setFormattedDate(selectedDate.toISOString().split('T')[0]);
    } else {
      setFormattedDate('');
    }
  }, [selectedDate]);

  const handleChange = (e) => {
    const value = e.target.value;
    const date = value ? new Date(value) : null;
    onDateChange(date);
  };

  const handleClear = () => {
    onDateChange(null);
  };

  return (
    <div className="w-full max-w-[170px] min-w-[100px] relative">
      <input
        type="date"
        value={formattedDate}
        onChange={handleChange}
        className="w-full pl-9 pr-10 py-2 border border-purple-500 rounded text-purple-500 placeholder-purple-200
          focus:outline-none focus:border-purple-700 hover:border-purple-700
          [&::-webkit-calendar-picker-indicator]:opacity-0
          [&::-webkit-calendar-picker-indicator]:cursor-pointer
          [&::-webkit-calendar-picker-indicator]:h-full
          [&::-webkit-calendar-picker-indicator]:w-full
          [&::-webkit-calendar-picker-indicator]:absolute
          [&::-webkit-calendar-picker-indicator]:top-0
          [&::-webkit-calendar-picker-indicator]:right-0"
        placeholder="Select a date"
      />

      {/* Custom icon (visual only) */}
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-purple-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3M16 7V3M4 11h16M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </span>

      {formattedDate && (
        <button
          onClick={handleClear}
          className="absolute right-0 top-0 bottom-0 px-3 bg-purple-500 text-white rounded-r-lg"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default DatePicker;
