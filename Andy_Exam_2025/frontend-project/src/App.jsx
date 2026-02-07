import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Department from './pages/Department';
import Employee from './pages/Employee';
import Salary from './pages/Salary';
import Reports from './pages/Reports';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex bg-[#F8FAFC] min-h-screen relative overflow-x-hidden">
                {/* Fixed Sidebar */}
                <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                {/* Main Content Area - Shifted to account for sidebar width on large screens */}
                <main className="flex-1 lg:ml-72 p-6 lg:p-12 transition-all duration-500">
                  <div className="max-w-7xl mx-auto">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/department" element={<Department />} />
                      <Route path="/employee" element={<Employee />} />
                      <Route path="/salary" element={<Salary />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </div>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
