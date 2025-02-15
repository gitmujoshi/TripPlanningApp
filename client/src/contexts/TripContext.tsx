import React, { createContext, useContext, useState, useEffect } from 'react';
import { tripApi } from '../services/api';

interface Trip {
  _id: string;
  destination: string;
  country: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
  image: string;
  budget: {
    amount: number;
    currency: string;
  };
  activities: Array<{
    name: string;
    date: Date | null;
    location: string;
    notes: string;
  }>;
  accommodation: {
    name: string;
    address: string;
    checkIn: Date | null;
    checkOut: Date | null;
    bookingReference: string;
  };
  transportation: {
    type: string;
    bookingReference: string;
    departureTime: Date | null;
    arrivalTime: Date | null;
    notes: string;
  };
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
}

interface TripContextType {
  trips: Trip[];
  loading: boolean;
  error: string | null;
  fetchTrips: () => Promise<void>;
  getTrip: (id: string) => Promise<Trip>;
  createTrip: (tripData: Omit<Trip, '_id'>) => Promise<void>;
  updateTrip: (id: string, tripData: Partial<Trip>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await tripApi.getTrips();
      setTrips(response.data);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch trips';
      setError(`Error: ${errorMessage}. Please ensure the server is running on port 5001 and MongoDB is connected.`);
      console.error('Error fetching trips:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTrip = async (id: string): Promise<Trip> => {
    try {
      setLoading(true);
      const response = await tripApi.getTrip(id);
      setError(null);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch trip';
      setError(`Error: ${errorMessage}. Please ensure the server is running on port 5001 and MongoDB is connected.`);
      console.error('Error fetching trip:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createTrip = async (tripData: Omit<Trip, '_id'>) => {
    try {
      setLoading(true);
      console.log('Creating trip with data:', tripData);
      const response = await tripApi.createTrip(tripData);
      console.log('Trip creation response:', response.data);
      setTrips(prev => [...prev, response.data]);
      setError(null);
      return response.data;
    } catch (err: any) {
      console.error('Detailed error in createTrip:', {
        error: err,
        response: err.response?.data,
        status: err.response?.status
      });
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create trip';
      setError(`Error: ${errorMessage}. Please ensure all required fields are filled and the server is connected.`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTrip = async (id: string, tripData: Partial<Trip>) => {
    try {
      setLoading(true);
      const response = await tripApi.updateTrip(id, tripData);
      setTrips(prev => prev.map(trip => 
        trip._id === id ? { ...trip, ...response.data } : trip
      ));
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update trip';
      setError(errorMessage);
      console.error('Error updating trip:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id: string) => {
    try {
      setLoading(true);
      await tripApi.deleteTrip(id);
      setTrips(prev => prev.filter(trip => trip._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete trip');
      console.error('Error deleting trip:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const value = {
    trips,
    loading,
    error,
    fetchTrips,
    getTrip,
    createTrip,
    updateTrip,
    deleteTrip,
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
}; 