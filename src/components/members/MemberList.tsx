
import React, { useState } from 'react';
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
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import MemberDetails from './MemberDetails';

// Mock data - would be replaced with actual API calls in a real app
const MEMBERS_DATA = [
  { 
    id: '1', 
    name: 'Rahul Sharma', 
    phone: '+91 9876543210', 
    email: 'rahul.s@example.com',
    joinDate: new Date(2023, 3, 15),
    active: true,
    location: 'Mumbai Central',
    membership: 'Premium'
  },
  { 
    id: '2', 
    name: 'Priya Patel', 
    phone: '+91 8765432109', 
    email: 'priya.p@example.com',
    joinDate: new Date(2023, 5, 22),
    active: true,
    location: 'Delhi Heights',
    membership: 'Basic'
  },
  { 
    id: '3', 
    name: 'Ankit Singh', 
    phone: '+91 7654321098', 
    email: 'ankit.s@example.com',
    joinDate: new Date(2023, 2, 8),
    active: false,
    location: 'Mumbai Central',
    membership: 'Premium'
  },
  { 
    id: '4', 
    name: 'Neha Kapoor', 
    phone: '+91 6543210987', 
    email: 'neha.k@example.com',
    joinDate: new Date(2023, 7, 30),
    active: true,
    location: 'Bangalore East',
    membership: 'VIP'
  },
  { 
    id: '5', 
    name: 'Vikram Joshi', 
    phone: '+91 5432109876', 
    email: 'vikram.j@example.com',
    joinDate: new Date(2023, 1, 17),
    active: true,
    location: 'Delhi Heights',
    membership: 'Basic'
  },
];

interface MemberListProps {
  searchQuery: string;
}

const MemberList: React.FC<MemberListProps> = ({ searchQuery }) => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filteredMembers = MEMBERS_DATA.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.phone.includes(searchQuery) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleDeleteMember = (memberId: string) => {
    console.log('Delete member:', memberId);
    // Implement delete functionality with confirmation
  };

  // If a member is selected, show their details
  if (selectedMember) {
    const member = MEMBERS_DATA.find(m => m.id === selectedMember);
    if (member) {
      return <MemberDetails member={member} onClose={handleCloseDetails} />;
    }
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
                          <div className="text-xs text-muted-foreground">{member.location}</div>
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
                        <span className="text-sm">{formatDistanceToNow(member.joinDate, { addSuffix: true })}</span>
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
                  No members found.
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
