const { PrismaClient } = require('@prisma/client')

const prismaClient = new PrismaClient()

async function prisma() {
  await prismaClient.$connect()
}

module.exports = {
  prisma,
  prismaClient,
}
