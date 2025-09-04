import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  phone: '+1234567890',
  country: 'United States',
  kycStatus: 'verified',
  riskProfile: {
    investmentGoals: 'Long-term growth',
    timeHorizon: '5-10 years',
    riskTolerance: 'medium',
    experience: 'Intermediate',
    score: 6
  },
  subscriptionStatus: 'active',
  createdAt: '2024-01-15',
  lastLogin: '2024-12-29'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser(mockUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@bons-ai.com' && password === 'password123') {
      localStorage.setItem('authToken', 'admin-token');
      localStorage.setItem('userRole', 'admin');
    } else {
      localStorage.setItem('authToken', 'user-token');
      localStorage.setItem('userRole', 'user');
    }
    
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = async (userData: Partial<User>) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newUser = { ...mockUser, ...userData };
    localStorage.setItem('authToken', 'user-token');
    localStorage.setItem('userRole', 'user');
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const isAdmin = localStorage.getItem('userRole') === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin, 
      login, 
      logout, 
      signup 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}