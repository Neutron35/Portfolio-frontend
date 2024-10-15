import './main.css';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import About from './pages/About';
import Account from './pages/Account';
import AuthProvider from './lib/authProvider';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Projects from './pages/Projects';
import SignUp from './pages/SignUp';
import { StrictMode } from 'react';
import ThemeProvider from './lib/themeProvider';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background font-display text-foreground">
            <Header />
            <main className="mt-8 max-w-screen-2xl 2xl:mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/account" element={<Account />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/notfound" replace />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
