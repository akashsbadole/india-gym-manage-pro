
// This is a mock implementation of Prisma for browser environments
// In a real production app, you would use API routes instead of direct DB access from the browser

class MockPrismaClient {
  supportTicket = {
    create: async (data: any) => {
      console.log('Creating support ticket with data:', data);
      return { id: `MOCK-${Date.now()}`, ...data.data };
    },
    findMany: async () => {
      return [];
    }
  };
  
  gymLocation = {
    create: async (data: any) => {
      console.log('Creating gym location with data:', data);
      return { id: `MOCK-${Date.now()}`, ...data.data };
    },
    findMany: async () => {
      return [];
    }
  };

  member = {
    create: async (data: any) => {
      console.log('Creating member with data:', data);
      return { id: `MOCK-${Date.now()}`, ...data.data };
    },
    findMany: async () => {
      return [];
    }
  };

  payment = {
    create: async (data: any) => {
      console.log('Creating payment with data:', data);
      return { id: `MOCK-${Date.now()}`, ...data.data };
    },
    findMany: async () => {
      return [];
    }
  };
}

const mockPrismaClient = new MockPrismaClient();
export default mockPrismaClient;
