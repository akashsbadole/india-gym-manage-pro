
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Members from '@/pages/Members';
import Payments from '@/pages/Payments';
import Attendance from '@/pages/Attendance';
import Reports from '@/pages/Reports';
import Locations from '@/pages/Locations';
import Notifications from '@/pages/Notifications';
import Support from '@/pages/Support';
import Settings from '@/pages/Settings';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="payments" element={<Payments />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="reports" element={<Reports />} />
        <Route path="locations" element={<Locations />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="support" element={<Support />} />
        <Route path="settings" element={<Settings />} />
        {/* Add more routes here as we implement additional pages */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default Index;
