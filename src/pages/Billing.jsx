import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  QrCodeScanner as ScannerIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import BarcodeScanner from '../components/common/BarcodeScanner';

const Billing = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handleScan = (barcode) => {
    // In a real app, this would fetch item details from your inventory
    const scannedItem = {
      id: Date.now(),
      sku: barcode,
      name: `Item ${barcode}`,
      price: Math.floor(Math.random() * 1000),
      quantity: 1,
    };

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.sku === barcode);
      if (existingItem) {
        return prev.map((item) =>
          item.sku === barcode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, scannedItem];
    });
  };

  const handleQuantityChange = (sku, change) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.sku === sku) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0
            ? { ...item, quantity: newQuantity }
            : item;
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (sku) => {
    setCartItems((prev) => prev.filter((item) => item.sku !== sku));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = () => {
    // In a real app, this would send the billing data to your backend
    console.log({
      customerName,
      customerPhone,
      paymentMethod,
      items: cartItems,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
    });
    // Reset form
    setCartItems([]);
    setCustomerName('');
    setCustomerPhone('');
    setPaymentMethod('cash');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Billing
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Items</Typography>
              <Button
                variant="outlined"
                startIcon={<ScannerIcon />}
                onClick={() => setScannerOpen(true)}
              >
                Scan Item
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>SKU</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>₹{item.price}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.sku, -1)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.sku, 1)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>₹{item.price * item.quantity}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(item.sku)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Customer Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Payment Method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                </TextField>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Bill Summary
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography>Subtotal:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">₹{calculateSubtotal()}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Tax (18%):</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">₹{calculateTax()}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Total:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="right">
                    ₹{calculateTotal()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={cartItems.length === 0}
              sx={{ mt: 3 }}
            >
              Process Payment
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <BarcodeScanner
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScan={handleScan}
      />
    </Box>
  );
};

export default Billing; 