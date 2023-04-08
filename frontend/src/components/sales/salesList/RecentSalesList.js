import './SalesList.scss';
import React from 'react';
import { SpinnerImg } from '../../loader/Loader';

const RecentSalesList = ({ recentSales, isLoading }) => {
  // Used to shorten long strings such as tool name
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  return (
    <div className="sales-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          {/* <span>
            <h3>Recent Sales</h3>
          </span> */}
        </div>
        {isLoading && <SpinnerImg />}
        <div className="table">
          {!isLoading && recentSales.length === 0 ? (
            <p>-- No recent sales found --</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Commission Rate</th>
                  <th>PurchaseDate</th>
                  <th>Payment ID</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => {
                  const {
                    employeeId,
                    firstName,
                    lastName,
                    commissionRate,
                    purchaseDate,
                    paymentId,
                    amount,
                  } = sale;
                  return (
                    <tr key={employeeId}>
                      <td>{employeeId}</td>
                      <td>{shortenText(firstName, 20)}</td>
                      <td>{shortenText(lastName, 20)}</td>
                      <td>{Number(commissionRate).toFixed(2)}</td>
                      <td>{purchaseDate.slice(0, 10)}</td>
                      <td>{paymentId}</td>
                      <td>
                        {'$'}
                        {Number(amount).toFixed(2)}
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

export default RecentSalesList;
