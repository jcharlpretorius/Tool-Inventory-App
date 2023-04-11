import './ToolList.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FILTER_TOOLS,
  selectFilderedTools,
} from '../../../redux/features/tool/filterSlice';
import { SpinnerImg } from '../../loader/Loader';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { ImEye } from 'react-icons/im';
import { BsTrash, BsCartPlus, BsTruck } from 'react-icons/bs';
import { MdLocalShipping } from 'react-icons/md';
import Search from '../../search/Search';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for confirm delete
import { deleteTool, getTools } from '../../../redux/features/tool/toolSlice';
import { Link } from 'react-router-dom';
import { ADD_ITEM } from '../../../redux/features/cart/cartSlice';
import { toast } from 'react-toastify';
import { ADD_ORDER_ITEM } from '../../../redux/features/orderCart/orderCartSlice';

const ToolList = ({ tools, isLoading }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const filteredTools = useSelector(selectFilderedTools);

  // Used to shorten long strings such as tool name
  const shortenText = (text, n) => {
    if (text !== undefined && text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  const delTool = async (id) => {
    // to call an action in redux we have to dispatch it
    // console.log(`Delete ToolId: ${id}`);
    await dispatch(deleteTool(id));
    await dispatch(getTools()); // refresh the tools displayed on the page
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Confirm  Delete ',
      message: 'Are you sure you want to delete this tool?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delTool(id),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No'),
        },
      ],
    });
  };

  const addToCart = (tool) => {
    if (tool.quantity === 0) {
      toast.error(`${shortenText(tool.name, 20)} is out of stock`);
      return;
    }
    dispatch(ADD_ITEM(tool));
  };

  const addToOrder = (tool) => {
    dispatch(ADD_ORDER_ITEM(tool));
  };

  // triggered on mount and everytime the search changes
  useEffect(() => {
    dispatch(FILTER_TOOLS({ tools, search }));
  }, [tools, search, dispatch]);

  return (
    <div className="tool-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h2>Tools in Inventory</h2>
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
          {!isLoading && tools.length === 0 ? (
            <p>-- No tool found --</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Tool ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Supplier ID</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>Inventory Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* map through the filtered tools */}
                {filteredTools.map((tool) => {
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
                      <td>{shortenText(name, 20)}</td>
                      <td>{toolType}</td>
                      <td>{supplierId}</td>
                      <td>
                        {'$'}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {'$'}
                        {(quantity * price).toFixed(2)}
                      </td>
                      {/* Actions 
                        Managers should see add, delete, edit, and add to order
                        Sales associates should see view details (eye) and add to cart
                      */}

                      <td className="icons">
                        <span className="eye">
                          <Link to={`/tool-details/${toolId}`}>
                            <ImEye size={25} color={'#0099ff'} />
                          </Link>
                        </span>
                        <span className="edit">
                          <Link to={`/edit-tool/${toolId}`}>
                            <FaEdit size={22} color={'#00cc00'} />
                          </Link>
                        </span>
                        <span className="addCartBtn">
                          <BsCartPlus
                            size={23}
                            color={'#7a0099'}
                            onClick={() => addToCart(tool)}
                          />
                        </span>
                        {/* Actions below should only be available for managers */}
                        <span className="addOrderBtn">
                          <BsTruck
                            size={23}
                            color={'#000000'}
                            onClick={() => addToOrder(tool)}
                          />
                        </span>
                        <span className="delete">
                          <BsTrash
                            size={23}
                            color={'#cc2900'}
                            onClick={() => confirmDelete(toolId)}
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

export default ToolList;
