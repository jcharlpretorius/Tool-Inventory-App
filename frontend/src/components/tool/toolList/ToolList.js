import React from 'react';
import './ToolList.scss';
import { SpinnerImg } from '../../loader/Loader';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

const ToolList = ({ tools, isLoading }) => {
  // Used to shorten long strings such as tool name
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenText;
    }
    return text;
  };

  return (
    <div className="tool-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Tools in Inventory</h3>
          </span>
          <span>
            <h3>Search tools</h3>
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool, index) => {
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
                      <td>{index + 1}</td>
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
                        <span>
                          <AiOutlineEye size={25} color={'purple'} />
                        </span>
                        <span>
                          <FaEdit size={20} color={'green'} />
                        </span>
                        <span>
                          <BsTrash size={25} color={'red'} />
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
