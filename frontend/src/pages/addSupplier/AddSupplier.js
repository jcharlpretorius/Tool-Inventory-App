import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createSupplier,
  selectIsLoadingSupplier,
} from '../../redux/features/supplier/supplierSlice';
import SupplierForm from '../../components/supplier/supplierForm/SupplierForm';
import Loader from '../../components/loader/Loader';
import useRedirectIncorrectRoleEmployee from '../../customHooks/useRedirectIncorrectRoleEmployee';
import { toast } from 'react-toastify';

const initialState = {
  supplierId: '',
  name: '',
  phoneNumber: '',
  address: '',
  email: '',
};

const AddSupplier = ({ allowedRole }) => {
  useRedirectIncorrectRoleEmployee(allowedRole, '/inventory');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [supplier, setSupplier] = useState(initialState);
  const isLoading = useSelector(selectIsLoadingSupplier);

  // destructure the initial state
  const { supplierId, suppliers, name, phoneNumber, address, email } = supplier;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const saveSupplier = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      phoneNumber,
      address,
      email,
      supplierId,
    };
    // console.log('in saveSupplier');
    // console.log(`supplierId: ${supplierId}`);
    // console.log(`name: ${name}`);
    // console.log(`phoneNumber: ${phoneNumber}`);
    // console.log(`address: ${address}`);
    // console.log(`email: ${email}`);
    // check if already exists
    // let found = false;
    // if (suppliers) {
    //   found = suppliers.some((el) => el.supplierId === supplierId);
    // }
    // if (found) {
    //   toast.error('Supplier ID already exists');
    //   return;
    // }
    // console.log(`found? ${found}`);
    console.log(`suppliers: ${JSON.stringify(suppliers)}`);
    await dispatch(createSupplier(formData));

    // send the employee back to the supplier page
    navigate('/supplier');
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Supplier</h3>
      <SupplierForm
        supplier={supplier}
        handleInputChange={handleInputChange}
        saveSupplier={saveSupplier}
      />
    </div>
  );
};

export default AddSupplier;
