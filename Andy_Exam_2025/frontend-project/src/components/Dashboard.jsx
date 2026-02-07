import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      setAuth(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setAuth(false);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Employee Payroll Management System</h1>
              <p className="text-blue-100">SmartPark - Rubavu District</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 py-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/employees"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Employees
            </Link>
            <Link
              to="/departments"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Departments
            </Link>
            <Link
              to="/salaries"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Salaries
            </Link>
            <Link
              to="/reports"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Reports
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome to EPMS Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Employee Management</h3>
              <p className="text-gray-600 mb-4">Add and manage employee records</p>
              <Link
                to="/employees"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Manage Employees
              </Link>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Department Management</h3>
              <p className="text-gray-600 mb-4">Manage departments and salary structures</p>
              <Link
                to="/departments"
                className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              >
                Manage Departments
              </Link>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Salary Management</h3>
              <p className="text-gray-600 mb-4">Process and manage employee salaries</p>
              <Link
                to="/salaries"
                className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
              >
                Manage Salaries
              </Link>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Reports</h3>
              <p className="text-gray-600 mb-4">Generate monthly payroll reports</p>
              <Link
                to="/reports"
                className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
              >
                View Reports
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600"><strong>Company:</strong> SmartPark</p>
                <p className="text-gray-600"><strong>Location:</strong> Rubavu District, Western Province, Rwanda</p>
                <p className="text-gray-600"><strong>System:</strong> Employee Payroll Management System</p>
              </div>
              <div>
                <p className="text-gray-600"><strong>Exam:</strong> National Practical Exam 2025</p>
                <p className="text-gray-600"><strong>School:</strong> ST KIZITO SAVE TVET SCHOOL</p>
                <p className="text-gray-600"><strong>Version:</strong> 1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
