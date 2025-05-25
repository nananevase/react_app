import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = () => {
    if (mobileNumber === '1234567890' && password === '123') {
      setLoginError('');
      console.log('Login successful!');
      auth.login({ name: 'Test User' });
      navigate('/');
    } else {
      setLoginError('Invalid mobile number or password');
      console.log('Login failed.');
    }
  };

  const handleAllowNotifications = () => {
      setShowNotificationPopup(false);
      console.log('Notifications allowed.');
  };

  const handleDenyNotifications = () => {
      setShowNotificationPopup(false);
      console.log('Notifications denied.');
  };

    const handleLocationPermission = (permission) => {
        console.log('Location permission:', permission);
        setShowLocationPopup(false);
    };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #0A192F 50%, #f0f0f0 50%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          backgroundImage: 'url(/images/india-map.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      <Typography variant="h6" sx={{ position: 'absolute', top: '40%', left: '19%', color: 'white', zIndex: 1, fontWeight: 'bold', textAlign: 'center' }}>
        4000+<br/>Ahmedabad
      </Typography>
      <Typography variant="h6" sx={{ position: 'absolute', top: '50%', left: '30%', color: 'white', zIndex: 1, fontWeight: 'bold', textAlign: 'center' }}>
        3000+<br/>Pune
      </Typography>
      <Typography variant="h6" sx={{ position: 'absolute', top: '45%', left: '28%', color: 'white', zIndex: 1, fontWeight: 'bold', textAlign: 'center' }}>
        1500+<br/>Nashik
      </Typography>
      <Typography variant="h6" sx={{ position: 'absolute', top: '53%', left: '31%', color: 'white', zIndex: 1, fontWeight: 'bold', textAlign: 'center' }}>
        800+<br/>Baramati
      </Typography>
      <Typography variant="h6" sx={{ position: 'absolute', top: '35%', left: '35%', color: 'white', zIndex: 1, fontWeight: 'bold', textAlign: 'center' }}>
        2500+<br/>Indore
      </Typography>
      <Typography variant="h6" sx={{ position: 'absolute', top: '38%', left: '15%', color: 'white', zIndex: 1, fontWeight: 'bold', textAlign: 'center' }}>
        1000+<br/>Jamnagar
      </Typography>
      <Typography variant="h6" sx={{ position: 'absolute', top: '65%', left: '25%', color: 'white', zIndex: 1, fontWeight: 'bold', textAlign: 'center' }}>
        1200+<br/>Bengaluru
      </Typography>

      <Typography variant="h4" sx={{ position: 'absolute', top: '22%', right: '10%', color: '#673AB7', zIndex: 1, fontWeight: 'bold' }}>
        5220+ Orders
      </Typography>

      <Box sx={{ position: 'absolute', bottom: 30, left: 30, color: 'white', zIndex: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Want to Join?</Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Call on 90330 71004 to Onboard!</Typography>
      </Box>

      <Paper elevation={3} sx={{ padding: 4, width: 350, textAlign: 'center', zIndex: 1, ml: '50%' }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Login
        </Typography>
        <TextField
          label="Mobile Number"
          fullWidth
          margin="normal"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          sx={{ mb: 2 }}
          error={!!loginError}
          helperText={loginError}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
          error={!!loginError}
        />
        {loginError && (
          <Typography variant="body2" color="error" sx={{ mt: -2, mb: 2 }}>
            {loginError}
          </Typography>
        )}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1.5, bgcolor: '#1976d2' }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Link href="#" variant="body2" sx={{ mt: 2, display: 'block', color: '#1976d2' }}>
          Forgot Password?
        </Link>
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
          <Typography variant="body2">
            Do you own Pharmacy ?
          </Typography>
          <Link href="#" variant="body2" sx={{ color: '#1976d2' }}>
            Join as Chemist
          </Link>
        </Box>
      </Paper>

      {showNotificationPopup && (
        <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 1300, width: 300, bgcolor: 'white', p: 2, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>We would like to send you notifications.</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>To help you learn more about new features and updates.</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="small" sx={{ mr: 1, color: 'text.secondary' }} onClick={handleDenyNotifications}>Don't Allow</Button>
            <Button size="small" variant="contained" sx={{ bgcolor: '#4CAF50' }} onClick={handleAllowNotifications}>Allow</Button>
          </Box>
        </Box>
      )}

      {showLocationPopup && (
        <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 1300, width: 300, bgcolor: 'white', p: 2, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>pharmacy.evitalrx.in wants to</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
              <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">Know your location</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button variant="outlined" sx={{ mb: 1 }} onClick={() => handleLocationPermission('allow_while_visiting')}>Allow while visiting the site</Button>
              <Button variant="outlined" sx={{ mb: 1 }} onClick={() => handleLocationPermission('allow_this_time')}>Allow this time</Button>
              <Button variant="outlined" onClick={() => handleLocationPermission('never_allow')}>Never allow</Button>
          </Box>
        </Box>
      )}


    </Box>
  );
};

export default Login; 