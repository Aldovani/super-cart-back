import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type Category = {
  name: string;
  description: string;
};

type CreateCategoryProps = Category;
type UpdateCategoryProps = { id: number } & Category;

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create({ description, name }: CreateCategoryProps) {
    return this.prisma.category.create({
      data: { description, name },
    });
  }

  update({ description, name, id }: UpdateCategoryProps) {
    return this.prisma.category.update({
      data: { description, name },
      where: {
        id,
      },
    });
  }

  delete(categoryId: number) {
    return this.prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }

  findById(categoryId: number) {
    return this.prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });
  }

  findByName(name: string) {
    return this.prisma.category.findFirst({
      where: {
        name,
      },
    });
  }

  find() {
    return this.prisma.category.findMany();
  }

  async findByProductID(productId: string) {
    return this.prisma.category.findMany({
      where: {
        ProductCategories: { some: { productId } },
      },
    });
  }
}
