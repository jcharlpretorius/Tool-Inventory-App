use toolshop;

-- Basic retrieval query
SELECT * FROM TOOL;

-- Retrieval query with ordered results
SELECT * FROM CUSTOMER
ORDER BY First_Name;

-- Nested retrieval query
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
  ORDER BY Total_Sales DESC;

-- Retrieval query using joined tables
  SELECT E.Employee_ID, E.First_Name, E.Last_Name, SA.Commission_Rate, PU.Purchase_Date, PA.Payment_ID, PA.Amount
  FROM EMPLOYEE E 
      INNER JOIN SALES_ASSOCIATE SA  ON E.Employee_ID = SA.Employee_ID 
      INNER JOIN PURCHASE PU ON SA.Employee_ID = PU.Sales_Associate_Id 
      INNER JOIN PAYMENT PA ON PU.Payment_ID = PA.Payment_ID
  ORDER BY Purchase_Date DESC, Payment_ID DESC;

-- Insert operation that affects multiple tables
-- Insert payment
INSERT INTO Payment(Payment_Type, Amount, Customer_ID)
VALUES('Debit', 1526.00, '1002');

SET @pay_ID := (SELECT LAST_INSERT_ID());
SELECT @pay_ID;
-- Display result of insert    
SELECT * FROM Payment;

-- Insert Purchase
INSERT INTO Purchase(Purchase_Date, Sales_Associate_ID, Payment_ID) 
VALUES ('2023-05-20', 2, @pay_ID);

SET @purch_ID := (SELECT LAST_INSERT_ID());
SELECT @purch_ID;
-- Display result of insert    
SELECT * FROM Purchase;

-- Insert Purchase line(s)
INSERT INTO Purchase_Line(Purchase_ID, Line_Number, Tool_ID, Quantity) 
VALUES 
	(@purch_ID, 1, 101, 3),
	(@purch_ID, 2, 103, 7),
	(@purch_ID, 3, 105, 1);

-- Display result of insert    
SELECT * FROM Purchase_Line;

-- Update Operation
UPDATE TOOL
SET Quantity = 9
WHERE Tool_ID = 101;

-- Display result of update
SELECT *
FROM TOOL
WHERE Tool_ID = 101;
    
-- Delete Operation
DELETE FROM TOOL WHERE Tool_ID = 110;

-- Display result of delete
SELECT * FROM TOOL;