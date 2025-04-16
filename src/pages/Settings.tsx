
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Building2, 
  Bell, 
  CreditCard, 
  Shield, 
  Users,
  Smartphone,
  Database,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account and application preferences.
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-base">Settings</CardTitle>
            <CardDescription>
              Configure your gym management system
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 divide-y">
              <SettingTab
                icon={<User className="h-4 w-4" />}
                title="Profile"
                isActive={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
              />
              <SettingTab
                icon={<Building2 className="h-4 w-4" />}
                title="Business"
                isActive={activeTab === 'business'}
                onClick={() => setActiveTab('business')}
              />
              <SettingTab
                icon={<Users className="h-4 w-4" />}
                title="Team"
                isActive={activeTab === 'team'}
                onClick={() => setActiveTab('team')}
              />
              <SettingTab
                icon={<Bell className="h-4 w-4" />}
                title="Notifications"
                isActive={activeTab === 'notifications'}
                onClick={() => setActiveTab('notifications')}
              />
              <SettingTab
                icon={<CreditCard className="h-4 w-4" />}
                title="Billing"
                isActive={activeTab === 'billing'}
                onClick={() => setActiveTab('billing')}
              />
              <SettingTab
                icon={<Shield className="h-4 w-4" />}
                title="Security"
                isActive={activeTab === 'security'}
                onClick={() => setActiveTab('security')}
              />
              <SettingTab
                icon={<Smartphone className="h-4 w-4" />}
                title="Mobile App"
                isActive={activeTab === 'mobile'}
                onClick={() => setActiveTab('mobile')}
              />
              <SettingTab
                icon={<Database className="h-4 w-4" />}
                title="Data Management"
                isActive={activeTab === 'data'}
                onClick={() => setActiveTab('data')}
              />
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-6">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'business' && <BusinessSettings />}
          {activeTab === 'team' && <TeamSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'billing' && <BillingSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'mobile' && <MobileSettings />}
          {activeTab === 'data' && <DataSettings />}
        </div>
      </div>
    </div>
  );
};

