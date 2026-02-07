import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Salary = () => {
    const [salaries, setSalaries] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ employeeNumber: '', grossSalary: '', totalDeduction: '', month: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchData = async () => {
        const [salRes, empRes] = await Promise.all([api.get('/salaries'), api.get('/employees')]);
        setSalaries(salRes.data);
        setEmployees(empRes.data);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/salaries/${editingId}`, formData);
            } else {
                await api.post('/salaries', formData);
            }
            setFormData({ employeeNumber: '', grossSalary: '', totalDeduction: '', month: '' });
            setEditingId(null);
            fetchData();
        } catch (err) { alert('Operation failed'); }
    };

    const handleEdit = (sal) => {
        setEditingId(sal.salaryId);
        setFormData({
            employeeNumber: sal.employeeNumber,
            grossSalary: sal.grossSalary,
            totalDeduction: sal.totalDeduction,
            month: sal.month
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            await api.delete(`/salaries/${id}`);
            fetchData();
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-10">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-indigo-200 pb-2">Salary Management</h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">{editingId ? 'Edit Salary Record' : 'Process New Salary'}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select className="p-2 border rounded" value={formData.employeeNumber} onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })} required disabled={!!editingId}>
                        <option value="">Select Employee</option>
                        {employees.map(e => <option key={e.employeeNumber} value={e.employeeNumber}>{e.firstName} {e.lastName}</option>)}
                    </select>
                    <input className="p-2 border rounded" placeholder="Gross Salary" type="number" value={formData.grossSalary} onChange={(e) => setFormData({ ...formData, grossSalary: e.target.value })} required />
                    <input className="p-2 border rounded" placeholder="Total Deduction" type="number" value={formData.totalDeduction} onChange={(e) => setFormData({ ...formData, totalDeduction: e.target.value })} required />
                    <input className="p-2 border rounded" type="month" value={formData.month} onChange={(e) => setFormData({ ...formData, month: e.target.value })} required />
                    <div className="md:col-span-4 flex gap-4">
                        <button className="flex-1 bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-700 transition">
                            {editingId ? 'Update Record' : 'Record Salary'}
                        </button>
                        {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ employeeNumber: '', grossSalary: '', totalDeduction: '', month: '' }) }} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition">Cancel</button>}
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full text-left font-sans">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600 text-sm italic">Employee</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Month</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Gross</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Deduction</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Net Pay</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {salaries.map((sal) => (
                            <tr key={sal.salaryId} className="hover:bg-indigo-50/30 transition">
                                <td className="p-4 font-medium">{sal.firstName} {sal.lastName}</td>
                                <td className="p-4 text-gray-500">{sal.month}</td>
                                <td className="p-4">RWF {parseFloat(sal.grossSalary).toLocaleString()}</td>
                                <td className="p-4 text-red-500 font-medium">RWF {parseFloat(sal.totalDeduction).toLocaleString()}</td>
                                <td className="p-4 text-green-600 font-bold bg-green-50/50 italic">RWF {parseFloat(sal.netSalary).toLocaleString()}</td>
                                <td className="p-4 space-x-2">
                                    <button onClick={() => handleEdit(sal)} className="text-indigo-600 hover:text-indigo-900 border border-indigo-200 px-3 py-1 rounded text-sm font-semibold hover:bg-indigo-50 transition">Edit</button>
                                    <button onClick={() => handleDelete(sal.salaryId)} className="text-red-500 hover:text-red-700 border border-red-200 px-3 py-1 rounded text-sm font-semibold hover:bg-red-50 transition">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Salary;
