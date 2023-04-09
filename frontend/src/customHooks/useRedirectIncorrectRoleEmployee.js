import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getLoginStatus } from '../services/authService';
import {
  SET_LOGIN,
  selectEmployeeRole,
} from '../redux/features/auth/authSlice';

/* 
 Custom React Hook to redirect the employee if they do not have the correct role
 I am fully aware that this is a stupid way of doing role based routing
 Also, that name is very long
*/

const useRedirectIncorrectRoleEmployee = (allowedRole, path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // get their role
  const role = useSelector(selectEmployeeRole);

  useEffect(() => {
    const redirectIncorrectRoleEmployee = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      // when the employee is not logged in, redirect them
      if (!isLoggedIn) {
        toast.info('Session expired, please login.');
        navigate(path);
        return;
      }

      if (role !== allowedRole) {
        toast.warning(`Unauthorized! ${allowedRole} access only.`);
        navigate(path);
        return;
      }
    };
    // call the use effect function
    redirectIncorrectRoleEmployee();
  }, [navigate, path, dispatch]);
};

export default useRedirectIncorrectRoleEmployee;
