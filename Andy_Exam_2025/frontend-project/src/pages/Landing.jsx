import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Simple Top Bar */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="text-3xl font-black italic tracking-tighter text-indigo-700">
                    SmartPark <span className="text-gray-800">EPMS</span>
                </div>
                <Link to="/login" className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition shadow-md hover:shadow-lg">
                    Login
                </Link>
            </nav>

            <main className="flex-1 flex items-center">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            Next-Gen <span className="text-indigo-600 underline decoration-amber-400">Payroll</span> Management!
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Streamline your employee data, department costs, and monthly payrolls with SmartPark EPMS.
                            The most secure and efficient way to handle your business operations.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/login" className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition transform hover:-translate-y-1 shadow-xl">
                                Get Started Now
                            </Link>
                            <button className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-xl font-bold text-lg hover:border-indigo-600 hover:text-indigo-600 transition">
                                Learn More
                            </button>
                        </div>

                        <div className="mt-12 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`w-12 h-12 rounded-full border-4 border-white bg-indigo-${i + 2}00 flex items-center justify-center text-xs font-bold text-white`}>
                                        User {i}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500">Trusted by over <span className="font-bold text-gray-800">500+</span> HR Managers</p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-3xl blur opacity-20 animate-pulse"></div>
                        <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 italic font-mono text-sm">
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                            </div>
                            <pre className="text-indigo-600">
                                {`{
  system: "EPMS v2.0",
  status: "Operational",
  modules: [
    "Employee Directory",
    "Department Logic",
    "Salary CRUD",
    "Monthly Reports"
  ],
  security: "Bcrypt + Sessions"
}`}
                            </pre>
                            <div className="mt-6 flex justify-between items-end border-t border-gray-100 pt-6">
                                <div className="w-1/2 h-4 bg-gray-100 rounded-full"></div>
                                <div className="w-1/4 h-8 bg-indigo-100 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="p-8 text-center text-gray-400 text-sm border-t border-gray-100">
                &copy; 2026 SmartPark Employee Payroll Management System. All rights reserved.
            </footer>
        </div>
    );
};

export default Landing;
