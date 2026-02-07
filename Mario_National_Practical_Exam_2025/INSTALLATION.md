# Employee Payroll Management System (EPMS) - Installation Guide

## Project Structure
```
Mario_National_Practical_Exam_2025/
├── backend-project/
│   ├── package.json
│   ├── server.js
│   ├── database-setup.sql
│   └── .env
├── frontend-project/
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Prerequisites
- Node.js (v14 or higher)
- MySQL/MongoDB database
- npm or yarn package manager

## Installation Steps

### 1. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend-project
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
   - Import the `database-setup.sql` file into your MySQL database
   - Update the `.env` file with your database credentials

4. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Database Configuration

### MySQL Setup
1. Create a database named `EPMS`
2. Import the `database-setup.sql` file
3. Update the `.env` file with your database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=EPMS
PORT=5000
SESSION_SECRET=your_session_secret_key_here
```

## Default Login Credentials
- Username: `admin`
- Password: `admin123`

## Features Implemented

### ✅ Entity Relationship Diagram (ERD)
- Employee table with foreign key to Department
- Department table with salary information
- Salary table linked to Employee

### ✅ Backend Features
- Node.js + Express.js server
- MySQL database integration
- RESTful API endpoints
- Session-based authentication
- CRUD operations for all entities

### ✅ Frontend Features
- React.js application with routing
- Tailwind CSS for responsive design
- Axios for API communication
- User authentication (login/logout)
- Forms for data entry
- Monthly payroll report generation
- CSV export functionality

### ✅ CRUD Operations
- **INSERT**: All forms (Employee, Department, Salary)
- **DELETE, UPDATE, RETRIEVE**: Salary form (as required)
- **RETRIEVE**: Employee and Department lists

### ✅ Reports
- Monthly Employee Payroll Report
- CSV export functionality
- Summary statistics

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Add new department

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Add new employee

### Salaries
- `GET /api/salaries` - Get all salary records
- `POST /api/salaries` - Add new salary record
- `PUT /api/salaries/:id` - Update salary record
- `DELETE /api/salaries/:id` - Delete salary record

### Reports
- `GET /api/reports/monthly-payroll?month=<month>` - Generate monthly payroll report

## Initial Department Data
The system comes pre-populated with the following departments:
- **CW** - Carwash: 300,000 RWF (20,000 RWF deduction)
- **ST** - Stock: 200,000 RWF (5,000 RWF deduction)
- **MC** - Mechanic: 450,000 RWF (40,000 RWF deduction)
- **ADMS** - Administration Staff: 600,000 RWF (70,000 RWF deduction)

## Usage Instructions

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Login with default credentials
4. Navigate through the menu to manage employees, departments, and salaries
5. Generate monthly payroll reports from the Reports section

## Technical Stack
- **Backend**: Node.js, Express.js, MySQL, Express Sessions
- **Frontend**: React.js, React Router, Axios, Tailwind CSS
- **Database**: MySQL
- **Authentication**: Session-based

## Project Completion Checklist
- [x] ERD designed and implemented
- [x] Database created with proper relationships
- [x] Backend environment set up
- [x] Frontend environment set up
- [x] React components created
- [x] CRUD operations implemented
- [x] User authentication system
- [x] Frontend-backend integration
- [x] Monthly payroll report generation
- [x] Responsive design implemented
- [x] Project properly named and organized
