import React, { useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Rating,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  AttachMoney,
  Language,
} from '@mui/icons-material';
import { useTrips } from '../contexts/TripContext';
import { format } from 'date-fns';

const Trips = () => {
  const { trips, loading, error, deleteTrip } = useTrips();
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleDeleteTrip = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await deleteTrip(id);
      } catch (err) {
        console.error('Error deleting trip:', err);
      }
    }
  };

  const renderMobileView = () => (
    <Grid container spacing={2}>
      {trips.map((trip) => (
        <Grid item xs={12} key={trip._id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={trip.image}
              alt={trip.destination}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {trip.destination}, {trip.country}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {trip.startDate && trip.endDate ? 
                  `${format(new Date(trip.startDate), 'MMM dd, yyyy')} - ${format(new Date(trip.endDate), 'MMM dd, yyyy')}` :
                  'Dates not set'
                }
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Status: {trip.status}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setSelectedDestination(trip)}
                >
                  View Details
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteTrip(trip._id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderTableView = () => (
    <TableContainer component={Paper} sx={{ mt: 3, mb: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Destination</TableCell>
            <TableCell>Country</TableCell>
            {!isTablet && <TableCell>Dates</TableCell>}
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip._id} hover>
              <TableCell>{trip.destination}</TableCell>
              <TableCell>{trip.country}</TableCell>
              {!isTablet && (
                <TableCell>
                  {trip.startDate && trip.endDate ? 
                    `${format(new Date(trip.startDate), 'MMM dd, yyyy')} - ${format(new Date(trip.endDate), 'MMM dd, yyyy')}` :
                    'Dates not set'
                  }
                </TableCell>
              )}
              <TableCell>
                <Chip 
                  label={trip.status} 
                  color={
                    trip.status === 'completed' ? 'success' :
                    trip.status === 'ongoing' ? 'primary' :
                    trip.status === 'cancelled' ? 'error' : 'default'
                  }
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setSelectedDestination(trip)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteTrip(trip._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
          My Trips
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.href = '/planner'}
        >
          Plan New Trip
        </Button>
      </Box>
      
      {trips.length === 0 ? (
        <Alert severity="info">
          You haven't planned any trips yet. Click "Plan New Trip" to get started!
        </Alert>
      ) : (
        isMobile ? renderMobileView() : renderTableView()
      )}

      <Dialog
        open={Boolean(selectedDestination)}
        onClose={() => setSelectedDestination(null)}
        maxWidth="md"
        fullWidth
        scroll="body"
      >
        {selectedDestination && (
          <>
            <DialogTitle>
              <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                {selectedDestination.destination}, {selectedDestination.country}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.destination}
                  style={{
                    width: '100%',
                    height: isMobile ? '200px' : '300px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </Box>
              
              <Typography variant="body1" paragraph>
                {selectedDestination.description}
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                gap: 2, 
                mb: 2 
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime color="action" />
                  <Typography variant="body2">
                    {selectedDestination.startDate && selectedDestination.endDate ? 
                      `${format(new Date(selectedDestination.startDate), 'MMM dd, yyyy')} - ${format(new Date(selectedDestination.endDate), 'MMM dd, yyyy')}` :
                      'Dates not set'
                    }
                  </Typography>
                </Box>
                {selectedDestination.budget && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AttachMoney color="action" />
                    <Typography variant="body2">
                      {selectedDestination.budget.amount} {selectedDestination.budget.currency}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    label={selectedDestination.status} 
                    color={
                      selectedDestination.status === 'completed' ? 'success' :
                      selectedDestination.status === 'ongoing' ? 'primary' :
                      selectedDestination.status === 'cancelled' ? 'error' : 'default'
                    }
                    size="small"
                  />
                </Box>
              </Box>

              {selectedDestination.activities && selectedDestination.activities.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Planned Activities
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {selectedDestination.activities.map((activity: any, index: number) => (
                      <Chip
                        key={index}
                        label={activity.name}
                        icon={<LocationOn />}
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Box>
                </>
              )}
            </DialogContent>
            <DialogActions sx={{ flexDirection: isMobile ? 'column' : 'row', gap: 1, p: 2 }}>
              <Button 
                onClick={() => setSelectedDestination(null)}
                fullWidth={isMobile}
              >
                Close
              </Button>
              <Button
                variant="contained"
                fullWidth={isMobile}
                onClick={() => {
                  window.location.href = `/planner/${selectedDestination._id}`;
                }}
              >
                Edit Trip
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Trips; 