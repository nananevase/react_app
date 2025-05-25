import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
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
  Add as AddIcon,
  Delete as DeleteIcon,
  QrCodeScanner as ScannerIcon,
} from '@mui/icons-material';
import BarcodeScanner from '../components/common/BarcodeScanner';

const StockMovement = () => {
  const [movementType, setMovementType] = useState('transfer');
  const [sourceLocation, setSourceLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [reason, setReason] = useState('');
  const [scannerOpen, setScannerOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState({});

  // Dummy data for locations and departments
  const locations = ['Main Store', 'Sub Store', 'Warehouse'];
  const departments = ['Pharmacy', 'Emergency', 'OPD', 'IPD'];
  const reasons = ['Transfer', 'Issue', 'Return', 'Damage', 'Expiry'];

  const handleScan = (barcode) => {
    // In a real app, this would fetch item details from your inventory
    const scannedItem = {
      id: Date.now(),
      sku: barcode,
      name: `Item ${barcode}`,
      quantity: 1,
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

  const handleRemoveItem = (sku) => {
    setSelectedItems((prev) => prev.filter((item) => item.sku !== sku));
    setQuantity((prev) => {
      const newQuantity = { ...prev };
      delete newQuantity[sku];
      return newQuantity;
    });
  };

  const handleSubmit = () => {
    // In a real app, this would send the movement data to your backend
    console.log({
      type: movementType,
      sourceLocation,
      destinationLocation,
      department,
      reason,
      items: selectedItems,
    });
    // Reset form
    setSelectedItems([]);
    setQuantity({});
    setSourceLocation('');
    setDestinationLocation('');
    setDepartment('');
    setReason('');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Stock Movement
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Movement Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Movement Type"
                  value={movementType}
                  onChange={(e) => setMovementType(e.target.value)}
                >
                  <MenuItem value="transfer">Transfer</MenuItem>
                  <MenuItem value="issue">Issue to Department</MenuItem>
                  <MenuItem value="return">Return</MenuItem>
                  <MenuItem value="waste">Mark as Waste</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Source Location"
                  value={sourceLocation}
                  onChange={(e) => setSourceLocation(e.target.value)}
                >
                  {locations.map((loc) => (
                    <MenuItem key={loc} value={loc}>
                      {loc}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {movementType === 'transfer' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Destination Location"
                    value={destinationLocation}
                    onChange={(e) => setDestinationLocation(e.target.value)}
                  >
                    {locations.map((loc) => (
                      <MenuItem key={loc} value={loc}>
                        {loc}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}

              {movementType === 'issue' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  {reasons.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </TextField>
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
          Process Movement
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

export default StockMovement; 