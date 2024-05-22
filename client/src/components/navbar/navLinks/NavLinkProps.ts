import { NavLink } from '../../../interfaces/NavLink';

export interface NavLinkProps {
  navLink: NavLink;
  color: string;
  handleCloseMenu?(): void;
}
