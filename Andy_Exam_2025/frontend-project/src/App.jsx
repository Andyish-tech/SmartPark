import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Department from './pages/Department';
import Employee from './pages/Employee';
import Salary from './pages/Salary';
import Reports from './pages/Reports';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-h-screen">
                <Navbar />
                <main className="container mx-auto p-4">
                  <Routes>
                    <Route path="/department" element={<Department />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/salary" element={<Salary />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="*" element={<Navigate to="/employee" />} />
                  </Routes>
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
