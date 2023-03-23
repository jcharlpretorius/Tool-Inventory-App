DROP DATABASE IF EXISTS TOOLSHOP;
CREATE DATABASE TOOLSHOP;
USE TOOLSHOP;

DROP TABLE IF EXISTS EMPLOYEE;
CREATE TABLE EMPLOYEE (
    Employee_ID     INT PRIMARY KEY,
    FirstName       VARCHAR(50),
    MiddleInitial   CHAR(1),
    LastName        VARCHAR(50),
    PhoneNumber     VARCHAR(20)
);

DROP TABLE IF EXISTS MANAGER;
CREATE TABLE MANAGER (
    Employee_ID     INT PRIMARY KEY,
    Manager_Salary  DECIMAL(10,2),
    FOREIGN KEY (Employee_ID) REFERENCES EMPLOYEE(Employee_ID)
);

DROP TABLE IF EXISTS SALES_ASSOCIATE;
CREATE TABLE SALES_ASSOCIATE (
    Employee_ID     INT PRIMARY KEY,
    Commission_Rate DECIMAL(4,2),
    FOREIGN KEY (Employee_ID) REFERENCES EMPLOYEE(Employee_ID)
);

DROP TABLE IF EXISTS CUSTOMER;
CREATE TABLE CUSTOMER (
    Customer_ID     INT PRIMARY KEY,
    FirstName       VARCHAR(50),
    MiddleInitial   CHAR(1),
    LastName        VARCHAR(50),
    Address         VARCHAR(100)
);

DROP TABLE IF EXISTS PURCHASE;
CREATE TABLE PURCHASE (
    Purchase_ID         INT PRIMARY KEY,
    Purchase_Date       DATE,
    Total_Cost          DECIMAL(10,2),
    Sales_Associate_ID   INT,
    Customer_ID         INT,
    FOREIGN KEY (Sales_Associate_ID) REFERENCES SALES_ASSOCIATE(Employee_ID),
    FOREIGN KEY (Customer_ID) REFERENCES CUSTOMER(Customer_ID)
);

DROP TABLE IF EXISTS SUPPLIER;
CREATE TABLE SUPPLIER (
    Supplier_ID     INT PRIMARY KEY,
    Phone           VARCHAR(20),
    Address         VARCHAR(100)
);

DROP TABLE IF EXISTS TOOL;
CREATE TABLE TOOL (
    Tool_ID             INT PRIMARY KEY,
    Price               DECIMAL(10,2),
    Tool_Type           VARCHAR(50),
    Quantity_In_Stock   INT,
    Name                VARCHAR(50),
    Supplier_ID         INT,
    FOREIGN KEY (Supplier_ID) REFERENCES SUPPLIER(Supplier_ID)
);

DROP TABLE IF EXISTS PURCHASE_LINE;
CREATE TABLE PURCHASE_LINE (
    Purchase_ID     INT,
    Tool_ID         INT,
    Line_Number     INT,
    Quantity        INT,
    PRIMARY KEY (Purchase_ID, Tool_ID, Line_Number),
    FOREIGN KEY (Purchase_ID) REFERENCES PURCHASE(Purchase_ID),
    FOREIGN KEY (Tool_ID) REFERENCES TOOL(Tool_ID)
);

DROP TABLE IF EXISTS PAYMENT;
CREATE TABLE PAYMENT (
    Payment_ID      INT PRIMARY KEY,
    Payment_Type    VARCHAR(50),
    Amount          DECIMAL(10,2),
    Customer_ID     INT,
    FOREIGN KEY (Customer_ID) REFERENCES CUSTOMER(Customer_ID)
);

DROP TABLE IF EXISTS ORDERS;
CREATE TABLE ORDERS (
    Order_ID        INT PRIMARY KEY,
    Order_Date      DATE,
    Total_Cost      DECIMAL(10,2),
    Manager_ID      INT,
    FOREIGN KEY (Manager_ID) REFERENCES MANAGER(Employee_ID)
);

DROP TABLE IF EXISTS ORDER_LINE;
CREATE TABLE ORDER_LINE (
    Order_ID            INT,
    Line_No             INT,
    Tool_ID             INT,
    Quantity            INT,
    PRIMARY KEY (Order_ID, Line_No),
    FOREIGN KEY (Order_ID) REFERENCES ORDERS(Order_ID),
    FOREIGN KEY (Tool_ID) REFERENCES TOOL(Tool_ID)
);


