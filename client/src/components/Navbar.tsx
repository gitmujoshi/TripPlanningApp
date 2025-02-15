import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Navbar = () => {
  return (
    <>
      <AppBar position="fixed" elevation={2}>
        <Toolbar>
          <FlightTakeoffIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Travel Planner
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/trips">
              My Trips
            </Button>
            <Button color="inherit" component={RouterLink} to="/planner">
              Plan Trip
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* This toolbar is a spacer to prevent content from hiding behind the fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default Navbar; 