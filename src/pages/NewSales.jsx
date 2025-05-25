import React, { useState } from 'react';
import { Box, Typography, TextField, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, useMediaQuery, useTheme, List, ListItem, ListItemText, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from 'react-router-dom';

const NewSales = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const [billType, setBillType] = useState('cash');
  const [searchResults, setSearchResults] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  // Placeholder data for demonstration (expanded with more fields)
  const sampleItems = [
    { id: 1, name: 'Lopamide Tablet', pack: '10 Tablet', unit: 'Strip', mrp: 21.10, stock: 200, qty: 0, disc: 0, tax: 5, amount: 0, expiry: '12/25', batch: 'A1' },
    { id: 2, name: 'Lopar Capsule', pack: '10 Capsules', unit: 'Box', mrp: 31.24, stock: 140, qty: 0, disc: 0, tax: 10, amount: 0, expiry: '11/24', batch: 'B2' },
    { id: 3, name: 'Lopace H 2.5mg/12.5mg Tablet', pack: '10 Tablets', unit: 'Strip', mrp: 34.10, stock: 160, qty: 0, disc: 0, tax: 12, amount: 0, expiry: '01/26', batch: 'C3' },
    { id: 4, name: 'Lopassium 25mg Tablet', pack: '10 Tablet', unit: 'Strip', mrp: 19.00, stock: 90, qty: 0, disc: 0, tax: 18, amount: 0, expiry: '06/25', batch: 'D4' },
    { id: 5, name: 'Closeup Red Hot Anti Germ Mouthwash', pack: '250 Ml', unit: 'Bottle', mrp: 125.00, stock: 50, qty: 0, disc: 4.04, tax: 18, amount: 0, expiry: '02/24', batch: 'E5' },
  ];

  const calculateItemAmount = (item) => {
      const priceAfterDiscount = item.mrp * (1 - item.disc / 100);
      const amountWithTax = priceAfterDiscount * (1 + item.tax / 100);
      return item.qty * amountWithTax;
  };

  const handleAddItem = (item) => {
    // Add item with default quantity 1 and calculate initial amount
    const newItem = { 
        ...item, 
        qty: 1,
        amount: calculateItemAmount({ ...item, qty: 1 })
    };
    setItems([...items, newItem]);
    setSearchQuery(''); // Clear search query
    setSearchResults([]); // Clear search results
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) { // Perform search if query is at least 2 characters
      const results = sampleItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear results if query is too short
    }
  };

  const handleItemFieldChange = (id, field, value) => {
    setItems(items.map(item => {
        if (item.id === id) {
            const updatedItem = { ...item, [field]: parseFloat(value) || 0 };
            return { ...updatedItem, amount: calculateItemAmount(updatedItem) };
        }
        return item;
    }));
  };

  const handleBillTypeChange = (event, newBillType) => {
    if (newBillType !== null) {
      setBillType(newBillType);
    }
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  const handleSave = () => {
    // TODO: Save logic here (API call, etc.)
    // After saving, redirect to /sales
    navigate('/sales');
  };

  return (
    <Box>
      {/* Top Bar - Desktop View */}
      {!isMobile && (
        <Paper elevation={1} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>Sales &gt; New Sales</Typography>
            <TextField
              label="Bill Date"
              type="date"
              size="small"
              value={billDate}
              onChange={(e) => setBillDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mr: 2, width: 150 }}
            />
            <TextField label="Customer Name" size="small" sx={{ mr: 2, width: 200 }} />
            <TextField label="Doctor" size="small" sx={{ mr: 2, width: 200 }} />
            {/* Add more fields as needed for desktop */}
          </Box>
          <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        </Paper>
      )}

      {/* Top Bar - Mobile View */}
      {isMobile && (
        <Paper elevation={1} sx={{ p: 1, mb: 2 }}>
           <Grid container spacing={1} alignItems="center">
             <Grid item xs={6}>
               <TextField label="Customer Name" fullWidth size="small" />
             </Grid>
             <Grid item xs={6}>
                <TextField label="Doctor" fullWidth size="small" />
             </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Bill Date"
                  type="date"
                  fullWidth
                  size="small"
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
               <Grid item xs={6}>
                 <ToggleButtonGroup
                   value={billType}
                   exclusive
                   onChange={handleBillTypeChange}
                   aria-label="bill type"
                   fullWidth
                   size="small"
                 >
                   <ToggleButton value="cash" aria-label="cash">Cash</ToggleButton>
                   <ToggleButton value="bill" aria-label="bill">Bill</ToggleButton>
                 </ToggleButtonGroup>
              </Grid>
           </Grid>
        </Paper>
      )}

      {/* Item Search and List */}
      <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 }, mb: 8, position: 'relative' }}> {/* Added position: relative */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Find medicine here"
            fullWidth
            size="small"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    // Optional: handle adding first search result on Enter
                    if (searchResults.length > 0) {
                        handleAddItem(searchResults[0]);
                    } else {
                         alert('Item not found');
                    }
                }
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon color="action" sx={{ mr: 1 }} />
              ),
            }}
          />
           {/* Add grid icon for mobile if needed */}
        </Box>
        
        {/* Search Results Dropdown */}
        {searchResults.length > 0 && searchQuery.length > 1 && (
            <Paper 
                sx={{
                    position: 'absolute',
                    top: '100%', // Position below the search bar
                    left: 0,
                    right: 0,
                    zIndex: 1200, // Above other elements
                    mt: 0.5, // Margin top
                    maxHeight: 200, // Limit height with scroll
                    overflowY: 'auto',
                }}
                elevation={3}
            >
                <List dense>
                    {searchResults.map((item) => (
                        <ListItem 
                            button 
                            key={item.id} 
                            onClick={() => handleAddItem(item)}
                            sx={{ py: 0.5, px: 2 }} // Adjust padding
                        >
                            <ListItemText 
                                primary={
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {item.name} - {item.pack}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" color="text.secondary">
                                        MRP: {item.mrp.toFixed(2)} | Stock: {item.stock}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        )}

        
        {/* Item List/Table */}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                 {!isMobile && (
                  <> {/* Desktop specific columns */}
                    <TableCell>Pack</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Batch</TableCell>
                    <TableCell>Expiry</TableCell>
                    <TableCell align="right">MRP</TableCell>
                    <TableCell align="right">Stock</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Disc%</TableCell>
                    <TableCell align="right">Tax%</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </>
                )}
                 {isMobile && (
                  <> {/* Mobile specific columns */}
                    <TableCell align="right">MRP</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </>
                 )}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                   {!isMobile && (
                    <> {/* Desktop specific cells */}
                      <TableCell>{item.pack}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.batch}</TableCell>
                      <TableCell>{item.expiry}</TableCell>
                      <TableCell align="right">{item.mrp.toFixed(2)}</TableCell>
                      <TableCell align="right">{item.stock}</TableCell>
                       <TableCell align="right">
                          <TextField
                              value={item.qty}
                              onChange={(e) => handleItemFieldChange(item.id, 'qty', e.target.value)}
                              type="number"
                              size="small"
                              sx={{ width: 60 }}
                              InputProps={{
                                inputProps: { min: 0 }
                              }}
                          />
                       </TableCell>
                       <TableCell align="right">
                            <TextField
                                value={item.disc}
                                onChange={(e) => handleItemFieldChange(item.id, 'disc', e.target.value)}
                                type="number"
                                size="small"
                                sx={{ width: 60 }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    inputProps: { min: 0, max: 100, step: 0.1 }
                                }}
                            />
                       </TableCell>
                       <TableCell align="right">
                            <TextField
                                value={item.tax}
                                onChange={(e) => handleItemFieldChange(item.id, 'tax', e.target.value)}
                                type="number"
                                size="small"
                                sx={{ width: 60 }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    inputProps: { min: 0, step: 0.1 }
                                }}
                            />
                       </TableCell>
                       <TableCell align="right">{item.amount.toFixed(2)}</TableCell>
                    </>
                   )}
                   {isMobile && (
                    <> {/* Mobile specific cells */}
                       <TableCell align="right">{item.mrp.toFixed(2)}</TableCell>
                       <TableCell align="right">
                         <TextField
                           value={item.qty}
                           onChange={(e) => handleItemFieldChange(item.id, 'qty', e.target.value)}
                           type="number"
                           size="small"
                           sx={{ width: 50 }}
                           InputProps={{
                              inputProps: { min: 0 }
                            }}
                         />
                       </TableCell>
                        <TableCell align="right">{item.amount.toFixed(2)}</TableCell>
                    </>
                   )}
                  
                  <TableCell align="center">
                    <IconButton size="small" color="error" onClick={() => handleDeleteItem(item.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                  <TableRow>
                      <TableCell colSpan={!isMobile ? 10 : 4} align="center">No items added yet.</TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Bottom Summary Bar (Fixed) */}
      <Paper 
        sx={{
          position: 'fixed', 
          bottom: isMobile ? 56 : 0, // Adjust for mobile bottom navigation
          left: 0,
          right: 0,
          height: '60px', 
          backgroundColor: 'primary.main', 
          color: 'primary.contrastText', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          px: { xs: 2, sm: 3 },
          zIndex: 1000 
        }}
        elevation={3}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: isMobile ? '0.875rem' : '1rem' }}>
          Items: {items.length}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: isMobile ? '0.875rem' : '1rem' }}>
          Total Amt: {totalAmount.toFixed(2)}
        </Typography>
        <Button variant="contained" color="secondary" size={isMobile ? 'small' : 'medium'} >
          Continue
        </Button>
      </Paper>
    </Box>
  );
};

export default NewSales;