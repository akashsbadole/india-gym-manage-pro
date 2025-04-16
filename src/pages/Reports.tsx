
import React, { useState } from 'react';
import { 
  LineChart, 
  BarChart3, 
  FileText, 
  FileDown, 
  Calendar, 
  ChevronDown,
  Users,
  CreditCard,
  Building,
  Search,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { exportToCSV, exportToPDF, prepareMembersExport, preparePaymentExport } from '@/utils/reportExport';

const Reports = () => {
  const [reportType, setReportType] = useState('membership');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('lastMonth');
  
  // Sample data for different reports
  const membershipData = [
    { id: 'MEM001', name: 'Rahul Kumar', email: 'rahul@example.com', phone: '+91 98765 43210', joinDate: '2024-12-15', status: 'Active' },
    { id: 'MEM002', name: 'Priya Singh', email: 'priya@example.com', phone: '+91 87654 32109', joinDate: '2025-01-10', status: 'Active' },
    { id: 'MEM003', name: 'Amit Patel', email: 'amit@example.com', phone: '+91 76543 21098', joinDate: '2025-02-05', status: 'Active' },
    { id: 'MEM004', name: 'Neha Sharma', email: 'neha@example.com', phone: '+91 65432 10987', joinDate: '2025-02-20', status: 'Active' },
    { id: 'MEM005', name: 'Vikram Joshi', email: 'vikram@example.com', phone: '+91 54321 09876', joinDate: '2025-03-01', status: 'Active' },
  ];
  
  const paymentData = [
    { id: 'PAY001', memberId: 'MEM001', memberName: 'Rahul Kumar', amount: 3500, date: '2025-04-01', method: 'UPI', status: 'COMPLETED' },
    { id: 'PAY002', memberId: 'MEM002', memberName: 'Priya Singh', amount: 5000, date: '2025-04-05', method: 'CASH', status: 'COMPLETED' },
    { id: 'PAY003', memberId: 'MEM003', memberName: 'Amit Patel', amount: 4000, date: '2025-04-10', method: 'BANK_TRANSFER', status: 'COMPLETED' },
    { id: 'PAY004', memberId: 'MEM004', memberName: 'Neha Sharma', amount: 3000, date: '2025-04-15', method: 'CARD', status: 'COMPLETED' },
    { id: 'PAY005', memberId: 'MEM005', memberName: 'Vikram Joshi', amount: 6000, date: '2025-04-01', method: 'CHEQUE', status: 'COMPLETED' },
  ];
  
  const attendanceData = [
    { id: '1', memberId: 'MEM001', memberName: 'Rahul Kumar', checkInTime: '2025-04-16T06:30:00', checkOutTime: '2025-04-16T08:00:00', duration: '1h 30m' },
    { id: '2', memberId: 'MEM002', memberName: 'Priya Singh', checkInTime: '2025-04-16T07:45:00', checkOutTime: '2025-04-16T09:30:00', duration: '1h 45m' },
    { id: '3', memberId: 'MEM003', memberName: 'Amit Patel', checkInTime: '2025-04-16T16:15:00', checkOutTime: '2025-04-16T18:00:00', duration: '1h 45m' },
    { id: '4', memberId: 'MEM005', memberName: 'Vikram Joshi', checkInTime: '2025-04-16T18:30:00', checkOutTime: '2025-04-16T20:00:00', duration: '1h 30m' },
    { id: '5', memberId: 'MEM007', memberName: 'Sanjay Gupta', checkInTime: '2025-04-16T19:00:00', checkOutTime: '2025-04-16T21:30:00', duration: '2h 30m' },
  ];
  
  // Filter data based on search
  const filteredMembershipData = membershipData.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredPaymentData = paymentData.filter(payment => 
    payment.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.memberId.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredAttendanceData = attendanceData.filter(record => 
    record.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.memberId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return '—';
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    if (reportType === 'membership') {
      const data = prepareMembersExport(filteredMembershipData);
      const title = 'Membership Report';
      
      if (format === 'csv') {
        exportToCSV(data, 'membership-report');
      } else {
        exportToPDF(data, 'membership-report', title);
      }
    } else if (reportType === 'payment') {
      const data = preparePaymentExport(filteredPaymentData);
      const title = 'Payment Report';
      
      if (format === 'csv') {
        exportToCSV(data, 'payment-report');
      } else {
        exportToPDF(data, 'payment-report', title);
      }
    } else if (reportType === 'attendance') {
      const data = {
        headers: ['Member ID', 'Member Name', 'Check-in Time', 'Check-out Time', 'Duration'],
        rows: filteredAttendanceData.map(record => [
          record.memberId,
          record.memberName,
          formatTime(record.checkInTime),
          formatTime(record.checkOutTime),
          record.duration
        ])
      };
      const title = 'Attendance Report';
      
      if (format === 'csv') {
        exportToCSV(data, 'attendance-report');
      } else {
        exportToPDF(data, 'attendance-report', title);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate and download reports for your gym.
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <FileDown className="mr-2 h-4 w-4" />
              Export Report
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport('csv')}>
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('pdf')}>
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Membership</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                <span className="text-2xl font-bold">{membershipData.length}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                onClick={() => setReportType('membership')}
              >
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-2xl font-bold">₹{paymentData.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString('en-IN')}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-green-600 hover:text-green-800 hover:bg-green-100"
                onClick={() => setReportType('payment')}
              >
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                <span className="text-2xl font-bold">{attendanceData.length}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-orange-600 hover:text-orange-800 hover:bg-orange-100"
                onClick={() => setReportType('attendance')}
              >
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>
                {reportType === 'membership' && 'Membership Report'}
                {reportType === 'payment' && 'Payment Report'}
                {reportType === 'attendance' && 'Attendance Report'}
              </CardTitle>
              <CardDescription>
                {reportType === 'membership' && 'Overview of all gym members and their status.'}
                {reportType === 'payment' && 'Summary of all payments received.'}
                {reportType === 'attendance' && 'Member attendance records.'}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-8 w-[240px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-9 w-9"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Select
                value={dateRange}
                onValueChange={setDateRange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="lastThreeMonths">Last 3 Months</SelectItem>
                  <SelectItem value="lastYear">Last Year</SelectItem>
                  <SelectItem value="allTime">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {reportType === 'membership' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembershipData.length > 0 ? (
                  filteredMembershipData.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.id}</TableCell>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{formatDate(member.joinDate)}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {member.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No membership records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          {reportType === 'payment' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPaymentData.length > 0 ? (
                  filteredPaymentData.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.memberName}</div>
                          <div className="text-sm text-muted-foreground">{payment.memberId}</div>
                        </div>
                      </TableCell>
                      <TableCell>₹{payment.amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell>{formatDate(payment.date)}</TableCell>
                      <TableCell>{payment.method.replace('_', ' ')}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {payment.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No payment records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          {reportType === 'attendance' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendanceData.length > 0 ? (
                  filteredAttendanceData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.memberName}</div>
                          <div className="text-sm text-muted-foreground">{record.memberId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatTime(record.checkInTime)}</TableCell>
                      <TableCell>{formatTime(record.checkOutTime)}</TableCell>
                      <TableCell>{record.duration}</TableCell>
                      <TableCell>{formatDate(record.checkInTime)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No attendance records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
