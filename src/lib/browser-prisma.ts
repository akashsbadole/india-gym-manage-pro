// This is a mock implementation of Prisma for browser environments
// In a real production app, you would use API routes instead of direct DB access from the browser

import { supabase } from '@/lib/supabase';

const mockMembers = [
  {
    id: 'MEM001',
    name: 'Rahul Kumar',
    email: 'rahul.k@example.com',
    phone: '+91 98765 43210',
    address: '123 Main St, Mumbai',
    dateOfBirth: new Date('1990-05-15'),
    gender: 'male',
    emergencyContact: '+91 98765 43211',
    joinDate: new Date('2023-01-15'),
    active: true,
    gymLocationId: 'LOC001',
    createdById: 'USR001'
  },
  {
    id: 'MEM002',
    name: 'Priya Singh',
    email: 'priya.s@example.com',
    phone: '+91 98765 43212',
    address: '456 Park Road, Delhi',
    dateOfBirth: new Date('1995-08-22'),
    gender: 'female',
    emergencyContact: '+91 98765 43213',
    joinDate: new Date('2023-03-10'),
    active: true,
    gymLocationId: 'LOC002',
    createdById: 'USR001'
  }
];

const mockLocations = [
  {
    id: 'LOC001',
    name: 'MyGym Mumbai Central',
    address: '789 Fitness Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 22 1234 5678',
    email: 'mumbai.central@mygym.com',
    openingTime: '06:00',
    closingTime: '22:00',
    managerId: 'USR001'
  },
  {
    id: 'LOC002',
    name: 'MyGym Delhi Heights',
    address: '321 Workout Avenue',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    phone: '+91 11 8765 4321',
    email: 'delhi.heights@mygym.com',
    openingTime: '06:00',
    closingTime: '22:00',
    managerId: 'USR002'
  }
];

const mockPayments = [
  {
    id: 'PAY001',
    amount: 4999,
    paymentDate: new Date('2024-03-15'),
    paymentMethod: 'UPI',
    status: 'COMPLETED',
    memberId: 'MEM001',
    gymLocationId: 'LOC001',
    reference: 'UPI123456',
    notes: 'Monthly membership payment'
  },
  {
    id: 'PAY002',
    amount: 1999,
    paymentDate: new Date('2024-03-16'),
    paymentMethod: 'CARD',
    status: 'COMPLETED',
    memberId: 'MEM002',
    gymLocationId: 'LOC002',
    reference: 'CARD789012',
    notes: 'Basic plan payment'
  }
];

const mockSupportTickets = [
  {
    id: 'TIC001',
    subject: 'Equipment Maintenance',
    description: 'Treadmill #3 making unusual noise',
    status: 'OPEN',
    priority: 'HIGH',
    memberId: 'MEM001',
    assignedToId: 'USR001',
    createdAt: new Date('2024-03-15T10:30:00'),
    updatedAt: new Date('2024-03-15T10:30:00')
  },
  {
    id: 'TIC002',
    subject: 'Membership Inquiry',
    description: 'Need information about premium plans',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    memberId: 'MEM002',
    assignedToId: 'USR002',
    createdAt: new Date('2024-03-16T09:15:00'),
    updatedAt: new Date('2024-03-16T14:20:00')
  }
];

class MockPrismaClient {
  supportTicket = {
    create: async (data: any) => {
      const { data: ticket, error } = await supabase
        .from('support_tickets')
        .insert([data.data])
        .select()
        .single();

      if (error) throw error;
      return ticket;
    },
    findMany: async () => {
      const { data: tickets, error } = await supabase
        .from('support_tickets')
        .select('*');

      if (error) throw error;
      return tickets || mockSupportTickets;
    }
  };
  
  gymLocation = {
    create: async (data: any) => {
      const { data: location, error } = await supabase
        .from('gym_locations')
        .insert([data.data])
        .select()
        .single();

      if (error) throw error;
      return location;
    },
    findMany: async () => {
      const { data: locations, error } = await supabase
        .from('gym_locations')
        .select('*');

      if (error) throw error;
      return locations || mockLocations;
    }
  };

  member = {
    create: async (data: any) => {
      const { data: member, error } = await supabase
        .from('members')
        .insert([data.data])
        .select()
        .single();

      if (error) throw error;
      return member;
    },
    findMany: async () => {
      const { data: members, error } = await supabase
        .from('members')
        .select('*');

      if (error) throw error;
      return members || mockMembers;
    }
  };

  payment = {
    create: async (data: any) => {
      const { data: payment, error } = await supabase
        .from('payments')
        .insert([data.data])
        .select()
        .single();

      if (error) throw error;
      return payment;
    },
    findMany: async () => {
      const { data: payments, error } = await supabase
        .from('payments')
        .select('*');

      if (error) throw error;
      return payments || mockPayments;
    }
  };
}

const mockPrismaClient = new MockPrismaClient();
export default mockPrismaClient;
