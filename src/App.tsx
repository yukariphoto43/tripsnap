import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import TripDetail from './pages/TripDetail';
import Upload from './pages/Upload';
import NewTrip from './pages/NewTrip';

export interface Photo {
  id: number;
  tripId: string;
  imageUrl: string;
  memo: string;
  date: string;
  time: string;
}

export interface Trip {
  id: string;
  title: string;
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>(() => {
    const stored = localStorage.getItem('photos');
    return stored ? JSON.parse(stored) : [];
  });
  const addPhoto = (photo: Photo) => {
    setPhotos((prev) => [...prev, photo]);
  };

  const [trips, setTrips] = useState<Trip[]>(() => {
    const stored = localStorage.getItem('trips');
    return stored ? JSON.parse(stored) : [];
  });

  const addTrip = (title: string): string => {
    const newTrip: Trip = {
      id: new Date().toString(),
      title,
    };
    setTrips((prev) => [...prev, newTrip]);
    return newTrip.id;
  };

  useEffect(() => {
    const storedTrips = localStorage.getItem('trips');
    const storedPhotos = localStorage.getItem('photos');
    if (storedTrips) {
      try {
        const parsed = JSON.parse(storedTrips);
        setTrips(parsed);
        console.log("読み込んだ trips:", parsed);
      } catch (error) {
        console.error('Error parsing trips from localStorage:', error);
      }
    }
    if (storedPhotos) {
      try {
        setPhotos(JSON.parse(storedPhotos));
      } catch (error) {
        console.error('Error parsing photos from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('photos', JSON.stringify(photos));
  }, [photos]);

  const deletePhoto = (photoId: number) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home trips={trips} addTrips={addTrip} />} />
        <Route
          path="/trip/:tripId"
          element={<TripDetail photos={photos} trips={trips} setPhotos={setPhotos} deletePhoto={deletePhoto} />} />
        <Route
          path="/trip/:tripId/upload"
          element={<Upload addPhoto={addPhoto} trips={trips} />} />
        <Route
          path="/new"
          element={<NewTrip addTrip={addTrip} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
