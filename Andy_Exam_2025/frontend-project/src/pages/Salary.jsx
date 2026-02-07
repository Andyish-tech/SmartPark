import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMoneyBillWave,
    faUserCircle,
    faCalendarAlt,
    faEdit,
    faTrashAlt,
    faTimes,
    faCheckDouble,
    faWallet
} from '@fortawesome/free-solid-svg-icons';

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
        } catch (err) { alert('Transaction Verification Failed'); }
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
        if (window.confirm('Are you certain you wish to purge this financial record from the registry?')) {
            await api.delete(`/salaries/${id}`);
            fetchData();
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-6 pb-20">
            <div className="mb-12 border-b-2 border-charcoal/5 pb-8">
                <h1 className="text-4xl font-black text-charcoal uppercase tracking-tighter">Treasury <span className="text-emerald italic">Disbursements</span></h1>
                <p className="text-charcoal/40 font-bold uppercase tracking-widest text-[10px] mt-2">Executive Financial Payroll Operations Portfolio</p>
            </div>

            <div className="bg-white p-12 rounded-[40px] shadow-2xl shadow-emerald/5 border border-charcoal/5 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-softlime/10 rounded-full -mr-16 -mt-16"></div>
                <h2 className="text-xl font-black text-charcoal mb-10 border-l-4 border-emerald pl-5 uppercase tracking-tight flex items-center gap-3">
                    <FontAwesomeIcon icon={faWallet} className="text-emerald" />
                    {editingId ? 'Modify Strategic Payout' : 'Authorize New Asset Disbursement'}
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                    <div className="md:col-span-1 space-y-2">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-2">Strategic Payee</label>
                        <div className="relative">
                            <FontAwesomeIcon icon={faUserCircle} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20" />
                            <select className="w-full p-5 pl-12 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-black outline-none appearance-none transition" value={formData.employeeNumber} onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })} required disabled={!!editingId}>
                                <option value="">Select Personnel</option>
                                {employees.map(e => <option key={e.employeeNumber} value={e.employeeNumber}>{e.firstName} {e.lastName}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-2">Gross Asset (RWF)</label>
                        <div className="relative">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20" />
                            <input className="w-full p-5 pl-12 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-black outline-none transition" placeholder="0" type="number" value={formData.grossSalary} onChange={(e) => setFormData({ ...formData, grossSalary: e.target.value })} required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-2">Liability (RWF)</label>
                        <div className="relative font-sans">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20 font-black">-</span>
                            <input className="w-full p-5 pl-12 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-black outline-none transition" placeholder="0" type="number" value={formData.totalDeduction} onChange={(e) => setFormData({ ...formData, totalDeduction: e.target.value })} required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-2">Fiscal Month</label>
                        <div className="relative">
                            <FontAwesomeIcon icon={faCalendarAlt} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20" />
                            <input className="w-full p-5 pl-12 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-black outline-none transition" type="month" value={formData.month} onChange={(e) => setFormData({ ...formData, month: e.target.value })} required />
                        </div>
                    </div>
                    <div className="md:col-span-4 flex gap-6 mt-4">
                        <button className="flex-1 bg-charcoal text-white font-black py-6 rounded-2xl hover:bg-emerald transition-all duration-500 shadow-2xl shadow-charcoal/10 uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3">
                            <FontAwesomeIcon icon={faCheckDouble} /> {editingId ? 'Confirm Strategic Revision' : 'Execute Asset Disbursement'}
                        </button>
                        {editingId && (
                            <button type="button" onClick={() => { setEditingId(null); setFormData({ employeeNumber: '', grossSalary: '', totalDeduction: '', month: '' }) }} className="bg-white border-2 border-charcoal/10 text-charcoal/40 px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-red-500 hover:text-red-500 transition-all flex items-center gap-2">
                                <FontAwesomeIcon icon={faTimes} /> Abort
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-charcoal/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-charcoal/5">
                        <tr>
                            <th className="p-8 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px]">Strategic Recipient</th>
                            <th className="p-8 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px]">Fiscal Period</th>
                            <th className="p-8 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px]">Gross Asset</th>
                            <th className="p-8 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px]">Liability</th>
                            <th className="p-8 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px]">Net Value</th>
                            <th className="p-8 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px] text-right">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {salaries.map((sal) => (
                            <tr key={sal.salaryId} className="hover:bg-softlime/5 transition-all group">
                                <td className="p-8 font-black text-charcoal group-hover:text-emerald transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-bold shadow-lg">
                                            {sal.firstName.charAt(0)}{sal.lastName.charAt(0)}
                                        </div>
                                        {sal.firstName} {sal.lastName}
                                    </div>
                                </td>
                                <td className="p-8 text-charcoal/40 font-mono text-[11px] font-black uppercase tracking-wider">{sal.month}</td>
                                <td className="p-8 font-bold text-charcoal">RWF {parseFloat(sal.grossSalary).toLocaleString()}</td>
                                <td className="p-8 text-red-400 font-bold text-sm tracking-tighter italic">- RWF {parseFloat(sal.totalDeduction).toLocaleString()}</td>
                                <td className="p-8">
                                    <span className="bg-emerald text-white px-5 py-2 rounded-full font-black text-[10px] shadow-xl shadow-emerald/20 uppercase tracking-widest leading-none">
                                        RWF {parseFloat(sal.netSalary).toLocaleString()}
                                    </span>
                                </td>
                                <td className="p-8 text-right space-x-6">
                                    <button onClick={() => handleEdit(sal)} className="text-[10px] font-black uppercase tracking-widest text-charcoal/30 hover:text-emerald transition-all transform hover:scale-110">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={() => handleDelete(sal.salaryId)} className="text-[10px] font-black uppercase tracking-widest text-charcoal/30 hover:text-red-500 transition-all transform hover:scale-110">
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
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
