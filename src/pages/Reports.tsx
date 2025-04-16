
import React, { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  FileDown, 
  PieChart,
  TrendingUp,
  Users,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('financial');

  // Sample report data
  const financialReports = [
    { 
      id: '1', 
      name: 'Monthly Revenue Report', 
      description: 'Summary of all revenue sources with trend analysis',
      lastGenerated: '2025-04-12',
      type: 'financial'
    },
    { 
      id: '2', 
      name: 'Outstanding Payments', 
      description: 'List of all pending payments from members',
      lastGenerated: '2025-04-14',
      type: 'financial'
    },
    { 
      id: '3', 
      name: 'Expense Breakdown', 
      description: 'Categorized expenses with monthly comparison',
      lastGenerated: '2025-04-10',
      type: 'financial'
    },
  ];

  const membershipReports = [
    { 
      id: '4', 
      name: 'Membership Growth', 
      description: 'New vs. churned members over the last 12 months',
      lastGenerated: '2025-04-13',
      type: 'membership'
    },
    { 
      id: '5', 
      name: 'Membership Expiry', 
      description: 'List of memberships expiring in the next 30 days',
      lastGenerated: '2025-04-15',
      type: 'membership'
    },
    { 
      id: '6', 
      name: 'Membership Distribution', 
      description: 'Breakdown of members by plan type and duration',
      lastGenerated: '2025-04-11',
      type: 'membership'
    },
  ];

  const attendanceReports = [
    { 
      id: '7', 
      name: 'Peak Hours Analysis', 
      description: 'Gym usage patterns by hour and day of week',
      lastGenerated: '2025-04-14',
      type: 'attendance'
    },
    { 
      id: '8', 
      name: 'Member Attendance', 
      description: 'Frequency of visits by member with averages',
      lastGenerated: '2025-04-13',
      type: 'attendance'
    },
    { 
      id: '9', 
      name: 'Low Activity Members', 
      description: 'Members with decreasing attendance patterns',
      lastGenerated: '2025-04-12',
      type: 'attendance'
    },
  ];

  const allReports = [...financialReports, ...membershipReports, ...attendanceReports];
  
  const filteredReports = activeTab === 'all' 
    ? allReports 
    : allReports.filter(report => report.type === activeTab);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate insights and analytics about your gym business.
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <FileText className="mr-2 h-4 w-4" />
          Create Custom Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Financial Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-orange-600" />
              <span className="text-2xl font-bold text-orange-900">{financialReports.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Membership Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              <span className="text-2xl font-bold text-blue-900">{membershipReports.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Attendance Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-900">{attendanceReports.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-1">
        <div className="flex space-x-1 overflow-x-auto">
          <Button 
            variant={activeTab === 'all' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('all')}
            className="rounded-md"
          >
            All Reports
          </Button>
          <Button 
            variant={activeTab === 'financial' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('financial')}
            className="rounded-md"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Financial
          </Button>
          <Button 
            variant={activeTab === 'membership' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('membership')}
            className="rounded-md"
          >
            <Users className="mr-2 h-4 w-4" />
            Membership
          </Button>
          <Button 
            variant={activeTab === 'attendance' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('attendance')}
            className="rounded-md"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Attendance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{report.name}</CardTitle>
                {report.type === 'financial' && <CreditCard className="h-5 w-5 text-orange-500" />}
                {report.type === 'membership' && <Users className="h-5 w-5 text-blue-500" />}
                {report.type === 'attendance' && <TrendingUp className="h-5 w-5 text-green-500" />}
              </div>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Last generated: {formatDate(report.lastGenerated)}
                </div>
                <Button variant="outline" size="sm">
                  <FileDown className="mr-2 h-3 w-3" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No reports found</h3>
          <p className="text-muted-foreground">There are no reports in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Reports;
