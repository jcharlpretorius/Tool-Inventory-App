import React, { useEffect } from 'react';
import useRedirectLoggedOutEmployee from '../../customHooks/useRedirectLoggedOutEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import RecentSalesList from '../../components/sales/salesList/RecentSalesList';
import { getRecentSales } from '../../redux/features/sales/salesSlice';

const RecentSales = () => {
  useRedirectLoggedOutEmployee('/'); // redirect logged out employees to the home page
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  // destruct redux states
  const { recentSales, isError, isLoading, message } = useSelector(
    (state) => state.sales
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getRecentSales());
      console.log(`In recentSales : ${JSON.stringify(recentSales)}`);
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <h2>Recent Sales</h2>
      <RecentSalesList recentSales={recentSales} isLoading={isLoading} />
    </div>
  );
};

export default RecentSales;
