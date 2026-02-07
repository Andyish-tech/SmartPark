import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    DepartmentCode: '',
    DepartmentName: '',
    GrossSalary: '',
    TotalDeduction: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

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
      const response = await axios.post('/api/departments', {
        ...formData,
        GrossSalary: parseFloat(formData.GrossSalary),
        TotalDeduction: parseFloat(formData.TotalDeduction)
      });
      setMessage(response.data.message);
      setFormData({
        DepartmentCode: '',
        DepartmentName: '',
        GrossSalary: '',
        TotalDeduction: ''
      });
      fetchDepartments();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add department');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Department Management</h1>
              <p className="text-green-100">Manage departments and salary structures</p>
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
          {/* Department Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Add New Department</h2>
            
            {message && <div className="success-message mb-4">{message}</div>}
            {error && <div className="error-message mb-4">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="DepartmentCode">Department Code:</label>
                <input
                  type="text"
                  id="DepartmentCode"
                  name="DepartmentCode"
                  value={formData.DepartmentCode}
                  onChange={handleChange}
                  required
                  placeholder="e.g., CW, ST, MC, ADMS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="form-group">
                <label htmlFor="DepartmentName">Department Name:</label>
                <input
                  type="text"
                  id="DepartmentName"
                  name="DepartmentName"
                  value={formData.DepartmentName}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Carwash, Stock, Mechanic"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="form-group">
                <label htmlFor="GrossSalary">Gross Salary (RWF):</label>
                <input
                  type="number"
                  id="GrossSalary"
                  name="GrossSalary"
                  value={formData.GrossSalary}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="e.g., 300000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="form-group">
                <label htmlFor="TotalDeduction">Total Deduction (RWF):</label>
                <input
                  type="number"
                  id="TotalDeduction"
                  name="TotalDeduction"
                  value={formData.TotalDeduction}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="e.g., 20000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-200"
              >
                Add Department
              </button>
            </form>

            {/* Initial Data Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Initial Department Data:</h3>
              <div className="text-sm text-gray-700">
                <p><strong>CW:</strong> Carwash - 300,000 RWF (20,000 RWF deduction)</p>
                <p><strong>ST:</strong> Stock - 200,000 RWF (5,000 RWF deduction)</p>
                <p><strong>MC:</strong> Mechanic - 450,000 RWF (40,000 RWF deduction)</p>
                <p><strong>ADMS:</strong> Administration Staff - 600,000 RWF (70,000 RWF deduction)</p>
              </div>
            </div>
          </div>

          {/* Department List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Department List</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Code</th>
                    <th className="px-4 py-2 text-left">Department Name</th>
                    <th className="px-4 py-2 text-right">Gross Salary</th>
                    <th className="px-4 py-2 text-right">Deduction</th>
                    <th className="px-4 py-2 text-right">Net Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => {
                    const netSalary = dept.GrossSalary - dept.TotalDeduction;
                    return (
                      <tr key={dept.DepartmentCode} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 font-semibold">{dept.DepartmentCode}</td>
                        <td className="px-4 py-2">{dept.DepartmentName}</td>
                        <td className="px-4 py-2 text-right">{dept.GrossSalary.toLocaleString()} RWF</td>
                        <td className="px-4 py-2 text-right">{dept.TotalDeduction.toLocaleString()} RWF</td>
                        <td className="px-4 py-2 text-right font-semibold text-green-600">
                          {netSalary.toLocaleString()} RWF
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {departments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No departments found. Add your first department using the form.
                </div>
              )}
            </div>

            {/* Summary Statistics */}
            {departments.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Summary Statistics:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Total Departments:</strong> {departments.length}</p>
                    <p><strong>Avg Gross Salary:</strong> {
                      Math.round(departments.reduce((sum, dept) => sum + dept.GrossSalary, 0) / departments.length).toLocaleString()
                    } RWF</p>
                  </div>
                  <div>
                    <p><strong>Avg Deduction:</strong> {
                      Math.round(departments.reduce((sum, dept) => sum + dept.TotalDeduction, 0) / departments.length).toLocaleString()
                    } RWF</p>
                    <p><strong>Avg Net Salary:</strong> {
                      Math.round(departments.reduce((sum, dept) => sum + (dept.GrossSalary - dept.TotalDeduction), 0) / departments.length).toLocaleString()
                    } RWF</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Department;
