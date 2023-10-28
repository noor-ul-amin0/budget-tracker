import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

export default function PublicRoute() {
  const auth = useAuth();
  const location = useLocation();

  return !auth.user ? (
    <Outlet />
  ) : (
    <Navigate to={location.state?.from || '/'} />
  );
}
