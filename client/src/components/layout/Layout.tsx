import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { LayoutProps } from './LayoutProps';

function Layout({ children }: LayoutProps) {
  return (
    <Container maxWidth="xl">
      <Navbar />
      {children || <Outlet />}
    </Container>
  );
}

export default Layout;
