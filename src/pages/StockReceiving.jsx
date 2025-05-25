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
} from '@mui/icons-material';
import BarcodeScanner from '../components/common/BarcodeScanner';

const StockReceiving = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [batch, setBatch] = useState({});
  const [expiryDate, setExpiryDate] = useState({});
  const [supplier, setSupplier] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [receivingDate, setReceivingDate] = useState('');

  const handleScan = (barcode) => {
    // In a real app, this would fetch item details from your inventory
    const scannedItem = {
      id: Date.now(),
      sku: barcode,
      name: `Item ${barcode}`,
      quantity: 1,
      batch: '',
      expiryDate: '',
    };

    setSelectedItems((prev) => {
      const existingItem = prev.find((item) => item.sku === barcode);
      if (existingItem) {
        return prev.map((item) =>
          item.sku === barcode
            ? { ...item, quantity: (quantity[item.sku] || 1) + 1 }
            : item
        );
      }
      return [...prev, scannedItem];
    });

    setQuantity((prev) => ({
      ...prev,
      [barcode]: (prev[barcode] || 0) + 1,
    }));
  };

  const handleQuantityChange = (sku, value) => {
    setQuantity((prev) => ({
      ...prev,
      [sku]: value,
    }));
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.sku === sku ? { ...item, quantity: value } : item
      )
    );
  };

  const handleBatchChange = (sku, value) => {
    setBatch((prev) => ({
      ...prev,
      [sku]: value,
    }));
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.sku === sku ? { ...item, batch: value } : item
      )
    );
  };

  const handleExpiryDateChange = (sku, value) => {
    setExpiryDate((prev) => ({
      ...prev,
      [sku]: value,
    }));
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.sku === sku ? { ...item, expiryDate: value } : item
      )
    );
  };

  const handleRemoveItem = (sku) => {
    setSelectedItems((prev) => prev.filter((item) => item.sku !== sku));
    setQuantity((prev) => {
      const newQuantity = { ...prev };
      delete newQuantity[sku];
      return newQuantity;
    });
    setBatch((prev) => {
      const newBatch = { ...prev };
      delete newBatch[sku];
      return newBatch;
    });
    setExpiryDate((prev) => {
      const newExpiryDate = { ...prev };
      delete newExpiryDate[sku];
      return newExpiryDate;
    });
  };

  const handleSubmit = () => {
    // In a real app, this would send the receiving data to your backend
    console.log({
      supplier,
      invoiceNumber,
      receivingDate,
      items: selectedItems.map((item) => ({
        ...item,
        quantity: quantity[item.sku],
        batch: batch[item.sku],
        expiryDate: expiryDate[item.sku],
      })),
    });
    // Reset form
    setSelectedItems([]);
    setQuantity({});
    setBatch({});
    setExpiryDate({});
    setSupplier('');
    setInvoiceNumber('');
    setReceivingDate('');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Stock Receiving
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Receiving Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Supplier"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Invoice Number"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Receiving Date"
                  value={receivingDate}
                  onChange={(e) => setReceivingDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Items</Typography>
              <Button
                variant="outlined"
                startIcon={<ScannerIcon />}
                onClick={() => setScannerOpen(true)}
              >
                Scan Items
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>SKU</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Batch</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={quantity[item.sku] || 1}
                          onChange={(e) =>
                            handleQuantityChange(item.sku, parseInt(e.target.value))
                          }
                          inputProps={{ min: 1 }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={batch[item.sku] || ''}
                          onChange={(e) =>
                            handleBatchChange(item.sku, e.target.value)
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="date"
                          value={expiryDate[item.sku] || ''}
                          onChange={(e) =>
                            handleExpiryDateChange(item.sku, e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </TableCell>
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
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={selectedItems.length === 0}
        >
          Receive Stock
        </Button>
      </Box>

      <BarcodeScanner
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScan={handleScan}
      />
    </Box>
  );
};

export default StockReceiving; 