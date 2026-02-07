import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Welcome = () => {
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
            <div className="bg-white p-10 rounded-2xl shadow-xl border-t-8 border-indigo-600 mb-10 text-center">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Welcome to <span className="text-indigo-600">EPMS</span></h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto italic">
                    The complete Employee Payroll Management System for SmartPark.
                    Manage your workforce, departments, and payroll with ease and precision.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-8 rounded-2xl shadow-lg text-white transform hover:scale-105 transition duration-300">
                    <h3 className="text-lg font-semibold uppercase tracking-wider opacity-80 mb-2">Total Employees</h3>
                    <p className="text-5xl font-black">{stats.employees}</p>
                    <div className="mt-4 text-sm opacity-90 border-t border-white/20 pt-4">Active Staff Members</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 rounded-2xl shadow-lg text-white transform hover:scale-105 transition duration-300">
                    <h3 className="text-lg font-semibold uppercase tracking-wider opacity-80 mb-2">Total Departments</h3>
                    <p className="text-5xl font-black">{stats.departments}</p>
                    <div className="mt-4 text-sm opacity-90 border-t border-white/20 pt-4">Organizational Units</div>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-8 rounded-2xl shadow-lg text-white transform hover:scale-105 transition duration-300">
                    <h3 className="text-lg font-semibold uppercase tracking-wider opacity-80 mb-2">Payroll Records</h3>
                    <p className="text-5xl font-black">{stats.salaries}</p>
                    <div className="mt-4 text-sm opacity-90 border-t border-white/20 pt-4">Processed Salaries</div>
                </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 shadow-inner">
                <h2 className="text-2xl font-bold text-gray-700 mb-8 border-b-2 border-indigo-100 pb-2">Quick Navigation</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Link to="/employee" className="bg-white border-2 border-transparent hover:border-indigo-600 p-6 rounded-xl shadow-sm text-center transition group">
                        <div className="text-3xl mb-3">👥</div>
                        <span className="font-bold text-gray-600 group-hover:text-indigo-600 transition">Employees</span>
                    </Link>
                    <Link to="/department" className="bg-white border-2 border-transparent hover:border-indigo-600 p-6 rounded-xl shadow-sm text-center transition group">
                        <div className="text-3xl mb-3">🏢</div>
                        <span className="font-bold text-gray-600 group-hover:text-indigo-600 transition">Departments</span>
                    </Link>
                    <Link to="/salary" className="bg-white border-2 border-transparent hover:border-indigo-600 p-6 rounded-xl shadow-sm text-center transition group">
                        <div className="text-3xl mb-3">💰</div>
                        <span className="font-bold text-gray-600 group-hover:text-indigo-600 transition">Salaries</span>
                    </Link>
                    <Link to="/reports" className="bg-white border-2 border-transparent hover:border-indigo-600 p-6 rounded-xl shadow-sm text-center transition group">
                        <div className="text-3xl mb-3">📊</div>
                        <span className="font-bold text-gray-600 group-hover:text-indigo-600 transition">Reports</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
