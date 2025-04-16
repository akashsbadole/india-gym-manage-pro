
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  {
    name: 'Jan',
    revenue: 245000,
    expenses: 61000,
  },
  {
    name: 'Feb',
    revenue: 228000,
    expenses: 59000,
  },
  {
    name: 'Mar',
    revenue: 259000,
    expenses: 63000,
  },
  {
    name: 'Apr',
    revenue: 278000,
    expenses: 62500,
  },
  {
    name: 'May',
    revenue: 265000,
    expenses: 64000,
  },
  {
    name: 'Jun',
    revenue: 272000,
    expenses: 67000,
  },
];

const RevenueChart = () => {
  const formatCurrency = (value: number) => {
    return `₹${(value / 1000).toFixed(1)}K`;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#3B82F6" />
              <Bar dataKey="expenses" name="Expenses" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
