import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Trips from './components/Trips';
import TripPlanner from './components/TripPlanner';
import { TripProvider } from './contexts/TripContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
  },
});

function App() {
  // Determine if we're in development or production
  const isDevelopment = process.env.NODE_ENV === 'development';
  const basename = isDevelopment ? '/' : '/PlanningApp';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TripProvider>
          <Router basename={basename}>
            <Box sx={{ 
              minHeight: '100vh', 
              bgcolor: 'background.default',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Navbar />
              <Box sx={{ 
                flex: 1,
                width: '100%',
                pt: { xs: 2, sm: 3 },
                pb: { xs: 4, sm: 6 },
              }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/trips" element={<Trips />} />
                  <Route path="/planner" element={<TripPlanner />} />
                  <Route path="/planner/:id" element={<TripPlanner />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Box>
            </Box>
          </Router>
        </TripProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
