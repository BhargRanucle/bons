import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/layout/Layout';
import { PrivateRoute } from './components/PrivateRoute';

// Public pages
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';

// Onboarding pages
import { PersonalDetails } from './pages/onboarding/PersonalDetails';
import { KYCVerification } from './pages/onboarding/KYCVerification';
import { Payment } from './pages/onboarding/Payment';
import { Contract } from './pages/onboarding/Contract';
import { RiskProfiling } from './pages/onboarding/RiskProfiling';
import { Success } from './pages/onboarding/Success';

// Protected pages
import { Dashboard } from './pages/Dashboard';
import { Funding } from './pages/Funding';

// Admin pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CustomerManagement } from './pages/admin/CustomerManagement';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Landing /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            
            {/* Onboarding routes */}
            <Route path="/onboarding/personal-details" element={<PersonalDetails />} />
            <Route path="/onboarding/kyc" element={<KYCVerification />} />
            <Route path="/onboarding/payment" element={<Payment />} />
            <Route path="/onboarding/contract" element={<Contract />} />
            <Route path="/onboarding/risk-profiling" element={<RiskProfiling />} />
            <Route path="/onboarding/success" element={<Success />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Layout><Dashboard /></Layout>
              </PrivateRoute>
            } />
            <Route path="/funding" element={
              <PrivateRoute>
                <Layout><Funding /></Layout>
              </PrivateRoute>
            } />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <PrivateRoute adminOnly>
                <Layout><AdminDashboard /></Layout>
              </PrivateRoute>
            } />
            <Route path="/admin/customers" element={
              <PrivateRoute adminOnly>
                <Layout><CustomerManagement /></Layout>
              </PrivateRoute>
            } />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;