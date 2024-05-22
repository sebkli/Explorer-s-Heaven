import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ProtectedRouteProps } from './ProtectedRouteProps';

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loggedUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser === undefined) {
      navigate('/login', { replace: true });
    }
  }, [navigate, loggedUser]);

  return children as JSX.Element;
}
