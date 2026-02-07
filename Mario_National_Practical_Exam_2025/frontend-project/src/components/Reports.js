import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summaryStats, setSummaryStats] = useState({
    totalEmployees: 0,
    totalNetSalary: 0,
    averageNetSalary: 0
  });

  const months = [
    'January 2025', 'February 2025', 'March 2025', 'April 2025',
    'May 2025', 'June 2025', 'July 2025', 'August 2025',
    'September 2025', 'October 2025', 'November 2025', 'December 2025'
  ];

  const generateReport = async () => {
    if (!selectedMonth) {
      setError('Please select a month');
      return;
    }

    setLoading(true);
    setError('');
    setReportData([]);

    try {
      const response = await axios.get(`/api/reports/monthly-payroll?month=${encodeURIComponent(selectedMonth)}`);
      setReportData(response.data);
      
      // Calculate summary statistics
      const totalNet = response.data.reduce((sum, emp) => sum + emp.NetSalary, 0);
      setSummaryStats({
        totalEmployees: response.data.length,
        totalNetSalary: totalNet,
        averageNetSalary: response.data.length > 0 ? totalNet / response.data.length : 0
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (reportData.length === 0) {
      setError('No data to export');
      return;
    }

    const headers = ['First Name', 'Last Name', 'Position', 'Department', 'Net Salary (RWF)'];
    const csvContent = [
      headers.join(','),
      ...reportData.map(emp => [
        emp.FirstName,
        emp.LastName,
        emp.Position,
        emp.Department,
        emp.NetSalary
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monthly_payroll_${selectedMonth.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Monthly Payroll Reports</h1>
              <p className="text-purple-100">Generate and export monthly payroll reports</p>
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
        {/* Report Generation Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Generate Monthly Payroll Report</h2>
          
          {error && <div className="error-message mb-4">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="form-group">
              <label htmlFor="month">Select Month:</label>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose a month...</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <button
              onClick={generateReport}
              disabled={loading}
              className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 disabled:bg-gray-400 transition duration-200"
            >
              {loading ? 'Generating...' : 'Generate Report'}
            </button>

            {reportData.length > 0 && (
              <button
                onClick={exportToCSV}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-200"
              >
                Export to CSV
              </button>
            )}
          </div>
        </div>

        {/* Summary Statistics */}
        {reportData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Employees</h3>
              <p className="text-3xl font-bold text-blue-600">{summaryStats.totalEmployees}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Net Salary</h3>
              <p className="text-3xl font-bold text-green-600">
                {summaryStats.totalNetSalary.toLocaleString()} RWF
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Average Net Salary</h3>
              <p className="text-3xl font-bold text-purple-600">
                {Math.round(summaryStats.averageNetSalary).toLocaleString()} RWF
              </p>
            </div>
          </div>
        )}

        {/* Report Table */}
        {reportData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Monthly Payroll Report - {selectedMonth}
              </h2>
              <div className="text-sm text-gray-600">
                Generated on: {new Date().toLocaleDateString()}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left border-b-2 border-gray-200">First Name</th>
                    <th className="px-4 py-3 text-left border-b-2 border-gray-200">Last Name</th>
                    <th className="px-4 py-3 text-left border-b-2 border-gray-200">Position</th>
                    <th className="px-4 py-3 text-left border-b-2 border-gray-200">Department</th>
                    <th className="px-4 py-3 text-right border-b-2 border-gray-200">Net Salary (RWF)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((employee, index) => (
                    <tr key={index} className="hover:bg-gray-50 border-b">
                      <td className="px-4 py-3">{employee.FirstName}</td>
                      <td className="px-4 py-3">{employee.LastName}</td>
                      <td className="px-4 py-3">{employee.Position}</td>
                      <td className="px-4 py-3">{employee.Department}</td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">
                        {employee.NetSalary.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-bold">
                    <td colSpan="4" className="px-4 py-3 text-right">Total:</td>
                    <td className="px-4 py-3 text-right text-green-600">
                      {summaryStats.totalNetSalary.toLocaleString()} RWF
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Report Footer */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p><strong>Company:</strong> SmartPark</p>
                  <p><strong>Location:</strong> Rubavu District, Western Province, Rwanda</p>
                </div>
                <div>
                  <p><strong>Report Type:</strong> Monthly Employee Payroll Report</p>
                  <p><strong>System:</strong> Employee Payroll Management System (EPMS)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!loading && reportData.length === 0 && !error && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a3 3 0 003 3h0a3 3 0 003-3v-1m3-10V4a3 3 0 00-3-3h0a3 3 0 00-3 3v3m3 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Report Generated</h3>
            <p className="text-gray-500">Select a month and click "Generate Report" to view monthly payroll data.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Reports;
