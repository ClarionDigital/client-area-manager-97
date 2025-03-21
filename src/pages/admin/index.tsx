
import React from 'react';
import { AdminProvider } from '@/context/AdminContext';
import { Outlet } from 'react-router-dom';

const AdminModular: React.FC = () => {
  return (
    <AdminProvider>
      <Outlet />
    </AdminProvider>
  );
};

export default AdminModular;
