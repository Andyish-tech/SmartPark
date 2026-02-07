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
            alert('Personnel Registered');
            setFormData({
                employeeNumber: '', firstName: '', lastName: '', position: '',
                address: '', telephone: '', gender: 'Male', hiredDate: '', departmentCode: ''
            });
            fetchData();
        } catch (err) { alert(err.response?.data?.error || 'Registry Error'); }
    };

    return (
        <div className="max-w-6xl mx-auto py-6">
            <div className="mb-12 border-b-2 border-charcoal/5 pb-6">
                <h1 className="text-4xl font-black text-charcoal uppercase tracking-tighter">Workforce <span className="text-emerald italic">Directory</span></h1>
                <p className="text-charcoal/40 font-bold uppercase tracking-widest text-[10px] mt-1">Portfolio of Active Human Capital</p>
            </div>

            <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-charcoal/5 border border-charcoal/5 mb-12">
                <h2 className="text-xl font-black text-charcoal mb-8 border-l-4 border-emerald pl-4 uppercase tracking-tight">Onboard New Personnel</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Staff ID</label>
                        <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none" placeholder="EMP-001" value={formData.employeeNumber} onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Given Name</label>
                        <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none" placeholder="John" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Surname</label>
                        <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none" placeholder="Doe" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Rank / Position</label>
                        <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none" placeholder="Senior Manager" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Communication</label>
                        <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none" placeholder="+250..." value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Gender</label>
                        <select className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Commissioning Date</label>
                        <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none" type="date" value={formData.hiredDate} onChange={(e) => setFormData({ ...formData, hiredDate: e.target.value })} required />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Assigned Department</label>
                        <select className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none" value={formData.departmentCode} onChange={(e) => setFormData({ ...formData, departmentCode: e.target.value })} required>
                            <option value="">Select Portfolio</option>
                            {departments.map(d => <option key={d.departmentCode} value={d.departmentCode}>{d.departmentName}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-3 space-y-1">
                        <label className="text-[10px] font-black uppercase text-charcoal/40 ml-1">Physical Address</label>
                        <textarea className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl font-bold outline-none" placeholder="123 Elite District" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                    </div>
                    <button className="md:col-span-3 bg-charcoal text-white font-black py-5 rounded-2xl hover:bg-emerald transition-all shadow-xl shadow-charcoal/5 uppercase tracking-widest text-sm">Deploy Personnel</button>
                </form>
            </div>

            <div className="bg-white rounded-[40px] shadow-2xl shadow-charcoal/5 border border-charcoal/5 overflow-hidden">
                <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-charcoal/5">
                        <tr>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Staff Ident</th>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Full Professional Name</th>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Rank</th>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Portfolio</th>
                            <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Tenure Start</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {employees.map((emp) => (
                            <tr key={emp.employeeNumber} className="hover:bg-softlime/5 transition-colors group">
                                <td className="p-6 font-mono text-xs font-bold text-charcoal/60">{emp.employeeNumber}</td>
                                <td className="p-6 font-black text-charcoal group-hover:text-emerald transition-colors">{emp.firstName} {emp.lastName}</td>
                                <td className="p-6 text-charcoal font-medium italic">{emp.position}</td>
                                <td className="p-6"><span className="bg-emerald/10 text-emerald px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{emp.departmentName}</span></td>
                                <td className="p-6 text-charcoal/40 text-[11px] font-bold">{new Date(emp.hiredDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employee;
