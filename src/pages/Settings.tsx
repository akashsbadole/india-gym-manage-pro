
import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Building, 
  Users, 
  Lock, 
  Settings as SettingsIcon,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileSettingsForm from '@/components/settings/ProfileSettingsForm';
import { showNotification } from '@/utils/notifications';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Placeholder for other settings
  const OtherSettingsPlaceholder = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center py-16">
      <SettingsIcon className="h-16 w-16 text-muted-foreground/30 mb-4" />
      <h3 className="text-lg font-medium">{title} Settings</h3>
      <p className="text-muted-foreground text-center max-w-md mt-2">
        This section is under development. You'll be able to manage your {title.toLowerCase()} settings here soon.
      </p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={() => {
          showNotification(`${title} settings coming soon!`, 'info', {
            description: "We're working on this feature and it will be available in a future update."
          });
        }}
      >
        Notify Me When Ready
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-64 h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
            <CardDescription>Manage your preferences</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="flex flex-col space-y-1 px-2 pb-4">
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                className="justify-start"
                onClick={() => setActiveTab('profile')}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button
                variant={activeTab === 'notifications' ? 'default' : 'ghost'}
                className="justify-start"
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button
                variant={activeTab === 'security' ? 'default' : 'ghost'}
                className="justify-start"
                onClick={() => setActiveTab('security')}
              >
                <Shield className="mr-2 h-4 w-4" />
                <span>Security</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button
                variant={activeTab === 'billing' ? 'default' : 'ghost'}
                className="justify-start"
                onClick={() => setActiveTab('billing')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button
                variant={activeTab === 'organization' ? 'default' : 'ghost'}
                className="justify-start"
                onClick={() => setActiveTab('organization')}
              >
                <Building className="mr-2 h-4 w-4" />
                <span>Organization</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button
                variant={activeTab === 'team' ? 'default' : 'ghost'}
                className="justify-start"
                onClick={() => setActiveTab('team')}
              >
                <Users className="mr-2 h-4 w-4" />
                <span>Team</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button
                variant={activeTab === 'api' ? 'default' : 'ghost'}
                className="justify-start"
                onClick={() => setActiveTab('api')}
              >
                <Lock className="mr-2 h-4 w-4" />
                <span>API Access</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
            </nav>
            <div className="border-t px-2 pt-4 pb-2">
              <Button variant="ghost" className="justify-start text-red-500 hover:bg-red-50 hover:text-red-600 w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'profile' && 'Profile Settings'}
                {activeTab === 'notifications' && 'Notification Preferences'}
                {activeTab === 'security' && 'Security Settings'}
                {activeTab === 'billing' && 'Billing Information'}
                {activeTab === 'organization' && 'Organization Settings'}
                {activeTab === 'team' && 'Team Management'}
                {activeTab === 'api' && 'API Access'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'profile' && 'Update your personal information and preferences.'}
                {activeTab === 'notifications' && 'Configure how and when you receive notifications.'}
                {activeTab === 'security' && 'Manage your account security and authentication options.'}
                {activeTab === 'billing' && 'Manage your subscription and payment methods.'}
                {activeTab === 'organization' && 'Configure your organization details and branding.'}
                {activeTab === 'team' && 'Manage staff members and permissions.'}
                {activeTab === 'api' && 'Generate and manage API keys for integration.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeTab === 'profile' && <ProfileSettingsForm />}
              {activeTab === 'notifications' && <OtherSettingsPlaceholder title="Notification" />}
              {activeTab === 'security' && <OtherSettingsPlaceholder title="Security" />}
              {activeTab === 'billing' && <OtherSettingsPlaceholder title="Billing" />}
              {activeTab === 'organization' && <OtherSettingsPlaceholder title="Organization" />}
              {activeTab === 'team' && <OtherSettingsPlaceholder title="Team" />}
              {activeTab === 'api' && <OtherSettingsPlaceholder title="API" />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
