import { PrismaClient } from '../prisma/generated/client'

const prisma = new PrismaClient()

async function main() {
  const testData = [
    {
      groupId: 'GROUP1',
      productCode: 'PROD001',
      quantity: 100,
      version: 1,
    },
    {
      groupId: 'GROUP1',
      productCode: 'PROD002',
      quantity: 150,
      version: 1,
    },
    {
      groupId: 'GROUP2',
      productCode: 'PROD003',
      quantity: 200,
      version: 1,
    },
  ]

  for (const data of testData) {
    await prisma.product.create({
      data: data,
    })
  }

  console.log('テストデータが追加されました')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
