import React from 'react'
import TripCard from '../components/TripCard'
import { Link } from 'react-router-dom';
import type { Trip } from '../App';
import type { NewTripProps } from './NewTrip';

const Home: React.FC<{ trips: Trip[], addTrips: NewTripProps['addTrip'] }> = ({ trips, addTrips }) => {

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">TripSnap📸</h1>
      {trips.map((trip) => (
        <TripCard title={trip.title} id={trip.id} />
      ))}
      <Link to="/new">
        <button className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
          + 新しい旅を追加
        </button>
      </Link>
    </div>
  );
};

export default Home;
