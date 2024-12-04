// src/auth/AuthProvider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // In development, we'll auto-login with a test user
  useEffect(() => {
    const isDevelopment = true; // Toggle this for production
    
    if (isDevelopment) {
      const devUser = {
        email: 'dev@fisherpaykel.com',
        name: 'Development User',
        picture: '/api/placeholder/32/32', // Using a placeholder image
        department: 'Development'
      };
      setUser(devUser);
      sessionStorage.setItem('fp_utm_user', JSON.stringify(devUser));
    }
    
    setLoading(false);
  }, []);

  const handleLogin = async () => {
    // Development login simulation
    const devUser = {
      email: 'dev@fisherpaykel.com',
      name: 'Development User',
      picture: '/api/placeholder/32/32',
      department: 'Development'
    };
    setUser(devUser);
    sessionStorage.setItem('fp_utm_user', JSON.stringify(devUser));
    return devUser;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('fp_utm_user');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-fp-blue border-t-transparent"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-fp-blue border-t-transparent"></div>
      </div>
    );
  }

  return children;
};
