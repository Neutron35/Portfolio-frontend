import { NavLink, useNavigate } from 'react-router-dom';
import {
  faAddressCard,
  faClipboard,
  faHome,
  faMoon,
  faRightFromBracket,
  faRightToBracket,
  faSun,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { memo, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../../assets/neutron.png';
import { useAuth } from '@/lib/authProvider';
import { useTheme } from '@/lib/useThemeContext';

// Memoize the FontAwesomeIcon component to prevent unnecessary re-renders
const MemoizedFontAwesomeIcon = memo(FontAwesomeIcon);

// Memoize the NavLink component to prevent unnecessary re-renders
const MemoizedNavLink = memo(NavLink);

// Define icons outside the component to ensure stable references
const sunIcon = faSun;
const moonIcon = faMoon;

function Header() {
  const { theme, toggleTheme } = useTheme();

  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  function handleToggle() {
    toggleTheme();
  }

  function handleLogout() {
    setToken();
    navigate('/', { replace: true });
  }
  return (
    <header className="sticky top-0 w-full">
      <nav className="py-1.5 px-8">
        <ul className="w-4/6 mx-auto flex flex-row items-center justify-between text-xl">
          <li className="ml-5 py-3.5 px-4">
            <MemoizedNavLink to="/" className="navbar__logo">
              <img src={Logo} className="h-12" alt="Logo" />
            </MemoizedNavLink>
          </li>
          <li className="ml-5 py-3.5 px-4">
            <MemoizedNavLink to="/" className="navbar__link">
              <MemoizedFontAwesomeIcon icon={faHome} className="mr-2" />
              Accueil
            </MemoizedNavLink>
          </li>
          <li className="ml-5 py-3.5 px-4">
            <MemoizedNavLink to="/about" className="navbar__link">
              <MemoizedFontAwesomeIcon icon={faUser} className="mr-2" />A propos
            </MemoizedNavLink>
          </li>
          <li className="ml-5 py-3.5 px-4">
            <MemoizedNavLink to="/projects" className="navbar__link">
              <MemoizedFontAwesomeIcon icon={faClipboard} className="mr-2" />
              Projets
            </MemoizedNavLink>
          </li>
          {token && (
            <li className="ml-5 py-3.5 px-4">
              <MemoizedNavLink to="/account" className="navbar__link">
                <MemoizedFontAwesomeIcon icon={faAddressCard} className="mr-2" />
              </MemoizedNavLink>
            </li>
          )}
          <li className="ml-5 py-3.5 px-4">
            {token ? (
              <button onClick={handleLogout}>
                <MemoizedFontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
              </button>
            ) : (
              <MemoizedNavLink to="/login" className="navbar__link">
                <MemoizedFontAwesomeIcon icon={faRightToBracket} className="mr-2" />
              </MemoizedNavLink>
            )}
          </li>
          <li className="ml-5 py-3.5 px-4">
            <button onClick={handleToggle}>
              <MemoizedFontAwesomeIcon icon={theme ? moonIcon : sunIcon} className="mr-2" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
