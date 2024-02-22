import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductRepository {
  public constructor(private readonly database: DatabaseService) { }

  public async save(product: Product): Promise<Product> {
    return await this.database.product.create({ data: product });
  }

  public async getAll(): Promise<Product[]> {
    return await this.database.product.findMany();
  }

  public async getById(id: number): Promise<Product> {
    return await this.database.product.findUnique({ where: { id: id } });
  }

  public async update(productId: number, product: Product): Promise<Product> {
    return await this.database.product.update({
      where: { id: productId },
      data: product,
    });
  }

  public async delete(id: number): Promise<void> {
    await this.database.product.delete({ where: { id: id } });
  }
}