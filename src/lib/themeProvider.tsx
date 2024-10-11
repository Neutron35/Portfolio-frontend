import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('darkTheme'));
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark');
      localStorage.setItem('darkTheme', darkTheme);
    } else {
      document.body.classList.remove('dark');
      localStorage.removeItem('darkTheme', darkTheme);
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
  return useContext(ThemeContext);
};

export default ThemeProvider;
