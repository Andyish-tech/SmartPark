import React from 'react';
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

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex bg-[#F8FAFC] min-h-screen">
                {/* Fixed Sidebar */}
                <Navbar />

                {/* Main Content Area - Shifted to account for sidebar width */}
                <main className="flex-1 ml-72 p-12 overflow-y-auto">
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
