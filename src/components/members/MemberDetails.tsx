
import React from 'react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  joinDate: Date;
  active: boolean;
  location: string;
  membership: string;
}

interface MemberDetailsProps {
  member: Member;
  onClose: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member, onClose }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Member Details</h2>
          <p className="text-muted-foreground">View and manage member information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-orange-600" />
              </div>
              <h3 className="text-xl font-medium">{member.name}</h3>
              <Badge variant={member.active ? "success" : "outline"} className="mt-2">
                {member.active ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Phone Number</p>
                  <p className="text-sm">{member.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Email Address</p>
                  <p className="text-sm">{member.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Gym Location</p>
                  <p className="text-sm">{member.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Join Date</p>
                  <p className="text-sm">{format(member.joinDate, 'PPP')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Membership Type</p>
                  <Badge variant="secondary">{member.membership}</Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <Button className="flex-1" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button className="flex-1" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <Tabs defaultValue="attendance">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>Member Activity</CardTitle>
                <TabsList>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>
                View member's gym activity and records
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="attendance" className="space-y-4">
                <div className="flex items-center justify-between bg-muted p-4 rounded-lg mb-4">
                  <div>
                    <p className="text-sm font-medium">Last Check-in</p>
                    <p className="text-2xl font-bold">Today, 9:30 AM</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">This Month</p>
                    <p className="text-2xl font-bold">12 Days</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Average Duration</p>
                    <p className="text-2xl font-bold">1.5 Hours</p>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-3">Recent Check-ins</h3>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    return (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{format(date, 'EEEE, MMMM d')}</p>
                            <p className="text-sm text-muted-foreground">
                              {i === 0 ? '9:30 AM - 11:00 AM' : `${8 + i}:00 AM - ${9 + i}:30 AM`}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">{i === 0 ? 'Today' : `${i} days ago`}</Badge>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="payments" className="space-y-4">
                <div className="flex items-center justify-between bg-muted p-4 rounded-lg mb-4">
                  <div>
                    <p className="text-sm font-medium">Last Payment</p>
                    <p className="text-2xl font-bold">₹4,999</p>
                    <p className="text-xs text-muted-foreground">15 days ago</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Paid (YTD)</p>
                    <p className="text-2xl font-bold">₹14,997</p>
                    <p className="text-xs text-muted-foreground">3 payments</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Next Due</p>
                    <p className="text-2xl font-bold">₹4,999</p>
                    <p className="text-xs text-muted-foreground">In 15 days</p>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-3">Payment History</h3>
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => {
                    const date = new Date();
                    date.setMonth(date.getMonth() - i);
                    return (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">₹4,999 - {member.membership} Plan</p>
                            <p className="text-sm text-muted-foreground">
                              {format(date, 'MMMM d, yyyy')} • UPI
                            </p>
                          </div>
                        </div>
                        <Badge variant="success">Completed</Badge>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="inquiries" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Member Inquiries</h3>
                  <Button size="sm">
                    Add New Inquiry
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium flex items-center">
                          <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                          Equipment Issue
                        </h4>
                        <p className="text-sm text-muted-foreground">Submitted 5 days ago</p>
                      </div>
                      <Badge>In Progress</Badge>
                    </div>
                    <p className="text-sm mt-2">
                      The treadmill in the cardio section is making unusual noises. Please check.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium flex items-center">
                          <AlertCircle className="h-4 w-4 text-green-500 mr-2" />
                          Membership Upgrade
                        </h4>
                        <p className="text-sm text-muted-foreground">Submitted 2 weeks ago</p>
                      </div>
                      <Badge variant="outline">Resolved</Badge>
                    </div>
                    <p className="text-sm mt-2">
                      Inquiry about upgrading to VIP membership with personal training.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default MemberDetails;
