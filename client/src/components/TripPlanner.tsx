import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useTrips } from '../contexts/TripContext';

interface Activity {
  name: string;
  date: Date | null;
  location: string;
  notes: string;
}

interface TripForm {
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
  activities: Activity[];
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

const initialFormState: TripForm = {
  destination: '',
  country: '',
  startDate: null,
  endDate: null,
  description: '',
  image: '',
  budget: {
    amount: 0,
    currency: 'USD',
  },
  activities: [],
  accommodation: {
    name: '',
    address: '',
    checkIn: null,
    checkOut: null,
    bookingReference: '',
  },
  transportation: {
    type: '',
    bookingReference: '',
    departureTime: null,
    arrivalTime: null,
    notes: '',
  },
  status: 'planned',
};

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];
const transportationTypes = ['Flight', 'Train', 'Bus', 'Car', 'Ship', 'Other'];
const tripStatuses = ['planned', 'ongoing', 'completed', 'cancelled'];

interface ValidationErrors {
  destination?: string;
  country?: string;
  startDate?: string;
  endDate?: string;
  budget?: {
    amount?: string;
  };
}

const TripPlanner: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { createTrip, updateTrip, getTrip, loading, error } = useTrips();
  const [formData, setFormData] = useState<TripForm>(initialFormState);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity & { index?: number }>({
    name: '',
    date: null,
    location: '',
    notes: '',
  });

  useEffect(() => {
    const fetchTripData = async () => {
      if (id) {
        try {
          console.log('Attempting to fetch trip with ID:', id);
          const tripData = await getTrip(id);
          if (!tripData) {
            console.error('Trip data is null or undefined');
            throw new Error('Trip not found');
          }
          console.log('Successfully fetched trip data:', tripData);
          
          // Convert date strings to Date objects
          const formattedTripData = {
            ...tripData,
            startDate: tripData.startDate ? new Date(tripData.startDate) : null,
            endDate: tripData.endDate ? new Date(tripData.endDate) : null,
            activities: tripData.activities?.map(activity => ({
              ...activity,
              date: activity.date ? new Date(activity.date) : null,
            })) || [],
            accommodation: {
              ...tripData.accommodation,
              checkIn: tripData.accommodation?.checkIn ? new Date(tripData.accommodation.checkIn) : null,
              checkOut: tripData.accommodation?.checkOut ? new Date(tripData.accommodation.checkOut) : null,
              name: tripData.accommodation?.name || '',
              address: tripData.accommodation?.address || '',
              bookingReference: tripData.accommodation?.bookingReference || '',
            },
            transportation: {
              ...tripData.transportation,
              departureTime: tripData.transportation?.departureTime ? new Date(tripData.transportation.departureTime) : null,
              arrivalTime: tripData.transportation?.arrivalTime ? new Date(tripData.transportation.arrivalTime) : null,
              type: tripData.transportation?.type || '',
              bookingReference: tripData.transportation?.bookingReference || '',
              notes: tripData.transportation?.notes || '',
            },
          };
          console.log('Formatted trip data:', formattedTripData);
          setFormData(formattedTripData);
        } catch (err: any) {
          console.error('Error fetching trip:', err);
          const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch trip';
          setValidationErrors({ destination: errorMessage });
          // Show error for longer duration
          setTimeout(() => {
            navigate('/trips');
          }, 5000); // Increased to 5 seconds
        }
      }
    };

    fetchTripData();
  }, [id, getTrip, navigate]);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    if (!formData.destination.trim()) {
      errors.destination = 'Destination is required';
      isValid = false;
    }

    if (!formData.country.trim()) {
      errors.country = 'Country is required';
      isValid = false;
    }

    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
      isValid = false;
    }

    if (!formData.endDate) {
      errors.endDate = 'End date is required';
      isValid = false;
    }

    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      errors.endDate = 'End date must be after start date';
      isValid = false;
    }

    if (formData.budget.amount < 0) {
      errors.budget = { amount: 'Budget amount cannot be negative' };
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof TripForm] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear validation error when field is edited
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setValidationErrors(prev => ({
        ...prev,
        [parent]: { ...(prev[parent as keyof ValidationErrors] as any), [child]: undefined },
      }));
    } else {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDateChange = (date: Date | null, field: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof TripForm] as any),
          [child]: date,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: date }));
    }
    // Clear validation error when date is changed
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setValidationErrors(prev => ({
        ...prev,
        [parent]: { ...(prev[parent as keyof ValidationErrors] as any), [child]: undefined },
      }));
    } else {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleActivityDialogOpen = (activity?: Activity & { index?: number }) => {
    if (activity) {
      setCurrentActivity(activity);
    } else {
      setCurrentActivity({
        name: '',
        date: null,
        location: '',
        notes: '',
      });
    }
    setActivityDialogOpen(true);
  };

  const handleActivityDialogClose = () => {
    setActivityDialogOpen(false);
    setCurrentActivity({
      name: '',
      date: null,
      location: '',
      notes: '',
    });
  };

  const handleActivitySave = () => {
    if (currentActivity.index !== undefined) {
      const newActivities = [...formData.activities];
      newActivities[currentActivity.index] = {
        name: currentActivity.name,
        date: currentActivity.date,
        location: currentActivity.location,
        notes: currentActivity.notes,
      };
      setFormData(prev => ({ ...prev, activities: newActivities }));
    } else {
      setFormData(prev => ({
        ...prev,
        activities: [
          ...prev.activities,
          {
            name: currentActivity.name,
            date: currentActivity.date,
            location: currentActivity.location,
            notes: currentActivity.notes,
          },
        ],
      }));
    }
    handleActivityDialogClose();
  };

  const handleActivityDelete = (index: number) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (id) {
        await updateTrip(id, formData);
      } else {
        await createTrip(formData);
      }
      navigate('/trips');
    } catch (err) {
      console.error('Error saving trip:', err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {id ? 'Edit Trip' : 'Plan New Trip'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                  error={!!validationErrors.destination}
                  helperText={validationErrors.destination}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  error={!!validationErrors.country}
                  helperText={validationErrors.country}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(date) => handleDateChange(date, 'startDate')}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: !!validationErrors.startDate,
                      helperText: validationErrors.startDate,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={(date) => handleDateChange(date, 'endDate')}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: !!validationErrors.endDate,
                      helperText: validationErrors.endDate,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter an image URL for your destination"
                />
              </Grid>

              {/* Budget */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Budget
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="budget.amount"
                  type="number"
                  value={formData.budget.amount}
                  onChange={handleInputChange}
                  error={!!validationErrors.budget?.amount}
                  helperText={validationErrors.budget?.amount}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Currency"
                  name="budget.currency"
                  value={formData.budget.currency}
                  onChange={handleInputChange}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Activities */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Activities</Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleActivityDialogOpen()}
                  >
                    Add Activity
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.activities.map((activity, index) => (
                    <Chip
                      key={index}
                      label={activity.name}
                      onDelete={() => handleActivityDelete(index)}
                      onClick={() => handleActivityDialogOpen({ ...activity, index })}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Accommodation */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Accommodation
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="accommodation.name"
                  value={formData.accommodation.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="accommodation.address"
                  value={formData.accommodation.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Check-in Date"
                  value={formData.accommodation.checkIn}
                  onChange={(date) => handleDateChange(date, 'accommodation.checkIn')}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Check-out Date"
                  value={formData.accommodation.checkOut}
                  onChange={(date) => handleDateChange(date, 'accommodation.checkOut')}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Booking Reference"
                  name="accommodation.bookingReference"
                  value={formData.accommodation.bookingReference}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* Transportation */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Transportation
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Type"
                  name="transportation.type"
                  value={formData.transportation.type}
                  onChange={handleInputChange}
                >
                  {transportationTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Booking Reference"
                  name="transportation.bookingReference"
                  value={formData.transportation.bookingReference}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Departure Time"
                  value={formData.transportation.departureTime}
                  onChange={(date) => handleDateChange(date, 'transportation.departureTime')}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Arrival Time"
                  value={formData.transportation.arrivalTime}
                  onChange={(date) => handleDateChange(date, 'transportation.arrivalTime')}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Transportation Notes"
                  name="transportation.notes"
                  value={formData.transportation.notes}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                />
              </Grid>

              {/* Trip Status */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Trip Status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  {tripStatuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/trips')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {id ? 'Update Trip' : 'Create Trip'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>

        {/* Activity Dialog */}
        <Dialog
          open={activityDialogOpen}
          onClose={handleActivityDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {currentActivity.index !== undefined ? 'Edit Activity' : 'Add Activity'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Activity Name"
                    value={currentActivity.name}
                    onChange={(e) => setCurrentActivity(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    label="Activity Date"
                    value={currentActivity.date}
                    onChange={(date) => setCurrentActivity(prev => ({ ...prev, date }))}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={currentActivity.location}
                    onChange={(e) => setCurrentActivity(prev => ({ ...prev, location: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    value={currentActivity.notes}
                    onChange={(e) => setCurrentActivity(prev => ({ ...prev, notes: e.target.value }))}
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleActivityDialogClose}>Cancel</Button>
            <Button
              onClick={handleActivitySave}
              variant="contained"
              disabled={!currentActivity.name}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default TripPlanner; 