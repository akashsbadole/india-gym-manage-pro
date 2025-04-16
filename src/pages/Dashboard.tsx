
import React from 'react';
import QuickStats from '@/components/dashboard/QuickStats';
import RecentActivities from '@/components/dashboard/RecentActivities';
import MembershipChart from '@/components/dashboard/MembershipChart';
import RevenueChart from '@/components/dashboard/RevenueChart';
import UpcomingRenewals from '@/components/dashboard/UpcomingRenewals';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <select 
            className="bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            defaultValue="mumbai-central"
          >
            <option value="all">All Locations</option>
            <option value="mumbai-central">Mumbai Central</option>
            <option value="andheri">Andheri</option>
            <option value="thane">Thane</option>
          </select>
        </div>
      </div>
      
      <QuickStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <MembershipChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RecentActivities />
        </div>
        <div className="lg:col-span-2">
          <UpcomingRenewals />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
