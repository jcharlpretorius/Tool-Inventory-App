import './ToolList.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FILTER_TOOLS,
  selectFilderedTools,
} from '../../../redux/features/tool/filterSlice';
import { SpinnerImg } from '../../loader/Loader';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import Search from '../../search/Search';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteTool, getTools } from '../../../redux/features/tool/toolSlice';

const ToolList = ({ tools, isLoading }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const filteredTools = useSelector(selectFilderedTools);

  // Used to shorten long strings such as tool name
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenText;
    }
    return text;
  };

  const delTool = async (id) => {
    // to call an action in redux we have to dispatch it
    console.log(`Delete ToolId: ${id}`);
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

  // use effect that get triggered everytime the search changes
  useEffect(() => {
    dispatch(FILTER_TOOLS({ tools, search }));
  }, [tools, search, dispatch]);

  return (
    <div className="tool-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Tools in Inventory</h3>
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
                  <th>Value</th>
                  <th>Manage Tools</th>
                </tr>
              </thead>
              <tbody>
                {/* map through the filtered tools */}
                {filteredTools.map((tool, index) => {
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
                        {quantity * price}
                      </td>
                      <td className="icons">
                        <span className="eye">
                          <AiOutlineEye size={25} color={'#0099ff'} />
                        </span>
                        <span className="edit">
                          <FaEdit size={22} color={'#00cc00'} />
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