const SettingTab = ({ icon, title, isActive, onClick }) => {
  return (
    <button
      className={`flex items-center space-x-3 w-full p-3 text-sm text-left ${
        isActive 
          ? 'bg-orange-50 border-r-2 border-orange-500 text-orange-900' 
          : 'text-gray-700 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <span className={`${isActive ? 'text-orange-500' : 'text-gray-500'}`}>{icon}</span>
      <span>{title}</span>
    </button>
  );
};

const ProfileSettings = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
              <span className="text-orange-700 font-bold text-xl">RG</span>
            </div>
            <div>
              <Button variant="outline" size="sm">Upload New Photo</Button>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, GIF or PNG. Max size 1MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input defaultValue="Raj Gym" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title</label>
              <Input defaultValue="Gym Owner" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" defaultValue="rajgym@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input defaultValue="+91 98765 43210" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Preferences</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <select className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="en-US">English (US)</option>
              <option value="en-IN">English (India)</option>
              <option value="hi-IN">Hindi</option>
              <option value="ta-IN">Tamil</option>
              <option value="te-IN">Telugu</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Time Zone</label>
            <select className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="IST">Indian Standard Time (IST)</option>
              <option value="UTC">Universal Coordinated Time (UTC)</option>
              <option value="EST">Eastern Standard Time (EST)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Format</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input type="radio" name="dateFormat" id="dmyFormat" defaultChecked />
                <label htmlFor="dmyFormat">DD/MM/YYYY</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="dateFormat" id="mdyFormat" />
                <label htmlFor="mdyFormat">MM/DD/YYYY</label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
    </>
  );
};

const BusinessSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
        <CardDescription>
          Configure your gym business details and brand settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Business Name</label>
            <Input defaultValue="MyGymWebApp Fitness Center" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Legal Business Name</label>
            <Input defaultValue="MyGymWebApp Fitness Pvt Ltd" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Business Email</label>
            <Input type="email" defaultValue="contact@mygymwebapp.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Business Phone</label>
            <Input defaultValue="+91 22 1234 5678" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">GST Number</label>
            <Input defaultValue="22AAAAA0000A1Z5" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">PAN Number</label>
            <Input defaultValue="AAAAA0000A" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Business Address</label>
          <Input defaultValue="123 MG Road, Central Area" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <Input placeholder="City" defaultValue="Mumbai" />
            <Input placeholder="State" defaultValue="Maharashtra" />
            <Input placeholder="Pincode" defaultValue="400001" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Business Logo</label>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
              <SettingsIcon className="h-8 w-8 text-orange-500" />
            </div>
            <Button variant="outline" size="sm">Upload Logo</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Recommended size: 512x512px. JPG, PNG or SVG.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Brand Colors</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Primary Color</p>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-orange-500"></div>
                <Input defaultValue="#F97316" className="max-w-[120px]" />
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Secondary Color</p>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-blue-500"></div>
                <Input defaultValue="#3B82F6" className="max-w-[120px]" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Business Info</Button>
      </CardFooter>
    </Card>
  );
};

const TeamSettings = () => {
  const teamMembers = [
    {
      id: '1',
      name: 'Raj Kumar',
      email: 'raj@mygymwebapp.com',
      role: 'ADMIN',
      locations: ['Central', 'East'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Priya Singh',
      email: 'priya@mygymwebapp.com',
      role: 'MANAGER',
      locations: ['Central'],
      status: 'active'
    },
    {
      id: '3',
      name: 'Vikram Patel',
      email: 'vikram@mygymwebapp.com',
      role: 'STAFF',
      locations: ['East'],
      status: 'active'
    },
    {
      id: '4',
      name: 'Neha Sharma',
      email: 'neha@mygymwebapp.com',
      role: 'STAFF',
      locations: ['Central'],
      status: 'invited'
    },
  ];

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage your staff and their access permissions
            </CardDescription>
          </div>
          <Button size="sm">
            <Users className="h-4 w-4 mr-2" />
            Invite Team Member
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="font-medium text-orange-500">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center mt-3 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-4">
                  <Badge variant={member.role === 'ADMIN' ? 'success' : 
                              member.role === 'MANAGER' ? 'outline' : 'secondary'}>
                    {member.role.charAt(0) + member.role.slice(1).toLowerCase()}
                  </Badge>
                  
                  <div className="text-sm">
                    <span className="text-muted-foreground">Locations: </span>
                    {member.locations.join(', ')}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Configure access rights for different user roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-5 bg-gray-50 p-3 border-b">
                <div className="col-span-2 font-medium">Feature</div>
                <div className="font-medium text-center">Admin</div>
                <div className="font-medium text-center">Manager</div>
                <div className="font-medium text-center">Staff</div>
              </div>
              
              <div className="divide-y">
                <RolePermissionRow 
                  feature="Members Management" 
                  admin={true} 
                  manager={true} 
                  staff={true} 
                />
                <RolePermissionRow 
                  feature="Financial Records" 
                  admin={true} 
                  manager={true} 
                  staff={false} 
                />
                <RolePermissionRow 
                  feature="Reports & Analytics" 
                  admin={true} 
                  manager={true} 
                  staff={false} 
                />
                <RolePermissionRow 
                  feature="Staff Management" 
                  admin={true} 
                  manager={false} 
                  staff={false} 
                />
                <RolePermissionRow 
                  feature="Settings & Configuration" 
                  admin={true} 
                  manager={false} 
                  staff={false} 
                />
                <RolePermissionRow 
                  feature="Membership Plans" 
                  admin={true} 
                  manager={true} 
                  staff={false} 
                />
                <RolePermissionRow 
                  feature="Attendance Tracking" 
                  admin={true} 
                  manager={true} 
                  staff={true} 
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button>Save Role Permissions</Button>
        </CardFooter>
      </Card>
    </>
  );
};

const RolePermissionRow = ({ feature, admin, manager, staff }) => {
  return (
    <div className="grid grid-cols-5 p-3 items-center">
      <div className="col-span-2">{feature}</div>
      <div className="text-center">
        <input type="checkbox" checked={admin} readOnly />
      </div>
      <div className="text-center">
        <input type="checkbox" checked={manager} readOnly />
      </div>
      <div className="text-center">
        <input type="checkbox" checked={staff} readOnly />
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Configure how and when you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
            <div className="space-y-3">
              <NotificationPreference
                title="Payment Reminders"
                description="Send automatic payment reminders to members"
                emailEnabled={true}
                pushEnabled={true}
                smsEnabled={false}
              />
              <NotificationPreference
                title="Membership Expiry"
                description="Notify members before their membership expires"
                emailEnabled={true}
                pushEnabled={true}
                smsEnabled={true}
              />
              <NotificationPreference
                title="New Member Registration"
                description="Get notified when a new member signs up"
                emailEnabled={true}
                pushEnabled={false}
                smsEnabled={false}
              />
              <NotificationPreference
                title="Staff Activity"
                description="Alerts about staff logins and actions"
                emailEnabled={true}
                pushEnabled={false}
                smsEnabled={false}
              />
              <NotificationPreference
                title="Financial Reports"
                description="Receive periodic financial reports"
                emailEnabled={true}
                pushEnabled={false}
                smsEnabled={false}
              />
              <NotificationPreference
                title="System Updates"
                description="Important system updates and maintenance notices"
                emailEnabled={true}
                pushEnabled={true}
                smsEnabled={false}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Scheduling</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Reminder Schedule</label>
                <select className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>7 days before due date</option>
                  <option>3 days before due date</option>
                  <option>1 day before due date</option>
                  <option>On due date</option>
                  <option>Custom schedule</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Membership Expiry Reminders</label>
                <select className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>14 days before expiry</option>
                  <option>7 days before expiry</option>
                  <option>3 days before expiry</option>
                  <option>Custom schedule</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Templates</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <h4 className="font-medium">Payment Reminder Template</h4>
                  <p className="text-sm text-muted-foreground">
                    Template used for payment reminder messages
                  </p>
                </div>
                <Button variant="outline" size="sm">Edit Template</Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <h4 className="font-medium">Membership Expiry Template</h4>
                  <p className="text-sm text-muted-foreground">
                    Template for membership expiry notifications
                  </p>
                </div>
                <Button variant="outline" size="sm">Edit Template</Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <h4 className="font-medium">Welcome Message Template</h4>
                  <p className="text-sm text-muted-foreground">
                    Sent to members when they join your gym
                  </p>
                </div>
                <Button variant="outline" size="sm">Edit Template</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Reset Defaults</Button>
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
};

const NotificationPreference = ({ title, description, emailEnabled, pushEnabled, smsEnabled }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center space-x-4 mt-2 sm:mt-0">
        <div className="flex items-center space-x-1">
          <input type="checkbox" id={`email-${title}`} defaultChecked={emailEnabled} />
          <label htmlFor={`email-${title}`} className="text-sm">Email</label>
        </div>
        <div className="flex items-center space-x-1">
          <input type="checkbox" id={`push-${title}`} defaultChecked={pushEnabled} />
          <label htmlFor={`push-${title}`} className="text-sm">Push</label>
        </div>
        <div className="flex items-center space-x-1">
          <input type="checkbox" id={`sms-${title}`} defaultChecked={smsEnabled} />
          <label htmlFor={`sms-${title}`} className="text-sm">SMS</label>
        </div>
      </div>
    </div>
  );
};

const BillingSettings = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            Manage your MyGymWebApp subscription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <Badge variant="success" className="mb-2">Current Plan</Badge>
                <h3 className="text-xl font-bold">Pro Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Billed annually at ₹29,999/year
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button variant="outline" className="w-full sm:w-auto">Change Plan</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-3 rounded-md border">
                <div className="font-medium">Next Billing Date</div>
                <div className="mt-1 text-lg">15 March, 2026</div>
              </div>
              <div className="bg-white p-3 rounded-md border">
                <div className="font-medium">Gym Locations</div>
                <div className="mt-1 text-lg">4 of 5 used</div>
              </div>
              <div className="bg-white p-3 rounded-md border">
                <div className="font-medium">Member Limit</div>
                <div className="mt-1 text-lg">1,222 of 2,000</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="text-destructive">Cancel Subscription</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage your payment methods and billing details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-blue-500" />
              <div>
                <div className="font-medium">HDFC Credit Card</div>
                <div className="text-sm text-muted-foreground">**** **** **** 4567 • Expires 09/27</div>
              </div>
            </div>
            <Badge>Default</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-green-500" />
              <div>
                <div className="font-medium">ICICI Debit Card</div>
                <div className="text-sm text-muted-foreground">**** **** **** 8901 • Expires 12/25</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Make Default</Button>
          </div>
          
          <Button variant="outline" className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View your past invoices and payment history
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="grid grid-cols-3 sm:grid-cols-6 p-4 text-sm">
                <div className="col-span-3 sm:col-span-2">
                  <div className="font-medium">Invoice #{2025000 + i}</div>
                  <div className="text-muted-foreground">Pro Plan - Annual</div>
                </div>
                <div className="sm:col-span-1 mt-2 sm:mt-0">
                  <div className="text-muted-foreground text-xs sm:text-sm">Amount</div>
                  <div>₹29,999.00</div>
                </div>
                <div className="sm:col-span-1 mt-2 sm:mt-0">
                  <div className="text-muted-foreground text-xs sm:text-sm">Date</div>
                  <div>{15 - i} March, {2025 - Math.floor((i-1)/12)}</div>
                </div>
                <div className="sm:col-span-1 mt-2 sm:mt-0">
                  <div className="text-muted-foreground text-xs sm:text-sm">Status</div>
                  <Badge variant="success" className="mt-1">Paid</Badge>
                </div>
                <div className="col-span-3 sm:col-span-1 mt-2 sm:mt-0 sm:text-right">
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const SecuritySettings = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Password & Authentication</CardTitle>
          <CardDescription>
            Manage your password and account security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <Input type="password" placeholder="Enter your current password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <Input type="password" placeholder="Enter new password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm New Password</label>
            <Input type="password" placeholder="Confirm new password" />
          </div>
          
          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Two-Factor Authentication (2FA)</h4>
              <Badge variant="outline" className="bg-red-100 text-red-800">Not Enabled</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Add an extra layer of security to your account by requiring both your password and a verification code.
            </p>
            <Button>Enable Two-Factor Authentication</Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Update Password</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>
            Recent login activity on your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between items-start p-3 border rounded-md">
                <div>
                  <div className="font-medium">
                    {i === 0 ? 'Current session' : `Login at ${new Date().toLocaleTimeString()}`}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    IP: 192.168.1.{100 + i} • Mumbai, India
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {i === 0 ? 'Chrome on Windows • Now' : `Firefox on Android • ${i} ${i === 1 ? 'hour' : 'hours'} ago`}
                  </div>
                </div>
                {i === 0 ? (
                  <Badge variant="success">Current</Badge>
                ) : i === 3 ? (
                  <Button variant="ghost" size="sm" className="text-destructive">
                    Not You?
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Access</CardTitle>
          <CardDescription>
            Manage devices and applications with access to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Active Sessions</h4>
              <p className="text-sm text-muted-foreground mb-3">
                These are the devices currently logged into your account.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <div className="font-medium">Chrome on Windows</div>
                    <div className="text-sm text-muted-foreground">Mumbai, India • Current session</div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">Active Now</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <div className="font-medium">MyGymWebApp Mobile App</div>
                    <div className="text-sm text-muted-foreground">Mumbai, India • Last active 2 hours ago</div>
                  </div>
                  <Button variant="outline" size="sm">Logout</Button>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="font-medium">Connected Applications</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Applications that have access to your MyGymWebApp account.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <div className="font-medium">Fitness Analytics Dashboard</div>
                    <div className="text-sm text-muted-foreground">
                      Access to: Member data, Reports, Analytics
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-destructive">
                    Revoke
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const MobileSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mobile App Settings</CardTitle>
        <CardDescription>
          Configure and manage your MyGymWebApp mobile application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-shrink-0">
            <Smartphone className="h-24 w-24 text-orange-500 mx-auto" />
          </div>
          <div className="space-y-3 flex-grow">
            <h3 className="text-lg font-medium">MyGymWebApp Mobile</h3>
            <p className="text-sm text-muted-foreground">
              Extend your gym management system to mobile devices. Available for both Android and iOS.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="bg-black hover:bg-gray-800" size="sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M17.5 12.5C17.5 14.875 19.25 16.375 21.5 17.5C20.75 19.875 18.875 22.5 16.625 22.5C14.625 22.5 13.875 21.25 11.5 21.25C9.25 21.25 8.125 22.5 6.375 22.5C4.125 22.5 2 19.5 2 14.5C2 9.625 5.375 7 8.375 7C10.375 7 11.875 8.25 13.125 8.25C14.25 8.25 16 7 18.375 7C19.5 7 21.75 7.25 23.25 9.5C19 11 17.5 12.5 17.5 12.5ZM16 4.5C16.625 3.125 17 2 17 1C15.875 1.125 14.5 1.75 13.625 2.5C12.625 3.375 12.125 4.5 12.125 5.5C13.25 5.625 14.5 5.125 16 4.5Z" />
                </svg>
                App Store
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" size="sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M3.66667 2.33333C3 3 3 4 3 6V18C3 20 3 21 3.66667 21.6667C4.33333 22.3333 5.33333 22.3333 7.33333 22.3333H16.6667C18.6667 22.3333 19.6667 22.3333 20.3333 21.6667C21 21 21 20 21 18V6C21 4 21 3 20.3333 2.33333C19.6667 1.66667 18.6667 1.66667 16.6667 1.66667H7.33333C5.33333 1.66667 4.33333 1.66667 3.66667 2.33333ZM12.0933 6.98933L16.2533 14.46C16.4933 14.86 16.38 15.38 15.98 15.62C15.8467 15.7 15.6933 15.74 15.54 15.74H7.22667C6.74667 15.74 6.36 15.3533 6.36 14.8733C6.36 14.72 6.4 14.5667 6.48 14.4333L10.64 6.96333C10.88 6.56333 11.4 6.45333 11.8 6.69333C11.9067 6.76 11.9933 6.84667 12.0933 6.98933Z" />
                </svg>
                Google Play
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Features & Access</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <div className="font-medium">Member Mobile Access</div>
                <p className="text-sm text-muted-foreground">
                  Allow members to access their profiles via mobile app
                </p>
              </div>
              <div className="flex items-center h-6">
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <div className="font-medium">Staff Mobile Access</div>
                <p className="text-sm text-muted-foreground">
                  Allow staff to manage gym operations via mobile app
                </p>
              </div>
              <div className="flex items-center h-6">
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <div className="font-medium">Mobile Check-in</div>
                <p className="text-sm text-muted-foreground">
                  Enable QR code check-in for members using the mobile app
                </p>
              </div>
              <div className="flex items-center h-6">
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <div className="font-medium">Push Notifications</div>
                <p className="text-sm text-muted-foreground">
                  Send mobile push notifications to members and staff
                </p>
              </div>
              <div className="flex items-center h-6">
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <div className="font-medium">Mobile Payments</div>
                <p className="text-sm text-muted-foreground">
                  Allow members to make payments through the mobile app
                </p>
              </div>
              <div className="flex items-center h-6">
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Branding & Customization</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">App Accent Color</label>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-orange-500"></div>
                <Input defaultValue="#F97316" className="max-w-[120px]" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">App Font</label>
              <select className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>System Default</option>
                <option>Poppins</option>
                <option>Roboto</option>
                <option>Montserrat</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">App Splash Screen</label>
              <div className="border border-dashed rounded-md p-8 text-center">
                <Smartphone className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-sm mt-2 text-muted-foreground">
                  Drag and drop your logo image here, or click to select
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Upload Image
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save App Settings</Button>
      </CardFooter>
    </Card>
  );
};

const DataSettings = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Manage your gym data and export options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Export Data</h3>
            <p className="text-sm text-muted-foreground">
              Export your gym data for backup or analysis in external tools.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                <Users className="mr-2 h-4 w-4" />
                Export Member Data
              </Button>
              <Button variant="outline" className="justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Export Financial Records
              </Button>
              <Button variant="outline" className="justify-start">
                <Building2 className="mr-2 h-4 w-4" />
                Export Location Data
              </Button>
              <Button variant="outline" className="justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Export Attendance Records
              </Button>
            </div>
            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium">Export Format</label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="csv" 
                    name="exportFormat" 
                    value="csv" 
                    defaultChecked 
                  />
                  <label htmlFor="csv">CSV</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="excel" 
                    name="exportFormat" 
                    value="excel" 
                  />
                  <label htmlFor="excel">Excel</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="json" 
                    name="exportFormat" 
                    value="json" 
                  />
                  <label htmlFor="json">JSON</label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Data Backup</h3>
            <p className="text-sm text-muted-foreground">
              Configure automatic backups of your gym data.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <div className="font-medium">Automatic Backups</div>
                  <p className="text-sm text-muted-foreground">
                    Enable scheduled backups of your data
                  </p>
                </div>
                <div className="flex items-center h-6">
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Backup Frequency</label>
                  <select className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Retention Period</label>
                  <select className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>1 Month</option>
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>1 Year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Data Management</h3>
            <p className="text-sm text-muted-foreground">
              Maintain and clean up your gym database.
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="justify-start w-full sm:w-auto">
                <Database className="mr-2 h-4 w-4" />
                Archive Inactive Members
              </Button>
              <Button variant="outline" className="justify-start text-destructive w-full sm:w-auto">
                <Database className="mr-2 h-4 w-4" />
                Clear Test Data
              </Button>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-8">
            <h3 className="text-lg font-medium text-red-800">Danger Zone</h3>
            <p className="text-sm text-red-600 mt-1 mb-4">
              The actions below are destructive and cannot be easily reversed.
            </p>
            <div className="space-y-4">
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 w-full sm:w-auto">
                Delete All Attendance Records
              </Button>
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 w-full sm:w-auto">
                Delete All Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Settings;
