import React, { useEffect } from 'react';
import './CustomerDetail.scss';
import { useDispatch, useSelector } from 'react-redux';
import useRedirectLoggedOutEmployee from '../../../customHooks/useRedirectLoggedOutEmployee';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomer } from '../../../redux/features/customer/customerSlice';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import Card from '../../card/Card';
import { SpinnerImg } from '../../loader/Loader';

const CustomerDetail = () => {
  useRedirectLoggedOutEmployee('/'); // redirect logged out employees to the home page
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams(); // get the customer id from the http parameters
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // deconstruct state
  const { customer, isLoading, isError, message } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getCustomer(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <div className="customer-detail">
        <h3 className="--mt">Customer Information</h3>
        <Card cardClass="card">
          {isLoading && <SpinnerImg />}
          {customer && (
            <div className="detail">
              <h4>
                Name: {customer.firstName}&nbsp;{customer.minit}
                {customer.minit ? '.' : <></>}
                &nbsp;{customer.lastName}
              </h4>
              <hr />
              <p>
                <b>Customer ID: </b> {customer.customerId}
              </p>
              <p>
                <b>Email: </b> {customer.email}
              </p>
              <p>
                <b>Address: </b> {customer.address}
              </p>
              <div className="--my --flex-between --flex-dir-column">
                <button
                  onClickCapture={() => {
                    navigate(`/edit-customer/${id}`);
                  }}
                  className="--btn --btn-primary"
                >
                  Edit Customer Info
                </button>
                <button
                  onClickCapture={() => {
                    navigate('/customer');
                  }}
                  className="--btn --btn-primary"
                >
                  Back to Customers
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CustomerDetail;
