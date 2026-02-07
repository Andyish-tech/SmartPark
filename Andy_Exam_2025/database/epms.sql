CREATE DATABASE IF NOT EXISTS EPMS;
USE EPMS;

-- Department Table
CREATE TABLE IF NOT EXISTS Department (
    departmentCode VARCHAR(10) PRIMARY KEY,
    departmentName VARCHAR(100) NOT NULL,
    grossSalary DECIMAL(15, 2) NOT NULL,
    totalDeduction DECIMAL(15, 2) NOT NULL
);

-- Seed Data for Department
INSERT INTO Department (departmentCode, departmentName, grossSalary, totalDeduction) VALUES
('CW', 'Carwash', 300000.00, 20000.00),
('ST', 'Stock', 200000.00, 5000.00),
('MC', 'Mechanic', 450000.00, 40000.00),
('ADMS', 'Administration Staff', 600000.00, 70000.00)
ON DUPLICATE KEY UPDATE 
    departmentName = VALUES(departmentName),
    grossSalary = VALUES(grossSalary),
    totalDeduction = VALUES(totalDeduction);

-- Employee Table
CREATE TABLE IF NOT EXISTS Employee (
    employeeNumber VARCHAR(20) PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    address TEXT,
    telephone VARCHAR(20),
    gender ENUM('Male', 'Female', 'Other'),
    hiredDate DATE,
    departmentCode VARCHAR(10),
    FOREIGN KEY (departmentCode) REFERENCES Department(departmentCode)
);

-- Salary Table
CREATE TABLE IF NOT EXISTS Salary (
    salaryId INT AUTO_INCREMENT PRIMARY KEY,
    employeeNumber VARCHAR(20),
    grossSalary DECIMAL(15, 2) NOT NULL,
    totalDeduction DECIMAL(15, 2) NOT NULL,
    netSalary DECIMAL(15, 2) NOT NULL,
    month VARCHAR(7), -- YYYY-MM
    FOREIGN KEY (employeeNumber) REFERENCES Employee(employeeNumber)
);

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
