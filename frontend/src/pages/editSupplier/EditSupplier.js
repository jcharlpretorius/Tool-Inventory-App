import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getSupplier,
  getSuppliers,
  selectSupplier,
  selectIsLoadingSupplier,
  updateSupplier,
} from '../../redux/features/supplier/supplierSlice';
import SupplierEditForm from '../../components/supplier/supplierForm/SupplierEditForm';
import useRedirectIncorrectRoleEmployee from '../../customHooks/useRedirectIncorrectRoleEmployee';

const EditSupplier = ({ allowedRole }) => {
  useRedirectIncorrectRoleEmployee(allowedRole, '/inventory');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // States
  const supplierEdit = useSelector(selectSupplier);
  const isLoading = useSelector(selectIsLoadingSupplier);
  const [supplier, setSupplier] = useState(supplierEdit);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  useEffect(() => {
    dispatch(getSupplier(id)); // get supplier from the backend
  }, [dispatch, id]);

  useEffect(() => {
    setSupplier(supplierEdit); // set the supplier to supplierEdit, for if employee refreshed the page
  }, [supplierEdit]);

  const saveSupplier = async (e) => {
    e.preventDefault();
    // Note absence of toolId and supplierId. You are not allowed to change those
    const formData = {
      name: supplier?.name,
      phoneNumber: supplier?.phoneNumber,
      address: supplier?.address,
      email: supplier?.email,
    };
    console.log('in saveSupplier');
    console.log(`formData: ${JSON.stringify(formData)}`);

    await dispatch(updateSupplier({ supplierId: id, formData }));
    await dispatch(getSuppliers());

    navigate('/supplier'); // redirect the employee back to the supplier page
  };
  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Supplier Information</h3>
      <SupplierEditForm
        supplier={supplier}
        saveSupplier={saveSupplier}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default EditSupplier;
