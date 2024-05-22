export interface AlertProps {
  title?: string;
  content?: string;
  handleCloseAlert?: () => void;
  handleAccept?: () => void;
}
