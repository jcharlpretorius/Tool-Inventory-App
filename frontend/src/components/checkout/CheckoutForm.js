import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CheckoutForm.scss';
import Card from '../card/Card';

const CheckOutForm = ({
  items,
  total,
  employee,
  // customer,
  handleInputChange,
  confirmPayment,
}) => {
  return (
    <div className="checkout">
      <Card cardClass={'card'}>
        <form onSubmit={confirmPayment}>
          <label>Customer Email:</label>
          <input
            type="text"
            placeholder="Customer Email"
            name="email"
            onChange={handleInputChange}
            required
          />
          <label>Payment Type:</label>
          <select
            name="paymentType"
            id="paymentType"
            onChange={handleInputChange}
          >
            <option value="credit" selected>
              Credit Card
            </option>
            <option value="debit">Debit Card</option>
            <option value="cash">Cash</option>
          </select>

          <div className="--flex-between --my">
            <span className="cartValues">
              <b>Total: </b> {'$'}
              {total} &nbsp;
            </span>
            <button type="submit" className="--btn --btn-primary">
              Confirm Payment
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CheckOutForm;
