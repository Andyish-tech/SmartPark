import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <nav className="bg-indigo-600 text-white p-4 shadow-lg mb-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/dashboard" className="text-2xl font-bold italic tracking-tighter text-indigo-100 hover:text-white transition">SmartPark <span className="text-white">EPMS</span></Link>
                <div className="space-x-6 flex items-center text-sm font-medium">
                    <Link to="/dashboard" className="hover:text-indigo-200 transition">Dashboard</Link>
                    <Link to="/employee" className="hover:text-indigo-200 transition">Employees</Link>
                    <Link to="/department" className="hover:text-indigo-200 transition">Departments</Link>
                    <Link to="/salary" className="hover:text-indigo-200 transition">Salaries</Link>
                    <Link to="/reports" className="hover:text-indigo-200 transition">Reports</Link>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-indigo-600 px-4 py-1 rounded hover:bg-indigo-100 transition font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
