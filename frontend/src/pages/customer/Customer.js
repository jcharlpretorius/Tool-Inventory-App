import React, { useEffect } from 'react';
import useRedirectLoggedOutEmployee from '../../customHooks/useRedirectLoggedOutEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getCustomers } from '../../redux/features/customer/customerSlice';
import CustomerList from '../../components/customer/customerList/CustomerList';

const Customer = () => {
  useRedirectLoggedOutEmployee('/'); // redirect logged out employees to the home page
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  // destruct redux states
  const { customers, isLoading, isError, message } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getCustomers());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      {/* <h2>Customers</h2> */}
      <CustomerList customers={customers} isLoading={isLoading} />
    </div>
  );
};

export default Customer;
