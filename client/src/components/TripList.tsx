import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
} from '@mui/material';
import format from 'date-fns/format';
import PlaceIcon from '@mui/icons-material/Place';
import DateRangeIcon from '@mui/icons-material/DateRange';

interface Trip {
  id: number;
  destination: string;
  startDate: Date;
  endDate: Date;
  description: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const TripList: React.FC = () => {
  // Sample data - in a real app, this would come from an API or database
  const [trips] = useState<Trip[]>([
    {
      id: 1,
      destination: 'Paris, France',
      startDate: new Date('2024-06-15'),
      endDate: new Date('2024-06-22'),
      description: 'A week-long adventure in the City of Light',
      status: 'upcoming',
    },
    {
      id: 2,
      destination: 'Tokyo, Japan',
      startDate: new Date('2024-09-10'),
      endDate: new Date('2024-09-20'),
      description: 'Exploring Japanese culture and cuisine',
      status: 'upcoming',
    },
  ]);

  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'upcoming':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Trips
      </Typography>
      <Grid container spacing={3}>
        {trips.map((trip) => (
          <Grid item xs={12} md={6} key={trip.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h5" component="h2">
                    {trip.destination}
                  </Typography>
                  <Chip
                    label={trip.status}
                    color={getStatusColor(trip.status)}
                    size="small"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <PlaceIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography color="text.secondary">
                    {trip.destination}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <DateRangeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography color="text.secondary">
                    {format(trip.startDate, 'MMM d, yyyy')} - {format(trip.endDate, 'MMM d, yyyy')}
                  </Typography>
                </Box>
                <Typography sx={{ mt: 2 }}>{trip.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small" color="error">Delete</Button>
                <Button size="small" color="primary">View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TripList; 