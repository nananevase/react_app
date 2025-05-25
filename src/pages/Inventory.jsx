import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  QrCodeScanner as ScannerIcon,
  QrCode as QrCodeIcon,
} from '@mui/icons-material';
import BarcodeScanner from '../components/common/BarcodeScanner';
import BarcodeGenerator from '../components/common/BarcodeGenerator';

// Dummy data
const initialItems = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    sku: 'MED001',
    quantity: 100,
    batch: 'BATCH001',
    expiryDate: '2024-12-31',
    price: 5.99,
    location: 'Main Store',
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    sku: 'MED002',
    quantity: 50,
    batch: 'BATCH002',
    expiryDate: '2024-10-31',
    price: 8.99,
    location: 'Sub Store',
  },
  // Add more dummy items as needed
];

const Inventory = () => {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [scannerOpen, setScannerOpen] = useState(false);
  const [generatorOpen, setGeneratorOpen] = useState(false);
  const [selectedItemForBarcode, setSelectedItemForBarcode] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (item = null) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
    setOpenDialog(false);
  };

  const handleSaveItem = (item) => {
    if (selectedItem) {
      // Edit existing item
      setItems(items.map((i) => (i.id === item.id ? item : i)));
    } else {
      // Add new item
      setItems([...items, { ...item, id: items.length + 1 }]);
    }
    handleCloseDialog();
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleScan = (barcode) => {
    // Find item by barcode (in this case, we'll use SKU as barcode)
    const scannedItem = items.find((item) => item.sku === barcode);
    if (scannedItem) {
      handleOpenDialog(scannedItem);
    } else {
      // If item not found, open dialog for new item with barcode pre-filled
      handleOpenDialog({ sku: barcode });
    }
  };

  const handleGenerateBarcode = (item) => {
    setSelectedItemForBarcode(item);
    setGeneratorOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Inventory Management</Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<ScannerIcon />}
            onClick={() => setScannerOpen(true)}
            sx={{ mr: 1 }}
          >
            Scan Barcode
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Item
          </Button>
        </Box>
      </Box>

      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.batch}</TableCell>
                  <TableCell>{item.expiryDate}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleOpenDialog(item)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteItem(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Generate Barcode">
                      <IconButton onClick={() => handleGenerateBarcode(item)}>
                        <QrCodeIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Add/Edit Item Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedItem ? 'Edit Item' : 'Add New Item'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Item Name"
                defaultValue={selectedItem?.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SKU"
                defaultValue={selectedItem?.sku}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                defaultValue={selectedItem?.quantity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Batch"
                defaultValue={selectedItem?.batch}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                type="date"
                defaultValue={selectedItem?.expiryDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                defaultValue={selectedItem?.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Location"
                defaultValue={selectedItem?.location || 'Main Store'}
              >
                <MenuItem value="Main Store">Main Store</MenuItem>
                <MenuItem value="Sub Store">Sub Store</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleSaveItem(selectedItem)} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Barcode Scanner Dialog */}
      <BarcodeScanner
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScan={handleScan}
      />

      {/* Barcode Generator Dialog */}
      <BarcodeGenerator
        open={generatorOpen}
        onClose={() => setGeneratorOpen(false)}
        item={selectedItemForBarcode}
      />
    </Box>
  );
};

export default Inventory; 