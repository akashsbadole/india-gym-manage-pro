
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

interface Renewal {
  id: string;
  memberName: string;
  membershipType: string;
  expiryDate: string;
  daysLeft: number;
  amount: string;
}

const renewals: Renewal[] = [
  {
    id: '1',
    memberName: 'Vikram Sharma',
    membershipType: 'Gold',
    expiryDate: '25 Apr 2025',
    daysLeft: 2,
    amount: '₹2,400'
  },
  {
    id: '2',
    memberName: 'Neha Patil',
    membershipType: 'Silver',
    expiryDate: '26 Apr 2025',
    daysLeft: 3,
    amount: '₹1,800'
  },
  {
    id: '3',
    memberName: 'Rajesh Khanna',
    membershipType: 'Platinum',
    expiryDate: '27 Apr 2025',
    daysLeft: 4,
    amount: '₹3,600'
  },
  {
    id: '4',
    memberName: 'Sunita Verma',
    membershipType: 'Basic',
    expiryDate: '29 Apr 2025',
    daysLeft: 6,
    amount: '₹1,200'
  }
];

const UpcomingRenewals = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Upcoming Renewals</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {renewals.map((renewal) => (
            <div 
              key={renewal.id}
              className="flex items-center justify-between py-3 border-b last:border-0 border-gray-100"
            >
              <div className="space-y-1">
                <p className="font-medium">{renewal.memberName}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50">
                    {renewal.membershipType}
                  </Badge>
                  <span className="text-sm text-gray-500">Expires in {renewal.daysLeft} days</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-medium">{renewal.amount}</p>
                  <p className="text-xs text-gray-500">{renewal.expiryDate}</p>
                </div>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingRenewals;
