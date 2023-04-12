import './SupplierList.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FILTER_SUPPLIERS,
  selectFilderedSuppliers,
} from '../../../redux/features/supplier/supplierFilterSlice';
import { SpinnerImg } from '../../loader/Loader';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { ImEye } from 'react-icons/im';
import { BsTrash, BsCartPlus } from 'react-icons/bs';
import { MdLocalShipping } from 'react-icons/md';
import Search from '../../search/Search';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  deleteSupplier,
  getSuppliers,
} from '../../../redux/features/supplier/supplierSlice';
import { Link } from 'react-router-dom';

const CustomerList = ({ suppliers, isLoading }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  // const filteredSuppliers = useSelector(selectFilderedSuppliers);

  // Used to shorten long strings
  const shortenText = (text, n) => {
    if (text !== undefined && text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  const delSup = async (id) => {
    await dispatch(deleteSupplier(id));
    await dispatch(getSuppliers()); // refresh the suppliers displayed on the page
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Confirm  Delete ',
      message: 'Are you sure you want to delete this supplier?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delSup(id),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  // use effect that get triggered on mount and everytime the search changes
  // useEffect(() => {
  //   dispatch(FILTER_SUPPLIERS({ suppliers, search }));
  // }, [suppliers, search, dispatch]);

  return (
    <div className="customer-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h2>Suppliers</h2>
          </span>
          {/* <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span> */}
        </div>
        {isLoading && <SpinnerImg />}
        <div className="table">
          {!isLoading && suppliers.length === 0 ? (
            <p>-- No suppliers found --</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Supplier ID</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* map through the filtered suppliers */}
                {/* {filteredSuppliers.map((supplier) => { */}
                {suppliers.map((supplier) => {
                  const { supplierId, name, phoneNumber, address, email } =
                    supplier;
                  return (
                    <tr key={supplierId}>
                      <td>{supplierId}</td>
                      <td>{shortenText(name, 20)}</td>
                      <td>{phoneNumber}</td>
                      <td>{shortenText(address, 20)}</td>
                      <td>{shortenText(email, 35)}</td>
                      {/* Actions */}
                      <td className="icons">
                        <span className="eye">
                          <Link to={`/supplier-details/${supplierId}`}>
                            <ImEye size={25} color={'#0099ff'} />
                          </Link>
                        </span>
                        <span className="edit">
                          <Link to={`/edit-supplier/${supplierId}`}>
                            <FaEdit size={22} color={'#00cc00'} />
                          </Link>
                        </span>
                        {/* Only managers should see delete a supplier*/}
                        <span className="delete">
                          <BsTrash
                            size={23}
                            color={'#cc2900'}
                            onClick={() => confirmDelete(supplierId)}
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
