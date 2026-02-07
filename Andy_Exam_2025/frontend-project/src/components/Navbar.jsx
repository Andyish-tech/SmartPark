import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const navLinks = [
        { to: "/dashboard", label: "Dashboard", icon: "💎" },
        { to: "/employee", label: "Personnel", icon: "👥" },
        { to: "/department", label: "Departments", icon: "🏢" },
        { to: "/salary", label: "Treasury", icon: "💰" },
        { to: "/reports", label: "Analytics", icon: "📊" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-72 bg-charcoal text-white flex flex-col shadow-2xl z-50 border-r-4 border-emerald">
            {/* Sidebar Branding */}
            <div className="p-10 mb-6">
                <Link to="/dashboard" className="flex flex-col">
                    <span className="text-emerald font-black text-3xl italic tracking-tighter leading-none">SmartPark</span>
                    <span className="text-white font-black text-xl uppercase tracking-widest mt-1">EPMS Elite</span>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-2">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${isActive
                                    ? 'bg-emerald text-white shadow-lg shadow-emerald/30'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                {link.icon}
                            </span>
                            <span className="font-bold uppercase tracking-widest text-xs">
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-8 mt-auto border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="w-full bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-white/40 px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em]"
                >
                    <span className="text-lg">⏻</span> Sign Out System
                </button>
            </div>
        </aside>
    );
};

export default Navbar;
