import React, { useEffect } from 'react';
import './ToolDetail.scss';
import { useDispatch, useSelector } from 'react-redux';
import useRedirectLoggedOutEmployee from '../../../customHooks/useRedirectLoggedOutEmployee';
import { useParams } from 'react-router-dom';
import { getTool } from '../../../redux/features/tool/toolSlice';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import Card from '../../card/Card';
import { SpinnerImg } from '../../loader/Loader';

const ToolDetail = () => {
  useRedirectLoggedOutEmployee('/'); // redirect logged out employees to the home page
  const dispatch = useDispatch();

  const { id } = useParams(); // get the id first
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // get the single tool
  const { tool, isLoading, isError, message } = useSelector(
    (state) => state.tool
  );

  // Get the status of the tool in the inventory
  const inStockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getTool(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <div className="tool-detail">
        <h3 className="--mt">Tool Details</h3>
        <Card cardClass="card">
          {isLoading && <SpinnerImg />}
          {tool && (
            <div className="detail">
              <h4>Availability: {inStockStatus(tool.quantity)}</h4>
              <hr />
              <h4>
                <span className="badge">Name:</span> &nbsp; {tool.name}
              </h4>
              <p>
                <b>ToolId: </b> {tool.toolId}
              </p>
              <p>
                <b>Tool Type: </b> {tool.toolType}
              </p>
              <p>
                <b>Price: </b> {'$'}
                {tool.price}
              </p>
              <p>
                <b>Quantity in stock: </b> {tool.quantity}
              </p>
              <p>
                <b>Total value in stock: </b> {'$'}
                {tool.quantity * tool.price}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ToolDetail;
