import MenuIcon from '@mui/icons-material/Menu';
import TourIcon from '@mui/icons-material/Tour';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import NavLink from './navLinks/NavLink';

function Navbar() {
  const { loggedUser, logOut } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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

  const navLinks = loggedUser
    ? [
        {
          name: 'Home',
          URL: '/',
          id: 1,
        },
        {
          name: 'My posts',
          URL: `/${loggedUser.id}/posts`,
          id: 2,
        },
        {
          name: 'New post',
          URL: '/post/new',
          id: 3,
        },
      ]
    : [
        {
          name: 'Home',
          URL: '/',
          id: 1,
        },
        {
          name: 'Log in',
          URL: '/login',
          id: 2,
        },
        {
          name: 'Sign in',
          URL: '/register',
          id: 3,
        },
      ];
  console.log(loggedUser);

  return (
    <AppBar position="static" component="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TourIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Explorer&apos;s Heaven
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              {navLinks.map((navLink) => (
                <NavLink
                  key={navLink.id}
                  navLink={navLink}
                  handleCloseMenu={handleCloseNavMenu}
                  color="#1c1e21"
                />
              ))}
            </Menu>
          </Box>
          <TourIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Explorer&apos;s Heaven
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((navLink) => (
              <Button key={navLink.id} sx={{ my: 2 }}>
                <NavLink navLink={navLink} color="white" />
              </Button>
            ))}
          </Box>
          {loggedUser && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={loggedUser.name} src={loggedUser.image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {navLinks.map((navLink) => (
                  <NavLink
                    key={navLink.id}
                    navLink={navLink}
                    handleCloseMenu={handleCloseUserMenu}
                    color="#1c1e21"
                  />
                ))}
                <Button
                  variant="outlined"
                  fullWidth
                  color="error"
                  onClick={() => {
                    logOut();
                  }}
                >
                  Log out
                </Button>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
