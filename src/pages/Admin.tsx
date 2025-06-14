
import React from 'react';
import { AuthProvider } from '@/components/auth/AuthProvider';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminDashboard from '@/components/admin/AdminDashboard';

const Admin = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default Admin;
