import React, { useState } from 'react';
import api from '../services/api';

const Reports = () => {
    const [month, setMonth] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFilter = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.get(`/reports/payroll?month=${month}`);
            setData(response.data);
        } catch (err) { alert('Error fetching report'); }
        finally { setLoading(false); }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-indigo-200 pb-2">Payroll Reports</h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 flex items-end gap-4 shadow-sm">
                <div className="flex-1">
                    <label className="block text-gray-600 text-sm font-bold mb-1">Select Month (YYYY-MM)</label>
                    <input
                        type="month"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleFilter}
                    disabled={!month || loading}
                    className="bg-indigo-600 text-white px-8 py-2 rounded font-bold hover:bg-indigo-700 disabled:bg-gray-400 transition"
                >
                    {loading ? 'Generating...' : 'View Report'}
                </button>
            </div>

            {data.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden print:shadow-none">
                    <div className="p-6 bg-gray-50 border-b text-center">
                        <h2 className="text-xl font-bold text-gray-700">Monthly Payroll Summary</h2>
                        <p className="text-gray-500 text-sm">Period: {month}</p>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="p-4 font-semibold text-gray-700">Employee Name</th>
                                <th className="p-4 font-semibold text-gray-700">Position</th>
                                <th className="p-4 font-semibold text-gray-700">Department</th>
                                <th className="p-4 font-semibold text-gray-700">Net Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 font-medium">{row.firstName} {row.lastName}</td>
                                    <td className="p-4 text-gray-600 italic">{row.position}</td>
                                    <td className="p-4"><span className="text-indigo-600 font-semibold">{row.departmentName}</span></td>
                                    <td className="p-4 font-bold text-green-700">RWF {parseFloat(row.netSalary).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 bg-gray-50 border-t flex justify-between items-center px-8">
                        <span className="font-bold text-gray-700 uppercase tracking-wider">Total Net Payroll:</span>
                        <span className="text-xl font-extrabold text-indigo-700">
                            RWF {data.reduce((acc, curr) => acc + parseFloat(curr.netSalary), 0).toLocaleString()}
                        </span>
                    </div>
                </div>
            ) : month && !loading && (
                <div className="bg-yellow-50 text-yellow-800 p-8 rounded-lg text-center border border-yellow-200 font-medium">
                    No payroll records found for this month.
                </div>
            )}
        </div>
    );
};

export default Reports;
