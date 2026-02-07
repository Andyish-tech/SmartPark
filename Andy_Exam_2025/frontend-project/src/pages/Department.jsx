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
            setMessage('Asset Created Successfully');
            setFormData({ departmentCode: '', departmentName: '', grossSalary: '', totalDeduction: '' });
            fetchDepartments();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            alert(err.response?.data?.error || 'Registry Error');
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-6">
            <div className="flex justify-between items-end mb-12 border-b-2 border-charcoal/5 pb-6">
                <div>
                    <h1 className="text-4xl font-black text-charcoal">Department <span className="text-emerald italic">Registry</span></h1>
                    <p className="text-charcoal/40 font-bold uppercase tracking-widest text-[10px] mt-1">Organizational Architecture</p>
                </div>
                {message && <div className="bg-softlime text-charcoal text-xs font-black px-4 py-2 rounded-full animate-bounce">{message}</div>}
            </div>

            <div className="bg-white p-10 rounded-[32px] shadow-2xl shadow-charcoal/5 border border-charcoal/5 mb-12">
                <h2 className="text-xl font-black text-charcoal mb-8 border-l-4 border-emerald pl-4 uppercase tracking-tight">Define New Unit</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 ml-1">Unique Code</label>
                        <input
                            className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl outline-none transition font-bold text-charcoal"
                            placeholder="e.g. EXEC"
                            value={formData.departmentCode}
                            onChange={(e) => setFormData({ ...formData, departmentCode: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 ml-1">Full Name</label>
                        <input
                            className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl outline-none transition font-bold text-charcoal"
                            placeholder="e.g. Executive Board"
                            value={formData.departmentName}
                            onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 ml-1">Base Gross Salary</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 font-bold">RWF</span>
                            <input
                                className="w-full p-4 pl-14 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl outline-none transition font-bold text-charcoal"
                                placeholder="0.00"
                                type="number"
                                value={formData.grossSalary}
                                onChange={(e) => setFormData({ ...formData, grossSalary: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 ml-1">Standard Deductions</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 font-bold">RWF</span>
                            <input
                                className="w-full p-4 pl-14 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl outline-none transition font-bold text-charcoal"
                                placeholder="0.00"
                                type="number"
                                value={formData.totalDeduction}
                                onChange={(e) => setFormData({ ...formData, totalDeduction: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <button className="md:col-span-2 bg-charcoal text-white font-black py-5 rounded-2xl hover:bg-emerald transition-all duration-300 shadow-xl shadow-charcoal/10 uppercase tracking-widest text-sm">
                        Commit to Registry
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-[32px] shadow-2xl shadow-charcoal/5 border border-charcoal/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-charcoal/5">
                        <tr>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Ident</th>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Title</th>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Gross Baseline</th>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Deduction</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {departments.map((dept) => (
                            <tr key={dept.departmentCode} className="hover:bg-softlime/5 transition-colors group">
                                <td className="p-6">
                                    <span className="bg-charcoal text-white px-3 py-1 rounded-lg text-xs font-black tracking-widest">{dept.departmentCode}</span>
                                </td>
                                <td className="p-6 font-black text-charcoal group-hover:text-emerald transition-colors">{dept.departmentName}</td>
                                <td className="p-6 font-bold text-charcoal">RWF {parseFloat(dept.grossSalary).toLocaleString()}</td>
                                <td className="p-6 text-red-500 font-bold">RWF {parseFloat(dept.totalDeduction).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Department;
