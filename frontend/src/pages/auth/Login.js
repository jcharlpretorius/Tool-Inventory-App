import React from 'react';
import styles from './auth.module.scss';
import { FiLogIn } from 'react-icons/fi';
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  // login must be asynchronous, because we wait for a response from backend
  const login = async (e) => {
    // prevent the default form behaviour, which is reloading the page
    e.preventDefault();

    // We are validating the data in both the front end and the backend
    if (!email || !password) {
      return toast.error('Please fill in all required fields');
    }
    // Display error if email address is invalid
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    //
    const employeeData = {
      email,
      password,
    };

    // to start the loading icon
    setIsLoading(true);
    try {
      const data = await loginUser(employeeData);
      // console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate('/dashboard');

      // to stop displaying the loading icon
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <FiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>

          <form>
            <input type="text" placeholder="Email" required name="email" />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
            />
            <button type="submit" className="--btn">
              Login
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
