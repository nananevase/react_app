import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  // Dummy user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Mumbai, India',
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" mb={2}>My Profile</Typography>
        <Typography variant="h6">Name: {user.name}</Typography>
        <Typography variant="body1" mb={1}>Email: {user.email}</Typography>
        <Typography variant="body1" mb={3}>Address: {user.address}</Typography>
        <Button variant="contained" onClick={() => navigate('/orders')}>View My Orders</Button>
      </Paper>
    </Box>
  );
};

export default ProfilePage; 