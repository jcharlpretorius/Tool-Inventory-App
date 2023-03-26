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
    Customer_ID     INT NOT NULL,
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

DROP TABLE IF EXISTS PURCHASE;
CREATE TABLE PURCHASE (
    Purchase_ID         INT NOT NULL,
    Purchase_Date       DATE,
    Total_Cost          DECIMAL(10,2),
    Sales_Associate_ID   INT,
    Customer_ID         INT,
    PRIMARY KEY(Purchase_ID),
    FOREIGN KEY (Sales_Associate_ID) REFERENCES SALES_ASSOCIATE(Employee_ID),
    FOREIGN KEY (Customer_ID) REFERENCES CUSTOMER(Customer_ID)
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
    Tool_ID         INT NOT NULL,
    Line_Number     INT NOT NULL,
    Quantity        INT NOT NULL,
    PRIMARY KEY (Purchase_ID, Tool_ID, Line_Number),
    FOREIGN KEY (Purchase_ID) REFERENCES PURCHASE(Purchase_ID),
    FOREIGN KEY (Tool_ID) REFERENCES TOOL(Tool_ID)
);

DROP TABLE IF EXISTS PAYMENT;
CREATE TABLE PAYMENT (
    Payment_ID      INT NOT NULL,
    Payment_Type    VARCHAR(50),
    Amount          DECIMAL(10,2),
    Customer_ID     INT,
    PRIMARY KEY (Payment_ID),
    FOREIGN KEY (Customer_ID) REFERENCES CUSTOMER(Customer_ID)
);

DROP TABLE IF EXISTS ORDERS;
CREATE TABLE ORDERS (
    Order_ID        INT NOT NULL,
    Order_Date      DATE,
    Total_Cost      DECIMAL(10,2),
    Manager_ID      INT,
    PRIMARY KEY (Order_ID),
    FOREIGN KEY (Manager_ID) REFERENCES MANAGER(Employee_ID)
);

DROP TABLE IF EXISTS ORDER_LINE;
CREATE TABLE ORDER_LINE (
    Order_ID            INT NOT NULL,
    Line_No             INT NOT NULL,
    Tool_ID             INT NOT NULL,
    Quantity            INT NOT NULL,
    PRIMARY KEY (Order_ID, Line_No),
    FOREIGN KEY (Order_ID) REFERENCES ORDERS(Order_ID),
    FOREIGN KEY (Tool_ID) REFERENCES TOOL(Tool_ID)
);


-- Data Insertion


-- CUSTOMER 

INSERT INTO CUSTOMER VALUES
    (1, 'Tom',' ' ,'Hanks', 'New York', 'tomhanks@yahoo.com'),
    (2, 'Brad',' ' ,'Pitt', 'California', 'brad.pit@gmail.com'),
    (3, 'John',' ' ,'Wick', 'Paris', 'johnathanwick89@hotmail.com'),
    (4, 'Keanu',' ' ,'Reeves', 'London', 'keanu.reeves11@hotmail.com'),
    (5, 'Elon',' ' ,'Musk', 'DC Washington','elonmusk@spacex.com'),
    (6, 'Mark',' ' ,'Alan', 'Boston', 'mark.alan@yahoo.com'),
    (7, 'Dwayne',' ' ,'Johnson', 'Florida', 'therock@gmail.com'),
    (8, 'John',' ' ,'Cena', 'New York', 'johncena@gmail.com'),
    (9, 'Robert',' ' ,'Deniro', 'New York', 'robD@yahoo.com'),
    (10, 'Tom',' ' ,'Hardy', 'Boston', 'etomhardy@gmail.com');


-- CUSTOMER_PHONE_NUMBERS

