DROP DATABASE IF EXISTS TOOLSHOP;
CREATE DATABASE TOOLSHOP;
USE TOOLSHOP;

DROP TABLE IF EXISTS EMPLOYEE;
CREATE TABLE EMPLOYEE (
    Employee_ID     INT NOT NULL,
    FirstName       VARCHAR(50) NOT NULL,
    MiddleInitial   CHAR(1),
    LastName        VARCHAR(50) NOT NULL,
    PhoneNumber     VARCHAR(20),
    Email           VARCHAR(50) NOT NULL,
    PRIMARY KEY(Employee_ID),
    UNIQUE(Email)
);


DROP TABLE IF EXISTS MANAGER;
CREATE TABLE MANAGER (
    Employee_ID     INT NOT NULL,
    Manager_Salary  DECIMAL(10,2),
    PRIMARY KEY (Employee_ID),
    FOREIGN KEY (Employee_ID) REFERENCES EMPLOYEE(Employee_ID)
);

DROP TABLE IF EXISTS SALES_ASSOCIATE;
CREATE TABLE SALES_ASSOCIATE (
    Employee_ID     INT NOT NULL,
    Commission_Rate DECIMAL(4,2),
    PRIMARY KEY (Employee_ID),
    FOREIGN KEY (Employee_ID) REFERENCES EMPLOYEE(Employee_ID)
);

DROP TABLE IF EXISTS CUSTOMER;
CREATE TABLE CUSTOMER (
    Customer_ID     INT NOT NULL AUTO_INCREMENT,
    FirstName       VARCHAR(50) NOT NULL,
    MiddleInitial   CHAR(1),
    LastName        VARCHAR(50) NOT NULL,
    Address         VARCHAR(100),
    Email           VARCHAR(50) NOT NULL,
    UNIQUE(Email),
    PRIMARY KEY (Customer_ID) 
);

DROP TABLE IF EXISTS CUSTOMER_PHONE_NUMBERS;
CREATE TABLE CUSTOMER_PHONE_NUMBERS (
    Customer_ID     INT NOT NULL,
    PhoneNumber     VARCHAR(20),
    PRIMARY KEY (Customer_ID, PhoneNumber),
    FOREIGN KEY (Customer_ID) REFERENCES CUSTOMER(Customer_ID)
);

DROP TABLE IF EXISTS PAYMENT;
CREATE TABLE PAYMENT (
    Payment_ID      INT NOT NULL AUTO_INCREMENT,
    Payment_Type    VARCHAR(50),
    Amount          DECIMAL(10,2),
    Customer_ID     INT,
    PRIMARY KEY (Payment_ID),
    FOREIGN KEY (Customer_ID) REFERENCES CUSTOMER(Customer_ID) 
);

DROP TABLE IF EXISTS PURCHASE;
CREATE TABLE PURCHASE (
    Purchase_ID         INT NOT NULL AUTO_INCREMENT,
    Purchase_Date       DATE,
    Sales_Associate_ID   INT,
    Payment_ID           INT,
    PRIMARY KEY(Purchase_ID),
    FOREIGN KEY (Sales_Associate_ID) REFERENCES SALES_ASSOCIATE(Employee_ID),
    FOREIGN KEY (Payment_ID) REFERENCES PAYMENT(Payment_ID)
);
 
DROP TABLE IF EXISTS SUPPLIER;
CREATE TABLE SUPPLIER (
    Supplier_ID     INT NOT NULL,
    Phone           VARCHAR(20),
    Address         VARCHAR(100),
    PRIMARY KEY (Supplier_ID)
);

DROP TABLE IF EXISTS TOOL;
CREATE TABLE TOOL (
    Tool_ID             INT NOT NULL,
    Price               DECIMAL(10,2),
    Tool_Type           VARCHAR(50),
    Quantity_In_Stock   INT,
    Name                VARCHAR(50),
    Supplier_ID         INT,
    PRIMARY KEY (Tool_ID),
    FOREIGN KEY (Supplier_ID) REFERENCES SUPPLIER(Supplier_ID)
);

DROP TABLE IF EXISTS PURCHASE_LINE;
CREATE TABLE PURCHASE_LINE (
    Purchase_ID     INT NOT NULL,
    Line_Number     INT,
    Tool_ID         INT NOT NULL,
    Quantity        INT NOT NULL,
    PRIMARY KEY (Purchase_ID, Line_Number),
    FOREIGN KEY (Purchase_ID) REFERENCES PURCHASE(Purchase_ID),
    FOREIGN KEY (Tool_ID) REFERENCES TOOL(Tool_ID)
);


DROP TABLE IF EXISTS ORDERS;
CREATE TABLE ORDERS (
    Order_ID        INT NOT NULL AUTO_INCREMENT,
    Order_Date      DATE,
    Manager_ID      INT,
    PRIMARY KEY (Order_ID),
    FOREIGN KEY (Manager_ID) REFERENCES MANAGER(Employee_ID) 
);

