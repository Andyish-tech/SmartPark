import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faShieldAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/login', { username, password });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Authentication Failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
            <div className="w-full max-w-md px-6">
                <div className="bg-white p-12 rounded-[40px] shadow-[0_30px_100px_rgba(54,69,79,0.1)] border border-charcoal/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald"></div>

                    <div className="text-center mb-10">
                        <div className="text-2xl font-black italic tracking-tighter text-charcoal mb-2">
                            SmartPark <span className="text-emerald not-italic uppercase ml-0.5">EPMS</span>
                        </div>
                        <h2 className="text-4xl font-black text-charcoal">Prestige Access</h2>
                        <p className="text-sm font-medium text-charcoal/40 mt-2 uppercase tracking-widest">Elite Series v2.0</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8 text-xs font-bold flex items-center animate-shake">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-3 text-lg" /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-charcoal text-[10px] font-black uppercase tracking-[0.2em] mb-2 px-1">Identity</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faUser} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20" />
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-emerald focus:bg-white outline-none transition-all duration-300 font-bold text-charcoal"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-charcoal text-[10px] font-black uppercase tracking-[0.2em] mb-2 px-1">Passkey</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faLock} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20" />
                                <input
                                    type="password"
                                    className="w-full bg-gray-50 pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-emerald focus:bg-white outline-none transition-all duration-300 font-bold text-charcoal"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link to="/forgot-password" size="sm" className="text-[10px] font-black uppercase tracking-widest text-emerald hover:text-charcoal transition-colors">
                                Forgot Credential?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-charcoal text-white font-black py-5 rounded-2xl hover:bg-emerald transition-all duration-500 shadow-xl shadow-charcoal/20 transform hover:-translate-y-1 active:scale-95 text-lg"
                        >
                            Authorize Access
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-[10px] text-charcoal/20 uppercase font-black tracking-[0.3em] flex items-center justify-center gap-2">
                            <FontAwesomeIcon icon={faShieldAlt} /> Secured by Bcrypt Architecture
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center text-charcoal/30 text-[10px] font-black uppercase tracking-widest">
                    &copy; 2026 EPMS Elite Series &bull; Property of SmartPark Group
                </div>
            </div>
        </div>
    );
};

export default Login;
