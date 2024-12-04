// src/components/Auth/LoginScreen.jsx
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../auth/AuthProvider';

const LoginScreen = () => {
  const { handleLogin } = useAuth();
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-fp-gray">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-fp">
        <div className="text-center">
          <img
            className="mx-auto h-16 w-auto mb-6"
            src="/logo.jpg"
            alt="Fisher & Paykel"
          />
          <h2 className="text-3xl font-bold text-fp-dark mb-2">
            UTM Builder
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Please sign in with your Fisher & Paykel email
          </p>
        </div>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => setError('Login failed. Please try again.')}
            shape="pill"
            text="signin_with"
            hosted_domain="fisherpaykel.com"
            ux_mode="popup"
          />
        </div>
      </div>
    </div>
  );
};

// src/components/Auth/UserMenu.jsx
const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick
