import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faCheckCircle,
    faGem,
    faShieldAlt,
    faCodeBranch,
    faRocket
} from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
    return (
        <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans">
            {/* Elegant Top Bar */}
            <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="text-3xl font-black italic tracking-tighter text-emerald">
                    SmartPark <span className="text-charcoal font-extrabold not-italic">EPMS</span>
                </div>
                <div className="flex items-center gap-8">
                    <Link to="/login" className="text-charcoal font-semibold hover:text-emerald transition">Sign In</Link>
                    <Link to="/login" className="bg-emerald text-white px-8 py-3 rounded-full font-bold hover:brightness-110 transition shadow-lg shadow-emerald/20">
                        Join System
                    </Link>
                </div>
            </nav>

            <main className="flex-1 flex items-center py-20">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-softlime/30 text-emerald text-[10px] font-black px-4 py-1 rounded-full mb-6 tracking-widest uppercase">
                            <FontAwesomeIcon icon={faShieldAlt} /> Enhanced Security Protocols
                        </div>
                        <h1 className="text-7xl font-black text-charcoal leading-none mb-8">
                            Master Your <span className="text-emerald italic underline decoration-softlime decoration-8 underline-offset-4">Payroll</span> with Prestige.
                        </h1>
                        <p className="text-xl text-charcoal/70 mb-10 leading-relaxed max-w-lg font-medium">
                            Experience the wealth of efficiency. SmartPark EPMS brings sophisticated
                            departmental logic and employee management into one elegant emerald interface.
                        </p>
                        <div className="flex gap-6 items-center">
                            <Link to="/login" className="bg-charcoal text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald transition transform hover:-translate-y-1 shadow-2xl shadow-charcoal/30 flex items-center gap-3">
                                Get Started <FontAwesomeIcon icon={faRocket} className="text-sm" />
                            </Link>
                            <button className="flex items-center gap-3 text-charcoal font-bold hover:text-emerald transition group">
                                <span className="w-12 h-12 rounded-full border-2 border-charcoal/10 flex items-center justify-center transition-all group-hover:border-emerald group-hover:bg-emerald group-hover:text-white">
                                    <FontAwesomeIcon icon={faPlay} className="ml-1 text-sm" />
                                </span>
                                View Demo
                            </button>
                        </div>

                        <div className="mt-16 pt-8 border-t border-charcoal/5 flex items-center gap-10">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`w-14 h-14 rounded-full border-4 border-white bg-emerald shadow-sm flex items-center justify-center text-xs font-black text-white`}>
                                        U{i}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-charcoal flex items-center gap-2">
                                    Trusted by HR Leaders <FontAwesomeIcon icon={faCheckCircle} className="text-emerald text-xs" />
                                </p>
                                <p className="text-xs text-charcoal/40 font-bold uppercase tracking-widest">500+ Corporations worldwide</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-softlime/20 rounded-full blur-3xl -z-10"></div>
                        <div className="relative bg-white p-1 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden border border-charcoal/5">
                            <div className="bg-charcoal p-10 py-12 rounded-[36px] text-white">
                                <div className="flex gap-2 mb-10">
                                    <div className="w-3 h-3 rounded-full bg-emerald"></div>
                                    <div className="w-3 h-3 rounded-full bg-softlime"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-5">
                                        <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                                            <FontAwesomeIcon icon={faCodeBranch} /> Gross Payroll
                                        </span>
                                        <span className="text-2xl font-black text-emerald">RWF 45.2M</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-5">
                                        <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 text-softlime/60">
                                            <FontAwesomeIcon icon={faShieldAlt} /> Deductions
                                        </span>
                                        <span className="text-2xl font-black text-softlime">- RWF 4.1M</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-white font-mono text-[10px] uppercase tracking-widest">Net Asset</span>
                                        <span className="text-4xl font-black text-white italic tracking-tighter underline decoration-emerald decoration-4 underline-offset-8">RWF 41.1M</span>
                                    </div>
                                </div>
                                <div className="mt-14 bg-white/5 p-5 rounded-2xl flex items-center gap-5 border border-white/5">
                                    <div className="w-12 h-12 bg-emerald rounded-xl flex items-center justify-center text-xl shadow-lg shadow-emerald/20 text-white">
                                        <FontAwesomeIcon icon={faGem} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em] leading-none">Security Hash</p>
                                        <p className="text-sm font-bold text-white leading-none mt-2">Verified & Encrypted</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="p-10 text-center text-charcoal/30 text-[10px] font-black tracking-[0.4em] uppercase border-t border-charcoal/5">
                &copy; 2026 SmartPark &bull; EPMS Elite Series &bull; All Rights Reserved
            </footer>
        </div>
    );
};

export default Landing;
