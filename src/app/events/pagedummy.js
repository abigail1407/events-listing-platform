'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import CardGrid from '@/components/CardGrid';
import CheckEvents from '@/components/CheckEvents';
import DropdownSearch from '@/components/DropdownSearch';
import DatePicker from '@/components/DatePicker';

const eventsData = [
  {
    "id": 1,
    "title": "Global Tech Summit",
    "location": "San Francisco",
    "description": "Annual international technology conference with industry leaders",
    "type": "Conference",
    "starts_at": "2025-06-11T09:00:00Z",
    "expires_at": "2025-06-20T09:00:00Z",
    "image_url": "https://picsum.photos/1200/400?image=101"
  },
  {
    "id": 2,
    "title": "Metropolitan Art Fair",
    "location": "New York",
    "description": "Contemporary art exhibition featuring emerging artists",
    "type": "Exhibition",
    "starts_at": "2025-07-11T09:00:00Z",
    "expires_at": "2025-07-15T09:00:00Z",
    "image_url": "https://picsum.photos/1200/400?image=205"
  },
  {
    "id": 3,
    "title": "Sustainable Futures Forum",
    "location": "Berlin",
    "description": "Environmental sustainability conference and workshop series",
    "type": "Seminar",
    "starts_at": "2025-05-11T09:00:00Z",
    "expires_at": "2025-05-15T09:00:00Z",
    "image_url": "https://picsum.photos/1200/400?image=308"
  },
  {
    "id": 4,
    "title": "Asian Food Festival",
    "location": "Singapore",
    "description": "Culinary celebration showcasing pan-Asian cuisine",
    "type": "Festival",
    "starts_at": "2025-05-25T09:00:00Z",
    "expires_at": "2025-05-27T09:00:00Z",
    "image_url": "https://picsum.photos/1200/400?image=412"
  },
  {
    "id": 5,
    "title": "Blockchain Revolution Expo",
    "location": "Dubai",
    "description": "Global showcase of blockchain technologies and applications",
    "type": "Expo",
    "starts_at": "2025-05-11T09:00:00Z",
    "expires_at": "2025-05-15T09:00:00Z",
    "image_url": "https://picsum.photos/1200/400?image=517"
  },
  {
    "id": 6,
    "title": "Classical Symphony Night",
    "location": "Vienna",
    "description": "Evening with world-renowned symphony orchestra",
    "type": "Concert",
    "starts_at": "2025-05-11T09:00:00Z",
    "expires_at": "2025-05-15T09:00:00Z",
    "image_url": "https://picsum.photos/1200/400?image=623"
  },
  {
    "id": 7,
    "title": "Startup Investor Summit",
    "location": "London",
    "description": "Pitch competition connecting startups with venture capital",
    "type": "Competition",
    "starts_at": "2025-05-05T08:45:00Z",
    "expires_at": "2025-05-06T20:45:00Z",
    "image_url": "https://picsum.photos/1200/400?image=734"
  },
  {
    "id": 8,
    "title": "Digital Art Symposium",
    "location": "Tokyo",
    "description": "Exploring the future of digital art and NFTs",
    "type": "Workshop",
    "starts_at": "2025-05-05T15:00:00Z",
    "expires_at": "2025-05-07T03:00:00Z",
    "image_url": "https://picsum.photos/1200/400?image=842"
  },
  {
    "id": 9,
    "title": "Marine Biology Conference",
    "location": "Sydney",
    "description": "International conference on ocean conservation efforts",
    "type": "Conference",
    "starts_at": "2025-05-06T10:30:00Z",
    "expires_at": "2025-05-07T10:30:00Z",
    "image_url": "https://picsum.photos/1200/400?image=956"
  },
  {
    "id": 10,
    "title": "Fashion Forward Showcase",
    "location": "Paris",
    "description": "Premiere fashion event featuring avant-garde designers",
    "type": "Show",
    "starts_at": "2025-05-06T20:00:00Z",
    "expires_at": "2025-05-08T08:00:00Z",
    "image_url": "https://picsum.photos/1200/400?image=104"
  },
  {
    "id": 11,
    "title": "AI Robotics Expo",
    "location": "Seoul",
    "description": "Exhibition of cutting-edge AI-powered robotics",
    "type": "Exhibition",
    "starts_at": "2025-05-07T09:15:00Z",
    "expires_at": "2025-05-08T21:15:00Z",
    "image_url": "https://picsum.photos/1200/400?image=207"
  },
  {
    "id": 12,
    "title": "Global Health Summit",
    "location": "Geneva",
    "description": "International conference on public health initiatives",
    "type": "Conference",
    "starts_at": "2025-05-07T14:00:00Z",
    "expires_at": "2025-05-08T14:00:00Z",
    "image_url": "https://picsum.photos/1200/400?image=315"
  },
  {
    "id": 13,
    "title": "Jazz & Blues Festival",
    "location": "New Orleans",
    "description": "Weekend celebration of jazz and blues heritage",
    "type": "Festival",
    "starts_at": "2025-05-08T12:00:00Z",
    "expires_at": "2025-05-10T00:00:00Z",
    "image_url": "https://picsum.photos/1200/400?image=428"
  },
  {
    "id": 14,
    "title": "Smart Cities Forum",
    "location": "Singapore",
    "description": "Urban planning conference focusing on IoT solutions",
    "type": "Seminar",
    "starts_at": "2025-05-08T16:30:00Z",
    "expires_at": "2025-05-09T16:30:00Z",
    "image_url": "https://picsum.photos/1200/400?image=539"
  }
];

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  useEffect(() => {
    setEvents(eventsData);
    setFilteredEvents(eventsData);
  }, []);

  const handleDateChange = (e) => {
    const selectedDateObj = new Date(e.target.value);
    setSelectedDate(selectedDateObj);
    const filteredByDate = events.filter((event) => {
      const eventStart = new Date(event.starts_at);
      const eventEnd = new Date(event.expires_at);
      return (
        eventStart.toDateString() === selectedDateObj.toDateString() ||
        eventEnd.toDateString() === selectedDateObj.toDateString()
      );
    });
    setFilteredEvents(filteredByDate);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    setFilteredEvents([]);
    let filtered = [];
    if (filter === 'all') {
      filtered = events;
    } else {
      const now = new Date();
      filtered = events.filter((event) => {
        const start = new Date(event.starts_at);
        const end = new Date(event.expires_at);
        return filter === 'ongoing' ? start <= now && end >= now :
               filter === 'upcoming' ? start > now :
               filter === 'expired' ? end < now : true;
      });
    }
    setFilteredEvents(filtered);
  };

  const handleSearchChange = (filterType, query) => {
    setSearchQuery(query);
  };

  const handleSearchButtonClick = () => {
    let filtered = events;
    if (currentFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter((event) => {
        const start = new Date(event.starts_at);
        const end = new Date(event.expires_at);
        return currentFilter === 'ongoing' ? start <= now && end >= now :
               currentFilter === 'upcoming' ? start > now :
               currentFilter === 'expired' ? end < now : true;
      });
    }
    if (selectedDate) {
      filtered = filtered.filter((event) => {
        const eventStart = new Date(event.starts_at);
        const eventEnd = new Date(event.expires_at);
        return (
          eventStart.toDateString() === selectedDate.toDateString() ||
          eventEnd.toDateString() === selectedDate.toDateString()
        );
      });
    }
    if (searchQuery) {
      filtered = filtered.filter((event) => (
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
    setFilteredEvents(filtered);
    setSearchButtonClicked(true);
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

export default Home;
