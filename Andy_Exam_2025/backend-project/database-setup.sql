-- Employee Payroll Management System Database Setup
-- Create EPMS Database

CREATE DATABASE IF NOT EXISTS EPMS;
USE EPMS;

-- Department Table
CREATE TABLE IF NOT EXISTS Department (
    DepartmentCode VARCHAR(10) PRIMARY KEY,
    DepartmentName VARCHAR(100) NOT NULL,
    GrossSalary DECIMAL(10, 2) NOT NULL,
    TotalDeduction DECIMAL(10, 2) NOT NULL
);

-- Employee Table
CREATE TABLE IF NOT EXISTS Employee (
    employeeNumber VARCHAR(20) PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Position VARCHAR(100) NOT NULL,
    Address TEXT,
    Telephone VARCHAR(20),
    Gender VARCHAR(10),
    hiredDate DATE,
    DepartmentCode VARCHAR(10),
    FOREIGN KEY (DepartmentCode) REFERENCES Department(DepartmentCode)
);

-- Salary Table
CREATE TABLE IF NOT EXISTS Salary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    GrossSalary DECIMAL(10, 2) NOT NULL,
    TotalDeduction DECIMAL(10, 2) NOT NULL,
    NetSalary DECIMAL(10, 2) NOT NULL,
    month VARCHAR(20) NOT NULL,
    employeeNumber VARCHAR(20),
    FOREIGN KEY (employeeNumber) REFERENCES Employee(employeeNumber)
);

-- Insert Initial Department Data
INSERT INTO Department (DepartmentCode, DepartmentName, GrossSalary, TotalDeduction) VALUES
('CW', 'Carwash', 300000.00, 20000.00),
('ST', 'Stock', 200000.00, 5000.00),
('MC', 'Mechanic', 450000.00, 40000.00),
('ADMS', 'Administration Staff', 600000.00, 70000.00);
