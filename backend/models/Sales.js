// this is for more complicated queries
const db = require('../config/db');

// Get recent sales
const findRecentSales = async () => {
  let sql = `
  SELECT E.Employee_ID, E.First_Name, E.Last_Name, SA.Commission_Rate, PU.Purchase_Date, PA.Payment_ID, PA.Amount
  FROM EMPLOYEE E 
      INNER JOIN SALES_ASSOCIATE SA  ON E.Employee_ID = SA.Employee_ID 
      INNER JOIN PURCHASE PU ON SA.Employee_ID = PU.Sales_Associate_Id 
      INNER JOIN PAYMENT PA ON PU.Payment_ID = PA.Payment_ID
  ORDER BY Purchase_Date DESC
  `;

  const [queryResult, _] = await db.execute(sql);

  return queryResult;
};

// Get the sales associates and how much they sold, in descending order
const findTopSalesMen = async () => {
  let sql = `
  SELECT SA.Employee_ID, G.First_Name, G.Last_Name, Commission_Rate, Total_Sales
  FROM SALES_ASSOCIATE SA 
  INNER JOIN
    (SELECT E.Employee_ID, E.First_Name, E.Last_Name, SUM(Amount) AS Total_Sales
    FROM EMPLOYEE E 
      INNER JOIN SALES_ASSOCIATE SA  ON E.Employee_ID = SA.Employee_ID 
      INNER JOIN PURCHASE PU ON SA.Employee_ID = PU.Sales_Associate_Id 
      INNER JOIN PAYMENT PA ON PU.Payment_ID = PA.Payment_ID
    GROUP BY E.Employee_ID) AS G
  ON SA.Employee_ID = G.Employee_ID
  ORDER BY Total_Sales DESC 
  `;

  const [queryResult, _] = await db.execute(sql);

  return queryResult;
};

const Sales = { findRecentSales, findTopSalesMen };
module.exports = Sales;
