
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from './hooks/useToast';
import ToastContainer from './components/ToastContainer';
import { CartProvider } from './hooks/useCart';
import { ComparisonProvider } from './hooks/useComparison';
import { QuickViewProvider } from './hooks/useQuickView';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <CartProvider>
        <ComparisonProvider>
          <QuickViewProvider>
            <App />
            <ToastContainer />
          </QuickViewProvider>
        </ComparisonProvider>
      </CartProvider>
    </ToastProvider>
  </React.StrictMode>
);
