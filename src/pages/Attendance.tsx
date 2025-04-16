
import React, { useState } from 'react';
import { 
  CalendarClock, 
  Users, 
  Search, 
  CalendarDays,
  UserCheck,
  Filter,
  FileDown,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ManualCheckInForm from '@/components/attendance/ManualCheckInForm';
import { exportToCSV, exportToPDF, prepareAttendanceExport } from '@/utils/reportExport';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { showCheckInNotification } from '@/utils/notifications';

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCheckInForm, setShowCheckInForm] = useState(false);

  // Sample attendance data
  const attendanceRecords = [
    {
      id: '1',
      memberId: 'MEM001',
      memberName: 'Rahul Kumar',
      checkInTime: '2025-04-16T06:30:00',
      checkOutTime: '2025-04-16T08:00:00',
      duration: '1h 30m',
    },
    {
      id: '2',
      memberId: 'MEM002',
      memberName: 'Priya Singh',
      checkInTime: '2025-04-16T07:45:00',
      checkOutTime: '2025-04-16T09:30:00',
      duration: '1h 45m',
    },
    {
      id: '3',
      memberId: 'MEM003',
      memberName: 'Amit Patel',
      checkInTime: '2025-04-16T16:15:00',
      checkOutTime: '2025-04-16T18:00:00',
      duration: '1h 45m',
    },
    {
      id: '4',
      memberId: 'MEM005',
      memberName: 'Vikram Joshi',
      checkInTime: '2025-04-16T18:30:00',
      checkOutTime: null,
      duration: 'In progress',
    },
    {
      id: '5',
      memberId: 'MEM007',
      memberName: 'Sanjay Gupta',
      checkInTime: '2025-04-16T19:00:00',
      checkOutTime: null,
      duration: 'In progress',
    },
  ];

  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return '—';
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const filteredAttendance = attendanceRecords.filter(record => 
    record.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.memberId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats
  const currentlyPresent = attendanceRecords.filter(record => !record.checkOutTime).length;
  const totalVisitsToday = attendanceRecords.length;
  const averageDuration = "1h 40m";

  const handleExport = (format: 'csv' | 'pdf') => {
    const data = prepareAttendanceExport(filteredAttendance);
    
    if (format === 'csv') {
      exportToCSV(data, 'attendance-records');
    } else {
      exportToPDF(data, 'attendance-records', 'Attendance Records');
    }
  };
  
  // Demo notification
  const triggerDemoNotification = () => {
    showCheckInNotification('New Member', 'MyGym Central');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
          <p className="text-muted-foreground">
            Track member check-ins and check-outs at your gym facility.
          </p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setShowCheckInForm(true)}>
          <UserCheck className="mr-2 h-4 w-4" />
          Manual Check-in
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Currently Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-orange-500" />
              <span className="text-2xl font-bold">{currentlyPresent}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Visits Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CalendarClock className="mr-2 h-4 w-4 text-orange-500" />
              <span className="text-2xl font-bold">{totalVisitsToday}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4 text-orange-500" />
              <span className="text-2xl font-bold">{averageDuration}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-4 md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Attendance Filters</CardTitle>
            <CardDescription>Filter attendance records</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by member, ID..."
                  className="pl-8"
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
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input 
                type="date" 
                value={currentDate.toISOString().split('T')[0]}
                onChange={(e) => setCurrentDate(new Date(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Present
                </Button>
                <Button variant="outline" className="justify-start">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Checked Out
                </Button>
              </div>
            </div>

            <Button className="w-full mt-2" variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
            
            <div className="pt-4 border-t mt-4">
              <Button className="w-full" variant="outline" onClick={triggerDemoNotification}>
                Test Notification
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-4 md:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <CalendarClock className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Today's Attendance</h3>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export
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

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.length > 0 ? (
                    filteredAttendance.map((record) => (
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
                        <TableCell>
                          {record.checkOutTime ? (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">Checked Out</Badge>
                          ) : (
                            <Badge variant="success">Present</Badge>
                          )}
                        </TableCell>
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
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showCheckInForm} onOpenChange={setShowCheckInForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manual Check-in</DialogTitle>
            <DialogDescription>
              Record a member's check-in or check-out.
            </DialogDescription>
          </DialogHeader>
          <ManualCheckInForm 
            onSuccess={() => setShowCheckInForm(false)}
            onCancel={() => setShowCheckInForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Attendance;