INSERT INTO CUSTOMER_PHONE_NUMBERS VALUES
    (1, '+1 505-644-9828'),
    (2, '+1 412-746-8300'),
    (2, '+1 303-254-1428'),
    (3, '+1 303-254-1428'),
    (4, '+1 505-671-8312'),
    (5, '+1 505-646-9340'),
    (5, '+1 206-558-1649'),
    (6, '+1 207-897-6303'),
    (7, '+1 212-494-7245'),
    (8, '+1 505-646-3745'),
    (9, '+1 215-646-1321'),
    (10, '+1 210-582-8997'),
    (10, '+1 505-606-1521');


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
    (1001, '2022-10-01', 35.0 , 1 ),
    (1002, '2022-11-11', 70.0 , 1 ),
    (1003, '2022-11-21', 82.0 , 3 ),
    (1004, '2022-11-24', 120.0 , 3 ),
    (1005, '2022-12-01', 55.0 , 5 ),
    (1006, '2022-12-11', 65.0 , 3 ),
    (1007, '2022-12-21', 75.0 , 5 ),
    (1008, '2022-12-31', 85.0 , 5 ),
    (1009, '2022-12-31', 95.0 , 5 ),
    (1010, '2023-01-01', 115.0 , 1 ),
    (1011, '2023-01-21', 135.0 , 5 ),
    (1012, '2023-02-27', 50.0 , 1 ),
    (1013, '2023-03-22', 60.0 , 3 );





-- ORDER_LINE 


INSERT INTO ORDER_LINE VALUES
    (1001, 1, 102, 2 ),
    (1001, 2, 103, 1 ),
    (1001, 3, 104, 1 ),
    (1002, 4, 105, 1 ),
    (1002, 5, 106, 1 ),
    (1003, 6, 107, 1 ),
    (1004, 7, 108, 1 ),
    (1005, 8, 109, 1 ),
    (1006, 9, 101, 1 ),
    (1006, 10, 102, 3 ),
    (1007, 11, 105, 1 ),
    (1007, 12, 106, 1 ),
    (1007, 13, 107, 1 ),
    (1008, 14, 108, 1 ),
    (1008, 15, 109, 1 ),
    (1009, 16, 111, 1 ),
    (1009, 17, 112, 1 ),
    (1010, 18, 112, 1 ),
    (1011, 19, 114, 1 ),
    (1012, 20, 112, 1 ),
    (1012, 21, 114, 1 ),
    (1013, 22, 115, 1 ),
    (1013, 23, 102, 2 );


-- PAYMENT 

INSERT INTO PAYMENT VALUES
    (1, 'Cash', 35, 1),
    (2, 'Cash', 82, 2),
    (3, 'Credit Card', 55, 3),
    (4, 'Cash', 135, 4),
    (5, 'Credit CardCash', 115, 5),
    (6, 'Cash', 95, 6),
    (7, 'Credit Card', 55, 7),
    (8, 'Credit Card', 50, 1),
    (9, 'Credit Card', 65, 2),
    (10, 'Cash', 60, 8),
    (11, 'Credit Card', 70, 9),
    (12, 'Credit Card', 75, 1);



-- PURCHASE 

INSERT INTO PURCHASE VALUES
    (1, '2022-10-10', 110, 2, 1),
    (2, '2022-10-11', 120, 4, 2),
    (3, '2022-11-12', 130, 6, 3),
    (4, '2022-11-13', 140, 7, 4),
    (5, '2022-11-14', 150, 8, 5),
    (6, '2022-11-15', 160, 9, 1),
    (7, '2022-11-16', 170, 10, 2),
    (8, '2022-12-17', 180, 2, 3),
    (9, '2022-12-18', 190, 4, 7),
    (10, '2022-12-19', 115, 6, 8),
    (11, '2023-01-20', 125, 8, 9);


-- PURCHASE_LINE 

INSERT INTO PURCHASE_LINE VALUES
    (1, 101, 1, 20),
    (1, 102, 2, 20),
    (2, 101, 3, 10),
    (3, 101, 4, 10),
    (4, 101, 5, 10),
    (5, 101, 6, 10),
    (6, 101, 7, 100),
    (7, 101, 8, 200),
    (8, 101, 9, 35),
    (9, 101, 10, 60),
    (10, 101, 11, 70),
    (11, 101, 12, 50);



