import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Button,
  Menu,
  MenuItem,
  Collapse,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  LocalShipping as StockMovementIcon,
  AddBox as StockReceivingIcon,
  Assessment as AuditIcon,
  Receipt as BillingIcon,
  ShoppingCartOutlined as EordersIcon,
  PointOfSaleOutlined as SalesIcon,
  ShoppingBagOutlined as PurchaseIcon,
  MenuBookOutlined as MedguideIcon,
  HelpOutlineOutlined as SahaaiIcon,
  IntegrationInstructionsOutlined as IntegrationsIcon,
  MoreHorizOutlined as MoreIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { useAuth } from '../../App';
import { alpha } from '@mui/material/styles';

const drawerWidth = 280;

const menuItems = [
  { text: 'eOrders', icon: <EordersIcon />, path: '/eorders' },
  {
    text: 'Sales',
    icon: <SalesIcon />,
    path: '/sales',
    children: [
      { text: 'New Sale', path: '/sales/new' },
      { 
        text: 'Sales Sorter', 
        path: '/sales/sorter',
        children: [
          { text: 'New Sorter', path: '/sales/sorter/new' },
          { text: 'View Sorters', path: '/sales/sorter/view' },
          { text: 'Sorter History', path: '/sales/sorter/history' }
        ]
      },
      { 
        text: 'Sales Quotation', 
        path: '/sales/quotation',
        children: [
          { text: 'Create Quote', path: '/sales/quotation/create' },
          { text: 'Manage Quotes', path: '/sales/quotation/manage' },
          { text: 'Quote Templates', path: '/sales/quotation/templates' }
        ]
      },
      { 
        text: 'Returns', 
        path: '/sales/returns',
        children: [
          { text: 'New Return', path: '/sales/returns/new' },
          { text: 'Return History', path: '/sales/returns/history' },
          { text: 'Return Policy', path: '/sales/returns/policy' }
        ]
      },
    ],
  },
  {
    text: 'Purchase',
    icon: <PurchaseIcon />,
    path: '/purchase',
    children: [
      { text: 'New Purchase', path: '/purchase/new' },
      { text: 'Purchase', path: '/purchase' },
      { text: 'Returns', path: '/purchase/returns' },
      { text: 'PO', path: '/purchase/po' },
      { text: 'Gate Inward', path: '/purchase/gate-inward' }
    ]
  },
  { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
  { text: 'MedGuide', icon: <MedguideIcon />, path: '/medguide' },
  { text: 'Sahaai', icon: <SahaaiIcon />, path: '/sahaai' },
  { text: 'Integrations', icon: <IntegrationsIcon />, path: '/integrations' },
  { 
    text: 'More', 
    icon: <MoreIcon />, 
    path: '/more',
    children: [
      { 
        text: 'Reports', 
        path: '/reports',
        children: [
          { text: 'Sales Reports', path: '/reports/sales' },
          { text: 'Inventory Reports', path: '/reports/inventory' },
          { text: 'Financial Reports', path: '/reports/financial' }
        ]
      },
      { 
        text: 'Settings', 
        path: '/settings',
        children: [
          { text: 'General Settings', path: '/settings/general' },
          { text: 'User Settings', path: '/settings/users' },
          { text: 'System Settings', path: '/settings/system' }
        ]
      },
      { 
        text: 'Users', 
        path: '/users',
        children: [
          { text: 'User Management', path: '/users/manage' },
          { text: 'Roles & Permissions', path: '/users/roles' },
          { text: 'User Activity', path: '/users/activity' }
        ]
      },
    ]
  },
];

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [hoveredMenuPath, setHoveredMenuPath] = useState([]);
  const hoverTimer = useRef();
  const [mobileAccordion, setMobileAccordion] = useState(null);

  const isProfileMenuOpen = Boolean(profileAnchorEl);

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAccordionToggle = (key) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  };

  const handleDrawerClose = () => setMobileOpen(false);

  const handleMenuButtonMouseEnter = (event, key) => {
    clearTimeout(hoverTimer.current);
    setHoveredMenuPath([key]);
  };

  const handleMenuBarMouseLeave = () => {
    hoverTimer.current = setTimeout(() => setHoveredMenuPath([]), 250);
  };

  const handleMenuMouseEnter = (pathArr) => {
    clearTimeout(hoverTimer.current);
    setHoveredMenuPath(pathArr);
  };

  const handleMenuMouseLeave = () => {
    hoverTimer.current = setTimeout(() => setHoveredMenuPath([]), 250);
  };

  const handleSearchClick = () => {
    console.log('Search icon clicked');
    // Implement search functionality
  };

  const handleCartClick = () => {
    console.log('Cart icon clicked');
    // Implement cart functionality, e.g., navigate to cart page
    navigate('/cart'); // Assuming you have a /cart route
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
  };

  // Helper to check if a menu is open at a given path
  const isMenuOpen = (pathArr) => {
    if (hoveredMenuPath.length < pathArr.length) return false;
    for (let i = 0; i < pathArr.length; i++) {
      if (hoveredMenuPath[i] !== pathArr[i]) return false;
    }
    return true;
  };

  // Recursive desktop menu rendering
  const renderDesktopMenu = (items, pathArr = []) =>
    items.map((item) => {
      const currentPath = [...pathArr, item.text];
      return (
        <Box key={currentPath.join('-')} sx={{ position: 'relative' }}
          onMouseEnter={() => handleMenuMouseEnter(currentPath)}
          onMouseLeave={handleMenuMouseLeave}
        >
          <MenuItem
            onClick={() => item.path && navigate(item.path)}
            sx={{ display: 'flex', alignItems: 'center', minWidth: 180 }}
          >
            {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
            {item.text}
            {item.children && <ExpandMore sx={{ fontSize: 16, marginLeft: 'auto' }} />}
          </MenuItem>
          {item.children && isMenuOpen(currentPath) && (
            <Box
              sx={{
                position: 'absolute',
                left: '100%',
                top: 0,
                minWidth: 200,
                bgcolor: 'background.paper',
                boxShadow: 3,
                borderRadius: 1,
                zIndex: 1300,
                mt: 0,
              }}
            >
              {renderDesktopMenu(item.children, currentPath)}
            </Box>
          )}
        </Box>
      );
    });

  // Recursive mobile menu rendering
  const renderMobileMenu = (items, level = 0) =>
    items.map((item) => (
      <React.Fragment key={item.text}>
        <ListItemButton
          onClick={() => {
            if (item.children) {
              handleAccordionToggle(item.text);
            } else {
              navigate(item.path);
              setMobileOpen(false);
            }
          }}
          sx={{ pl: 2 + level * 2 }}
        >
          <ListItemText primary={item.text} />
          {item.children ? (mobileAccordion === item.text ? <ExpandLess /> : <ExpandMore />) : null}
        </ListItemButton>
        {item.children && (
          <Collapse in={mobileAccordion === item.text} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderMobileMenu(item.children, level + 1)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));

  const drawer = user ? (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ 
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        minHeight: '64px !important'
      }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
          IMS
        </Typography>
      </Toolbar>
      <List sx={{ flexGrow: 1, px: 2 }}>
        {renderMobileMenu(menuItems)}
      </List>
    </Box>
  ) : null;

  const mainContentWidth = '100%';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          {user && isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600, flexGrow: 1 }}>
             IMS
          </Typography>

          {user && !isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                item.children ? (
                  <Box key={item.text} sx={{ position: 'relative' }}>
                    <Button 
                      onClick={() => navigate(item.path)}
                      onMouseEnter={(event) => handleMenuButtonMouseEnter(event, item.text)}
                      onMouseLeave={handleMenuBarMouseLeave}
                      sx={{
                        color: location.pathname.startsWith(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                        fontWeight: location.pathname.startsWith(item.path) ? 600 : 400,
                        mx: 1,
                        '&:hover': {
                          color: theme.palette.secondary.main,
                          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                        },
                        transition: 'all 0.2s ease-in-out',
                        borderBottom: location.pathname.startsWith(item.path) ? `2px solid ${theme.palette.primary.main}` : 'none',
                        borderRadius: 0,
                        pb: '4px',
                      }}
                    >
                      {item.text}
                    </Button>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        minWidth: 200,
                        bgcolor: 'background.paper',
                        boxShadow: 3,
                        borderRadius: 1,
                        zIndex: 1200,
                        opacity: hoveredMenuPath[0] === item.text ? 1 : 0,
                        pointerEvents: hoveredMenuPath[0] === item.text ? 'auto' : 'none',
                        transform: hoveredMenuPath[0] === item.text ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'opacity 0.2s, transform 0.2s',
                        mt: 1,
                      }}
                    >
                      {renderDesktopMenu(item.children, [item.text])}
                    </Box>
                  </Box>
                ) : (
                  <Button 
                    key={item.text} 
                    onClick={() => navigate(item.path)}
                    sx={{
                      color: location.pathname === item.path || (location.pathname === '/' && item.path === '/') ? theme.palette.primary.main : theme.palette.text.primary,
                      fontWeight: location.pathname === item.path || (location.pathname === '/' && item.path === '/') ? 600 : 400,
                      mx: 1,
                      '&:hover': {
                        color: theme.palette.secondary.main,
                        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                      },
                      transition: 'all 0.2s ease-in-out',
                      borderBottom: location.pathname === item.path || (location.pathname === '/' && item.path === '/') ? `2px solid ${theme.palette.primary.main}` : 'none',
                      borderRadius: 0,
                      pb: '4px',
                    }}
                  >
                    {item.text}
                  </Button>
                )
              ))}
            </Box>
          )}
          {user && (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                     <IconButton color="inherit" size="small" onClick={handleSearchClick}><SearchIcon /></IconButton>
                      <IconButton color="inherit" size="small" onClick={handleCartClick}><ShoppingCartIcon /></IconButton>
                       <IconButton color="inherit" size="small" onClick={handleProfileMenuOpen}><PersonIcon /></IconButton>
                        <Menu
                            anchorEl={profileAnchorEl}
                            open={isProfileMenuOpen}
                            onClose={handleProfileMenuClose}
                        >
                            <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                </Box>
            )}
        </Toolbar>
      </AppBar>
      {user && isMobile && (
        <Box
          component="nav"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                borderRight: 'none',
                boxShadow: theme.shadows[8],
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: mainContentWidth,
          backgroundColor: 'background.default',
          minHeight: '100vh',
          mt: '64px',
        }}
      >
        {children}
        {user && isMobile && (
          <Paper 
            sx={{
              position: 'fixed', 
              bottom: 0, 
              left: 0, 
              right: 0,
              borderTop: '1px solid',
              borderColor: 'divider',
              zIndex: 1100,
            }} 
            elevation={3}
          >
            <BottomNavigation
              value={location.pathname}
              onChange={(event, newValue) => {
                navigate(newValue);
              }}
              showLabels
            >
              {menuItems.slice(0, 5).map((item) => (
                <BottomNavigationAction
                  key={item.text}
                  label={item.text}
                  value={item.path}
                  icon={item.icon}
                />
              ))}
            </BottomNavigation>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Layout; 