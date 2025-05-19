import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

// Define permission maps for each role
const rolePermissions = {
  'admin': ['view_all', 'edit_all', 'manage_users', 'approve_purchases', 'approve_transfers', 'manage_assignments', 'view_reports'],
  'base_commander': ['view_base', 'edit_base', 'approve_base_purchases', 'approve_base_transfers', 'manage_base_assignments', 'view_base_reports'],
  'logistics_officer': ['view_logistics', 'request_purchases', 'request_transfers', 'view_limited_reports'],
  'staff': ['view_assigned', 'request_assignment'] // Lowest level role
};

// Define role hierarchy: higher numbers have more permissions
const roleHierarchy = {
  'admin': 30,
  'base_commander': 20,
  'logistics_officer': 10,
  'staff': 5
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = authService.getCurrentUser();
    console.log('Initial auth state:', currentUser ? 'User found in storage' : 'No user in storage');
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    console.log('Login attempt for username:', username);
    try {
      setLoading(true);
      const response = await authService.login(username, password);
      console.log('Login response:', response);
      
      if (response && response.user && response.token) {
        setUser(response.user);
        console.log('User logged in successfully:', response.user.username);
        return response;
      } else {
        console.error('Invalid login response format:', response);
        throw new Error('Invalid login response from server');
      }
    } catch (error) {
      console.error('Login error in context:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      if (response && response.user && response.token) {
        setUser(response.user);
        return response;
      } else {
        throw new Error('Invalid registration response from server');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    console.log('User logged out');
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  // Check if user has a specific permission
  const hasPermission = (permission) => {
    if (!user || !user.role) return false;
    
    // Admin has all permissions
    if (user.role === 'admin') return true;
    
    // Get permissions for the user's role
    const userPermissions = rolePermissions[user.role] || [];
    
    // Check if the user has the specific permission
    return userPermissions.includes(permission);
  };

  // Check if user has access to a specific role's features (role hierarchy)
  const hasRoleLevel = (requiredRole) => {
    if (!user || !user.role) return false;
    
    const userRoleWeight = roleHierarchy[user.role] || 0;
    const requiredRoleWeight = roleHierarchy[requiredRole] || 0;
    
    // User has access if their role weight is >= required role weight
    return userRoleWeight >= requiredRoleWeight;
  };

  // Get user's base (for base commanders)
  const getUserBase = () => {
    if (!user) return null;
    return user.base || null; // Assuming base info is stored in the user object
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    hasRole,
    hasPermission,
    hasRoleLevel,
    getUserBase,
    isAuthenticated: !!user,
    currentUser: user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};