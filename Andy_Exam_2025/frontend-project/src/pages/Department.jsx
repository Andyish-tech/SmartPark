import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faFingerprint,
    faSuitcase,
    faMoneyBillWave,
    faMinusCircle,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

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
            <div className="flex justify-between items-end mb-12 border-b-2 border-charcoal/5 pb-8">
                <div>
                    <h1 className="text-4xl font-black text-charcoal">Department <span className="text-emerald italic">Registry</span></h1>
                    <p className="text-charcoal/40 font-bold uppercase tracking-widest text-[10px] mt-2">Organizational Structural Architecture</p>
                </div>
                {message && (
                    <div className="bg-softlime text-charcoal text-[10px] font-black px-6 py-2 rounded-full animate-bounce flex items-center gap-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-emerald" /> {message}
                    </div>
                )}
            </div>

            <div className="bg-white p-12 rounded-[40px] shadow-2xl shadow-charcoal/5 border border-charcoal/5 mb-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald"></div>
                <h2 className="text-xl font-black text-charcoal mb-10 flex items-center gap-3 uppercase tracking-tight">
                    <FontAwesomeIcon icon={faBuilding} className="text-emerald" /> Configure New Business Unit
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-2">Unique Identity Code</label>
                        <div className="relative">
                            <FontAwesomeIcon icon={faFingerprint} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20" />
                            <input
                                className="w-full p-5 pl-12 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-[20px] outline-none transition font-black text-charcoal"
                                placeholder="e.g. EXEC"
                                value={formData.departmentCode}
                                onChange={(e) => setFormData({ ...formData, departmentCode: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-2">Official Designation</label>
                        <div className="relative">
                            <FontAwesomeIcon icon={faSuitcase} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20" />
                            <input
                                className="w-full p-5 pl-12 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-[20px] outline-none transition font-black text-charcoal"
                                placeholder="e.g. Executive Board"
                                value={formData.departmentName}
                                onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-2">Revenue Baseline (Gross)</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20 font-black text-xs">RWF</span>
                            <input
                                className="w-full p-5 pl-16 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-[20px] outline-none transition font-black text-charcoal"
                                placeholder="0.00"
                                type="number"
                                value={formData.grossSalary}
                                onChange={(e) => setFormData({ ...formData, grossSalary: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-2">Statutory Deductions</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20 font-black text-xs">RWF</span>
                            <input
                                className="w-full p-5 pl-16 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-[20px] outline-none transition font-black text-charcoal"
                                placeholder="0.00"
                                type="number"
                                value={formData.totalDeduction}
                                onChange={(e) => setFormData({ ...formData, totalDeduction: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <button className="md:col-span-2 bg-charcoal text-white font-black py-6 rounded-[24px] hover:bg-emerald transition-all duration-500 shadow-2xl shadow-charcoal/10 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3">
                        <FontAwesomeIcon icon={faCheckCircle} /> Commit Business Unit to Registry
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-charcoal/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-charcoal/5">
                        <tr>
                            <th className="p-8 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px]">Identification</th>
                            <th className="p-8 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px]">Business Unit Title</th>
                            <th className="p-8 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px]">Gross Asset Baseline</th>
                            <th className="p-8 font-black text-charcoal/30 uppercase tracking-[0.2em] text-[10px]">Liability Factor</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {departments.map((dept) => (
                            <tr key={dept.departmentCode} className="hover:bg-softlime/5 transition-colors group">
                                <td className="p-8">
                                    <span className="bg-charcoal text-white px-4 py-2 rounded-xl text-[10px] font-black tracking-widest shadow-md">
                                        <FontAwesomeIcon icon={faFingerprint} className="mr-2 text-emerald" /> {dept.departmentCode}
                                    </span>
                                </td>
                                <td className="p-8 font-black text-charcoal group-hover:text-emerald transition-colors">{dept.departmentName}</td>
                                <td className="p-8 font-bold text-charcoal flex items-center gap-2">
                                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-emerald text-xs" /> RWF {parseFloat(dept.grossSalary).toLocaleString()}
                                </td>
                                <td className="p-8 text-red-400 font-bold">
                                    <FontAwesomeIcon icon={faMinusCircle} className="mr-2 text-[10px]" /> RWF {parseFloat(dept.totalDeduction).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Department;
