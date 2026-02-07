import React from 'react';
import { Link } from 'react-router-dom';

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
                        <div className="inline-block bg-softlime/30 text-emerald text-xs font-bold px-4 py-1 rounded-full mb-6 tracking-widest uppercase">
                            Premium Workforce Solutions
                        </div>
                        <h1 className="text-7xl font-black text-charcoal leading-none mb-8">
                            Master Your <span className="text-emerald italic">Payroll</span> with Prestige.
                        </h1>
                        <p className="text-xl text-charcoal/70 mb-10 leading-relaxed max-w-lg">
                            Experience the wealth of efficiency. SmartPark EPMS brings sophisticated
                            departmental logic and employee management into one elegant emerald interface.
                        </p>
                        <div className="flex gap-6 items-center">
                            <Link to="/login" className="bg-charcoal text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald transition transform hover:-translate-y-1 shadow-2xl shadow-charcoal/30">
                                Get Started
                            </Link>
                            <button className="flex items-center gap-2 text-charcoal font-bold hover:text-emerald transition">
                                <span className="w-10 h-10 rounded-full border-2 border-charcoal/10 flex items-center justify-center">▶</span>
                                View Demo
                            </button>
                        </div>

                        <div className="mt-16 pt-8 border-t border-charcoal/5 flex items-center gap-10">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`w-14 h-14 rounded-full border-4 border-white bg-emerald shadow-sm flex items-center justify-center text-xs font-bold text-white`}>
                                        U{i}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-charcoal">Trusted by HR Leaders</p>
                                <p className="text-xs text-charcoal/40">500+ Corporations worldwide</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-softlime/20 rounded-full blur-3xl -z-10"></div>
                        <div className="relative bg-white p-1 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-charcoal/5">
                            <div className="bg-charcoal p-10 rounded-[22px] text-white">
                                <div className="flex gap-2 mb-8">
                                    <div className="w-3 h-3 rounded-full bg-emerald"></div>
                                    <div className="w-3 h-3 rounded-full bg-softlime"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                        <span className="text-white/50 font-mono text-xs uppercase tracking-tighter">Gross Payroll</span>
                                        <span className="text-2xl font-bold text-emerald">RWF 45,200,000</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                        <span className="text-white/50 font-mono text-xs uppercase tracking-tighter">Tax Deductions</span>
                                        <span className="text-2xl font-bold text-softlime">-RWF 4,120,000</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-white font-mono text-xs uppercase tracking-tighter">Net Disbursement</span>
                                        <span className="text-3xl font-black text-white underline decoration-emerald decoration-4 underline-offset-8 italic">RWF 41,080,000</span>
                                    </div>
                                </div>
                                <div className="mt-12 bg-white/5 p-4 rounded-xl flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald rounded-full flex items-center justify-center text-xl">💎</div>
                                    <div>
                                        <p className="text-xs text-white/40 uppercase font-black tracking-widest leading-none">Status</p>
                                        <p className="text-sm font-bold text-white leading-none mt-1">Ready for payout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="p-10 text-center text-charcoal/30 text-xs tracking-widest uppercase border-t border-charcoal/5">
                &copy; 2026 SmartPark Prestige &bull; EPMS Elite Series
            </footer>
        </div>
    );
};

export default Landing;
