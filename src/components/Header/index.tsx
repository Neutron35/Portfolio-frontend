import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import {
  faAddressCard,
  faClipboard,
  faHome,
  faMoon,
  faRightFromBracket,
  faRightToBracket,
  faSun,
  faUser,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from '../ui/switch';
import logoImg from '../../assets/neutron.png';
import { useAuth } from '@/lib/authProvider';
import { useTheme } from '@/lib/themeProvider';

function Header() {
  const { darkTheme, setDarkTheme } = useTheme();

  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  function handleToggle() {
    setDarkTheme(!darkTheme);
  }

  function handleLogout() {
    setToken(null);
    navigate('/', { replace: true });
  }

  return (
    <header className="sticky top-0 mx-auto flex items-center justify-center space-x-4 text-xl">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="mr-8 px-4 py-3.5">
            <NavLink to="/">
              <img src={logoImg} className="h-12" alt="Logo Neutron" />
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-4 py-3.5">
            <NavLink to="/">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Accueil
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-4 py-3.5">
            <NavLink to="/projects">
              <FontAwesomeIcon icon={faClipboard} className="mr-2" />
              Projets
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-4 py-3.5">
            <NavLink to="/about">
              <FontAwesomeIcon icon={faAddressCard} className="mr-2" />A propos
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-4 py-3.5">
            {!token ? (
              <NavLink to="/login" className="ml-8">
                <FontAwesomeIcon icon={faRightToBracket} />
              </NavLink>
            ) : (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="cursor-pointer px-4 py-3.5">
                    <FontAwesomeIcon icon={faUser} className="ml-8 text-xl" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="font-display">
                    <DropdownMenuItem>
                      <NavLink to="/account">
                        <FontAwesomeIcon icon={faUserGear} className="pr-3" />
                        Mon compte
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} className="pr-3" />
                        Se déconnecter
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="absolute right-5">
        <FontAwesomeIcon icon={faSun} />
        <Switch onClick={handleToggle} checked={darkTheme} className="mx-2" />
        <FontAwesomeIcon icon={faMoon} />
      </div>
    </header>
  );
}

export default Header;
