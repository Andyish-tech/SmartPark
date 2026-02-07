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
        } catch (err) { alert('Analysis Error'); }
        finally { setLoading(false); }
    };

    return (
        <div className="max-w-5xl mx-auto py-6">
            <div className="mb-12 flex justify-between items-end border-b-2 border-charcoal/5 pb-6">
                <div>
                    <h1 className="text-4xl font-black text-charcoal uppercase tracking-tighter">Executive <span className="text-emerald italic">Analytics</span></h1>
                    <p className="text-charcoal/40 font-bold uppercase tracking-widest text-[10px] mt-1">Strategic Payroll Audit</p>
                </div>
                <button className="text-xs font-black uppercase tracking-widest text-emerald hover:underline" onClick={() => window.print()}>Export Statement</button>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-charcoal/5 border border-charcoal/5 mb-12 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 w-full">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/40 mb-2 ml-1">Fiscal Period Selection</label>
                    <input
                        type="month"
                        className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald focus:bg-white rounded-2xl outline-none font-black text-charcoal transition"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleFilter}
                    disabled={!month || loading}
                    className="w-full md:w-auto self-end bg-emerald text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:brightness-110 disabled:bg-gray-200 transition shadow-xl shadow-emerald/20"
                >
                    {loading ? 'Synthesizing...' : 'Generate Audit'}
                </button>
            </div>

            {data.length > 0 ? (
                <div className="bg-white rounded-[40px] shadow-2xl shadow-charcoal/5 border border-charcoal/5 overflow-hidden print:border-none print:shadow-none">
                    <div className="p-10 bg-emerald text-white flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Payroll Summary Report</h2>
                            <p className="opacity-60 text-xs font-bold uppercase tracking-[0.3em] mt-1">Period Ending: {month}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black">Elite Series</div>
                            <div className="text-[10px] opacity-40 uppercase tracking-widest">Internal Audit Only</div>
                        </div>
                    </div>

                    <div className="p-8">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 rounded-xl">
                                <tr>
                                    <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Personnel</th>
                                    <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Post / Rank</th>
                                    <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px]">Business Unit</th>
                                    <th className="p-6 font-black text-charcoal/40 uppercase tracking-widest text-[10px] text-right">Net Disbursement</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-softlime/5 transition-colors">
                                        <td className="p-6 font-black text-charcoal">{row.firstName} {row.lastName}</td>
                                        <td className="p-6 text-charcoal/60 text-sm font-medium italic">{row.position}</td>
                                        <td className="p-6">
                                            <span className="bg-charcoal/5 text-charcoal px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">{row.departmentName}</span>
                                        </td>
                                        <td className="p-6 font-black text-charcoal text-right text-lg">RWF {parseFloat(row.netSalary).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-10 bg-gray-50 border-t border-charcoal/5 flex justify-between items-center px-12">
                        <div className="flex flex-col">
                            <span className="font-black text-charcoal/30 uppercase tracking-[0.3em] text-[10px]">Aggregate Net Payroll</span>
                            <span className="text-4xl font-black text-charcoal mt-1 italic tracking-tighter">
                                RWF {data.reduce((acc, curr) => acc + parseFloat(curr.netSalary), 0).toLocaleString()}
                            </span>
                        </div>
                        <div className="w-16 h-16 bg-softlime rounded-full flex items-center justify-center text-emerald shadow-inner border border-emerald/10">
                            <span className="text-2xl">💎</span>
                        </div>
                    </div>
                </div>
            ) : month && !loading && (
                <div className="bg-white border-2 border-dashed border-charcoal/10 p-20 rounded-[40px] text-center">
                    <div className="text-6xl mb-6 opacity-20">📭</div>
                    <p className="text-charcoal/40 font-black uppercase tracking-widest">No financial events discovered for this period</p>
                </div>
            )}
        </div>
    );
};

export default Reports;
