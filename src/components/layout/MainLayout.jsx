import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  InputBase,
  styled,
  alpha,
  Drawer,
  Button,
  useMediaQuery,
  useTheme,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Container,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingBag,
  Favorite,
  Person,
  Menu as MenuIcon,
  ListAlt as OrdersIcon,
  Login as LoginIcon,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/api';

const categories = [
  {
    name: 'Men',
    key: 'men',
    megaMenu: [
      {
        heading: 'Topwear',
        links: ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets', 'Sweatshirts', 'Innerwear'],
      },
      {
        heading: 'Footwear',
        links: ['Casual Shoes', 'Sports Shoes', 'Formal Shoes', 'Sneakers', 'Sandals & Floaters', 'Flip Flops', 'Socks'],
      },
      {
        heading: 'Accessories',
        links: ['Watches', 'Belts', 'Wallets', 'Sunglasses', 'Bags & Backpacks', 'Caps & Hats'],
      },
    ],
    promoImg: '/react_app/img/men-promo.jpg',
  },
  {
    name: 'Women',
    key: 'women',
    megaMenu: [
      {
        heading: 'Topwear',
        links: ['T-Shirts', 'Tops', 'Shirts', 'Dresses', 'Sweatshirts', 'Jackets', 'Innerwear'],
      },
      {
        heading: 'Footwear',
        links: ['Flats', 'Heels', 'Boots', 'Sports Shoes', 'Sneakers', 'Sandals', 'Slippers'],
      },
      {
        heading: 'Accessories',
        links: ['Watches', 'Handbags', 'Sunglasses', 'Jewellery', 'Belts', 'Scarves', 'Caps'],
      },
    ],
    promoImg: '/react_app/img/women-promo.jpg',
  },
  {
    name: 'Kids',
    key: 'kids',
    megaMenu: [
      {
        heading: 'Boys Clothing',
        links: ['T-Shirts', 'Shirts', 'Shorts', 'Jeans', 'Trousers', 'Jackets', 'Sweatshirts'],
      },
      {
        heading: 'Girls Clothing',
        links: ['Dresses', 'Tops', 'T-Shirts', 'Skirts', 'Jeans', 'Trousers', 'Jackets'],
      },
      {
        heading: 'Footwear',
        links: ['Casual Shoes', 'Flip Flops', 'Sandals', 'Boots', 'Sports Shoes', 'Sneakers'],
      },
    ],
    promoImg: '/react_app/img/kids-promo.jpg',
  },
  {
    name: 'Home & Living',
    key: 'home-living',
    megaMenu: [
      {
        heading: 'Bed Linen',
        links: ['Bedsheets', 'Blankets', 'Pillows', 'Bed Covers', 'Quilts', 'Cushions'],
      },
      {
        heading: 'Bath',
        links: ['Towels', 'Bath Robes', 'Shower Curtains', 'Bath Rugs', 'Bath Mats'],
      },
      {
        heading: 'Home Décor',
        links: ['Clocks', 'Photo Frames', 'Wall Art', 'Vases', 'Candles', 'Showpieces'],
      },
    ],
    promoImg: '/react_app/img/home-promo.jpg',
  },
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [openIconMenu, setOpenIconMenu] = useState(null);
  const [iconMenuAnchor, setIconMenuAnchor] = useState(null);
  const closeTimer = useRef();
  const iconCloseTimer = useRef();
  const navigate = useNavigate();
  const { cart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMenuButtonMouseEnter = (event, key) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(key);
    setMenuAnchor(event.currentTarget);
    setOpenIconMenu(null);
  };

  const handleMenuBarMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
      setMenuAnchor(null);
    }, 150);
  };

  const handleMenuMouseEnter = () => {
    clearTimeout(closeTimer.current);
  };

  const handleMenuMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
      setMenuAnchor(null);
    }, 150);
  };

  const handleIconMouseEnter = (event, key) => {
    clearTimeout(iconCloseTimer.current);
    setOpenIconMenu(key);
    setIconMenuAnchor(event.currentTarget);
    setOpenMenu(null);
  };

  const handleIconMouseLeave = () => {
    iconCloseTimer.current = setTimeout(() => {
      setOpenIconMenu(null);
      setIconMenuAnchor(null);
    }, 150);
  };

  const handleIconMenuMouseEnter = () => {
    clearTimeout(iconCloseTimer.current);
  };

  const handleIconMenuMouseLeave = () => {
    iconCloseTimer.current = setTimeout(() => {
      setOpenIconMenu(null);
      setIconMenuAnchor(null);
    }, 150);
  };

  const handleAccordionToggle = (key) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  };

  const handleDrawerClose = () => setMobileOpen(false);

  const handleMenuButtonKeyDown = (e, key) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      setOpenMenu(key);
      setMenuAnchor(e.target);
    }
    if (e.key === 'Escape') {
      setOpenMenu(null);
      setMenuAnchor(null);
    }
  };

  const handleCategoryClick = async (categoryKey) => {
    try {
      setLoading(true);
      const response = await productService.getProductsByCategory(categoryKey);
      setProducts(response.data);
      navigate(`/shop/${categoryKey}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    setOpenMenu(null);
  };

  const handleSubCategoryClick = async (categoryKey, subCategory) => {
    try {
      setLoading(true);
      const formattedSubCategory = subCategory.toLowerCase().replace(/ /g, '-');
      const response = await productService.getProductsByCategory(`${categoryKey}-${formattedSubCategory}`);
      setProducts(response.data);
      navigate(`/${categoryKey}-${formattedSubCategory}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    setOpenMenu(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAllProducts();
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const cartItemsCount = cart?.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left: Logo and Main Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                component="img"
                src="/react_app/img/logo.png"
                alt="Logo"
                sx={{ height: 40, mr: 2 }}
              />
            </Link>
            {/* Desktop Menu */}
            {!isMobile && (
              <nav aria-label="Main navigation">
                <Box
                  sx={{ display: 'flex', gap: 2 }}
                  onMouseLeave={handleMenuBarMouseLeave}
                  role="menubar"
                >
                  {categories.map((cat) => (
                    <Box
                      key={cat.key}
                      onMouseEnter={(e) => handleMenuButtonMouseEnter(e, cat.key)}
                      sx={{ position: 'relative' }}
                    >
                      <Button
                        color="inherit"
                        onClick={() => handleCategoryClick(cat.key)}
                        sx={{ 
                          fontWeight: 600, 
                          cursor: 'pointer', 
                          bgcolor: openMenu === cat.key ? '#f5f5f6' : 'transparent',
                          '&:hover': {
                            bgcolor: '#f5f5f6',
                            color: '#ff3f6c',
                          },
                          transition: 'all 0.2s ease-in-out',
                          px: 2,
                          py: 1,
                          fontSize: '14px',
                          textTransform: 'none',
                        }}
                        aria-haspopup="true"
                        aria-expanded={openMenu === cat.key}
                        aria-controls={openMenu === cat.key ? `${cat.key}-menu` : undefined}
                        onKeyDown={(e) => handleMenuButtonKeyDown(e, cat.key)}
                        endIcon={<span style={{ display: 'inline-block', transform: openMenu === cat.key ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', fontSize: '10px' }}>▼</span>}
                        role="menuitem"
                      >
                        {cat.name}
                      </Button>
                      {/* Submenu */}
                      <Box
                        id={`${cat.key}-menu`}
                        role="menu"
                        aria-label={cat.name + ' submenu'}
                        tabIndex={-1}
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: '100%',
                          minWidth: 200,
                          bgcolor: 'white',
                          boxShadow: '0 4px 16px 0 rgba(0,0,0,0.1)',
                          borderRadius: 0,
                          zIndex: 1200,
                          opacity: openMenu === cat.key ? 1 : 0,
                          pointerEvents: openMenu === cat.key ? 'auto' : 'none',
                          transform: openMenu === cat.key ? 'translateY(0)' : 'translateY(10px)',
                          transition: 'opacity 0.2s, transform 0.2s',
                          mt: 1,
                        }}
                        onMouseEnter={handleMenuMouseEnter}
                        onMouseLeave={handleMenuMouseLeave}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 4,
                            minWidth: 700,
                            p: 3,
                            alignItems: 'flex-start',
                          }}
                        >
                          {cat.megaMenu.map((col) => (
                            <Box key={col.heading} sx={{ minWidth: 160 }}>
                              <Typography 
                                variant="subtitle2" 
                                fontWeight={700} 
                                mb={1} 
                                sx={{
                                  color: '#3e4152',
                                  fontSize: '14px',
                                  '&:hover': {
                                    color: '#ff3f6c',
                                  },
                                  transition: 'color 0.2s ease-in-out',
                                }}
                              >
                                {col.heading}
                              </Typography>
                              <List disablePadding>
                                {col.links.map((link) => (
                                  <ListItemButton
                                    key={link}
                                    onClick={() => handleSubCategoryClick(cat.key, link)}
                                    role="menuitem"
                                    sx={{ 
                                      px: 0, 
                                      py: 0.5,
                                      cursor: 'pointer',
                                      '&:hover': {
                                        bgcolor: 'transparent',
                                        '& .MuiListItemText-primary': {
                                          color: '#ff3f6c',
                                        },
                                      },
                                      transition: 'all 0.2s ease-in-out',
                                    }}
                                  >
                                    <ListItemText 
                                      primary={link} 
                                      primaryTypographyProps={{
                                        sx: {
                                          fontSize: '14px',
                                          fontWeight: 400,
                                          color: '#3e4152',
                                          transition: 'color 0.2s ease-in-out',
                                        }
                                      }}
                                    />
                                  </ListItemButton>
                                ))}
                              </List>
                            </Box>
                          ))}
                          {/* Promo image column */}
                          {cat.promoImg && (
                            <Box 
                              sx={{ 
                                minWidth: 180, 
                                ml: 2,
                                '&:hover': {
                                  transform: 'scale(1.02)',
                                },
                                transition: 'transform 0.2s ease-in-out',
                              }}
                            >
                              <img 
                                src={cat.promoImg} 
                                alt="Promo" 
                                style={{ 
                                  width: '100%', 
                                  borderRadius: 4,
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                                }} 
                              />
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </nav>
            )}
          </Box>

          {/* Center: Search Bar */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, mx: 4, maxWidth: 400 }}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 1,
                  backgroundColor: 'rgba(0,0,0,0.04)',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.08)' },
                  width: '100%',
                }}
              >
                <Box sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'grey.600' }}>
                  <SearchIcon />
                </Box>
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  aria-label="search"
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 16,
                  }}
                />
              </Box>
            </Box>
          )}

          {/* Right: Icon Buttons with Hover Submenus */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, flexShrink: 0 }}>
              {/* Orders */}
              <Box
                onMouseEnter={e => handleIconMouseEnter(e, 'orders')}
                onMouseLeave={handleIconMouseLeave}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 48, cursor: 'pointer', position: 'relative' }}
              >
                <IconButton color="inherit" sx={{ width: 40, height: 40, p: 0 }}>
                  <OrdersIcon fontSize="medium" />
                </IconButton>
                <Typography variant="caption" fontWeight={500} sx={{ mt: 0.2, fontSize: 13 }}>
                  Orders
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    minWidth: 160,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 1,
                    zIndex: 1200,
                    opacity: openIconMenu === 'orders' ? 1 : 0,
                    pointerEvents: openIconMenu === 'orders' ? 'auto' : 'none',
                    transform: openIconMenu === 'orders' ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.2s, transform 0.2s',
                    mt: 1,
                  }}
                  onMouseEnter={handleIconMenuMouseEnter}
                  onMouseLeave={handleIconMenuMouseLeave}
                >
                  <List disablePadding>
                    <ListItemButton component={Link} to="/orders" onClick={() => setOpenIconMenu(null)}>
                      <ListItemText primary="My Orders" />
                    </ListItemButton>
                  </List>
                </Box>
              </Box>
              {/* Cart */}
              <Box
                onMouseEnter={e => handleIconMouseEnter(e, 'cart')}
                onMouseLeave={handleIconMouseLeave}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 48, cursor: 'pointer', position: 'relative' }}
              >
                <IconButton color="inherit" sx={{ width: 40, height: 40, p: 0 }}>
                  <Badge badgeContent={cartItemsCount} color="primary">
                    <ShoppingBag fontSize="medium" />
                  </Badge>
                </IconButton>
                <Typography variant="caption" fontWeight={500} sx={{ mt: 0.2, fontSize: 13 }}>
                  Bag
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    minWidth: 160,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 1,
                    zIndex: 1200,
                    opacity: openIconMenu === 'cart' ? 1 : 0,
                    pointerEvents: openIconMenu === 'cart' ? 'auto' : 'none',
                    transform: openIconMenu === 'cart' ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.2s, transform 0.2s',
                    mt: 1,
                  }}
                  onMouseEnter={handleIconMenuMouseEnter}
                  onMouseLeave={handleIconMenuMouseLeave}
                >
                  <List disablePadding>
                    <ListItemButton component={Link} to="/cart" onClick={() => setOpenIconMenu(null)}>
                      <ListItemText primary="View Cart" />
                    </ListItemButton>
                  </List>
                </Box>
              </Box>
              {/* Profile */}
              <Box
                onMouseEnter={e => handleIconMouseEnter(e, 'profile')}
                onMouseLeave={handleIconMouseLeave}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 48, cursor: 'pointer', position: 'relative' }}
              >
                <IconButton color="inherit" sx={{ width: 40, height: 40, p: 0 }}>
                  <Person fontSize="medium" />
                </IconButton>
                <Typography variant="caption" fontWeight={500} sx={{ mt: 0.2, fontSize: 13 }}>
                  Profile
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    minWidth: 160,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 1,
                    zIndex: 1200,
                    opacity: openIconMenu === 'profile' ? 1 : 0,
                    pointerEvents: openIconMenu === 'profile' ? 'auto' : 'none',
                    transform: openIconMenu === 'profile' ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.2s, transform 0.2s',
                    mt: 1,
                  }}
                  onMouseEnter={handleIconMenuMouseEnter}
                  onMouseLeave={handleIconMenuMouseLeave}
                >
                  <List disablePadding>
                    <ListItemButton component={Link} to="/profile" onClick={() => setOpenIconMenu(null)}>
                      <ListItemText primary="Profile" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/login" onClick={() => setOpenIconMenu(null)}>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </List>
                </Box>
              </Box>
              {/* Login */}
              <Box
                onMouseEnter={e => handleIconMouseEnter(e, 'login')}
                onMouseLeave={handleIconMouseLeave}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 48, cursor: 'pointer', position: 'relative' }}
              >
                <IconButton color="inherit" sx={{ width: 40, height: 40, p: 0 }}>
                  <LoginIcon fontSize="medium" />
                </IconButton>
                <Typography variant="caption" fontWeight={500} sx={{ mt: 0.2, fontSize: 13 }}>
                  Login
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    minWidth: 160,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 1,
                    zIndex: 1200,
                    opacity: openIconMenu === 'login' ? 1 : 0,
                    pointerEvents: openIconMenu === 'login' ? 'auto' : 'none',
                    transform: openIconMenu === 'login' ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.2s, transform 0.2s',
                    mt: 1,
                  }}
                  onMouseEnter={handleIconMenuMouseEnter}
                  onMouseLeave={handleIconMenuMouseLeave}
                >
                  <List disablePadding>
                    <ListItemButton component={Link} to="/login" onClick={() => setOpenIconMenu(null)}>
                      <ListItemText primary="Login" />
                    </ListItemButton>
                  </List>
                </Box>
              </Box>
              {/* Wishlist */}
              <Box
                onMouseEnter={e => handleIconMouseEnter(e, 'wishlist')}
                onMouseLeave={handleIconMouseLeave}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 48, cursor: 'pointer', position: 'relative' }}
              >
                <IconButton color="inherit" sx={{ width: 40, height: 40, p: 0 }}>
                  <Favorite fontSize="medium" />
                </IconButton>
                <Typography variant="caption" fontWeight={500} sx={{ mt: 0.2, fontSize: 13 }}>
                  Wishlist
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    minWidth: 160,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 1,
                    zIndex: 1200,
                    opacity: openIconMenu === 'wishlist' ? 1 : 0,
                    pointerEvents: openIconMenu === 'wishlist' ? 'auto' : 'none',
                    transform: openIconMenu === 'wishlist' ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.2s, transform 0.2s',
                    mt: 1,
                  }}
                  onMouseEnter={handleIconMenuMouseEnter}
                  onMouseLeave={handleIconMenuMouseLeave}
                >
                  <List disablePadding>
                    <ListItemButton component={Link} to="/wishlist" onClick={() => setOpenIconMenu(null)}>
                      <ListItemText primary="My Wishlist" />
                    </ListItemButton>
                  </List>
                </Box>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
        >
          <Box sx={{ width: 260, pt: 2 }} role="navigation" aria-label="Mobile navigation">
            <List>
              {categories.map((cat) => (
                <React.Fragment key={cat.key}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleAccordionToggle(cat.key)}
                      aria-expanded={mobileAccordion === cat.key}
                      aria-controls={cat.key + '-mobile-submenu'}
                      sx={{ fontWeight: 600 }}
                    >
                      <ListItemText primary={cat.name} />
                      {mobileAccordion === cat.key ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={mobileAccordion === cat.key} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding id={cat.key + '-mobile-submenu'}>
                      {cat.megaMenu.map((col) => (
                        <ListItemButton
                          key={col.heading}
                          component={Link}
                          to={`/category/${cat.key}/${col.links[0].toLowerCase().replace(/ /g, '-')}`}
                          onClick={handleDrawerClose}
                          sx={{ pl: 4 }}
                        >
                          <ListItemText primary={col.heading} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/orders" onClick={handleDrawerClose}>
                  <OrdersIcon sx={{ mr: 1 }} /> Orders
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/cart" onClick={handleDrawerClose}>
                  <ShoppingBag sx={{ mr: 1 }} /> Cart
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/profile" onClick={handleDrawerClose}>
                  <Person sx={{ mr: 1 }} /> Profile
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/login" onClick={handleDrawerClose}>
                  <LoginIcon sx={{ mr: 1 }} /> Login
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto', textAlign: 'center' }}>
          © 2024 Myntra Clone. All rights reserved.
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout; 