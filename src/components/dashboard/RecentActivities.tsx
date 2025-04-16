
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ActivityType = 'payment' | 'membership' | 'attendance' | 'inquiry';

interface Activity {
  id: string;
  type: ActivityType;
  memberName: string;
  memberInitials: string;
  action: string;
  amount?: string;
  timestamp: string;
  location: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'payment',
    memberName: 'Raj Kumar',
    memberInitials: 'RK',
    action: 'made a payment',
    amount: '₹2,400',
    timestamp: '10 minutes ago',
    location: 'Mumbai Central'
  },
  {
    id: '2',
    type: 'membership',
    memberName: 'Priya Singh',
    memberInitials: 'PS',
    action: 'renewed Gold membership',
    timestamp: '2 hours ago',
    location: 'Mumbai Central'
  },
  {
    id: '3',
    type: 'attendance',
    memberName: 'Amit Patel',
    memberInitials: 'AP',
    action: 'checked in',
    timestamp: '3 hours ago',
    location: 'Andheri'
  },
  {
    id: '4',
    type: 'inquiry',
    memberName: 'Deepika Shah',
    memberInitials: 'DS',
    action: 'submitted an inquiry',
    timestamp: '5 hours ago',
    location: 'Mumbai Central'
  },
  {
    id: '5',
    type: 'payment',
    memberName: 'Sanjay Mehta',
    memberInitials: 'SM',
    action: 'made a payment',
    amount: '₹1,800',
    timestamp: '1 day ago',
    location: 'Andheri'
  }
];

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'payment':
      return 'bg-green-100 text-green-700';
    case 'membership':
      return 'bg-blue-100 text-blue-700';
    case 'attendance':
      return 'bg-orange-100 text-orange-700';
    case 'inquiry':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const RecentActivities = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <Avatar className={`h-10 w-10 ${getActivityIcon(activity.type)}`}>
                <AvatarFallback>{activity.memberInitials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.memberName}</span>
                  <span className="text-gray-500"> {activity.action}</span>
                  {activity.amount && <span className="font-medium"> {activity.amount}</span>}
                </p>
                <div className="flex text-xs text-gray-500 items-center">
                  <span>{activity.timestamp}</span>
                  <span className="mx-1.5">•</span>
                  <span>{activity.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
