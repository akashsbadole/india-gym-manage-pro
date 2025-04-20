
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  User,
  Phone,
  Calendar,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import MemberDetails from './MemberDetails';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MemberData {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  join_date: string;
  active: boolean;
  gym_location: {
    name: string;
  };
  // For the membership info, we'll fetch this separately
  membership?: string;
}

interface MemberListProps {
  searchQuery: string;
}

const MemberList: React.FC<MemberListProps> = ({ searchQuery }) => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<MemberData[]>([]);
  const { toast } = useToast();
  const itemsPerPage = 5;

  // Fetch members from Supabase
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('members')
          .select(`
            id, 
            name, 
            phone, 
            email, 
            join_date, 
            active,
            gym_location:gym_location_id(name)
          `)
          .order('join_date', { ascending: false });

        if (error) {
          throw error;
        }

        // For each member, fetch their membership info
        const membersWithMembership = await Promise.all(
          (data || []).map(async (member) => {
            const { data: enrollments, error: enrollmentError } = await supabase
              .from('membership_enrollments')
              .select(`
                membership:membership_id(name)
              `)
              .eq('member_id', member.id)
              .eq('status', 'ACTIVE')
              .limit(1)
              .single();

            if (enrollmentError && enrollmentError.code !== 'PGRST116') {
              console.error('Error fetching membership:', enrollmentError);
            }

            return {
              ...member,
              membership: enrollments?.membership?.name || 'None'
            };
          })
        );

        setMembers(membersWithMembership);
      } catch (error: any) {
        console.error('Error fetching members:', error);
        toast({
          title: 'Error loading members',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [toast]);

  // Filter members based on search query
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.phone.includes(searchQuery) ||
    (member.email && member.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleViewMember = (memberId: string) => {
    setSelectedMember(memberId);
  };

  const handleCloseDetails = () => {
    setSelectedMember(null);
  };

  const handleEditMember = (memberId: string) => {
    console.log('Edit member:', memberId);
    // Implement edit functionality
  };

  const handleDeleteMember = async (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      try {
        const { error } = await supabase
          .from('members')
          .delete()
          .eq('id', memberId);
        
        if (error) {
          throw error;
        }
        
        // Update the members list
        setMembers(members.filter(member => member.id !== memberId));
        toast({
          title: 'Member deleted',
          description: 'The member has been successfully deleted',
        });
      } catch (error: any) {
        console.error('Error deleting member:', error);
        toast({
          title: 'Error deleting member',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  };

  // If a member is selected, show their details
  if (selectedMember) {
    const member = members.find(m => m.id === selectedMember);
    if (member) {
      return <MemberDetails 
        member={{
          id: member.id,
          name: member.name,
          phone: member.phone,
          email: member.email || '',
          joinDate: new Date(member.join_date),
          active: member.active,
          location: member.gym_location.name,
          membership: member.membership || 'None'
        }} 
        onClose={handleCloseDetails} 
      />;
    }
  }

  if (loading) {
    return (
      <Card className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading members...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length > 0 ? (
              filteredMembers
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.gym_location.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                          {member.phone}
                        </div>
                        <div className="text-muted-foreground">{member.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={member.active ? "success" : "outline"}>
                        {member.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{member.membership}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{formatDistanceToNow(new Date(member.join_date), { addSuffix: true })}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewMember(member.id)}
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditMember(member.id)}
                          title="Edit member"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteMember(member.id)}
                          title="Delete member"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {searchQuery ? 'No members found matching your search.' : 'No members found. Add your first member!'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredMembers.length > itemsPerPage && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {page} of {Math.ceil(filteredMembers.length / itemsPerPage)}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPage(
                page < Math.ceil(filteredMembers.length / itemsPerPage)
                  ? page + 1
                  : page
              )
            }
            disabled={page >= Math.ceil(filteredMembers.length / itemsPerPage)}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      )}
    </Card>
  );
};

export default MemberList;
