import './SalesList.scss';
import React from 'react';
import { SpinnerImg } from '../../loader/Loader';

const TopSalesList = ({ topSales, isLoading }) => {
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
            <h3>Top Sales</h3>
          </span> */}
        </div>
        {isLoading && <SpinnerImg />}
        <div className="table">
          {!isLoading && topSales.length === 0 ? (
            <p>-- No sales found --</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Commission Rate</th>
                  <th>Total Sales</th>
                  <th>Total Commission</th>
                </tr>
              </thead>
              <tbody>
                {/* map through the filtered sales */}
                {/* {filteredSales.map((sale) => { */}
                {topSales.map((sale) => {
                  const {
                    employeeId,
                    firstName,
                    lastName,
                    commissionRate,
                    totalSales,
                  } = sale;
                  return (
                    <tr key={employeeId}>
                      <td>{employeeId}</td>
                      <td>{shortenText(firstName, 20)}</td>
                      <td>{shortenText(lastName, 20)}</td>
                      <td>{Number(commissionRate).toFixed(2)}</td>
                      <td>
                        {'$'}
                        {Number(totalSales).toFixed(2)}
                      </td>
                      <td>
                        {'$'}
                        {(commissionRate * totalSales).toFixed(2)}
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

export default TopSalesList;
