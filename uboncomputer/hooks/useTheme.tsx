import React, { createContext, useState, useContext, ReactNode, useLayoutEffect, useCallback, useMemo } from 'react';

// Define the shape of the context
type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook for consuming the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// This function's logic is designed to be an exact mirror of the inline script in `index.html`.
// This is critical to prevent a hydration mismatch and theme flicker on initial load.
const getInitialTheme = (): Theme => {
  // On the server, we can't know the theme, so we default.
  // The client will correct this on hydration.
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return 'light';
  }

  try {
    const storedTheme = window.localStorage.getItem('theme');
    
    // This logic directly mirrors: `if (theme === 'dark' || (!theme && ...))`
    if (storedTheme === 'dark' || (storedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return 'dark';
    }
  } catch (e) {
    // If localStorage or matchMedia fails, default to light.
    console.error('Failed to read theme preference', e);
    return 'light';
  }
  
  // In all other cases (e.g., theme is 'light', or an invalid value is stored), default to light.
  return 'light';
};


// The provider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state using the synchronized function.
  // The function is passed directly to useState for lazy initialization on the client.
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // This effect synchronizes the theme state with the DOM (by adding/removing the 'dark' class)
  // and with localStorage. useLayoutEffect runs before the browser paints, preventing flickers.
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    
    // Explicitly add or remove the class to match the state.
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      window.localStorage.setItem('theme', theme);
    } catch (e) {
      console.error('Failed to save theme to localStorage', e);
    }
  }, [theme]); // This effect re-runs only when `theme` changes.

  // The function to toggle between themes. Memoized for performance.
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  // The context value is also memoized to prevent unnecessary re-renders.
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
