import { prisma } from "@/lib/prisma";
import type { JobSearchInput } from "@/lib/validations/job";
import type { JobStatus, Prisma } from "@prisma/client";

const PAGE_SIZE = 12;

export const jobRepository = {
  async findMany(filters: JobSearchInput, status: JobStatus = "PUBLISHED") {
    const where: Prisma.JobWhereInput = {
      status,
      deletedAt: null,
      company: { deletedAt: null },
    };

    if (filters.q) {
      where.OR = [
        { title: { contains: filters.q } },
        { description: { contains: filters.q } },
        { company: { name: { contains: filters.q } } },
      ];
    }
    if (filters.location) {
      where.location = { contains: filters.location };
    }
    if (filters.category) {
      where.category = filters.category;
    }
    if (filters.salaryMin) {
      where.salary = { gte: filters.salaryMin };
    }
    if (filters.experience) {
      where.experienceLevel = filters.experience;
    }
    if (filters.type) {
      where.employmentType = filters.type;
    }

    const page = filters.page ?? 1;
    const skip = (page - 1) * PAGE_SIZE;

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: { company: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: PAGE_SIZE,
      }),
      prisma.job.count({ where }),
    ]);

    return { jobs, total, page, pageSize: PAGE_SIZE, totalPages: Math.ceil(total / PAGE_SIZE) };
  },

  async findById(id: string) {
    return prisma.job.findFirst({
      where: { id, deletedAt: null },
      include: { company: true },
    });
  },

  async findByCompany(companyId: string) {
    return prisma.job.findMany({
      where: { companyId, deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { applications: true } } },
    });
  },

  async create(data: Prisma.JobCreateInput) {
    return prisma.job.create({ data, include: { company: true } });
  },

  async update(id: string, data: Prisma.JobUpdateInput) {
    return prisma.job.update({ where: { id }, data, include: { company: true } });
  },

  async softDelete(id: string) {
    return prisma.job.update({
      where: { id },
      data: { deletedAt: new Date(), status: "CLOSED" },
    });
  },

  async countPublished() {
    return prisma.job.count({ where: { status: "PUBLISHED", deletedAt: null } });
  },

  async getFeatured(limit = 6) {
    return prisma.job.findMany({
      where: { status: "PUBLISHED", deletedAt: null },
      include: { company: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  },

  async getCategoryCounts() {
    const groups = await prisma.job.groupBy({
      by: ["category"],
      where: { status: "PUBLISHED", deletedAt: null },
      _count: { category: true },
      orderBy: { _count: { category: "desc" } },
      take: 8,
    });
    return groups.map((g) => ({ category: g.category, count: g._count.category }));
  },
};
