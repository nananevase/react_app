import React, { useState } from 'react';
import { Box, Button, Paper, Typography, TextField, InputAdornment, Grid, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';

const paymentStatusOptions = [
  { value: 'all', label: 'All' },
  { value: 'paid', label: 'Paid' },
  { value: 'unpaid', label: 'Unpaid' },
];

const SalesPage = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [search, setSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [sales, setSales] = useState([]); // Empty for now

  return (
    <Box>
      {/* Controls */}
      <Paper elevation={1} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Sales</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/sales/new')}>+ New</Button>
        <TextField
          label="Bill No."
          size="small"
          sx={{ minWidth: 120 }}
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
          label="Name / Mobile"
          size="small"
          sx={{ minWidth: 160 }}
        />
        <TextField
          select
          label="₹ All"
          size="small"
          value={paymentStatus}
          onChange={e => setPaymentStatus(e.target.value)}
          sx={{ minWidth: 100 }}
        >
          {paymentStatusOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </TextField>
        <Button
          startIcon={<FilterListIcon />}
          onClick={() => setMoreFiltersOpen(f => !f)}
          sx={{ minWidth: 140 }}
        >
          More Filters (0)
        </Button>
      </Paper>
      {/* Table */}
      <Paper elevation={1}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bill No.</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Entry Date</TableCell>
                <TableCell>Bill Date</TableCell>
                <TableCell>Entry By</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Bill Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Box sx={{ py: 6 }}>
                      <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-9436076-7705827.png" alt="No data" style={{ width: 120, marginBottom: 16 }} />
                      <Typography variant="h6" color="text.secondary">Oops!<br />No order found with your search criteria.</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                sales.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.billNo}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.entryDate}</TableCell>
                    <TableCell>{row.billDate}</TableCell>
                    <TableCell>{row.entryBy}</TableCell>
                    <TableCell>{row.patient}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
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

export default SalesPage; 