import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardMedia, CardContent, Rating, TextField, Snackbar, Alert } from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductDetailPage = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!product) return <Typography>Product not found.</Typography>;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setOpen(true);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ width: { md: 400 }, height: 400, objectFit: 'cover' }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={600} mb={2}>{product.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={1}>{product.brand}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>({product.reviews} reviews)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 2 }}>
            <Typography variant="h5" fontWeight={600}>₹{product.price}</Typography>
            {product.originalPrice && (
              <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                ₹{product.originalPrice}
              </Typography>
            )}
            {product.discount && (
              <Typography variant="body1" color="success.main" fontWeight={600}>
                ({product.discount}% OFF)
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              label="Quantity"
              type="number"
              size="small"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              inputProps={{ min: 1, style: { width: 60 } }}
              sx={{ mr: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="outlined" sx={{ ml: 2 }} onClick={() => navigate('/cart')}>
              Go to Cart
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary">
            100% Original Products | Pay on delivery might be available | Easy 14 days returns and exchanges
          </Typography>
        </CardContent>
      </Card>
      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetailPage; 