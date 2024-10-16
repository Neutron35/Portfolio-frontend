import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface ThemeContextType {
  darkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem('darkTheme');
    return storedTheme === 'true';
  });

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark');
      localStorage.setItem('darkTheme', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkTheme', 'false');
    }
  }, [darkTheme]);

  const contextValue = useMemo(
    () => ({
      darkTheme,
      setDarkTheme,
    }),
    [darkTheme]
  );
  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
