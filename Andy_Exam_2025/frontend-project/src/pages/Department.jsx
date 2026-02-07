import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        departmentCode: '',
        departmentName: '',
        grossSalary: '',
        totalDeduction: ''
    });
    const [message, setMessage] = useState('');

    const fetchDepartments = async () => {
        try {
            const response = await api.get('/departments');
            setDepartments(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/departments', formData);
            setMessage('Department created successfully!');
            setFormData({ departmentCode: '', departmentName: '', grossSalary: '', totalDeduction: '' });
            fetchDepartments();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            alert(err.response?.data?.error || 'Error creating department');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-indigo-200 pb-2">Department Management</h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Department</h2>
                {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">{message}</div>}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Department Code (e.g. IT)"
                        value={formData.departmentCode}
                        onChange={(e) => setFormData({ ...formData, departmentCode: e.target.value })}
                        required
                    />
                    <input
                        className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Department Name"
                        value={formData.departmentName}
                        onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                        required
                    />
                    <input
                        className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Gross Salary"
                        type="number"
                        value={formData.grossSalary}
                        onChange={(e) => setFormData({ ...formData, grossSalary: e.target.value })}
                        required
                    />
                    <input
                        className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Total Deduction"
                        type="number"
                        value={formData.totalDeduction}
                        onChange={(e) => setFormData({ ...formData, totalDeduction: e.target.value })}
                        required
                    />
                    <button className="md:col-span-2 bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-700 transition">
                        Add Department
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Code</th>
                            <th className="p-4 font-semibold text-gray-600">Name</th>
                            <th className="p-4 font-semibold text-gray-600">Gross Salary</th>
                            <th className="p-4 font-semibold text-gray-600">Deduction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dept) => (
                            <tr key={dept.departmentCode} className="border-b hover:bg-gray-50">
                                <td className="p-4">{dept.departmentCode}</td>
                                <td className="p-4 font-medium">{dept.departmentName}</td>
                                <td className="p-4">RWF {parseFloat(dept.grossSalary).toLocaleString()}</td>
                                <td className="p-4 text-red-500">RWF {parseFloat(dept.totalDeduction).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Department;
