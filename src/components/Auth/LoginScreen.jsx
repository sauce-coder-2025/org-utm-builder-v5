// src/components/Auth/UserMenu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../auth/AuthProvider';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-label="User menu"
      >
        <img
          src={user.picture}
          alt={user.name}
          className="h-8 w-8 rounded-full"
        />
        <span className="text-fp-dark hidden md:block">{user.name}</span>
        <svg
          className={`h-5 w-5 text-fp-dark transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg z-50">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium text-fp-dark">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

// src/auth/AuthProvider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

// Create context for auth state management
const AuthContext = createContext(null);

// Custom hook for accessing auth context
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

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const storedUser = sessionStorage.getItem('fp_utm_user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          // Verify the stored email domain
          if (userData.email.endsWith('@fisherpaykel.com')) {
            setUser(userData);
          } else {
            // Invalid session, clear it
            sessionStorage.removeItem('fp_utm_user');
          }
        } catch (error) {
          console.error('Session parsing error:', error);
          sessionStorage.removeItem('fp_utm_user');
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const handleLogin = async (credentialResponse) => {
    try {
      const decoded = jwt_decode(credentialResponse.credential);
      
      // Verify Fisher & Paykel email domain
      if (!decoded.email.endsWith('@fisherpaykel.com')) {
        throw new Error('Please use your Fisher & Paykel email to login');
      }

      const userData = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        department: decoded.hd // hosted domain
      };

      // Store user data in session storage
      sessionStorage.setItem('fp_utm_user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Login validation failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('fp_utm_user');
  };

  // Loading screen while checking authentication
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

// src/components/Auth/ProtectedRoute.jsx
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-fp-blue border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return children;
};

export { LoginScreen, UserMenu, ProtectedRoute };
