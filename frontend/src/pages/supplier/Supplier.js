import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getSuppliers } from '../../redux/features/supplier/supplierSlice';
import SupplierList from '../../components/supplier/supplierList/SupplierList';
import useRedirectIncorrectRoleEmployee from '../../customHooks/useRedirectIncorrectRoleEmployee';

const Supplier = ({ allowedRole }) => {
  useRedirectIncorrectRoleEmployee(allowedRole, '/inventory');

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  // destruct redux states
  const { suppliers, isLoading, isError, message } = useSelector(
    (state) => state.supplier
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSuppliers());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      {/* <h2>Suppliers</h2> */}
      <SupplierList suppliers={suppliers} isLoading={isLoading} />
    </div>
  );
};

export default Supplier;
