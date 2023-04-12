import React, { useState } from 'react';
import CustomerForm from '../../components/customer/customerForm/CustomerForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createCustomer,
  selectIsLoadingCustomer,
} from '../../redux/features/customer/customerSlice';
import Loader from '../../components/loader/Loader';
import useRedirectIncorrectRoleEmployee from '../../customHooks/useRedirectIncorrectRoleEmployee';
import useRedirectLoggedOutEmployee from '../../customHooks/useRedirectLoggedOutEmployee';

const initialState = {
  firstName: '',
  minit: '',
  lastName: '',
  address: '',
  email: '',
};

const AddCustomer = () => {
  useRedirectLoggedOutEmployee('/');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [customer, setCustomer] = useState(initialState);
  const isLoading = useSelector(selectIsLoadingCustomer);

  // destructure the initial state
  const { firstName, minit, lastName, address, email } = customer;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const saveCustomer = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        firstName,
        minit,
        lastName,
        address,
        email,
      };

      await dispatch(createCustomer(formData));

      // send the employee back to the customer view
      navigate('/customer');
    } catch (error) {
      // toast.error(`Error adding customer.`);
      return;
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Customer</h3>
      <CustomerForm
        customer={customer}
        handleInputChange={handleInputChange}
        saveCustomer={saveCustomer}
      />
    </div>
  );
};

export default AddCustomer;
