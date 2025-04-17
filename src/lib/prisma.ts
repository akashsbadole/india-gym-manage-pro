
import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

// In production, it's best to check for environment before creating a new client
const prismaClientSingleton = () => {
  return new PrismaClient()
}

// Check if window is defined (browser) or not (server)
const prisma = 
  typeof window !== 'undefined' 
    ? (globalThis as any).prisma ?? prismaClientSingleton() 
    : prismaClientSingleton()

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  (globalThis as any).prisma = prisma
}

export default prisma
