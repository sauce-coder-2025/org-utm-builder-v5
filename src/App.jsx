// src/App.jsx
import React from 'react';
import { AuthProvider, ProtectedRoute } from './auth/AuthProvider';
import MainContent from './components/Layout/MainContent';

const App = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <MainContent />
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default App;
