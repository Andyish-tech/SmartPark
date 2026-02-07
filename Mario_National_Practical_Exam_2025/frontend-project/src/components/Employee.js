import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    employeeNumber: '',
    FirstName: '',
    LastName: '',
    Position: '',
    Address: '',
    Telephone: '',
    Gender: '',
    hiredDate: '',
    DepartmentCode: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees');
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/api/departments');
      setDepartments(response.data);
    } catch (err) {
      setError('Failed to fetch departments');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('/api/employees', formData);
      setMessage(response.data.message);
      setFormData({
        employeeNumber: '',
        FirstName: '',
        LastName: '',
        Position: '',
        Address: '',
        Telephone: '',
        Gender: '',
        hiredDate: '',
        DepartmentCode: ''
      });
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add employee');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Employee Management</h1>
              <p className="text-blue-100">Add and manage employee records</p>
            </div>
            <Link
              to="/dashboard"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Employee Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Add New Employee</h2>
            
            {message && <div className="success-message mb-4">{message}</div>}
            {error && <div className="error-message mb-4">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="employeeNumber">Employee Number:</label>
                  <input
                    type="text"
                    id="employeeNumber"
                    name="employeeNumber"
                    value={formData.employeeNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="FirstName">First Name:</label>
                  <input
                    type="text"
                    id="FirstName"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="LastName">Last Name:</label>
                  <input
                    type="text"
                    id="LastName"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Position">Position:</label>
                  <input
                    type="text"
                    id="Position"
                    name="Position"
                    value={formData.Position}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Telephone">Telephone:</label>
                  <input
                    type="tel"
                    id="Telephone"
                    name="Telephone"
                    value={formData.Telephone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Gender">Gender:</label>
                  <select
                    id="Gender"
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="hiredDate">Hired Date:</label>
                  <input
                    type="date"
                    id="hiredDate"
                    name="hiredDate"
                    value={formData.hiredDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="DepartmentCode">Department:</label>
                  <select
                    id="DepartmentCode"
                    name="DepartmentCode"
                    value={formData.DepartmentCode}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.DepartmentCode} value={dept.DepartmentCode}>
                        {dept.DepartmentName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group mt-4">
                <label htmlFor="Address">Address:</label>
                <textarea
                  id="Address"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Add Employee
              </button>
            </form>
          </div>

          {/* Employee List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Employee List</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Emp No</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Position</th>
                    <th className="px-4 py-2 text-left">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employeeNumber} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{employee.employeeNumber}</td>
                      <td className="px-4 py-2">{employee.FirstName} {employee.LastName}</td>
                      <td className="px-4 py-2">{employee.Position}</td>
                      <td className="px-4 py-2">{employee.DepartmentName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {employees.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No employees found. Add your first employee using the form.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Employee;
