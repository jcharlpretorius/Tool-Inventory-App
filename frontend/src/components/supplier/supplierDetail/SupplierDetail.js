import React, { useEffect } from 'react';
import './SupplierDetail.scss';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import { getSupplier } from '../../../redux/features/supplier/supplierSlice';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import Card from '../../card/Card';
import { SpinnerImg } from '../../loader/Loader';
import useRedirectIncorrectRoleEmployee from '../../../customHooks/useRedirectIncorrectRoleEmployee';

const SupplierDetail = ({ allowedRole }) => {
  useRedirectIncorrectRoleEmployee(allowedRole, '/inventory');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // deconstruct state
  const { supplier, isLoading, isError, message } = useSelector(
    (state) => state.supplier
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSupplier(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <div className="supplier-detail">
        <h3 className="--mt">Supplier Information</h3>
        <Card cardClass="card">
          {isLoading && <SpinnerImg />}
          {supplier && (
            <div className="detail">
              <h4>{supplier.name}</h4>
              <hr />
              <p>
                <b>Supplier ID: </b> {supplier.supplierId}
              </p>
              <p>
                <b>Phone Number: </b> {supplier.phoneNumber}
              </p>
              <p>
                <b>Address: </b> {supplier.address}
              </p>
              <p>
                <b>Email: </b> {supplier.email}
              </p>
              <div className="--my --flex-between --flex-dir-column">
                <button
                  onClickCapture={() => {
                    navigate(`/edit-supplier/${id}`);
                  }}
                  className="--btn --btn-primary"
                >
                  Edit Supplier Info
                </button>
                <button
                  onClickCapture={() => {
                    navigate('/supplier');
                  }}
                  className="--btn --btn-primary"
                >
                  Back to Suppliers
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SupplierDetail;
