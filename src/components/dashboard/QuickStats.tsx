
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, CreditCard, ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Members" 
        value="1,240" 
        change="+5.2%" 
        trend="up"
        icon={<Users className="h-5 w-5 text-blue-600" />}
        color="blue"
      />
      <StatCard 
        title="Active Memberships" 
        value="892" 
        change="+3.1%" 
        trend="up"
        icon={<TrendingUp className="h-5 w-5 text-green-600" />}
        color="green"
      />
      <StatCard 
        title="Revenue (This Month)" 
        value="₹2,85,400" 
        change="+12.5%" 
        trend="up"
        icon={<CreditCard className="h-5 w-5 text-orange-600" />}
        color="orange"
      />
      <StatCard 
        title="Expenses (This Month)" 
        value="₹65,240" 
        change="-2.3%" 
        trend="down"
        icon={<ArrowDown className="h-5 w-5 text-red-600" />}
        color="red"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'orange' | 'red';
}

const StatCard = ({ title, value, change, trend, icon, color }: StatCardProps) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      icon: 'text-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      icon: 'text-green-600'
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      icon: 'text-orange-600'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      icon: 'text-red-600'
    }
  };

  return (
    <Card>
      <CardContent className="flex items-center justify-between py-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <div className="flex items-center space-x-1">
            {trend === 'up' ? 
              <ArrowUp className="h-3 w-3 text-green-600" /> : 
              <ArrowDown className="h-3 w-3 text-red-600" />
            }
            <p className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </p>
          </div>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color].bg}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
