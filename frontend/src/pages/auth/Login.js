import React, { useState } from 'react';
import styles from './auth.module.scss';
import { FiLogIn } from 'react-icons/fi';
import Card from '../../components/card/Card';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { SET_LOGIN, SET_FIRSTNAME } from '../../redux/features/auth/authSlice';
import { loginUser, validateEmail } from '../../services/authService';
import Loader from '../../components/loader/Loader';

// initially the employee is not logged in
const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch(); // redux hook, returns a ref to the dispatch funcion
  const navigate = useNavigate(); // lets you navigate programattically, maybe better to use 'redirect'?
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  // login must be asynchronous, because we wait for a response from backend
  const login = async (e) => {
    // prevent the default form behaviour, which is reloading the page after we submit
    e.preventDefault();
    // We are validating the data in both the front end and the backend
    if (!email || !password) {
      // toast is the notification displayed on the screen
      return toast.error('Please fill in all required fields');
    }
    // Display error if email address is invalid
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const employeeData = {
      email,
      password,
    };

    // to start the loading icon
    setIsLoading(true);
    try {
      const data = await loginUser(employeeData);
      await dispatch(SET_LOGIN(true)); // set login status to true
      await dispatch(SET_FIRSTNAME(data.firstName)); // set the firstName of the employee
      // maybe also set the employee ID
      navigate('/dashboard'); // redirect the employee to the dashboard page

      // to stop displaying the loading icon
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />} {/* Display the loader component */}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <FiLogIn size={35} color="#ccc" />
          </div>
          <h2>Login</h2>

          <form onSubmit={login}>
            <input
              type="text"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
