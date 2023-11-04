import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '../common/button/button';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import UserAuthMenu from './user_auth_menu';
import { useAppDispatch } from '../../hooks/store';
import { logout } from '../../redux/auth/authSlice';
import logoImg from '../../assets/logo.png';
import styles from './navbar.module.scss';

const pages: Array<{ label: string; path: string }> = [
  { label: 'Home', path: '/' },
  { label: 'Reports', path: '/reports' },
];

function Navbar() {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavItemChange = (path: string) => {
    navigate(path);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static" className={styles.appbar} elevation={0}>
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <Toolbar disableGutters>
          <Box
            href="/"
            component="a"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <img src={logoImg} alt="Logo" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon color="primary" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ label, path }) => (
                <MenuItem key={label} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => handleNavItemChange(path)}
                  >
                    {label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            href="/"
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            <img src={logoImg} alt="Logo" />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            {pages.map(({ label, path }) => (
              <Box key={path}>
                <Button
                  key={label}
                  className={`${styles.nav_item}`}
                  variant="text"
                  text={label}
                  onClick={() => handleNavItemChange(path)}
                />
              </Box>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <UserAuthMenu
              auth={auth}
              anchorElUser={anchorElUser}
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
              handleLogout={handleLogout}
              handleLogin={handleLogin}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
