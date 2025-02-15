import express from 'express';
import { Request, Response } from 'express';
import Trip, { ITrip } from '../models/Trip';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Get all trips for the authenticated user
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const trips = await Trip.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ message: 'Error fetching trips' });
  }
});

// Get a specific trip
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    console.log('Fetching trip with ID:', req.params.id);
    console.log('User ID:', req.user._id);
    
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user._id });
    console.log('Found trip:', trip);
    
    if (!trip) {
      console.log('Trip not found');
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ message: 'Error fetching trip' });
  }
});

// Create a new trip
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    console.log('Creating new trip with data:', {
      ...req.body,
      userId: req.user._id
    });

    const tripData = {
      ...req.body,
      userId: req.user._id,
    };

    const trip = new Trip(tripData);
    console.log('Trip model created:', trip);

    const savedTrip = await trip.save();
    console.log('Trip saved successfully:', savedTrip);

    res.status(201).json(savedTrip);
  } catch (error: any) {
    console.error('Error creating trip:', {
      error: error.message,
      validationErrors: error.errors,
      stack: error.stack
    });
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.keys(error.errors).reduce((acc: any, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {})
      });
    }
    
    res.status(500).json({ message: 'Error creating trip', error: error.message });
  }
});

// Update a trip
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const tripData = req.body;
    
    // Convert date strings to Date objects
    if (tripData.startDate) tripData.startDate = new Date(tripData.startDate);
    if (tripData.endDate) tripData.endDate = new Date(tripData.endDate);
    
    if (tripData.activities) {
      tripData.activities = tripData.activities.map((activity: any) => ({
        ...activity,
        date: activity.date ? new Date(activity.date) : null,
      }));
    }
    
    if (tripData.accommodation) {
      tripData.accommodation = {
        ...tripData.accommodation,
        checkIn: tripData.accommodation.checkIn ? new Date(tripData.accommodation.checkIn) : null,
        checkOut: tripData.accommodation.checkOut ? new Date(tripData.accommodation.checkOut) : null,
      };
    }
    
    if (tripData.transportation) {
      tripData.transportation = {
        ...tripData.transportation,
        departureTime: tripData.transportation.departureTime ? new Date(tripData.transportation.departureTime) : null,
        arrivalTime: tripData.transportation.arrivalTime ? new Date(tripData.transportation.arrivalTime) : null,
      };
    }

    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      tripData,
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(trip);
  } catch (error: any) {
    console.error('Error updating trip:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.keys(error.errors).reduce((acc: any, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {})
      });
    }
    res.status(500).json({ message: 'Error updating trip' });
  }
});

// Delete a trip
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ message: 'Error deleting trip' });
  }
});

export default router; 