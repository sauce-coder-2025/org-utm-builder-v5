// src/App.jsx
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, ProtectedRoute } from './auth/AuthProvider';
import MainContent from './components/Layout/MainContent';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ProtectedRoute>
          <MainContent />
        </ProtectedRoute>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;

// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
