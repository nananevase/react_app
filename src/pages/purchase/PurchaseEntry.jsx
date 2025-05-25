import React, { useState } from 'react';
import {
  Box, Paper, Typography, TextField, Button, Grid, MenuItem, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, ToggleButton, ToggleButtonGroup, Divider, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useNavigate } from 'react-router-dom';

const distributors = [
  { label: 'ABC Distributors', gstin: '27ABCDE1234F1Z5' },
  { label: 'XYZ Pharma', gstin: '27XYZDE5678G2H6' },
  { label: 'MediCare Pvt Ltd' },
  { label: 'HealthFirst' },
];
const owners = [
  { label: 'Main Store' },
  { label: 'Branch 1' },
];
const pos = [
  { label: 'PO-1001' },
  { label: 'PO-1002' },
];

const sampleItems = [
  { id: 1, name: 'Paracetamol 500mg', batch: 'B1', expiry: '12/25', mrp: 20, ptr: 15, qty: 0, freeQty: 0, disc: 0, base: 0, gst: 5, amount: 0 },
  { id: 2, name: 'Amoxicillin 250mg', batch: 'B2', expiry: '11/24', mrp: 50, ptr: 40, qty: 0, freeQty: 0, disc: 0, base: 0, gst: 12, amount: 0 },
];

const mockPurchases = [
  {
    id: 1,
    billNo: 'PB-1001',
    entryDate: '2025-05-24',
    billDate: '2025-05-24',
    entryBy: 'Admin',
    distributor: 'ABC Distributors',
    billAmount: 1200.50
  },
  {
    id: 2,
    billNo: 'PB-1002',
    entryDate: '2025-05-23',
    billDate: '2025-05-23',
    entryBy: 'John Doe',
    distributor: 'XYZ Pharma',
    billAmount: 850.00
  },
  {
    id: 3,
    billNo: 'PB-1003',
    entryDate: '2025-05-22',
    billDate: '2025-05-22',
    entryBy: 'Jane Smith',
    distributor: 'MediCare Pvt Ltd',
    billAmount: 430.75
  }
];

const PurchaseList = () => {
  const navigate = useNavigate();
  const [distributor, setDistributor] = useState('');
  const [owner, setOwner] = useState('');
  const [po, setPo] = useState('');
  const [creditMode, setCreditMode] = useState('cash');
  const [billDate, setBillDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [orderNo, setOrderNo] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [items, setItems] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [statusMsg, setStatusMsg] = useState('No CN Adjusted');
  const [videoGuideOpen, setVideoGuideOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [search, setSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('all');

  // Mock: Add item from search
  const handleAddItem = () => {
    if (itemSearch) {
      const found = sampleItems.find(i => i.name.toLowerCase().includes(itemSearch.toLowerCase()));
      if (found) setItems([...items, { ...found, qty: 1 }]);
      setItemSearch('');
    }
  };

  // Mock: Save handler
  const handleSave = () => {
    setStatusMsg('Purchase bill saved!');
  };

  // Totals
  const totalQty = items.reduce((sum, i) => sum + Number(i.qty), 0);
  const totalItems = items.length;
  const margin = 0; // Placeholder
  const gst = items.reduce((sum, i) => sum + (i.amount * (i.gst / 100)), 0);
  const net = items.reduce((sum, i) => sum + Number(i.amount), 0);

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Paper elevation={1} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Purchase</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/purchase/new')}>+ New</Button>
        <TextField
          label="Sr No."
          size="small"
          sx={{ minWidth: 100 }}
        />
        <TextField
          label="Type Here..."
          size="small"
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 180 }}
        />
        <TextField
          label="From"
          type="date"
          size="small"
          value={dateRange.from}
          onChange={e => setDateRange({ ...dateRange, from: e.target.value })}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 140 }}
        />
        <TextField
          label="To"
          type="date"
          size="small"
          value={dateRange.to}
          onChange={e => setDateRange({ ...dateRange, to: e.target.value })}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 140 }}
        />
        <TextField
          label="Distributor Name"
          size="small"
          select
          value={distributor}
          onChange={e => setDistributor(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">All</MenuItem>
          {distributors.map(opt => (
            <MenuItem key={opt.label} value={opt.label}>{opt.label}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="₹ All"
          size="small"
          value={paymentStatus}
          onChange={e => setPaymentStatus(e.target.value)}
          sx={{ minWidth: 100 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
          <MenuItem value="unpaid">Unpaid</MenuItem>
        </TextField>
        <Button
          sx={{ minWidth: 140 }}
        >
          More Filters (0)
        </Button>
      </Paper>
      <Paper elevation={1}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Bill No.</TableCell>
                <TableCell>Entry Date</TableCell>
                <TableCell>Bill Date</TableCell>
                <TableCell>Entry By</TableCell>
                <TableCell>Distributor</TableCell>
                <TableCell>Bill Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPurchases.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Box sx={{ py: 6 }}>
                      <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-9436076-7705827.png" alt="No data" style={{ width: 120, marginBottom: 16 }} />
                      <Typography variant="h6" color="text.secondary">Oops!<br />No purchase order found with your search criteria.</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                mockPurchases.map((row, idx) => (
                  <TableRow key={row.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{row.billNo}</TableCell>
                    <TableCell>{row.entryDate}</TableCell>
                    <TableCell>{row.billDate}</TableCell>
                    <TableCell>{row.entryBy}</TableCell>
                    <TableCell>{row.distributor}</TableCell>
                    <TableCell>{row.billAmount}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PurchaseList; 