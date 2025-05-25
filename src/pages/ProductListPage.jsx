import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import { Typography, Box } from '@mui/material';

const categoryMap = {
  men: 'Men',
  women: 'Women',
  kids: 'Kids',
  'home-living': 'Home & Living',
};

const subcategoryMap = {
  'top-wear': 'Top Wear',
  'bottom-wear': 'Bottom Wear',
  footwear: 'Footwear',
  accessories: 'Accessories',
  'western-wear': 'Western Wear',
  'indian-wear': 'Indian Wear',
  'boys-clothing': 'Boys Clothing',
  'girls-clothing': 'Girls Clothing',
  toys: 'Toys',
  'bed-linen': 'Bed Linen',
  bath: 'Bath',
  kitchen: 'Kitchen',
  decor: 'Decor',
};

const ProductListPage = ({ products }) => {
  const navigate = useNavigate();
  const { category, subcategory } = useParams();

  let filtered = products;
  let heading = 'All Products';

  if (category) {
    heading = categoryMap[category] || category;
    filtered = filtered.filter((p) =>
      p.category ? p.category.toLowerCase() === category : true
    );
  }
  if (subcategory) {
    heading += ' - ' + (subcategoryMap[subcategory] || subcategory);
    filtered = filtered.filter((p) =>
      p.subcategory ? p.subcategory.toLowerCase().replace(/ /g, '-') === subcategory : true
    );
  }

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" mb={3}>{heading}</Typography>
      <ProductGrid
        products={filtered.map((p) => ({
          ...p,
          onClick: () => handleProductClick(p.id),
        }))}
      />
    </Box>
  );
};

export default ProductListPage; 