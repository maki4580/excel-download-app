import { prisma } from '../lib/prisma'
import type { Product } from '../types/product'

export class ProductRepository {
  async findByGroupId(groupId: string) {
    return prisma.product.findMany({
      where: {
        groupId: groupId
      },
      orderBy: {
        productCode: 'asc'
      }
    })
  }
}

export const productRepository = new ProductRepository()
