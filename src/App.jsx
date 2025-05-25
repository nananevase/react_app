import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import StockMovement from './pages/StockMovement';
import StockReceiving from './pages/StockReceiving';
import InventoryAudit from './pages/InventoryAudit';
import Billing from './pages/Billing';
import NewSales from './pages/NewSales';
import Login from './pages/Login';
import SalesPage from './pages/SalesPage';
import PurchaseList from './pages/purchase/PurchaseEntry';
import NewPurchase from './pages/purchase/NewPurchase';
import PurchaseReturns from './pages/purchase/PurchaseReturns';
import PurchaseOrder from './pages/purchase/PurchaseOrder';
import GateInward from './pages/purchase/GateInward';

// Create an Auth Context
const AuthContext = createContext(null);

// Custom hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);

// Auth Provider component
const AuthProvider = ({ children }) => {
  // Get initial state from local storage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  }); 

  // Save user to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData) => {
    // Perform login logic, e.g., API call
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic, e.g., clear local storage/cookies
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

// App Routes component to handle routing logic
const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
      <Route path="/stock-movement" element={<ProtectedRoute><StockMovement /></ProtectedRoute>} />
      <Route path="/stock-receiving" element={<ProtectedRoute><StockReceiving /></ProtectedRoute>} />
      <Route path="/inventory-audit" element={<ProtectedRoute><InventoryAudit /></ProtectedRoute>} />
      <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
      <Route path="/sales" element={<ProtectedRoute><SalesPage /></ProtectedRoute>} />
      <Route path="/sales/new" element={<ProtectedRoute><NewSales /></ProtectedRoute>} />
      <Route path="/new-sales" element={<ProtectedRoute><NewSales /></ProtectedRoute>} />
      <Route path="/purchase" element={<ProtectedRoute><PurchaseList /></ProtectedRoute>} />
      <Route path="/purchase/new" element={<ProtectedRoute><NewPurchase /></ProtectedRoute>} />
      <Route path="/purchase/returns" element={<ProtectedRoute><PurchaseReturns /></ProtectedRoute>} />
      <Route path="/purchase/po" element={<ProtectedRoute><PurchaseOrder /></ProtectedRoute>} />
      <Route path="/purchase/gate-inward" element={<ProtectedRoute><GateInward /></ProtectedRoute>} />
      <Route 
        path="*"
        element={user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF4081',
      light: '#FF80AB',
      dark: '#F50057',
      contrastText: '#fff',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