DROP TABLE IF EXISTS ORDER_LINE;
CREATE TABLE ORDER_LINE (
    Order_ID            INT NOT NULL,
    Line_Number             INT,
    Tool_ID             INT NOT NULL,
    Quantity            INT NOT NULL,
    PRIMARY KEY (Order_ID, Line_Number),
    FOREIGN KEY (Order_ID) REFERENCES ORDERS(Order_ID),
    FOREIGN KEY (Tool_ID) REFERENCES TOOL(Tool_ID)
);


-- Set auto increment
ALTER TABLE CUSTOMER AUTO_INCREMENT = 1000;
ALTER TABLE PURCHASE AUTO_INCREMENT = 2000;
ALTER TABLE PAYMENT AUTO_INCREMENT = 4000;
ALTER TABLE ORDERS AUTO_INCREMENT = 3000;

-- Data Insertion


-- CUSTOMER 

INSERT INTO CUSTOMER VALUES
    (1001, 'Tom',' ' ,'Hanks', 'New York', 'tomhanks@yahoo.com'),
    (1002, 'Brad',' ' ,'Pitt', 'California', 'brad.pit@gmail.com'),
    (1003, 'John',' ' ,'Wick', 'Paris', 'johnathanwick89@hotmail.com'),
    (1004, 'Keanu',' ' ,'Reeves', 'London', 'keanu.reeves11@hotmail.com'),
    (1005, 'Elon',' ' ,'Musk', 'DC Washington','elonmusk@spacex.com'),
    (1006, 'Mark',' ' ,'Alan', 'Boston', 'mark.alan@yahoo.com'),
    (1007, 'Dwayne',' ' ,'Johnson', 'Florida', 'therock@gmail.com'),
    (1008, 'John',' ' ,'Cena', 'New York', 'johncena@gmail.com'),
    (1009, 'Robert',' ' ,'Deniro', 'New York', 'robD@yahoo.com'),
    (1010, 'Tom',' ' ,'Hardy', 'Boston', 'etomhardy@gmail.com');


-- CUSTOMER_PHONE_NUMBERS

INSERT INTO CUSTOMER_PHONE_NUMBERS VALUES
    (1001, '+1 505-644-9828'),
    (1002, '+1 412-746-8300'),
    (1002, '+1 303-254-1428'),
    (1003, '+1 303-254-1428'),
    (1004, '+1 505-671-8312'),
    (1005, '+1 505-646-9340'),
    (1005, '+1 206-558-1649'),
    (1006, '+1 207-897-6303'),
    (1007, '+1 212-494-7245'),
    (1008, '+1 505-646-3745'),
    (1009, '+1 215-646-1321'),
    (1010, '+1 210-582-8997'),
    (1010, '+1 505-606-1521');


-- EMPLOYEE

INSERT INTO EMPLOYEE VALUES 
    (1, 'Lionel', ' ', 'Messi', '+37 2354272', 'lmessi@gmail.com'),
    (2, 'Cristiano', ' ', 'Ronaldo', '+962 4563832', 'cristiano.ronaldo@yahoo.com'),
    (3, 'Neymar', ' ', 'Junior', '+37 247562659', 'neymaj@yahoo.com'),
    (4, 'Diego', ' ', 'Maradona', '+44 8765349', 'diegomaradona@gmail.com'),
    (5, 'Zlatan', ' ', 'Ibrahimovic', '+1 23541272', 'zlatanibrah@hotmail.com'),
    (6, 'Robert', ' ', 'Lewandowski', '+1 5054272', 'rlewandowski@hotmail.com'),
    (7, 'Vinicous', ' ', 'Junior', '+1 63954272', 'vinicous@gmail.com'),
    (8, 'Kareem', ' ', 'Benzema', '+1 7384272', 'benzema.kareem@yahoo.com'),
    (9, 'Andy', ' ', 'Roberts', '+1 8354772', 'aroberts44@gmail.com'),
    (10, 'Wayne', ' ', 'Rooney', '+1 9356272', 'wrooney1880@gmail.com');


-- Manager 

INSERT INTO MANAGER VALUES
    (1, 20000.00),
    (3, 15000.00),
    (5, 18000.00);


-- SUPPLIER

INSERT INTO SUPPLIER VALUES
    (1, '+1 62321893','New York'),
    (2, '+1 39874923','DC Washington'),
    (3, '+44 24525467','London'),
    (4, '+1 29857933','New York'),
    (5, '+37 23786585','Paris'),
    (6, '+1 29384332','New York'),
    (7, '+1 234769245','Florida'),
    (8, '+44 93874904','Manchester'),
    (9, '+1 215548589','Boston'),
    (10, '+1 34547883','New York');


-- SALES_ASSOCIATE

INSERT INTO SALES_ASSOCIATE VALUES
    (2, 4.0),
    (4, 4.0),
    (6, 4.5),
    (7, 5.0),
    (8, 5.0),
    (9, 5.0),
    (10, 3.5);


-- TOOL

