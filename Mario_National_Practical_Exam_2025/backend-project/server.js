const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // For demo purposes, using hardcoded credentials
  // In production, this should be validated against database
  if (username === 'admin' && password === 'admin123') {
    req.session.user = { username };
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logout successful' });
});

// Department endpoints
app.get('/api/departments', (req, res) => {
  const query = 'SELECT * FROM Department';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/departments', (req, res) => {
  const { DepartmentCode, DepartmentName, GrossSalary, TotalDeduction } = req.body;
  const query = 'INSERT INTO Department (DepartmentCode, DepartmentName, GrossSalary, TotalDeduction) VALUES (?, ?, ?, ?)';
  
  db.query(query, [DepartmentCode, DepartmentName, GrossSalary, TotalDeduction], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true, message: 'Department added successfully' });
  });
});

// Employee endpoints
app.get('/api/employees', (req, res) => {
  const query = `
    SELECT e.*, d.DepartmentName 
    FROM Employee e 
    LEFT JOIN Department d ON e.DepartmentCode = d.DepartmentCode
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/employees', (req, res) => {
  const { employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, DepartmentCode } = req.body;
  const query = 'INSERT INTO Employee (employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, DepartmentCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, DepartmentCode], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true, message: 'Employee added successfully' });
  });
});

// Salary endpoints
app.get('/api/salaries', (req, res) => {
  const query = 'SELECT * FROM Salary';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/salaries', (req, res) => {
  const { GrossSalary, TotalDeduction, NetSalary, month, employeeNumber } = req.body;
  const query = 'INSERT INTO Salary (GrossSalary, TotalDeduction, NetSalary, month, employeeNumber) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [GrossSalary, TotalDeduction, NetSalary, month, employeeNumber], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true, message: 'Salary record added successfully' });
  });
});

app.put('/api/salaries/:id', (req, res) => {
  const { id } = req.params;
  const { GrossSalary, TotalDeduction, NetSalary, month, employeeNumber } = req.body;
  const query = 'UPDATE Salary SET GrossSalary = ?, TotalDeduction = ?, NetSalary = ?, month = ?, employeeNumber = ? WHERE id = ?';
  
  db.query(query, [GrossSalary, TotalDeduction, NetSalary, month, employeeNumber, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true, message: 'Salary record updated successfully' });
  });
});

app.delete('/api/salaries/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Salary WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true, message: 'Salary record deleted successfully' });
  });
});

// Monthly Payroll Report
app.get('/api/reports/monthly-payroll', (req, res) => {
  const { month } = req.query;
  const query = `
    SELECT 
      e.FirstName, 
      e.LastName, 
      e.Position, 
      d.DepartmentName as Department,
      s.NetSalary
    FROM Salary s
    JOIN Employee e ON s.employeeNumber = e.employeeNumber
    JOIN Department d ON e.DepartmentCode = d.DepartmentCode
    WHERE s.month = ?
    ORDER BY e.LastName, e.FirstName
  `;
  
  db.query(query, [month], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
