import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Box, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';

const featuredDestinations = [
  {
    title: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Visit the iconic Eiffel Tower, explore the Louvre Museum, and stroll along the romantic Seine River. Experience world-class cuisine and charming café culture.',
  },
  {
    title: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Discover the perfect blend of tradition and technology. Visit the serene Senso-ji Temple, experience the bustling Shibuya Crossing, and enjoy authentic Japanese cuisine.',
  },
  {
    title: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Experience the energy of Times Square, walk through Central Park, and take in the skyline from the Empire State Building. Enjoy diverse cuisines and world-class entertainment.',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center', 
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 600
          }}
        >
          Plan Your Next Adventure
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          paragraph
          sx={{ 
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            mb: { xs: 3, sm: 4 }
          }}
        >
          Discover amazing destinations and create unforgettable memories
        </Typography>
        <Box sx={{ 
          mt: 4, 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2, 
          justifyContent: 'center' 
        }}>
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            fullWidth={isMobile}
            startIcon={<ExploreIcon />}
            onClick={() => navigate('/trips')}
          >
            Explore Trips
          </Button>
          <Button
            variant="outlined"
            size={isMobile ? "medium" : "large"}
            fullWidth={isMobile}
            startIcon={<AddIcon />}
            onClick={() => navigate('/planner')}
          >
            Create New Trip
          </Button>
        </Box>
      </Box>

      {/* Featured Destinations */}
      <Box sx={{ my: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            mb: { xs: 3, sm: 4 },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' }
          }}
        >
          Featured Destinations
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {featuredDestinations.map((destination) => (
            <Grid item xs={12} sm={6} md={4} key={destination.title}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height={isMobile ? "200" : "300"}
                  image={destination.image}
                  alt={destination.title}
                  sx={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
                <CardContent>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h3"
                    sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                  >
                    {destination.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                  >
                    {destination.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: { xs: 4, sm: 6, md: 8 }, 
          px: { xs: 2, sm: 3, md: 4 },
          mx: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 4, sm: 6, md: 8 },
          bgcolor: 'primary.light', 
          borderRadius: 2, 
          color: 'white',
          boxShadow: 3,
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' } }}
        >
          Ready to Start Planning?
        </Typography>
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
        >
          Create your personalized travel itinerary today
        </Typography>
        <Button
          variant="contained"
          size={isMobile ? "medium" : "large"}
          color="secondary"
          onClick={() => navigate('/planner')}
          sx={{
            mt: { xs: 1, sm: 2 },
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 4,
            },
            transition: 'all 0.2s',
          }}
        >
          Start Planning
        </Button>
      </Box>
    </Container>
  );
};

export default Home; 