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
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  QrCodeScanner as ScannerIcon,
} from '@mui/icons-material';
import BarcodeScanner from '../components/common/BarcodeScanner';

const InventoryAudit = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [auditItems, setAuditItems] = useState([]);
  const [physicalCount, setPhysicalCount] = useState({});
  const [discrepancies, setDiscrepancies] = useState({});
  const [auditDate, setAuditDate] = useState('');
  const [auditor, setAuditor] = useState('');
  const [location, setLocation] = useState('');

  const handleScan = (barcode) => {
    // In a real app, this would fetch item details from your inventory
    const scannedItem = {
      id: Date.now(),
      sku: barcode,
      name: `Item ${barcode}`,
      systemQuantity: Math.floor(Math.random() * 100), // Dummy data
      physicalCount: 0,
    };

    setAuditItems((prev) => {
      const existingItem = prev.find((item) => item.sku === barcode);
      if (existingItem) {
        return prev;
      }
      return [...prev, scannedItem];
    });

    setPhysicalCount((prev) => ({
      ...prev,
      [barcode]: 0,
    }));
  };

  const handlePhysicalCountChange = (sku, value) => {
    setPhysicalCount((prev) => ({
      ...prev,
      [sku]: value,
    }));

    // Calculate discrepancy
    const item = auditItems.find((item) => item.sku === sku);
    if (item) {
      const discrepancy = value - item.systemQuantity;
      setDiscrepancies((prev) => ({
        ...prev,
        [sku]: discrepancy,
      }));
    }
  };

  const handleRemoveItem = (sku) => {
    setAuditItems((prev) => prev.filter((item) => item.sku !== sku));
    setPhysicalCount((prev) => {
      const newCount = { ...prev };
      delete newCount[sku];
      return newCount;
    });
    setDiscrepancies((prev) => {
      const newDiscrepancies = { ...prev };
      delete newDiscrepancies[sku];
      return newDiscrepancies;
    });
  };

  const handleSubmit = () => {
    // In a real app, this would send the audit data to your backend
    console.log({
      auditDate,
      auditor,
      location,
      items: auditItems.map((item) => ({
        ...item,
        physicalCount: physicalCount[item.sku],
        discrepancy: discrepancies[item.sku],
      })),
    });
    // Reset form
    setAuditItems([]);
    setPhysicalCount({});
    setDiscrepancies({});
    setAuditDate('');
    setAuditor('');
    setLocation('');
  };

  const getDiscrepancyColor = (discrepancy) => {
    if (discrepancy > 0) return 'success.main';
    if (discrepancy < 0) return 'error.main';
    return 'text.primary';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Inventory Audit
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Audit Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Auditor"
                  value={auditor}
                  onChange={(e) => setAuditor(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Audit Date"
                  value={auditDate}
                  onChange={(e) => setAuditDate(e.target.value)}
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
                    <TableCell>System Qty</TableCell>
                    <TableCell>Physical Qty</TableCell>
                    <TableCell>Discrepancy</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {auditItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.systemQuantity}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={physicalCount[item.sku] || 0}
                          onChange={(e) =>
                            handlePhysicalCountChange(
                              item.sku,
                              parseInt(e.target.value)
                            )
                          }
                          inputProps={{ min: 0 }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          color={getDiscrepancyColor(discrepancies[item.sku])}
                        >
                          {discrepancies[item.sku] || 0}
                        </Typography>
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
          disabled={auditItems.length === 0}
        >
          Submit Audit
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

export default InventoryAudit; 