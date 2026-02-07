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
        } catch (err) { alert('Transaction Failed'); }
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
        if (window.confirm('Annul this financial record?')) {
            await api.delete(`/salaries/${id}`);
            fetchData();
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-6 pb-20">
            <div className="mb-12 border-b-2 border-charcoal/5 pb-6">
                <h1 className="text-4xl font-black text-charcoal uppercase tracking-tighter">Treasury <span className="text-emerald italic">Disbursements</span></h1>
                <p className="text-charcoal/40 font-bold uppercase tracking-widest text-[10px] mt-1">Financial Payroll Operations</p>
            </div>

            <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-emerald/5 border border-charcoal/5 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-softlime/10 rounded-full -mr-16 -mt-16"></div>
                <h2 className="text-xl font-black text-charcoal mb-8 border-l-4 border-emerald pl-4 uppercase tracking-tight">
                    {editingId ? 'Modify Transaction' : 'Authorize New Disbursement'}
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                    <div className="md:col-span-1 space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Payee</label>
                        <select className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none appearance-none" value={formData.employeeNumber} onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })} required disabled={!!editingId}>
                            <option value="">Select Personnel</option>
                            {employees.map(e => <option key={e.employeeNumber} value={e.employeeNumber}>{e.firstName} {e.lastName}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Gross (RWF)</label>
                        <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none" placeholder="0" type="number" value={formData.grossSalary} onChange={(e) => setFormData({ ...formData, grossSalary: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Deduction (RWF)</label>
                        <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none" placeholder="0" type="number" value={formData.totalDeduction} onChange={(e) => setFormData({ ...formData, totalDeduction: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Fiscal Month</label>
                        <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none" type="month" value={formData.month} onChange={(e) => setFormData({ ...formData, month: e.target.value })} required />
                    </div>
                    <div className="md:col-span-4 flex gap-4 mt-2">
                        <button className="flex-1 bg-charcoal text-white font-black py-5 rounded-2xl hover:bg-emerald transition-all duration-500 shadow-xl shadow-charcoal/10 uppercase tracking-[0.2em] text-sm">
                            {editingId ? 'Confirm Modification' : 'Execute Disbursement'}
                        </button>
                        {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ employeeNumber: '', grossSalary: '', totalDeduction: '', month: '' }) }} className="bg-white border-2 border-charcoal/10 text-charcoal/40 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-red-500 hover:text-red-500 transition">Abort</button>}
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-[40px] shadow-2xl shadow-charcoal/5 border border-charcoal/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-charcoal/5">
                        <tr>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Recipient</th>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Period</th>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Gross Asset</th>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Liability</th>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Net Value</th>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {salaries.map((sal) => (
                            <tr key={sal.salaryId} className="hover:bg-softlime/5 transition-all group">
                                <td className="p-6 font-black text-charcoal group-hover:text-emerald transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-charcoal/5 flex items-center justify-center text-[10px]">SC</div>
                                        {sal.firstName} {sal.lastName}
                                    </div>
                                </td>
                                <td className="p-6 text-charcoal/40 font-mono text-xs font-bold">{sal.month}</td>
                                <td className="p-6 font-bold text-charcoal">RWF {parseFloat(sal.grossSalary).toLocaleString()}</td>
                                <td className="p-6 text-red-400 font-bold text-sm">- RWF {parseFloat(sal.totalDeduction).toLocaleString()}</td>
                                <td className="p-6">
                                    <span className="bg-emerald text-white px-4 py-1.5 rounded-full font-black text-xs shadow-md shadow-emerald/20">
                                        RWF {parseFloat(sal.netSalary).toLocaleString()}
                                    </span>
                                </td>
                                <td className="p-6 text-right space-x-4">
                                    <button onClick={() => handleEdit(sal)} className="text-[10px] font-black uppercase tracking-tighter text-charcoal/40 hover:text-emerald transition">Edit</button>
                                    <button onClick={() => handleDelete(sal.salaryId)} className="text-[10px] font-black uppercase tracking-tighter text-charcoal/40 hover:text-red-500 transition">Purge</button>
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
