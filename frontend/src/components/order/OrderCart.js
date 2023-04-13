import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  LOAD_ORDER_CART,
  REMOVE_ORDER_ITEM,
  CLEAR_ORDER_CART,
  INCREMENT_ORDER_QUANTITY,
  DECREMENT_ORDER_QUANTITY,
  SET_ORDER_TOTAL,
  selectItems,
  selectTotal,
  makeOrder,
} from '../../redux/features/orderCart/orderCartSlice';
import { ImEye } from 'react-icons/im';
import { BsTrash, BsCartPlus } from 'react-icons/bs';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for confirm delete
import { SpinnerImg } from '../loader/Loader';
import Loader from '../../components/loader/Loader';
import './OrderCart.scss';
import useRedirectLoggedOutEmployee from '../../customHooks/useRedirectLoggedOutEmployee';
import { selectEmployeeId } from '../../redux/features/auth/authSlice';
import useRedirectIncorrectRoleEmployee from '../../customHooks/useRedirectIncorrectRoleEmployee';

const OrderCart = ({ allowedRole }) => {
  useRedirectIncorrectRoleEmployee(allowedRole, '/inventory');
  useRedirectLoggedOutEmployee('/');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states:
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItemsQty, setTotalItemsQty] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const employeeId = useSelector(selectEmployeeId);

  // Used to shorten long strings such as tool name
  const shortenText = (text, n) => {
    if (text !== undefined && text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  const handleRemoveItem = (itemId) => {
    dispatch(REMOVE_ORDER_ITEM(itemId));
  };

  const handleClearCart = () => {
    dispatch(CLEAR_ORDER_CART());
  };

  const handleIncrementQuantity = (itemId) => {
    dispatch(INCREMENT_ORDER_QUANTITY(itemId));
  };
  const handleDecrementQuantity = (itemId) => {
    dispatch(DECREMENT_ORDER_QUANTITY(itemId));
  };

  const placeOrder = async () => {
    setIsLoading(true);

    // complete order
    const formData = {
      employeeId,
      total: totalPrice,
      items,
    };
    console.log(`formdata: ${JSON.stringify(formData)}`);

    // send the form data to the backend
    await dispatch(makeOrder(formData));

    // clear cart
    dispatch(CLEAR_ORDER_CART());
    setIsLoading(false);

    // redirect the employee back to the inventory page
    navigate('/inventory');
  };

  const confirmClearOrder = () => {
    confirmAlert({
      title: 'Confirm  Clear Order ',
      message: 'Are you sure you want to clear the order?',
      buttons: [
        {
          label: 'Clear order',
          onClick: () => handleClearCart(),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  useEffect(() => {
    let itemCount = 0;
    let price = 0;

    items.forEach((item) => {
      itemCount += item.cartQty;
      price += item.cartQty * item.price;
    });

    setTotalItemsQty(itemCount);
    setTotalPrice(price);
  }, [items, totalItemsQty, totalPrice, setTotalItemsQty, setTotalPrice]);

  return (
    <div>
      {isLoading && <Loader />}
      <div className="order-cart">
        <hr />
        <div className="table">
          <div className="--flex-between --flex-dir-column">
            <span>
              <h3>Order</h3>
            </span>
            <div className="--flex-between --flex-dir-column">
              <span>
                <button
                  className="--btn --btn-action"
                  onClick={() => confirmClearOrder()}
                >
                  Clear Order
                </button>
              </span>
              <span className="cartValues">
                <b>Total Items: </b> {totalItemsQty} &nbsp;
              </span>
              <span className="cartValues">
                <b>Total Retail Value: </b> {totalPrice} &nbsp;
              </span>
              <span>
                <button
                  className="--btn --btn-success"
                  onClick={() => placeOrder()}
                >
                  Place Order
                </button>
                {/* <a href="/checkout">
                <button className="--btn --btn-success">Check Out</button>
              </a> */}
              </span>
            </div>
          </div>
          <div className="table">
            {items === undefined ? (
              <p>-- No tools have been added to the cart --</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Tool ID</th>
                    <th>Supplier ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Order Quantity</th>
                    <th>Retail Value</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((tool) => {
                    const {
                      toolId,
                      price,
                      toolType,
                      quantity,
                      name,
                      supplierId,
                    } = tool;
                    return (
                      <tr key={toolId}>
                        <td>{toolId}</td>
                        <td>{supplierId}</td>
                        <td>{shortenText(name, 20)}</td>
                        {/* <td>{name}</td> */}
                        <td>{toolType}</td>
                        <span>
                          <button
                            className="--btn-qty"
                            onClick={() => handleDecrementQuantity(toolId)}
                          >
                            -
                          </button>
                          <td>{tool.cartQty}</td>
                          <button
                            className="--btn-qty"
                            onClick={() => handleIncrementQuantity(toolId)}
                          >
                            +
                          </button>
                        </span>
                        <td>
                          {'$'}
                          {tool.cartQty * price}
                        </td>
                        <td className="icons">
                          <span className="eye">
                            <Link to={`/tool-details/${toolId}`}>
                              <ImEye size={25} color={'#0099ff'} />
                            </Link>
                          </span>
                          <span className="delete">
                            <AiOutlineMinusCircle
                              size={23}
                              color={'#cc2900'}
                              onClick={() => handleRemoveItem(toolId)}
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
    </div>
  );
};

export default OrderCart;
