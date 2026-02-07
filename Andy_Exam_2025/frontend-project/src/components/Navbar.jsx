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
        <nav className="bg-charcoal text-white py-5 px-8 shadow-2xl mb-8 border-b-4 border-emerald">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/dashboard" className="text-2xl font-black italic tracking-tighter hover:text-emerald transition">
                    SmartPark <span className="text-emerald not-italic font-extrabold uppercase ml-1">EPMS</span>
                </Link>
                <div className="space-x-8 flex items-center text-sm font-bold uppercase tracking-widest">
                    <Link to="/dashboard" className="hover:text-emerald transition border-b-2 border-transparent hover:border-emerald pb-1">Dashboard</Link>
                    <Link to="/employee" className="hover:text-emerald transition border-b-2 border-transparent hover:border-emerald pb-1">Employees</Link>
                    <Link to="/department" className="hover:text-emerald transition border-b-2 border-transparent hover:border-emerald pb-1">Departments</Link>
                    <Link to="/salary" className="hover:text-emerald transition border-b-2 border-transparent hover:border-emerald pb-1">Salaries</Link>
                    <Link to="/reports" className="hover:text-emerald transition border-b-2 border-transparent hover:border-emerald pb-1">Reports</Link>
                    <button
                        onClick={handleLogout}
                        className="bg-emerald text-white px-6 py-2 rounded-lg hover:brightness-110 transition shadow-lg shadow-emerald/20 font-black text-xs"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
