import React, { useEffect } from 'react';
import useRedirectLoggedOutEmployee from '../../customHooks/useRedirectLoggedOutEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import TopSalesList from '../../components/sales/salesList/TopSalesList';
import { getTopSalesMen } from '../../redux/features/sales/salesSlice';

const TopSales = () => {
  useRedirectLoggedOutEmployee('/'); // redirect logged out employees to the home page
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  // destruct redux states
  const { topSales, isError, isLoading, message } = useSelector(
    (state) => state.sales
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getTopSalesMen());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <h2>Top Sales Associates</h2>
      <TopSalesList topSales={topSales} isLoading={isLoading} />
    </div>
  );
};

export default TopSales;
