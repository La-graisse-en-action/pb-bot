import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
    },
  });

  await prisma.message.createMany({
    data: [
      {
        content: '¡Hola desde Alice!',
        userId: user1.id,
      },
      {
        content: '¡Hola desde Bob!',
        userId: user2.id,
      },
      {
        content: 'Alice de nuevo.',
        userId: user1.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed completed!');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
