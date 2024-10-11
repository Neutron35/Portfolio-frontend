import './main.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Projects from './pages/Projects';
import SignUp from './pages/SignUp';
import AuthProvider from './lib/authProvider';
import Account from './pages/Account';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <div className="min-h-screen font-display text-text-light-500 dark:text-text-dark-500 bg-background-light-500 dark:bg-background-dark-500">
          <Header />
          <main className="max-w-screen-2xl mt-8 2xl:mx-auto">
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
    </Router>
  </StrictMode>
);
