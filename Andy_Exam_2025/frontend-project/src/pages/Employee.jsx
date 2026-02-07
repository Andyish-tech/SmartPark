import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        employeeNumber: '', firstName: '', lastName: '', position: '',
        address: '', telephone: '', gender: 'Male', hiredDate: '', departmentCode: ''
    });

    const fetchData = async () => {
        try {
            const [empRes, deptRes] = await Promise.all([
                api.get('/employees'),
                api.get('/departments')
            ]);
            setEmployees(empRes.data);
            setDepartments(deptRes.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/employees', formData);
            alert('Employee added successfully');
            setFormData({
                employeeNumber: '', firstName: '', lastName: '', position: '',
                address: '', telephone: '', gender: 'Male', hiredDate: '', departmentCode: ''
            });
            fetchData();
        } catch (err) { alert(err.response?.data?.error || 'Error'); }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-indigo-200 pb-2">Employee Directory</h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Register New Employee</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input className="p-2 border rounded" placeholder="Employee Number" value={formData.employeeNumber} onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })} required />
                    <input className="p-2 border rounded" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                    <input className="p-2 border rounded" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                    <input className="p-2 border rounded" placeholder="Position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required />
                    <input className="p-2 border rounded" placeholder="Telephone" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} />
                    <select className="p-2 border rounded" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input className="p-2 border rounded" type="date" value={formData.hiredDate} onChange={(e) => setFormData({ ...formData, hiredDate: e.target.value })} required />
                    <select className="p-2 border rounded" value={formData.departmentCode} onChange={(e) => setFormData({ ...formData, departmentCode: e.target.value })} required>
                        <option value="">Select Department</option>
                        {departments.map(d => <option key={d.departmentCode} value={d.departmentCode}>{d.departmentName}</option>)}
                    </select>
                    <textarea className="p-2 border rounded md:col-span-3" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                    <button className="md:col-span-3 bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-700 transition">Add Employee</button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">ID</th>
                            <th className="p-4 font-semibold text-gray-600">Full Name</th>
                            <th className="p-4 font-semibold text-gray-600">Position</th>
                            <th className="p-4 font-semibold text-gray-600">Department</th>
                            <th className="p-4 font-semibold text-gray-600">Hired Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.employeeNumber} className="border-b hover:bg-gray-50">
                                <td className="p-4">{emp.employeeNumber}</td>
                                <td className="p-4 font-medium">{emp.firstName} {emp.lastName}</td>
                                <td className="p-4 text-gray-600">{emp.position}</td>
                                <td className="p-4"><span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold">{emp.departmentName}</span></td>
                                <td className="p-4 text-gray-500">{new Date(emp.hiredDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employee;
