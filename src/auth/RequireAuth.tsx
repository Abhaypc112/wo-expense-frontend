import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

/** Wraps protected routes: unauthenticated users are sent to /login. */
export function RequireAuth() {
  const { session } = useAuth();
  const location = useLocation();
  return session ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}

/** Wraps login/register: signed-in users are sent to the app. */
export function GuestOnly() {
  const { session } = useAuth();
  return session ? <Navigate to="/" replace /> : <Outlet />;
}