INSERT INTO TOOL VALUES
    (101, 30.0, 'Mechanical', 12, 'Strippers', 2),
    (102, 20.0, 'Mechanical', 200, 'Pin', 3),
    (103, 200.0, 'Electrical', 10, 'Microvave oven', 4),
    (104, 10.0, 'Mechanical', 45, 'Scrapper', 5),
    (105, 30.0, 'Mechanical', 12, 'Piler', 6),
    (106, 40.0, 'Electrical', 120, 'Bulb', 7),
    (107, 40.0, 'Electrical', 110, 'cable', 8),
    (108, 50.0, 'Mechanical', 59, 'Screw Driver', 2),
    (109, 60.0, 'Electrical', 12, 'Strippers', 1),
    (110, 70.0, 'Mechanical', 25, 'HackSaw', 3),
    (111, 35.0, 'Mechanical', 29, 'Wire Cutter', 4),
    (112, 45.0, 'Mechanical', 75, 'Wrench', 9),
    (113, 55.0, 'Electrical', 122, 'Heat Gun', 10),
    (114, 67.5, 'Mechanical', 34, 'Hand Drill', 10),
    (115, 75.0, 'Electrical', 44, 'Electric Cutter', 8);



-- ORDERS 

INSERT INTO ORDERS VALUES
    (3001, '2022-10-01', 1 ),
    (3002, '2022-11-11', 1 ),
    (3003, '2022-11-21', 3 ),
    (3004, '2022-11-24', 3 ),
    (3005, '2022-12-01', 5 ),
    (3006, '2022-12-11', 3 ),
    (3007, '2022-12-21', 5 ),
    (3008, '2022-12-31', 5 ),
    (3009, '2022-12-31', 5 ),
    (3010, '2023-01-01', 1 ),
    (3011, '2023-01-21', 5 ),
    (3012, '2023-02-27', 1 ),
    (3013, '2023-03-22', 3 );



-- ORDER_LINE 

INSERT INTO ORDER_LINE VALUES
    (3001, 1, 102, 2 ),
    (3001, 2, 103, 1 ),
    (3001, 3, 104, 1 ),
    (3002, 1, 105, 1 ),
    (3002, 2, 106, 1 ),
    (3003, 1, 107, 1 ),
    (3004, 1, 108, 1 ),
    (3005, 1, 109, 1 ),
    (3006, 1, 101, 1 ),
    (3006, 2, 102, 3 ),
    (3007, 1, 105, 1 ),
    (3007, 2, 106, 1 ),
    (3007, 3, 107, 1 ),
    (3008, 1, 108, 1 ),
    (3008, 2, 109, 1 ),
    (3009, 1, 111, 1 ),
    (3009, 2, 112, 1 ),
    (3010, 1, 112, 1 ),
    (3011, 1, 114, 1 ),
    (3012, 1, 112, 1 ),
    (3012, 2, 114, 1 ),
    (3013, 1, 115, 1 ),
    (3013, 2, 102, 2 );


-- PAYMENT 

INSERT INTO PAYMENT VALUES
    (4001, 'Cash', 35, 1001),
    (4002, 'Cash', 82, 1002),
    (4003, 'Credit Card', 55, 1003),
    (4004, 'Cash', 135, 1004),
    (4005, 'Credit CardCash', 115, 1005),
    (4006, 'Cash', 95, 1006),
    (4007, 'Credit Card', 55, 1007),
    (4008, 'Credit Card', 50, 1001),
    (4009, 'Credit Card', 65, 1002),
    (4010, 'Cash', 60, 1008),
    (4011, 'Credit Card', 70, 1009),
    (4012, 'Credit Card', 75, 1001);



-- PURCHASE 

INSERT INTO PURCHASE VALUES
    (2001, '2022-10-10', 2, 4001),
    (2002, '2022-10-11', 4, 4002),
    (2003, '2022-11-12', 6, 4003),
    (2004, '2022-11-13', 7, 4004),
    (2005, '2022-11-14', 8, 4005),
    (2006, '2022-11-15', 9, 4001),
    (2007, '2022-11-16', 10, 4002),
    (2008, '2022-12-17', 2, 4003),
    (2009, '2022-12-18', 4, 4007),
    (2010, '2022-12-19', 6, 4008),
    (2011, '2023-01-20', 8, 4009);

-- PURCHASE_LINE 

INSERT INTO PURCHASE_LINE VALUES
    (2001, 1, 101, 20),
    (2001, 2, 102, 20),
    (2002, 1, 101, 10),
    (2003, 1, 101, 10),
    (2004, 1, 101, 10),
    (2005, 1, 101, 10),
    (2005, 2, 102, 2),
    (2006, 1, 101, 100),
    (2007, 1, 101, 200),
    (2008, 1, 101, 35),
    (2009, 1, 101, 60),
    (2010, 1, 101, 70),
    (2010, 2, 102, 5),
    (2010, 3, 103, 20),
    (2011, 1, 101, 50);



