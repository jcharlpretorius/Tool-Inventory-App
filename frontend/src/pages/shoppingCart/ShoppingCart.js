import React, { useEffect } from 'react';
import useRedirectLoggedOutEmployee from '../../customHooks/useRedirectLoggedOutEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import Cart from '../../components/cart/Cart';
// import ToolList from '../../components/tool/toolList/ToolList';
// import { getTools } from '../../redux/features/tool/toolSlice';import {
import {
  REMOVE_ITEM,
  CLEAR_CART,
  selectItems,
  selectTotal,
} from '../../redux/features/cart/cartSlice';
import Loader from '../../components/loader/Loader';

const ShoppingCart = () => {
  useRedirectLoggedOutEmployee('/inventory');
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const items = useSelector(selectItems);
  // const total = useSelector(selectTotal);

  // console.log(`items in shopping cart: ${items}`);

  // destruct redux states
  // const { tools, isLoading, isError, message } = useSelector(
  //   (state) => state.tool
  // );

  // useEffect(() => {
  //   if (isLoggedIn === true) {
  //     dispatch();
  //   }
  // }, [isLoggedIn, items, dispatch]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {/* items={items} total={total} was in cart below */}
      <Cart />
    </div>
  );
};

export default ShoppingCart;
