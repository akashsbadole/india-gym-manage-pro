
import React, { useState } from 'react';
import { 
  Bell, 
  Users, 
  Calendar, 
  MessageSquare, 
  Megaphone,
  Tag,
  CheckCircle2,
  Trash2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Notifications = () => {
  const [filter, setFilter] = useState('all');

  // Sample notification data
  const notifications = [
    {
      id: '1',
      title: 'Membership Renewal Reminder',
      message: 'Send a reminder to members whose membership is expiring in the next 7 days',
      type: 'MEMBERSHIP_EXPIRY',
      recipients: 'Members with expiring memberships',
      recipientCount: 24,
      status: 'scheduled',
      scheduledFor: '2025-04-17T08:00:00',
      readCount: 0,
      createdAt: '2025-04-15T14:30:00',
    },
    {
      id: '2',
      title: 'New Yoga Class',
      message: 'Announcing a new yoga class starting next week. Special discount for first 20 members!',
      type: 'ANNOUNCEMENT',
      recipients: 'All active members',
      recipientCount: 850,
      status: 'sent',
      sentAt: '2025-04-15T10:00:00',
      readCount: 345,
      createdAt: '2025-04-14T16:45:00',
    },
    {
      id: '3',
      title: 'Payment Failed',
      message: 'Automatic payment failed for 12 members. Send a reminder to update payment method.',
      type: 'PAYMENT_REMINDER',
      recipients: 'Members with failed payments',
      recipientCount: 12,
      status: 'sent',
      sentAt: '2025-04-16T09:30:00',
      readCount: 5,
      createdAt: '2025-04-16T09:00:00',
    },
    {
      id: '4',
      title: 'Special Offer - Bring a Friend',
      message: 'Introduce a friend and get 25% off on your next month membership',
      type: 'PROMOTION',
      recipients: 'All members',
      recipientCount: 1200,
      status: 'draft',
      readCount: 0,
      createdAt: '2025-04-16T11:45:00',
    },
    {
      id: '5',
      title: 'Holiday Hours',
      message: 'The gym will operate with reduced hours during the upcoming holiday season',
      type: 'ANNOUNCEMENT',
      recipients: 'All members and staff',
      recipientCount: 1240,
      status: 'draft',
      readCount: 0,
      createdAt: '2025-04-15T17:20:00',
    },
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.status === filter);

  const getNotificationTypeIcon = (type) => {
    switch (type) {
      case 'MEMBERSHIP_EXPIRY':
        return <Calendar className="h-5 w-5 text-yellow-500" />;
      case 'PAYMENT_REMINDER':
        return <Bell className="h-5 w-5 text-red-500" />;
      case 'ANNOUNCEMENT':
        return <Megaphone className="h-5 w-5 text-blue-500" />;
      case 'PROMOTION':
        return <Tag className="h-5 w-5 text-green-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationTypeLabel = (type) => {
    switch (type) {
      case 'MEMBERSHIP_EXPIRY':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Membership</Badge>;
      case 'PAYMENT_REMINDER':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Payment</Badge>;
      case 'ANNOUNCEMENT':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Announcement</Badge>;
      case 'PROMOTION':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Promotion</Badge>;
      default:
        return <Badge variant="outline">System</Badge>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Manage and send notifications to members and staff.
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Bell className="mr-2 h-4 w-4" />
          Create Notification
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className={`cursor-pointer ${filter === 'all' ? 'bg-orange-50 border-orange-200' : ''}`} onClick={() => setFilter('all')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">All Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">{notifications.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer ${filter === 'sent' ? 'bg-blue-50 border-blue-200' : ''}`} onClick={() => setFilter('sent')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold">
                {notifications.filter(n => n.status === 'sent').length}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer ${filter === 'scheduled' ? 'bg-yellow-50 border-yellow-200' : ''}`} onClick={() => setFilter('scheduled')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-yellow-500" />
              <span className="text-2xl font-bold">
                {notifications.filter(n => n.status === 'scheduled').length}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer ${filter === 'draft' ? 'bg-gray-50 border-gray-200' : ''}`} onClick={() => setFilter('draft')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-2xl font-bold">
                {notifications.filter(n => n.status === 'draft').length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">
              {filter === 'all' ? 'All Notifications' : 
               filter === 'sent' ? 'Sent Notifications' :
               filter === 'scheduled' ? 'Scheduled Notifications' : 'Draft Notifications'}
            </h3>
          </div>
          <div className="flex items-center">
            <Input 
              placeholder="Search notifications..." 
              className="max-w-xs mr-2"
            />
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </div>

        {filteredNotifications.map((notification) => (
          <Card key={notification.id}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0 flex items-start justify-center h-12 w-12 rounded-full bg-gray-100">
                  {getNotificationTypeIcon(notification.type)}
                </div>

                <div className="flex-grow space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h4 className="text-lg font-medium">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                      {getNotificationTypeLabel(notification.type)}
                      {notification.status === 'sent' && (
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">Sent</Badge>
                      )}
                      {notification.status === 'scheduled' && (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
                      )}
                      {notification.status === 'draft' && (
                        <Badge variant="outline">Draft</Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {notification.recipientCount} recipients
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {notification.status === 'sent' ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            {notification.readCount}/{notification.recipientCount} read
                          </span>
                        </>
                      ) : notification.status === 'scheduled' ? (
                        <>
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">
                            Scheduled for {formatDate(notification.scheduledFor)}
                          </span>
                        </>
                      ) : (
                        <>
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Draft created {formatDate(notification.createdAt)}
                          </span>
                        </>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground ml-6 sm:ml-0">
                      {notification.status === 'sent' && `Sent: ${formatDate(notification.sentAt)}`}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">No notifications found</h3>
            <p className="text-muted-foreground">
              {filter === 'all' 
                ? 'There are no notifications in the system.'
                : `There are no ${filter} notifications.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
