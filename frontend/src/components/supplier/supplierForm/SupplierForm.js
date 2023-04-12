import React from 'react';
import './SupplierForm.scss';
import Card from '../../card/Card';

const SupplierForm = ({ supplier, handleInputChange, saveSupplier }) => {
  return (
    <div className="supplier-form">
      <Card cardClass={'card'}>
        <form onSubmit={saveSupplier}>
          <label>Supplier ID:</label>
          <input
            // type="text"
            type="number"
            placeholder="Supplier ID"
            name="supplierId"
            value={supplier?.supplierId}
            onChange={handleInputChange}
          />
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={supplier?.name}
            onChange={handleInputChange}
            required
          />
          <label>Phone Number:</label>
          <input
            type="text"
            placeholder="Phone"
            name="phoneNumber"
            value={supplier?.phoneNumber}
            onChange={handleInputChange}
          />
          <label>Address:</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={supplier?.address}
            onChange={handleInputChange}
          />
          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={supplier?.email}
            onChange={handleInputChange}
            required
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Supplier
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SupplierForm;
