import React, { useState } from 'react';
import ToolForm from '../../components/tool/toolForm/ToolForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createTool,
  selectIsLoading,
} from '../../redux/features/tool/toolSlice';
import Loader from '../../components/loader/Loader';
import useRedirectIncorrectRoleEmployee from '../../customHooks/useRedirectIncorrectRoleEmployee';

const initialState = {
  toolId: '',
  price: '',
  toolType: '',
  quantity: '',
  name: '',
  supplierId: '',
};

const AddTool = ({ allowedRole }) => {
  useRedirectIncorrectRoleEmployee(allowedRole, '/inventory');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [tool, setTool] = useState(initialState);
  const [description, setDescription] = useState('');
  const isLoading = useSelector(selectIsLoading);

  // destructure the initial state
  const { toolId, price, toolType, quantity, name, supplierId } = tool;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTool({ ...tool, [name]: value });
  };

  // -> maybe replace INT tool id with sku?, then remove toolID form, also add description
  // generate a sku number for our tool
  // const generateSKU = (toolType) => {
  //   // get the first 4 letters of the tool type
  //   const letter = toolType.slice(0, 4).toUpperCase();
  //   const number = Date.now(); // the current date will give us a unique number
  //   const sku = letter + '-' + number;
  //   return sku;
  // };

  const saveTool = async (e) => {
    e.preventDefault();
    // toolId = generateSKU(toolType);
    // add description to the tool
    const formData = {
      toolId,
      price,
      toolType,
      quantity,
      name,
      supplierId,
    };

    await dispatch(createTool(formData));

    // send the employee back to the inventory
    navigate('/inventory');
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Tool</h3>
      <ToolForm
        tool={tool}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saveTool={saveTool}
      />
    </div>
  );
};

export default AddTool;
