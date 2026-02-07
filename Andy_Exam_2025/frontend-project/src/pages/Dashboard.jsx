import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        employees: 0,
        departments: 0,
        salaries: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [empRes, deptRes, salRes] = await Promise.all([
                    api.get('/employees'),
                    api.get('/departments'),
                    api.get('/salaries')
                ]);
                setStats({
                    employees: empRes.data.length,
                    departments: deptRes.data.length,
                    salaries: salRes.data.length
                });
            } catch (error) {
                console.error('Error fetching dashboard stats', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-10">
            <div className="bg-white p-12 rounded-[32px] shadow-2xl shadow-emerald/5 border border-charcoal/5 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-black text-charcoal mb-4 tracking-tight">System <span className="text-emerald italic">Intelligence</span></h1>
                    <p className="text-lg text-charcoal/60 max-w-2xl font-medium">
                        Welcome to the command center. Monitor organizational health and manage
                        your premium workforce assets with precision.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-emerald p-8 rounded-3xl shadow-xl shadow-emerald/20 text-white relative group overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 text-white/10 text-9xl font-black transition-transform group-hover:scale-110">👥</div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-1">Human Capital</h3>
                    <p className="text-5xl font-black mb-1">{stats.employees}</p>
                    <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Active Personnel</p>
                </div>
                <div className="bg-charcoal p-8 rounded-3xl shadow-xl shadow-charcoal/20 text-white relative group overflow-hidden border-b-8 border-emerald">
                    <div className="absolute -right-4 -bottom-4 text-white/10 text-9xl font-black transition-transform group-hover:scale-110">🏢</div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-1">Structure</h3>
                    <p className="text-5xl font-black mb-1">{stats.departments}</p>
                    <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Departments</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-charcoal/5 text-charcoal relative group overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 text-charcoal/5 text-9xl font-black transition-transform group-hover:scale-110">💰</div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald mb-1">Treasury</h3>
                    <p className="text-5xl font-black mb-1 text-charcoal">{stats.salaries}</p>
                    <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest">Salaries Disbursed</p>
                </div>
            </div>

            <div className="bg-white border border-charcoal/5 rounded-[40px] p-12 shadow-2xl shadow-charcoal/5">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-black text-charcoal tracking-tight">Management <span className="text-emerald text-sm uppercase font-black ml-2 tracking-widest">Quick Access</span></h2>
                    <div className="h-1 flex-1 bg-charcoal/5 ml-8 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { to: "/employee", label: "Directory", icon: "👥", sub: "Personnel" },
                        { to: "/department", label: "Units", icon: "🏢", sub: "Org Setup" },
                        { to: "/salary", label: "Payouts", icon: "💰", sub: "Salary CRUD" },
                        { to: "/reports", label: "Analytics", icon: "📊", sub: "Insights" }
                    ].map((item, i) => (
                        <Link key={i} to={item.to} className="group">
                            <div className="bg-gray-50 p-8 rounded-3xl text-center border-2 border-transparent transition-all duration-300 group-hover:bg-white group-hover:border-emerald group-hover:shadow-xl group-hover:shadow-emerald/10 group-hover:-translate-y-1">
                                <div className="text-4xl mb-4 transform transition-transform group-hover:scale-125">{item.icon}</div>
                                <h4 className="font-black text-charcoal group-hover:text-emerald transition-colors">{item.label}</h4>
                                <p className="text-[10px] uppercase font-black tracking-widest text-charcoal/30 mt-1">{item.sub}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
