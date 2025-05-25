import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import { Close as CloseIcon, Print as PrintIcon } from '@mui/icons-material';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = ({ open, onClose, item }) => {
  const barcodeRef = useRef(null);
  const [barcodeValue, setBarcodeValue] = React.useState('');

  useEffect(() => {
    if (open && item) {
      // Generate a unique barcode based on item details
      const barcode = `${item.sku}-${item.batch}`;
      setBarcodeValue(barcode);
    }
  }, [open, item]);

  useEffect(() => {
    if (barcodeValue && barcodeRef.current) {
      try {
        JsBarcode(barcodeRef.current, barcodeValue, {
          format: 'CODE128',
          width: 2,
          height: 100,
          displayValue: true,
        });
      } catch (error) {
        console.error('Error generating barcode:', error);
      }
    }
  }, [barcodeValue]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode</title>
          <style>
            body { text-align: center; padding: 20px; }
            img { max-width: 100%; }
          </style>
        </head>
        <body>
          <h3>${item?.name || 'Item'}</h3>
          <img src="${barcodeRef.current.toDataURL()}" />
          <p>SKU: ${item?.sku || ''}</p>
          <p>Batch: ${item?.batch || ''}</p>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Generate Barcode</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <TextField
            fullWidth
            label="Barcode Value"
            value={barcodeValue}
            onChange={(e) => setBarcodeValue(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            <svg ref={barcodeRef} />
          </Box>
          {item && (
            <Box sx={{ textAlign: 'left', mb: 2 }}>
              <Typography variant="subtitle1">Item Details:</Typography>
              <Typography>Name: {item.name}</Typography>
              <Typography>SKU: {item.sku}</Typography>
              <Typography>Batch: {item.batch}</Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BarcodeGenerator; 