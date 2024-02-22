import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const productId1 = 1;
  const productId2 = 2;
  const productId3 = 3;
  const userId1 = 1;
  const userId2 = 2;
  const userId3 = 3;

  await prisma.cartItem.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      { id: productId1, title: 'Title1' },
      { id: productId2, title: 'Title2' },
      { id: productId3, title: 'Title3' },
    ],
  });
  await prisma.user.createMany({
    data: [
      { id: userId1, name: 'Name1' },
      { id: userId2, name: 'Name2' },
      { id: userId3, name: 'Name3' },
    ],
  });
  await prisma.cartItem.createMany({
    data: [
      { userId: userId1, productId: productId1 },
      { userId: userId2, productId: productId2 },
    ],
  });
}

const errorCode = 1;

main()
  .catch((e) => {
    console.error(e);
    process.exit(errorCode);
  })
  .finally(async () => await prisma.$disconnect());