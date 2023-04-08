import React from 'react';
import './CustomerForm.scss';
import Card from '../../card/Card';

const CustomerForm = ({ customer, handleInputChange, saveCustomer }) => {
  return (
    <div className="customer-form">
      <Card cardClass={'card'}>
        <form onSubmit={saveCustomer}>
          <label>First Name:</label>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={customer?.firstName}
            onChange={handleInputChange}
            required
          />
          <label>Middle Initial:</label>
          <input
            type="text"
            placeholder="Middle Initial"
            name="minit"
            value={customer?.minit}
            onChange={handleInputChange}
          />
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={customer?.lastName}
            onChange={handleInputChange}
            required
          />
          <label>Address:</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={customer?.address}
            onChange={handleInputChange}
          />
          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={customer?.email}
            onChange={handleInputChange}
            required
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Customer
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CustomerForm;
