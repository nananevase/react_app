import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" mb={2}>Order Placed Successfully!</Typography>
      <Typography variant="h6" mb={2}>Your Order ID: {orderId}</Typography>
      <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/orders')}>
        View Orders
      </Button>
      <Button variant="outlined" onClick={() => navigate('/')}>Go to Home</Button>
    </Box>
  );
};

export default OrderSuccessPage; 