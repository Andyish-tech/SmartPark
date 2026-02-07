import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faThLarge,
    faUsers,
    faBuilding,
    faMoneyBillWave,
    faChartBar,
    faPowerOff,
    faBars,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isOpen, setIsOpen }) => {
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
        { to: "/dashboard", label: "Dashboard", icon: faThLarge },
        { to: "/employee", label: "Personnel", icon: faUsers },
        { to: "/department", label: "Departments", icon: faBuilding },
        { to: "/salary", label: "Salary", icon: faMoneyBillWave },
        { to: "/reports", label: "Analytics", icon: faChartBar },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleMenu}
                className="lg:hidden fixed top-6 right-6 z-[60] bg-emerald text-white w-12 h-12 rounded-xl shadow-xl flex items-center justify-center text-xl transition-all active:scale-95"
            >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>

            {/* Backdrop for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[45] lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed left-0 top-0 h-screen w-72 bg-charcoal text-white flex flex-col shadow-2xl z-50 border-r-4 border-emerald transition-transform duration-500 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Sidebar Branding */}
                <div className="p-10 mb-6 font-sans">
                    <Link to="/dashboard" className="flex flex-col" onClick={() => setIsOpen(false)}>
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
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${isActive
                                    ? 'bg-emerald text-white shadow-lg shadow-emerald/30'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <FontAwesomeIcon
                                    icon={link.icon}
                                    className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                                />
                                <span className="font-bold uppercase tracking-widest text-[11px]">
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
                        <FontAwesomeIcon icon={faPowerOff} className="text-sm" /> Sign Out System
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
