import React, { useEffect, useRef, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon, QrCodeScanner as ScannerIcon } from '@mui/icons-material';
import Quagga from 'quagga';

const BarcodeScanner = ({ open, onClose, onScan }) => {
  const videoRef = useRef(null);
  const [manualInput, setManualInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (open) {
      // Wait for the video element to be mounted
      setTimeout(() => {
        startScanner();
      }, 100);
    }
    return () => {
      stopScanner();
    };
  }, [open]);

  const startScanner = () => {
    if (!videoRef.current) return;

    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current,
          constraints: {
            facingMode: 'environment',
            width: { min: 640 },
            height: { min: 480 },
            aspectRatio: { min: 1, max: 2 },
          },
          area: { // Define scan area
            top: '25%',
            right: '10%',
            left: '10%',
            bottom: '25%',
          },
        },
        decoder: {
          readers: [
            'ean_reader',
            'ean_8_reader',
            'code_128_reader',
            'code_39_reader',
            'upc_reader',
            'upc_e_reader',
          ],
          multiple: false,
        },
        locate: true,
        frequency: 10,
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true,
        },
      },
      (err) => {
        if (err) {
          console.error('Error starting scanner:', err);
          setError('Failed to start camera. Please check camera permissions.');
          return;
        }
        Quagga.start();
        setIsScanning(true);
        setError('');
      }
    );

    Quagga.onDetected((result) => {
      if (result && result.codeResult) {
        setIsProcessing(true);
        const code = result.codeResult.code;
        // Add a small delay to prevent multiple scans
        setTimeout(() => {
          onScan(code);
          stopScanner();
          onClose();
          setIsProcessing(false);
        }, 100);
      }
    });

    // Add processing event listener
    Quagga.onProcessed((result) => {
      if (result) {
        const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'green', lineWidth: 3 });
        } else {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')));
        }
      }
    });
  };

  const stopScanner = () => {
    try {
      Quagga.stop();
      setIsScanning(false);
    } catch (err) {
      console.error('Error stopping scanner:', err);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualInput.trim()) {
      onScan(manualInput.trim());
      setManualInput('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Scan Barcode</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 300,
            backgroundColor: '#000',
            overflow: 'hidden',
            mb: 2,
          }}
        >
          <div ref={videoRef} style={{ width: '100%', height: '100%' }} />
          {error && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: 2,
                borderRadius: 1,
              }}
            >
              <Typography color="error">{error}</Typography>
            </Box>
          )}
          {isProcessing && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: 2,
                borderRadius: 1,
              }}
            >
              <CircularProgress size={24} sx={{ color: 'white', mb: 1 }} />
              <Typography>Processing...</Typography>
            </Box>
          )}
          {!error && !isProcessing && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: 2,
                borderRadius: 1,
              }}
            >
              <Typography>Position barcode within the frame</Typography>
            </Box>
          )}
        </Box>
        
        <Box component="form" onSubmit={handleManualSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Manual Barcode Entry"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton
                  type="submit"
                  disabled={!manualInput.trim()}
                  size="small"
                >
                  <ScannerIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BarcodeScanner; 