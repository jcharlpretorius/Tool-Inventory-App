import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getLoginStatus } from '../services/authService';
import { SET_LOGIN } from '../redux/features/auth/authSlice';

/* 
 Custom React Hook to redirect the employee if they are not logged in 
*/

const useRedirectLoggedOutEmployee = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectLoggedOutEmployee = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      // when the employee is not logged in, redirect them
      if (!isLoggedIn) {
        toast.info('Session expired, please login.');
        navigate(path);
        return;
      }
    };
    // call the use effect function
    redirectLoggedOutEmployee();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutEmployee;
