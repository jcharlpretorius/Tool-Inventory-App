import { useLocation, useNavigate, Navigate, Outlet } from 'react-router-dom';
import {
  selectIsLoggedIn,
  selectEmployeeRole,
} from '../../redux/features/auth/authSlice';
import Sidebar from '../sidebar/Sidebar';
import Layout from '../layout/Layout';
import { useSelector } from 'react-redux';

const RequireAuth = ({ allowedRoles }) => {
  // const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const role = useSelector(selectEmployeeRole);

  return (
    // Chained ternary monstrosity
    isLoggedIn && allowedRoles.includes(role) ? (
      <Outlet />
    ) : isLoggedIn ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
    // instead of navigating away, maybe go back and display a toast error?
  );
};

export default RequireAuth;
