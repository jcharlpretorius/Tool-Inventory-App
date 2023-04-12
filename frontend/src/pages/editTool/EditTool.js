import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToolEditForm from '../../components/tool/toolForm/ToolEditForm';
import Loader from '../../components/loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getTool,
  getTools,
  selectIsLoading,
  selectTool,
  updateTool,
} from '../../redux/features/tool/toolSlice';
import useRedirectIncorrectRoleEmployee from '../../customHooks/useRedirectIncorrectRoleEmployee';

const EditTool = ({ allowedRole }) => {
  useRedirectIncorrectRoleEmployee(allowedRole, '/inventory');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // States
  const toolEdit = useSelector(selectTool); // holds the tool we want to edit
  const isLoading = useSelector(selectIsLoading);
  const [tool, setTool] = useState(toolEdit); // notice: don't point to an empty initial state here like in addT
  const [description, setDescription] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTool({ ...tool, [name]: value });
  };

  useEffect(() => {
    dispatch(getTool(id)); // get tool from db
  }, [dispatch, id]);

  useEffect(() => {
    setTool(toolEdit); // set the tool to toolEdit, for if employee refreshed the page

    //set the description after a check.
    setDescription(
      toolEdit && toolEdit.description ? toolEdit.description : ''
    );
  }, [toolEdit]); // whenever the toolEdit changes it will refresh

  const saveTool = async (e) => {
    e.preventDefault();
    // Note absence of toolId and supplierId. You are not allowed to change those
    const formData = {
      name: tool?.name,
      price: tool?.price,
      toolType: tool?.toolType,
      quantity: tool?.quantity,
      description: description,
    };

    console.log(`in edit tool description : ${description}`);
    await dispatch(updateTool({ toolId: id, formData }));
    await dispatch(getTools());

    navigate('/inventory'); // redirect the employee back to the inventory page
  };
  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Tool Information</h3>
      <ToolEditForm
        tool={tool}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saveTool={saveTool}
      />
    </div>
  );
};

export default EditTool;
