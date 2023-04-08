import React, { useEffect } from 'react';
import useRedirectLoggedOutEmployee from '../../customHooks/useRedirectLoggedOutEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import SalesList from '../../components/sales/salesList/SalesList';
import { getTools } from '../../redux/features/tool/toolSlice';

const Sales = () => {
  useRedirectLoggedOutEmployee('/'); // redirect logged out employees to the home page
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  // destruct redux states
  const { tools, isLoading, isError, message } = useSelector(
    (state) => state.tool
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getTools());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <h2>Sales</h2>
      <SalesList tools={tools} isLoading={isLoading} />
    </div>
  );
};

export default Sales;
