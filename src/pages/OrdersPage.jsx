import React from 'react';
import { useCart } from '../context/CartContext';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const OrdersPage = () => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">You have no orders yet.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" mb={3}>My Orders</Typography>
      {orders.map(order => (
        <Paper key={order.id} sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6">Order ID: {order.id}</Typography>
          <Typography variant="body2" color="text.secondary">Date: {order.date}</Typography>
          <Typography variant="body2" color="text.secondary">Status: {order.status}</Typography>
          <List>
            {order.items.map(item => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={`${item.name} x ${item.qty}`}
                  secondary={`₹${item.price * item.qty}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="body1" fontWeight={600} mt={2}>
            Total: ₹{order.items.reduce((sum, item) => sum + item.price * item.qty, 0)}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default OrdersPage; 