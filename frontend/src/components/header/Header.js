import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  SET_LOGIN,
  selectFirstName,
} from '../../redux/features/auth/authSlice';
import { logoutEmployee } from '../../services/authService';

const Header = () => {
  // create variables to use in logout
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstName = useSelector(selectFirstName);

  // logout function
  const logout = async () => {
    await logoutEmployee();
    await dispatch(SET_LOGIN(false));

    // clear local storage:
    // localStorage.removeItem('firstName');
    // localStorage.removeItem('employeeId');
    // localStorage.removeItem('role');
    navigate('/'); // redirect to the home page
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome,&nbsp;&nbsp;</span>
          <span className="--color-action --fw-bold">{firstName}</span>
        </h3>
        <button className="--btn --btn-action" onClick={logout}>
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
