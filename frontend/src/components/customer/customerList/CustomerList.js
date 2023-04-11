import './CustomerList.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FILTER_CUSTOMERS,
  selectFilderedCustomers,
} from '../../../redux/features/customer/customerFilterSlice';
import { SpinnerImg } from '../../loader/Loader';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { ImEye } from 'react-icons/im';
import { BsTrash, BsCartPlus } from 'react-icons/bs';
import { MdLocalShipping } from 'react-icons/md';
import Search from '../../search/Search';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for confirm delete
import {
  deleteCustomer,
  getCustomers,
} from '../../../redux/features/customer/customerSlice';
import { Link } from 'react-router-dom';

const CustomerList = ({ customers, isLoading }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const filteredCustomers = useSelector(selectFilderedCustomers);

  // Used to shorten long strings
  const shortenText = (text, n) => {
    if (text !== undefined && text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  const delCust = async (id) => {
    // to call an action in redux we have to dispatch it
    // console.log(`Delete CustomerId: ${id}`);
    await dispatch(deleteCustomer(id));
    await dispatch(getCustomers()); // refresh the customers displayed on the page
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Confirm  Delete ',
      message: 'Are you sure you want to delete this customer?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delCust(id),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  // use effect that get triggered on mount and everytime the search changes
  useEffect(() => {
    dispatch(FILTER_CUSTOMERS({ customers, search }));
  }, [customers, search, dispatch]);

  return (
    <div className="customer-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h2>Customers</h2>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
        {isLoading && <SpinnerImg />}
        <div className="table">
          {!isLoading && customers.length === 0 ? (
            <p>-- No customers found --</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>First Name</th>
                  <th>Init.</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* map through the filtered customer */}
                {filteredCustomers.map((customer) => {
                  const {
                    customerId,
                    firstName,
                    minit,
                    lastName,
                    address,
                    email,
                  } = customer;
                  return (
                    <tr key={customerId}>
                      <td>{customerId}</td>
                      <td>{shortenText(firstName, 20)}</td>
                      <td>{minit}</td>
                      <td>{shortenText(lastName, 20)}</td>
                      <td>{shortenText(address, 20)}</td>
                      <td>{shortenText(email, 40)}</td>
                      {/* Actions */}
                      <td className="icons">
                        <span className="eye">
                          <Link to={`/customer-details/${customerId}`}>
                            <ImEye size={25} color={'#0099ff'} />
                          </Link>
                        </span>
                        <span className="edit">
                          <Link to={`/edit-customer/${customerId}`}>
                            <FaEdit size={22} color={'#00cc00'} />
                          </Link>
                        </span>
                        {/* Only managers should see delete a customer*/}
                        <span className="delete">
                          <BsTrash
                            size={23}
                            color={'#cc2900'}
                            onClick={() => confirmDelete(customerId)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
