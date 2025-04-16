
import React, { useState } from 'react';
import { 
  CreditCard, 
  PlusCircle, 
  Search, 
  Filter, 
  FileDown,
  SlidersHorizontal
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

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample payment data
  const payments = [
    {
      id: '1',
      memberId: 'MEM001',
      memberName: 'Rahul Kumar',
      amount: 3500,
      date: '2025-04-12',
      method: 'UPI',
      status: 'COMPLETED',
    },
    {
      id: '2',
      memberId: 'MEM002',
      memberName: 'Priya Singh',
      amount: 5000,
      date: '2025-04-10',
      method: 'CASH',
      status: 'COMPLETED',
    },
    {
      id: '3',
      memberId: 'MEM003',
      memberName: 'Amit Patel',
      amount: 4000,
      date: '2025-04-15',
      method: 'BANK_TRANSFER',
      status: 'PENDING',
    },
    {
      id: '4',
      memberId: 'MEM004',
      memberName: 'Neha Sharma',
      amount: 3000,
      date: '2025-04-08',
      method: 'CARD',
      status: 'COMPLETED',
    },
    {
      id: '5',
      memberId: 'MEM005',
      memberName: 'Vikram Joshi',
      amount: 6000,
      date: '2025-04-05',
      method: 'CHEQUE',
      status: 'COMPLETED',
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge variant="success">Completed</Badge>;
      case 'PENDING':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'FAILED':
        return <Badge variant="destructive">Failed</Badge>;
      case 'REFUNDED':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredPayments = payments.filter(payment => 
    payment.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.memberId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
          <p className="text-muted-foreground">
            Manage payment transactions, view history, and process new payments.
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-4 md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Payment Filters</CardTitle>
            <CardDescription>Filter payment records</CardDescription>
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
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Completed
                </Button>
                <Button variant="outline" className="justify-start">
                  <span className="h-2 w-2 rounded-full bg-yellow-400 mr-2"></span>
                  Pending
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" placeholder="From" />
                <Input type="date" placeholder="To" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">Cash</Button>
                <Button variant="outline" className="justify-start">UPI</Button>
                <Button variant="outline" className="justify-start">Card</Button>
                <Button variant="outline" className="justify-start">Bank</Button>
              </div>
            </div>

            <Button className="w-full mt-2" variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
            
            <Button className="w-full" variant="ghost">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </CardContent>
        </Card>

        <div className="col-span-4 md:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Payment Transactions</h3>
            </div>
            <Button variant="outline" size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.memberName}</div>
                            <div className="text-sm text-muted-foreground">{payment.memberId}</div>
                          </div>
                        </TableCell>
                        <TableCell>₹{payment.amount.toLocaleString('en-IN')}</TableCell>
                        <TableCell>{formatDate(payment.date)}</TableCell>
                        <TableCell>{payment.method.replace('_', ' ')}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No payment records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payments;
