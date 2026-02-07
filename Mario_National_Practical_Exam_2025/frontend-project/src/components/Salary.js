import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Salary = () => {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    GrossSalary: '',
    TotalDeduction: '',
    NetSalary: '',
    month: '',
    employeeNumber: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSalaries();
    fetchEmployees();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get('/api/salaries');
      setSalaries(response.data);
    } catch (err) {
      setError('Failed to fetch salaries');
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-calculate Net Salary when Gross or Deduction changes
      if (name === 'GrossSalary' || name === 'TotalDeduction') {
        const gross = parseFloat(newData.GrossSalary) || 0;
        const deduction = parseFloat(newData.TotalDeduction) || 0;
        newData.NetSalary = (gross - deduction).toString();
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const salaryData = {
        ...formData,
        GrossSalary: parseFloat(formData.GrossSalary),
        TotalDeduction: parseFloat(formData.TotalDeduction),
        NetSalary: parseFloat(formData.NetSalary)
      };

      if (editingId) {
        await axios.put(`/api/salaries/${editingId}`, salaryData);
        setMessage('Salary record updated successfully');
        setEditingId(null);
      } else {
        await axios.post('/api/salaries', salaryData);
        setMessage('Salary record added successfully');
      }

      setFormData({
        GrossSalary: '',
        TotalDeduction: '',
        NetSalary: '',
        month: '',
        employeeNumber: ''
      });
      fetchSalaries();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save salary record');
    }
  };

  const handleEdit = (salary) => {
    setFormData({
      GrossSalary: salary.GrossSalary.toString(),
      TotalDeduction: salary.TotalDeduction.toString(),
      NetSalary: salary.NetSalary.toString(),
      month: salary.month,
      employeeNumber: salary.employeeNumber
    });
    setEditingId(salary.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this salary record?')) {
      try {
        await axios.delete(`/api/salaries/${id}`);
        setMessage('Salary record deleted successfully');
        fetchSalaries();
      } catch (err) {
        setError('Failed to delete salary record');
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      GrossSalary: '',
      TotalDeduction: '',
      NetSalary: '',
      month: '',
      employeeNumber: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Salary Management</h1>
              <p className="text-yellow-100">Process and manage employee salaries</p>
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
          {/* Salary Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              {editingId ? 'Edit Salary Record' : 'Add New Salary Record'}
            </h2>
            
            {message && <div className="success-message mb-4">{message}</div>}
            {error && <div className="error-message mb-4">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="employeeNumber">Employee:</label>
                <select
                  id="employeeNumber"
                  name="employeeNumber"
                  value={formData.employeeNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.employeeNumber} value={employee.employeeNumber}>
                      {employee.FirstName} {employee.LastName} - {employee.Position}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="month">Month:</label>
                <input
                  type="text"
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                  placeholder="e.g., January 2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="form-group">
                <label htmlFor="NetSalary">Net Salary (RWF):</label>
                <input
                  type="number"
                  id="NetSalary"
                  name="NetSalary"
                  value={formData.NetSalary}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="Auto-calculated"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  readOnly
                />
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
                >
                  {editingId ? 'Update Salary' : 'Add Salary'}
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Salary List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Salary Records</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Employee</th>
                    <th className="px-4 py-2 text-left">Month</th>
                    <th className="px-4 py-2 text-right">Gross</th>
                    <th className="px-4 py-2 text-right">Net</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salaries.map((salary) => {
                    const employee = employees.find(emp => emp.employeeNumber === salary.employeeNumber);
                    return (
                      <tr key={salary.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">
                          {employee ? `${employee.FirstName} ${employee.LastName}` : 'Unknown'}
                        </td>
                        <td className="px-4 py-2">{salary.month}</td>
                        <td className="px-4 py-2 text-right">{salary.GrossSalary.toLocaleString()} RWF</td>
                        <td className="px-4 py-2 text-right font-semibold text-green-600">
                          {salary.NetSalary.toLocaleString()} RWF
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => handleEdit(salary)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(salary.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {salaries.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No salary records found. Add your first salary record using the form.
                </div>
              )}
            </div>

            {/* Summary Statistics */}
            {salaries.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Summary Statistics:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Total Records:</strong> {salaries.length}</p>
                    <p><strong>Total Gross Paid:</strong> {
                      salaries.reduce((sum, salary) => sum + salary.GrossSalary, 0).toLocaleString()
                    } RWF</p>
                  </div>
                  <div>
                    <p><strong>Total Net Paid:</strong> {
                      salaries.reduce((sum, salary) => sum + salary.NetSalary, 0).toLocaleString()
                    } RWF</p>
                    <p><strong>Total Deductions:</strong> {
                      salaries.reduce((sum, salary) => sum + salary.TotalDeduction, 0).toLocaleString()
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

export default Salary;
