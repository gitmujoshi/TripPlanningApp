import mongoose, { Schema, Document } from 'mongoose';

export interface ITrip extends Document {
  userId: mongoose.Types.ObjectId;
  destination: string;
  country: string;
  startDate: Date;
  endDate: Date;
  description: string;
  image?: string;
  budget: {
    amount: number;
    currency: string;
  };
  activities: Array<{
    name: string;
    date: Date;
    location: string;
    notes?: string;
  }>;
  accommodation?: {
    name?: string;
    address?: string;
    checkIn?: Date;
    checkOut?: Date;
    bookingReference?: string;
  };
  transportation?: {
    type?: string;
    bookingReference?: string;
    departureTime?: Date;
    arrivalTime?: Date;
    notes?: string;
  };
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
}

const TripSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  destination: { type: String, required: true },
  country: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  budget: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true }
  },
  activities: [{
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    notes: String
  }],
  accommodation: {
    type: new Schema({
      name: String,
      address: String,
      checkIn: Date,
      checkOut: Date,
      bookingReference: String
    }, { _id: false }),
    required: false
  },
  transportation: {
    type: new Schema({
      type: String,
      bookingReference: String,
      departureTime: Date,
      arrivalTime: Date,
      notes: String
    }, { _id: false }),
    required: false
  },
  status: { 
    type: String, 
    required: true,
    enum: ['planned', 'ongoing', 'completed', 'cancelled'],
    default: 'planned'
  }
}, {
  timestamps: true
});

export default mongoose.model<ITrip>('Trip', TripSchema); 