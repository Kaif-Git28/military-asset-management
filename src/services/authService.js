// Mock authentication service
// In a real app, this would make API calls to a backend

const USERS = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@military.gov',
    password: 'admin123',
    role: 'admin',
    base: null // Admin has access to all bases
  },
  {
    id: 2,
    name: 'Base Commander',
    email: 'commander@military.gov',
    password: 'commander123',
    role: 'base_commander',
    base: 'Alpha Base'
  },
  {
    id: 3,
    name: 'Logistics Officer',
    email: 'logistics@military.gov',
    password: 'logistics123',
    role: 'logistics_officer',
    base: 'Alpha Base'
  }
];

const TOKEN_KEY = 'military_asset_auth_token';
const USER_KEY = 'military_asset_user';

export const authService = {
  login: async (credentials) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const { email, password } = credentials;
    const user = USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Create a user object without the password
    const authenticatedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      base: user.base
    };
    
    // Create a mock JWT token
    const token = btoa(JSON.stringify(authenticatedUser));
    
    // Store in localStorage
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));
    
    return authenticatedUser;
  },
  
  logout: async () => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  
  getCurrentUser: async () => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  },
  
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  }
};