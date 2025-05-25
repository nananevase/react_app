import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Link,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  LocalShipping as StockMovementIcon,
  AddBox as StockReceivingIcon,
  Assessment as AuditIcon,
  Receipt as BillingIcon,
  TrendingUp,
  TrendingDown,
  InfoOutlined,
  Storefront as StorefrontIcon,
  ShoppingCart as ShoppingCartIcon,
  Description as DescriptionIcon,
  Assessment as ReportIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const quickActions = [
    { title: 'Inventory', description: 'Manage your inventory items', icon: <InventoryIcon sx={{ fontSize: 40 }} />, path: '/inventory' },
    { title: 'Stock Movement', description: 'Transfer items between locations', icon: <StockMovementIcon sx={{ fontSize: 40 }} />, path: '/stock-movement' },
    { title: 'Stock Receiving', description: 'Receive new stock items', icon: <StockReceivingIcon sx={{ fontSize: 40 }} />, path: '/stock-receiving' },
    { title: 'Inventory Audit', description: 'Perform physical inventory count', icon: <AuditIcon sx={{ fontSize: 40 }} />, path: '/inventory-audit' },
    { title: 'Billing', description: 'Process sales and billing', icon: <BillingIcon sx={{ fontSize: 40 }} />, path: '/billing' },
  ];

  // Dummy Data (more realistic)
  const salesData = {
    amount: 125000,
    orders: 45,
    trend: '+12%',
    period: 'vs last month'
  };

  const purchaseData = {
    amount: 85000,
    orders: 28,
    trend: '+8%',
    period: 'vs last month'
  };

  const periodData = [
    { value: 'today', label: 'Today' },
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: '60d', label: '60 days' },
  ];

  const staffData = [
    { id: 1, value: 40, label: 'Staff A', color: '#2196F3' },
    { id: 2, value: 30, label: 'Staff B', color: '#4CAF50' },
    { id: 3, value: 30, label: '#FFC107' }
  ];

  const expiringItems = [
    { id: 1, name: 'Paracetamol 500mg', qty: 150, expiry: '2024-06-15', batch: 'B12345' },
    { id: 2, name: 'Amoxicillin 250mg', qty: 200, expiry: '2024-06-20', batch: 'B12346' },
    { id: 3, name: 'Omeprazole 20mg', qty: 100, expiry: '2024-06-25', batch: 'B12347' },
    { id: 4, name: 'Metformin 500mg', qty: 300, expiry: '2024-06-30', batch: 'B12348' }
  ];

  const upcomingPDC = [
    { id: 1, party: 'ABC Medical Store', amount: 25000, date: '2024-06-10', status: 'Pending' },
    { id: 2, party: 'XYZ Pharmacy', amount: 15000, date: '2024-06-15', status: 'Pending' },
    { id: 3, party: 'City Health Care', amount: 35000, date: '2024-06-20', status: 'Pending' }
  ];

  const salesMarginData = [
    { id: 1, name: 'Paracetamol 500mg', pack: '10x10', stock: 500, margin: '25%', mrp: 50, cost: 37.5 },
    { id: 2, name: 'Amoxicillin 250mg', pack: '10x10', stock: 300, margin: '30%', mrp: 80, cost: 56 },
    { id: 3, name: 'Omeprazole 20mg', pack: '10x10', stock: 200, margin: '35%', mrp: 120, cost: 78 },
    { id: 4, name: 'Metformin 500mg', pack: '10x10', stock: 400, margin: '20%', mrp: 40, cost: 32 }
  ];

  const needToCollectData = [
    { id: 1, customer: 'ABC Medical Store', amount: 45000, dueDate: '2024-06-05', status: 'Overdue' },
    { id: 2, customer: 'XYZ Pharmacy', amount: 25000, dueDate: '2024-06-10', status: 'Due Soon' },
    { id: 3, customer: 'City Health Care', amount: 35000, dueDate: '2024-06-15', status: 'Due Soon' }
  ];

  const chartPlaceholderData = [
    { date: '22 May', sales: 15000, purchase: 12000 },
    { date: '23 May', sales: 18000, purchase: 14000 },
    { date: '24 May', sales: 16000, purchase: 13000 },
    { date: '25 May', sales: 20000, purchase: 15000 },
    { date: '26 May', sales: 22000, purchase: 16000 },
    { date: '27 May', sales: 19000, purchase: 14000 },
    { date: '28 May', sales: 21000, purchase: 15000 }
  ];

  const topSellingItems = [
    { id: 1, name: 'Paracetamol 500mg', sales: 1500, revenue: 75000, growth: '+15%' },
    { id: 2, name: 'Amoxicillin 250mg', sales: 1200, revenue: 96000, growth: '+12%' },
    { id: 3, name: 'Omeprazole 20mg', sales: 800, revenue: 96000, growth: '+8%' },
    { id: 4, name: 'Metformin 500mg', sales: 1000, revenue: 40000, growth: '+10%' }
  ];

  const recentActivity = [
    { id: 1, type: 'Sale', description: 'New sale of ₹25,000', time: '2 hours ago', user: 'Staff A' },
    { id: 2, type: 'Purchase', description: 'Stock received of ₹15,000', time: '3 hours ago', user: 'Staff B' },
    { id: 3, type: 'Payment', description: 'Payment received of ₹35,000', time: '5 hours ago', user: 'Staff C' },
    { id: 4, type: 'Stock', description: 'Low stock alert for Paracetamol', time: '6 hours ago', user: 'System' }
  ];

  const [selectedPeriod, setSelectedPeriod] = React.useState('today');

  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setSelectedPeriod(newPeriod);
      console.log('Fetching data for period:', newPeriod);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 2 } }}>
      {/* Flexbox Container for three columns */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: theme.spacing(2), // Spacing between columns
      }}>

        {/* Left Column */}
        <Box sx={{
          flex: '1 1 33.33%', // Grow, Shrink, Basis
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2), // Spacing between cards in column
        }}>
          {/* Sales/Purchase Card */}
          <Card elevation={1} sx={{ height: 'auto' }}>
            <CardContent sx={{ p: theme.spacing(1.5) }}>
              <ToggleButtonGroup
                value={selectedPeriod}
                exclusive
                onChange={handlePeriodChange}
                aria-label="data period"
                size="small"
                sx={{ mb: theme.spacing(2) }}
              >
                {periodData.map((period) => (
                  <ToggleButton key={period.value} value={period.value} aria-label={period.label}>
                    {period.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Sales</Typography>
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                    ₹{salesData.amount.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {salesData.orders} Orders
                    </Typography>
                    <Chip
                      size="small"
                      label={`${salesData.trend} ${salesData.period}`}
                      color={salesData.trend.startsWith('+') ? "success" : "error"}
                      icon={salesData.trend.startsWith('+') ? <TrendingUp /> : <TrendingDown />}
                      sx={{ height: 20 }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Purchase</Typography>
                  <Typography variant="h4" color="secondary" sx={{ fontWeight: 'bold' }}>
                    ₹{purchaseData.amount.toLocaleString()}
                  </Typography>
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {purchaseData.orders} Orders
                    </Typography>
                    <Chip
                      size="small"
                      label={`${purchaseData.trend} ${purchaseData.period}`}
                      color={purchaseData.trend.startsWith('+') ? "success" : "error"}
                      icon={purchaseData.trend.startsWith('+') ? <TrendingUp /> : <TrendingDown />}
                       sx={{ height: 20 }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ height: 150, mt: theme.spacing(3), bgcolor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">Sales/Purchase Chart Placeholder</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Stock Section */}
           <Paper elevation={1} sx={{ height: 'auto', p: theme.spacing(1.5) }}>
             <Typography variant="h6" gutterBottom>
               Stock
               <Tooltip title="Overview of inventory stock">
                 <IconButton size="small" sx={{ ml: 0.5 }}><InfoOutlined sx={{ fontSize: 16 }} /></IconButton>
               </Tooltip>
             </Typography>
             <Grid container spacing={2}> 
               <Grid item xs={4}><Link href="#" variant="body2">By PTR <InfoOutlined sx={{ fontSize: 14, verticalAlign: 'middle' }} /></Link></Grid>
               <Grid item xs={4}><Link href="#" variant="body2">By LP <InfoOutlined sx={{ fontSize: 14, verticalAlign: 'middle' }} /></Link></Grid>
               <Grid item xs={4}><Link href="#" variant="body2">By MRP <InfoOutlined sx={{ fontSize: 14, verticalAlign: 'middle' }} /></Link></Grid>
             </Grid>
             <Box sx={{ mt: theme.spacing(2) }}>
               <Typography variant="body2" fontWeight="bold">Current: <Typography component="span" variant="body2">5000 items</Typography></Typography>
               <Typography variant="body2" fontWeight="bold">Expired: <Typography component="span" variant="body2" color="error">50 items</Typography></Typography>
             </Box>
           </Paper>

          {/* Staff Overview Card */}
          <Card elevation={1} sx={{ height: 'auto' }}>
            <CardContent sx={{ p: theme.spacing(1.5) }}>
              <Typography variant="h6" gutterBottom>
                Staff Overview
                <Tooltip title="Overview of staff activity">
                  <IconButton size="small" sx={{ ml: 0.5 }}><InfoOutlined sx={{ fontSize: 16 }} /></IconButton>
                </Tooltip>
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Pie Chart Placeholder */}
                <Box sx={{ width: 250, height: 180, bgcolor: '#f0f0f0', my: theme.spacing(2), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Pie Chart Placeholder</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: theme.spacing(2), textAlign: 'center' }}>You can see activity of each staff member here</Typography>
                <Box sx={{ mt: theme.spacing(2) }}>
                  <Button variant="contained" size="small" sx={{ mr: theme.spacing(1) }}>Staff Member</Button>
                  <Button variant="outlined" size="small">How it works ?</Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Top Selling Items Card */}
          <Card elevation={1} sx={{ height: 'auto' }}>
            <CardContent sx={{ p: theme.spacing(1.5) }}>
              <Typography variant="h6" gutterBottom>
                Top Selling Items
                <Tooltip title="List of top selling inventory items">
                  <IconButton size="small" sx={{ ml: 0.5 }}><InfoOutlined sx={{ fontSize: 16 }} /></IconButton>
                </Tooltip>
              </Typography>
              <Divider sx={{ my: theme.spacing(1) }} />
               {topSellingItems.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: theme.spacing(4) }}>
                  <InfoOutlined color="disabled" sx={{ fontSize: 40 }}/>
                  <Typography variant="body2" color="text.secondary">No Record Found</Typography>
                </Box>
              ) : (
                 <List dense sx={{ p: 0 }}>
                  {topSellingItems.map(item => (
                    <ListItem key={item.id} sx={{ py: theme.spacing(0.5) }}>
                      <ListItemText
                        primary={
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
                             <Typography variant="body2" fontWeight="bold">{item.name}</Typography>
                             <Chip
                              size="small"
                              label={`Sales: ${item.sales}`}
                              color="primary"
                               sx={{ height: 20 }}
                            />
                           </Box>
                        }
                        secondary={
                          <React.Fragment>
                             <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                               Revenue: ₹{item.revenue.toLocaleString()}
                            </Typography>
                            {` | Growth: ${item.growth}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity Card */}
          <Card elevation={1} sx={{ height: 'auto' }}>
            <CardContent sx={{ p: theme.spacing(1.5) }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
                 <Tooltip title="Recent activities in the system">
                  <IconButton size="small" sx={{ ml: 0.5 }}><InfoOutlined sx={{ fontSize: 16 }} /></IconButton>
                </Tooltip>
              </Typography>
              <Divider sx={{ my: theme.spacing(1) }} />
               {recentActivity.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: theme.spacing(4) }}>
                  <InfoOutlined color="disabled" sx={{ fontSize: 40 }}/>
                  <Typography variant="body2" color="text.secondary">No Record Found</Typography>
                </Box>
              ) : (
                 <List dense sx={{ p: 0 }}>
                  {recentActivity.map(activity => (
                    <ListItem key={activity.id} sx={{ py: theme.spacing(0.5) }}>
                      <ListItemText
                        primary={
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
                             <Typography variant="body2" fontWeight="bold">{activity.type}</Typography>
                             <Chip
                              size="small"
                              label={activity.time}
                              color="default"
                               sx={{ height: 20 }}
                            />
                           </Box>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {activity.description}
                            </Typography>
                             {` by ${activity.user}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

        </Box>

        {/* Middle Column */}
        <Box sx={{
          flex: '1 1 33.33%',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2),
        }}>

          {/* Loyalty Points Card */}
          <Card elevation={1} sx={{ height: 'auto', bgcolor: theme.palette.info.main, color: theme.palette.info.contrastText, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CardContent sx={{ flexGrow: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: theme.spacing(1.5), minHeight: 100 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Loyalty Points helps increase customer retention.</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: theme.spacing(2) }}>
              <Button variant="contained" sx={{ bgcolor: theme.palette.info.contrastText, color: theme.palette.info.main, '&:hover': { bgcolor: '#eee' } }}>Let's Start</Button>
            </CardActions>
          </Card>

          {/* Give a Gift Card */}
           <Card elevation={1} sx={{ height: 'auto', bgcolor: theme.palette.success.main, color: theme.palette.success.contrastText, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
             <CardContent sx={{ flexGrow: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: theme.spacing(1.5), minHeight: 100 }}>
               <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Give a gift to your chemist friends</Typography>
             </CardContent>
             <CardActions sx={{ justifyContent: 'center', pb: theme.spacing(2) }}>
               <Button variant="contained" sx={{ bgcolor: theme.palette.success.contrastText, color: theme.palette.success.main, '&:hover': { bgcolor: '#eee' } }}>Gift Now</Button>
             </CardActions>
           </Card>

          {/* Expiring Items Card */}
          <Card elevation={1} sx={{ height: 'auto' }}>
            <CardContent sx={{ p: theme.spacing(1.5) }}>
              <Typography variant="h6" gutterBottom>
                Expiring Items
                <Tooltip title="Items expiring in the next 30 days">
                  <IconButton size="small" sx={{ ml: 0.5 }}><InfoOutlined sx={{ fontSize: 16 }} /></IconButton>
                </Tooltip>
              </Typography>
              <Divider sx={{ my: theme.spacing(1) }} />
              {expiringItems.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: theme.spacing(4) }}>
                  <InfoOutlined color="disabled" sx={{ fontSize: 40 }}/>
                  <Typography variant="body2" color="text.secondary">No Record Found</Typography>
                  <Link href="#" variant="body2" display="block" sx={{ mt: 1 }}>View all {'>'}</Link>
                </Box>
              ) : (
                <List dense sx={{ p: 0 }}>
                  {expiringItems.map(item => (
                    <ListItem key={item.id} sx={{ py: theme.spacing(0.5) }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
                            <Typography variant="body2" fontWeight="bold">{item.name}</Typography>
                            <Chip
                              size="small"
                              label={`Exp: ${new Date(item.expiry).toLocaleDateString()}`}
                              color="warning"
                              icon={<WarningIcon />}
                              sx={{ height: 20 }}
                            />
                          </Box>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Qty: {item.qty} | Batch: {item.batch}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Upcoming PDC Card */}
          <Card elevation={1} sx={{ height: 'auto' }}>
            <CardContent sx={{ p: theme.spacing(1.5) }}>
              <Typography variant="h6" gutterBottom>
                Upcoming PDC
                <Tooltip title="Post-dated cheques to be collected">
                  <IconButton size="small" sx={{ ml: 0.5 }}><InfoOutlined sx={{ fontSize: 16 }} /></IconButton>
                </Tooltip>
              </Typography>
              <Divider sx={{ my: theme.spacing(1) }} />
              {upcomingPDC.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: theme.spacing(4) }}>
                  <InfoOutlined color="disabled" sx={{ fontSize: 40 }}/>
                  <Typography variant="body2" color="text.secondary">No PDC issued</Typography>
                </Box>
              ) : (
                <List dense sx={{ p: 0 }}>
                  {upcomingPDC.map(item => (
                    <ListItem key={item.id} sx={{ py: theme.spacing(0.5) }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
                            <Typography variant="body2" fontWeight="bold">{item.party}</Typography>
                            <Chip
                              size="small"
                              label={`Due: ${new Date(item.date).toLocaleDateString()}`}
                              color="info"
                              icon={<ScheduleIcon />}
                              sx={{ height: 20 }}
                            />
                          </Box>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Amount: ₹{item.amount.toLocaleString()}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

        </Box>

        {/* Right Column */}
        <Box sx={{
          flex: '1 1 33.33%',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2),
        }}>

           {/* Import Stock Card */}
           <Card elevation={1} sx={{ height: 'auto', bgcolor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}>
             <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: theme.spacing(1.5), minHeight: 100 }}>
               <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Import your existing stock in a structured format</Typography>
             </CardContent>
             <CardActions sx={{ justifyContent: 'flex-end', pb: theme.spacing(2), pr:theme.spacing(2) }}>
               <Button variant="contained" sx={{ bgcolor: theme.palette.primary.contrastText, color: theme.palette.primary.dark, '&:hover': { bgcolor: '#eee' } }}>Import Now</Button>
             </CardActions>
           </Card>

          {/* Need to Collect Card */}
          <Card elevation={1} sx={{ height: 'auto' }}>
              <CardContent sx={{ p: theme.spacing(1.5) }}>
              <Typography variant="h6" gutterBottom>
                Need to Collect
                <Tooltip title="Outstanding payments to be collected">
                  <IconButton size="small" sx={{ ml: 0.5 }}><InfoOutlined sx={{ fontSize: 16 }} /></IconButton>
                </Tooltip>
              </Typography>
              <Divider sx={{ my: theme.spacing(1) }} />
              {needToCollectData.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: theme.spacing(4) }}>
                  <InfoOutlined color="disabled" sx={{ fontSize: 40 }}/>
                  <Typography variant="body2" color="text.secondary">No Record Found</Typography>
                </Box>
              ) : (
                <List dense sx={{ p: 0 }}>
                  {needToCollectData.map(item => (
                    <ListItem key={item.id} sx={{ py: theme.spacing(0.5) }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
                            <Typography variant="body2" fontWeight="bold">{item.customer}</Typography>
                            <Chip
                              size="small"
                              label={item.status}
                              color={item.status === 'Overdue' ? 'error' : 'warning'}
                              icon={item.status === 'Overdue' ? <WarningIcon /> : <ScheduleIcon />}
                              sx={{ height: 20 }}
                            />
                          </Box>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Amount Due: ₹{item.amount.toLocaleString()}
                            </Typography>
                            {' | Due: '}{new Date(item.dueDate).toLocaleDateString()}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Sales Margin Card */}
          <Card elevation={1} sx={{ height: 'auto' }}>
            <CardContent sx={{ p: theme.spacing(1.5) }}>
              <Typography variant="h6" gutterBottom>
                Sales Margin
                <Tooltip title="Profit margins for top selling items">
                  <IconButton size="small" sx={{ ml: 0.5 }}><InfoOutlined sx={{ fontSize: 16 }} /></IconButton>
                </Tooltip>
              </Typography>
              <Divider sx={{ my: theme.spacing(1) }} />
              {salesMarginData.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: theme.spacing(4) }}>
                  <InfoOutlined color="disabled" sx={{ fontSize: 40 }}/>
                  <Typography variant="body2" color="text.secondary">No Record Found</Typography>
                </Box>
              ) : (
                <List dense sx={{ p: 0 }}>
                  {salesMarginData.map(item => (
                    <ListItem key={item.id} sx={{ py: theme.spacing(0.5) }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
                            <Typography variant="body2" fontWeight="bold">{item.name}</Typography>
                            <Chip
                              size="small"
                              label={`Margin: ${item.margin}`}
                              color="success"
                              icon={<AttachMoneyIcon />}
                               sx={{ height: 20 }}
                            />
                          </Box>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Pack: {item.pack} | Stock: {item.stock}
                            </Typography>
                            {' | MRP: ₹'}{item.mrp} {' | Cost: ₹'}{item.cost}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Sales vs Purchase Chart Card */}
          <Card elevation={1} sx={{ height: 'auto' }}>
            <CardContent sx={{ p: theme.spacing(1.5) }}>
              <Typography variant="h6" gutterBottom>
                Sales vs Purchase (Last 30 Days)
                <Tooltip title="Sales and purchase trends over the last 30 days">
                  <IconButton size="small" sx={{ ml: 0.5 }}><InfoOutlined sx={{ fontSize: 16 }} /></IconButton>
                </Tooltip>
              </Typography>
              <Box sx={{ height: 300, bgcolor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">Sales vs Purchase Chart Placeholder</Typography>
              </Box>
            </CardContent>
          </Card>

        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard; 