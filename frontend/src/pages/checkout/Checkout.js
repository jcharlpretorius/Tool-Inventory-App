// import store from '../../redux/store'; // maybe remove this?
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';

import {
  CLEAR_CART,
  makePurchase,
  selectItems,
  selectTotal,
} from '../../redux/features/cart/cartSlice';
import CheckOutForm from '../../components/checkout/CheckoutForm';
import {
  SET_EMPLOYEE,
  SET_FIRSTNAME,
  selectEmployee,
  selectEmployeeId,
  selectFirstName,
} from '../../redux/features/auth/authSlice';
import {
  getCustomerByEmail,
  getCustomers,
  selectCustomers,
} from '../../redux/features/customer/customerSlice';
import useRedirectLoggedOutEmployee from '../../customHooks/useRedirectLoggedOutEmployee';
import { getLoggedInEmployee } from '../../services/authService';

import { toast } from 'react-toastify';
// import { getCustomerByEmail } from '../../redux/features/customer/customerService';

const Checkout = () => {
  useRedirectLoggedOutEmployee('/');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States
  const [isLoading, setIsLoading] = useState(false);
  const customers = useSelector(selectCustomers);
  // const customers =
  // const [cart, setcart] = useState(initialState);

  // employee state
  // const employee = useSelector(selectEmployee);
  const employeeId = useSelector(selectEmployeeId);
  const employeeFirstName = useSelector(selectFirstName);

  // get customer from state
  // const customer = useSelector(selectCustomer);

  // destructure cart state
  const { items, total, paymentType } = useSelector((state) => state.cart);

  const initialState = {
    paymentType: paymentType ? paymentType : 'credit',
    email: '',
    customerId: '',
    // customerId: customerId ? customerId : '',
  };

  const [customerCheckout, setCustomerCheckout] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerCheckout({
      ...customerCheckout,
      [name]: value,
    });
  };

  // Use the customer's email to find their id, then make the purchase to the database
  const confirmPayment = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      // find customer ID
      const index = customers.findIndex(
        (cust) => cust.email === customerCheckout.email.trim()
      );
      let customerId;
      if (index > -1) {
        // if -1, then findIndex failed to find customer in the list
        customerId = customers[index].customerId;
      } else {
        toast.error(`Email not found. Please register customer.`);
        setIsLoading(false);
        return;
      }
      // for debugging:
      // console.log(`customerEmail: ${customerCheckout.email}`);
      // console.log(`payment type: ${customerCheckout.paymentType}`);
      // console.log(`total: ${total}`);
      // console.log(`employeeId: ${employeeId}`);
      // console.log(`customerID: ${customerId}`);

      // complete purchase
      const formData = {
        employeeId,
        customerId,
        paymentType: customerCheckout.paymentType,
        total,
        items,
      };
      console.log(`formdata: ${JSON.stringify(formData)}`);

      // send the form data to the backend
      await dispatch(makePurchase(formData));

      // clear cart
      dispatch(CLEAR_CART());
      setIsLoading(false);
      // redirect the employee back to the inventory page
      navigate('/inventory');
    } catch (error) {
      console.log('Error in confirmPayment');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // load the customers whe the page loads
    dispatch(getCustomers());
  }, []);

  return (
    <div>
      {isLoading && <Loader />}

      <h3 className="--mt">Checkout</h3>
      <CheckOutForm
        items={items}
        total={total}
        employeeId={employeeId}
        // customer={customer}
        handleInputChange={handleInputChange}
        confirmPayment={confirmPayment}
        // tool={tool}
        // description={description}
        // setDescription={setDescription}
        // saveTool={saveTool}
      />
    </div>
  );
};

export default Checkout;
