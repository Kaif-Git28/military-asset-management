import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
// Test Page
import TestPage from './pages/TestPage';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import PurchasesPage from './pages/PurchasesPage';
import TransfersPage from './pages/TransfersPage';
import AssignmentsPage from './pages/AssignmentsPage';
import AssetsPage from './pages/AssetsPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// Guards
const PrivateRoute = ({ children, requiredPermission }) => {
  const { isAuthenticated, hasPermission } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Test Route */}
      <Route path="/test" element={<TestPage />} />
      
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/" element={
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Assets route */}
        <Route path="assets" element={
          <PrivateRoute requiredPermission="view_logistics">
            <AssetsPage />
          </PrivateRoute>
        } />
        
        {/* Role-based routes */}
        <Route path="purchases" element={
          <PrivateRoute requiredPermission="request_purchases">
            <PurchasesPage />
          </PrivateRoute>
        } />
        
        <Route path="transfers" element={
          <PrivateRoute requiredPermission="request_transfers">
            <TransfersPage />
          </PrivateRoute>
        } />
        
        <Route path="assignments" element={
          <PrivateRoute requiredPermission="manage_base_assignments">
            <AssignmentsPage />
          </PrivateRoute>
        } />

        {/* New routes for admin functions would go here */}
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
