import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const companyRepository = {
  async findByOwner(ownerId: string) {
    return prisma.company.findMany({
      where: { ownerId, deletedAt: null },
      include: { _count: { select: { jobs: true } } },
    });
  },

  async findById(id: string) {
    return prisma.company.findFirst({
      where: { id, deletedAt: null },
      include: { owner: { select: { id: true, name: true, email: true } } },
    });
  },

  async findBySlug(slug: string) {
    return prisma.company.findFirst({ where: { slug, deletedAt: null } });
  },

  async create(data: Prisma.CompanyCreateInput) {
    return prisma.company.create({ data });
  },

  async update(id: string, data: Prisma.CompanyUpdateInput) {
    return prisma.company.update({ where: { id }, data });
  },

  async count() {
    return prisma.company.count({ where: { deletedAt: null } });
  },
};
