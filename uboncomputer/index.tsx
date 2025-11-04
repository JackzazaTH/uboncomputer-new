import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from './hooks/useToast';
import ToastContainer from './components/ToastContainer';
import { CartProvider } from './hooks/useCart';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <CartProvider>
        <App />
        <ToastContainer />
      </CartProvider>
    </ToastProvider>
  </React.StrictMode>
);