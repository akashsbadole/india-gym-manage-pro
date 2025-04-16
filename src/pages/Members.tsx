
import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  RefreshCw, 
  ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MemberList from '@/components/members/MemberList';
import AddMemberForm from '@/components/members/AddMemberForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Members = () => {
  const [showAddMember, setShowAddMember] = useState(false);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNewClick = () => {
    setShowAddMember(true);
  };

  const handleCloseForm = () => {
    setShowAddMember(false);
  };

  const handleAddMemberSuccess = () => {
    toast({
      title: "Member added successfully",
      description: "The new member has been added to the system.",
    });
    setShowAddMember(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Members</h2>
          <p className="text-muted-foreground">
            Manage your gym members, view details and track memberships.
          </p>
        </div>
        <Button onClick={handleAddNewClick} className="w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-4 md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Narrow down member results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone..."
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
                  Active
                </Button>
                <Button variant="outline" className="justify-start">
                  <span className="h-2 w-2 rounded-full bg-gray-300 mr-2"></span>
                  Inactive
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Membership</label>
              <Button variant="outline" className="w-full justify-between">
                <span>All Memberships</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Button variant="outline" className="w-full justify-between">
                <span>All Locations</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </div>

            <Button className="w-full mt-2" variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
            
            <Button className="w-full" variant="ghost">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </CardContent>
        </Card>

        <div className="col-span-4 md:col-span-3">
          <MemberList searchQuery={searchQuery} />
        </div>
      </div>

      {showAddMember && (
        <AddMemberForm 
          onClose={handleCloseForm} 
          onSuccess={handleAddMemberSuccess}
        />
      )}
    </div>
  );
};

export default Members;
