import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getCustomer,
  getCustomers,
  selectCustomer,
  selectIsLoadingCustomer,
  updateCustomer,
} from '../../redux/features/customer/customerSlice';
import CustomerEditForm from '../../components/customer/customerForm/CustomerEditForm';

const EditCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // States
  const customerEdit = useSelector(selectCustomer);
  const isLoading = useSelector(selectIsLoadingCustomer);
  const [customer, setCustomer] = useState(customerEdit);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  useEffect(() => {
    dispatch(getCustomer(id)); // get customer from the backend
  }, [dispatch, id]);

  useEffect(() => {
    setCustomer(customerEdit); // set the customer to customerEdit, for if employee refreshed the page
  }, [customerEdit]);

  const saveCustomer = async (e) => {
    e.preventDefault();
    // Note absence of toolId and supplierId. You are not allowed to change those
    const formData = {
      firstName: customer?.firstName,
      minit: customer?.minit,
      lastName: customer?.lastName,
      address: customer?.address,
      email: customer?.email,
    };

    await dispatch(updateCustomer({ customerId: id, formData }));
    await dispatch(getCustomers());

    navigate('/customer'); // redirect the employee back to the customer page
  };
  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Customer Information</h3>
      <CustomerEditForm
        customer={customer}
        saveCustomer={saveCustomer}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default EditCustomer;
