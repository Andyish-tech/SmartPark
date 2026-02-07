import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faKey,
    faShieldAlt,
    faQuestionCircle,
    faArrowLeft,
    faCheckCircle,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Username, 2: Question/Answer, 3: Success
    const [username, setUsername] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFetchQuestion = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.get(`/recovery-question/${username}`);
            setQuestion(res.data.question);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.error || 'Account not found');
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/reset-password', { username, answer, newPassword });
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.error || 'Verification failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
            <div className="w-full max-w-md px-6">
                <div className="bg-white p-12 rounded-[40px] shadow-[0_30px_100px_rgba(54,69,79,0.1)] border border-charcoal/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald"></div>

                    <div className="text-center mb-10">
                        <Link to="/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-charcoal/30 hover:text-emerald transition-colors mb-4">
                            <FontAwesomeIcon icon={faArrowLeft} /> Return to Login
                        </Link>
                        <h2 className="text-4xl font-black text-charcoal">Credential Recovery</h2>
                        <p className="text-sm font-medium text-charcoal/40 mt-2 uppercase tracking-widest">Restoration Protocol</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8 text-xs font-bold flex items-center animate-shake">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-3 text-lg" /> {error}
                        </div>
                    )}

                    {step === 1 && (
                        <form onSubmit={handleFetchQuestion} className="space-y-6">
                            <div>
                                <label className="block text-charcoal text-[10px] font-black uppercase tracking-[0.2em] mb-2 px-1">Identify Account</label>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faUser} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20" />
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-emerald focus:bg-white outline-none transition-all duration-300 font-bold text-charcoal"
                                        placeholder="Enter Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-charcoal text-white font-black py-5 rounded-2xl hover:bg-emerald transition-all duration-500 shadow-xl shadow-charcoal/20 transform hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest"
                            >
                                Initiate Recovery
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleReset} className="space-y-6">
                            <div className="bg-emerald/5 p-6 rounded-[24px] border border-emerald/10 mb-6">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald mb-2">Security Challenge:</p>
                                <p className="text-charcoal font-black">{question}</p>
                            </div>

                            <div>
                                <label className="block text-charcoal text-[10px] font-black uppercase tracking-[0.2em] mb-2 px-1">Provide Answer</label>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faShieldAlt} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20" />
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-emerald focus:bg-white outline-none transition-all duration-300 font-bold text-charcoal"
                                        placeholder="Security Answer"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-charcoal text-[10px] font-black uppercase tracking-[0.2em] mb-2 px-1">Configure New Passkey</label>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faKey} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20" />
                                    <input
                                        type="password"
                                        className="w-full bg-gray-50 pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-emerald focus:bg-white outline-none transition-all duration-300 font-bold text-charcoal"
                                        placeholder="••••••••"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-charcoal text-white font-black py-5 rounded-2xl hover:bg-emerald transition-all duration-500 shadow-xl shadow-charcoal/20 transform hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest"
                            >
                                Restore Credentials
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-emerald/10 text-emerald rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner border border-emerald/10">
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </div>
                            <h3 className="text-2xl font-black text-charcoal mb-4">Identity Restored</h3>
                            <p className="text-sm text-charcoal/40 font-medium mb-10">Your passkey has been successfully updated in our Bcrypt architecture.</p>
                            <Link
                                to="/login"
                                className="inline-block bg-charcoal text-white font-black px-12 py-5 rounded-2xl hover:bg-emerald transition-all duration-500 shadow-xl shadow-charcoal/20 transform hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest"
                            >
                                Re-Authorize Access
                            </Link>
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <p className="text-[10px] text-charcoal/20 uppercase font-black tracking-[0.3em] flex items-center justify-center gap-2">
                            System Security Protocol v2.4
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

export default ForgotPassword;
