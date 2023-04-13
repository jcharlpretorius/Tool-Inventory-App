-- All Queries

-- Query 1: Get recent sales: This query retrieves recent sales data from the database. It joins four tables - EMPLOYEE, SALES_ASSOCIATE, PURCHASE, and PAYMENT - to get data on the employee, sales associate, purchase, and payment information for each recent sale. The results are ordered by the purchase date and payment ID in descending order.

SELECT E.Employee_ID, E.First_Name, E.Last_Name, SA.Commission_Rate, PU.Purchase_Date, PA.Payment_ID, PA.Amount
FROM EMPLOYEE E 
    INNER JOIN SALES_ASSOCIATE SA  ON E.Employee_ID = SA.Employee_ID 
    INNER JOIN PURCHASE PU ON SA.Employee_ID = PU.Sales_Associate_Id 
    INNER JOIN PAYMENT PA ON PU.Payment_ID = PA.Payment_ID
ORDER BY Purchase_Date DESC, Payment_ID DESC;

-- Query 2: Get the sales associates and how much they sold, in descending order: This query retrieves data on the top sales associates and how much they sold from the database. It joins four tables - EMPLOYEE, SALES_ASSOCIATE, PURCHASE, and PAYMENT - to get data on the employee, sales associate, purchase, and payment information for each sale. It then groups the data by employee ID and calculates the total sales amount for each employee. The results are ordered by the total sales amount in descending order.

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



-- Query 3: Insert a new customer record: This query inserts a new customer record into the CUSTOMER table, with the provided customer information.
 
INSERT INTO CUSTOMER(
  First_Name,
  Minit,
  Last_Name,
  Address, 
  Email
)
VALUES(?,?,?,?,?);

-- Query 4: Get all customer records ordered by first name: This query retrieves all customer records from the CUSTOMER table and orders them by the first name.
 
SELECT * FROM CUSTOMER ORDER BY First_Name;

-- Query 5: Get a customer record by ID: This query retrieves a customer record with the given customer ID from the CUSTOMER table.
 
SELECT * FROM CUSTOMER WHERE Customer_ID = ?;

-- Query 6: Update a customer record: This query updates a customer record with the given customer ID in the CUSTOMER table, with the provided customer information.
 
UPDATE CUSTOMER
SET First_Name = ?, Minit = ?, Last_Name = ?, Address = ?, Email = WHERE Customer_ID =?;

-- Query 7: Get email records: This query retrieves email records from the CUSTOMER table with the given email address.
 
SELECT Email
FROM CUSTOMER
WHERE Email = ?;

-- Query 8: Get a customer record by email: This query retrieves a customer record with the given email address from the CUSTOMER table.

SELECT * FROM CUSTOMER WHERE Email = ?;

-- Query 9: Insert a new tool record into the TOOL table:

INSERT INTO TOOL(
  Tool_ID,
  Price,
  Tool_Type,
  Quantity,
  Name,
  Supplier_ID
)
VALUES(?,?,?,?,?,?);

-- Query 10: Find all tools from the TOOL table:

SELECT * FROM TOOL;

-- Query 11: Find a tool record with a specific tool ID from the TOOL table:

SELECT * 
FROM TOOL 
WHERE Tool_ID = ?;

-- Query 12: Update an existing tool record in the TOOL table:

UPDATE TOOL
SET 
Price = ?, 
Tool_Type = ?, 
Quantity = ?, 
Name = ?, 
Supplier_ID = ?
WHERE Tool_ID = ?;

-- Query 13: Delete a tool record from the TOOL table:

DELETE FROM TOOL WHERE Tool_ID = ?;

-- Query 14: Query 14: Update the quantity of an existing tool record in the TOOL table:

UPDATE TOOL
SET 
Quantity = ?
WHERE Tool_ID = ?;

-- Query 15: Insert a new sales associate record into the SALES_ASSOCIATE table:

INSERT INTO SALES_ASSOCIATE(Employee_ID, Commission_Rate)
VALUES(?,?);

-- Query 16: Find all sales associates in the SALES_ASSOCIATE table:

SELECT * FROM SALES_ASSOCIATE;

-- Query 17: Find a sales associate record in the SALES_ASSOCIATE table by their employee ID:
 
SELECT * FROM SALES_ASSOCIATE WHERE Employee_ID = ?;

-- Query 18: Update the commission rate for a sales associate in the SALES_ASSOCIATE table:
 
UPDATE SALES_ASSOCIATE
SET Commission_Rate = ?
WHERE Employee_ID = ?;

-- Query 19: Delete a sales associate record from the SALES_ASSOCIATE table:

DELETE FROM SALES_ASSOCIATE WHERE Employee_ID = ?;


-- Query 20: Insert a new employee record into the EMPLOYEE table.

INSERT INTO EMPLOYEE(
  First_Name,
  Minit,
  Last_Name,
  Phone_Number,
  Email,
  Password
)
VALUES(?,?,?,?,?,?);

-- Query 21: Retrieve all employee records from the EMPLOYEE table.
 
SELECT * FROM EMPLOYEE;

-- Query 22: Find an employee record by employee ID in the EMPLOYEE table.
 
 SELECT * FROM EMPLOYEE WHERE Employee_ID = ?;

-- Query 23: Update an employee record by employee ID in the EMPLOYEE table.
 
UPDATE EMPLOYEE
SET First_Name = ?, Minit = ?, Last_Name = ?, Phone_Number = ?, Email = ?
WHERE Employee_ID = ?;

-- Query 24: Delete an employee record by employee ID from the EMPLOYEE table.

DELETE FROM EMPLOYEE WHERE Employee_ID = ?;

-- Query 25: Retrieve a list of emails from the EMPLOYEE table.

