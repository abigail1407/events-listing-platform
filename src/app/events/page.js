'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import CardGrid from '@/components/CardGrid';
import CheckEvents from '@/components/CheckEvents';
import DropdownSearch from '@/components/DropdownSearch';
import DatePicker from '@/components/DatePicker'; 

const EventsListing = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  // Fetch events once
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('https://68148b33225ff1af16292eee.mockapi.io/api/v1/events');
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    };
    fetchEvents();
  }, []);

  // Apply filters whenever currentFilter, searchQuery, or selectedDate changes AFTER searchButtonClicked is true
  useEffect(() => {
    if (!searchButtonClicked) return;
    applyFilters();
  }, [currentFilter, searchQuery, selectedDate]);

  // Handle filter buttons
  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    setSearchButtonClicked(true);
  };

  // Handle dropdown search
  const handleSearchChange = (_, query) => {
    setSearchQuery(query);
  };

  // Main filter logic
  const applyFilters = () => {
    let filtered = events;

    // Status filter
    if (currentFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter((event) => {
        const start = new Date(event.starts_at);
        const end = new Date(event.expires_at);
        if (currentFilter === 'ongoing') return start <= now && end >= now;
        if (currentFilter === 'upcoming') return start > now;
        if (currentFilter === 'expired') return end < now;
        return true;
      });
    }

    // Date filter
    if (selectedDate) {
      filtered = filtered.filter((event) => {
        const start = new Date(event.starts_at);
        const end = new Date(event.expires_at);
        return (
          start.toDateString() === selectedDate.toDateString() ||
          end.toDateString() === selectedDate.toDateString()
        );
      });
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const handleSearchButtonClick = () => {
    setSearchButtonClicked(true);
    applyFilters();
  };

  return (
    <>
      <Head>
        <title>Event Hub</title>
        <meta name="description" content="Search and filter events by date" />
      </Head>

      <main className="flex flex-col h-[100vh] items-center justify-start p-8 pt-8 mt-25">
        <div className="w-full max-w-8xl rounded-2xl p-6 shadow-md">
          <div className="my-4 flex justify-end gap-2 flex-wrap">
            <DropdownSearch onFilterChange={handleSearchChange} />
            <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <button
              onClick={handleSearchButtonClick}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          <div className="mb-6">
            <CheckEvents onFilterChange={handleFilterChange} currentFilter={currentFilter} />
          </div>

          <div className="mt-6 min-h-screen">
            {filteredEvents.length === 0 && searchButtonClicked ? (
              <p className="text-xl text-white-500 text-center my-20">No events available for the selected filters.</p>
            ) : (
              <CardGrid events={filteredEvents} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default EventsListing;
