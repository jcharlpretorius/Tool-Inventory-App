import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  LOAD_CART,
  REMOVE_ITEM,
  CLEAR_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  selectItems,
  selectTotal,
  SET_TOTAL,
} from '../../redux/features/cart/cartSlice';
import { ImEye } from 'react-icons/im';
import { BsTrash, BsCartPlus } from 'react-icons/bs';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for confirm delete
import { SpinnerImg } from '../loader/Loader';
import './Cart.scss';
import useRedirectLoggedOutEmployee from '../../customHooks/useRedirectLoggedOutEmployee';
import useRedirectIncorrectRoleEmployee from '../../customHooks/useRedirectIncorrectRoleEmployee';

const Cart = ({ allowedRole }) => {
  // useRedirectLoggedOutEmployee('/');
  useRedirectIncorrectRoleEmployee(allowedRole, '/inventory');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItemsQty, setTotalItemsQty] = useState(0);

  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  // Used to shorten long strings such as tool name
  const shortenText = (text, n) => {
    if (text !== undefined && text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  const handleRemoveItem = (itemId) => {
    dispatch(REMOVE_ITEM(itemId));
  };

  const handleClearCart = () => {
    dispatch(CLEAR_CART());
  };

  const handleIncrementQuantity = (itemId) => {
    dispatch(INCREMENT_QUANTITY(itemId));
  };
  const handleDecrementQuantity = (itemId) => {
    dispatch(DECREMENT_QUANTITY(itemId));
  };

  const checkout = () => {
    // e.preventDefault();
    dispatch(SET_TOTAL(totalPrice));
    navigate('/checkout');
  };

  const confirmClearCart = () => {
    confirmAlert({
      title: 'Confirm  Clear Cart ',
      message: 'Are you sure you want to clear the cart?',
      buttons: [
        {
          label: 'Clear Cart',
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
    // console.log(`total ${total}`);

    setTotalItemsQty(itemCount);
    setTotalPrice(price);
  }, [items, totalItemsQty, totalPrice, setTotalItemsQty, setTotalPrice]);

  return (
    <div className="cart">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Cart</h3>
          </span>
          <div className="--flex-between --flex-dir-column">
            <span>
              <button
                className="--btn --btn-action"
                onClick={() => confirmClearCart()}
              >
                Clear Cart
              </button>
            </span>
            <span className="cartValues">
              <b>Total Items: </b> {totalItemsQty} &nbsp;
            </span>
            <span className="cartValues">
              <b>Total Price: </b> {totalPrice} &nbsp;
            </span>
            <span>
              <button
                className="--btn --btn-success"
                onClick={() => checkout()}
              >
                Check Out
              </button>
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
                  <th>Name</th>
                  <th>Type</th>
                  <th>Cart quantity</th>
                  <th>Price</th>
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
                      {/* <td>{shortenText(name, 20)}</td> */}
                      <td>{name}</td>
                      <td>{toolType}</td>
                      {/* <td>{supplierId}</td> */}
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
                          <MdOutlineRemoveShoppingCart
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
  );
};

export default Cart;