SELECT Email
FROM EMPLOYEE
WHERE Email = ?;



-- Query 26: Find an employee record by email in the EMPLOYEE table.

SELECT * FROM EMPLOYEE WHERE Email = ?;

-- Query 27: Retrieve the manager record for a specific employee ID.

SELECT *
FROM MANAGER
WHERE Employee_ID = ?;

-- Query 28: INSERT INTO MANAGER table to add a new manager with their employee ID and salary.

INSERT INTO MANAGER(
  Employee_ID,
  Manager_Salary
)
VALUES(?,?);

-- Query 29: SELECT statement to retrieve all managers from the MANAGER table.
 
SELECT * FROM MANAGER;

-- Query 30: SELECT statement to retrieve a manager by their employee ID.
 
SELECT * FROM MANAGER WHERE Employee_ID = ?;

-- Query 31: UPDATE statement to update the salary of a manager with a specific employee ID.
 
UPDATE MANAGER
SET Manager_Salary = ?
WHERE Employee_ID = ?;

-- Query 32: DELETE statement to remove a manager with a specific employee ID from the MANAGER table.
 
DELETE FROM MANAGER WHERE Employee_ID = ?;

-- Query 33: Insert a new phone number for a customer.
 
INSERT INTO CUSTOMER_PHONE_NUMBERS(
  Customer_ID,
  PhoneNumber
)
VALUES(?,?);

-- Query 34: Find all phone numbers for all customers.

SELECT * FROM CUSTOMER_PHONE_NUMBERS; 

-- Query 35: Find all phone numbers for a specific customer by customer ID.

SELECT * FROM CUSTOMER_PHONE_NUMBERS WHERE Customer_ID = ?

-- Query 36: This SQL query inserts a new row into the Order table with the order date and manager ID.

INSERT INTO ORDER(
    Order_Date,
    Manager_ID
  )
  VALUES(?,?);

-- Query 37: This SQL query selects all rows from the Order table.

SELECT * FROM ORDER;

-- Query 38: This SQL query selects a specific row from the Order table based on the order ID provided.

SELECT * FROM ORDER WHERE Order_ID = ?;
 
-- Query 39: This SQL query deletes a row from the Order table based on the order ID provided.

DELETE FROM ORDER WHERE Order_ID = ?;

-- Query 40: This SQL query inserts a new payment record into the PAYMENT table with the specified payment type, amount, and customer ID.

-- Query 41: This SQL INSERT statement that inserts a new row into the PAYMENT table with values for the Payment_Type, Amount, and Customer_ID columns.

INSERT INTO PAYMENT(
  Payment_Type,
  Amount,
  Customer_ID
)
VALUES(?,?,?);

-- Query 42: This SQL query is an SQL SELECT statement that retrieves all rows from the PAYMENT table.
 
SELECT * FROM PAYMENT;

-- Query 43: This SQL query is an SQL SELECT statement that retrieves a specific row from the PAYMENT table where the Payment_ID column matches the given parameter.

SELECT * FROM PAYMENT WHERE Payment_ID = ?;

-- Query 44: This query inserts a new purchase into the PURCHASE table with the provided sales associate ID and payment ID.
 
INSERT INTO PURCHASE(
  Purchase_Date,
  Sales_Associate_ID,
  Payment_ID
)
VALUES(?,?,?);

-- Query 45: This query selects all purchases from the PURCHASE table.

SELECT * FROM PURCHASE;


-- Query 46: This query selects a purchase with the given purchase ID from the PURCHASE table.
 
SELECT * FROM PURCHASE WHERE Purchase_ID = ?;

-- Query 47: This query deletes a purchase with the given purchase ID from the PURCHASE table.

DELETE FROM PURCHASE WHERE Purchase_ID = ?;

-- Query 48: Create a new record in the PURCHASE_LINE table with the given purchase ID, line number, tool ID, and quantity.

INSERT INTO PURCHASE_LINE(
  Purchase_ID,
  Line_Number,
  Tool_ID,
  Quantity
)
VALUES(?,?,?,?);

-- Query 49: Retrieve all records from the PURCHASE_LINE table.
 
SELECT * FROM PURCHASE_LINE;

-- Query 50: Retrieve all purchase lines associated with a specific purchase ID.
 
SELECT * FROM PURCHASE_LINE WHERE Purchase_ID ?;

-- Query 51: INSERT query to add a new order line to the ORDER_LINE table.
 
INSERT INTO ORDER_LINE(
  Order_ID,
  Line_Number,
  Tool_ID,
  Quantity
)
VALUES(?,?,?,?);


-- Query 52: SELECT query to retrieve all order lines from the ORDER_LINE table.
 
SELECT * FROM ORDER_LINE;

-- Query 53: SELECT query to retrieve a specific order line by orderId from the ORDER_LINE table.

SELECT * FROM ORDER_LINE WHERE Order_ID = ?;

-- Query 54: Insert a new supplier into the SUPPLIER table.

INSERT INTO SUPPLIER(
  Supplier_ID,
  Phone,
  Address
)
VALUES(?,?,?);
 
-- Query 55: Retrieve all suppliers from the SUPPLIER table.
 
SELECT * FROM SUPPLIER;

-- Query 56: Retrieve a specific supplier from the SUPPLIER table based on their ID.
 
SELECT * FROM SUPPLIER WHERE Supplier_ID = ?;

-- Query 57: Update a supplier's information in the SUPPLIER table based on their ID.
 
UPDATE SUPPLIER
SET 
Phone = ?, 
Address = ?
WHERE Supplier_ID = ?;

-- Query 58: Delete a supplier from the SUPPLIER table based on their ID.

DELETE FROM SUPPLIER WHERE Supplier_ID = ?;
