import { MenuItem, Typography } from '@mui/material';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styles from './NavLink.module.css';
import { NavLinkProps } from './NavLinkProps';

function NavLink({ navLink, color, handleCloseMenu }: NavLinkProps) {
  return (
    <MenuItem onClick={handleCloseMenu}>
      <RouterNavLink to={navLink.URL} className={styles.link}>
        {({ isActive }) => (
          <Typography
            textAlign="center"
            sx={{ color }}
            className={isActive ? styles.active : ''}
          >
            {navLink.name}
          </Typography>
        )}
      </RouterNavLink>
    </MenuItem>
  );
}

export default NavLink;
