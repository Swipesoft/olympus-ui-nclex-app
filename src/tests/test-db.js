// scripts/test-db.js
//const { PrismaClient } = require('@prisma/client')

import { PrismaClient } from '@prisma/client'; 

async function testDatabase() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔍 Testing database connection...')
    
    await prisma.$connect()
    console.log('✅ Connected to database')
    
    const users = await prisma.user.findMany()
    console.log(`✅ Found ${users.length} users`)
    
    console.log('✅ All tests passed!')
    
  } catch (error) {
    console.error('❌ Database test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()