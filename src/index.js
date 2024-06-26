import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/cart';
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CartProvider>
      <SearchProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </SearchProvider>
    </CartProvider>
  </AuthProvider>
);
