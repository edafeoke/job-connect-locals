import { prisma } from "@/lib/prisma";

export const adminRepository = {
  async getStats() {
    const [users, jobs, applications, companies] = await Promise.all([
      prisma.user.count(),
      prisma.job.count({ where: { deletedAt: null } }),
      prisma.application.count(),
      prisma.company.count({ where: { deletedAt: null } }),
    ]);
    return { users, jobs, applications, companies };
  },

  async getUsers(page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: {
          profile: true,
          _count: { select: { companies: true, applications: true } },
        },
      }),
      prisma.user.count(),
    ]);
    return { users, total, page, totalPages: Math.ceil(total / pageSize) };
  },

  async getJobs(page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize;
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        skip,
        take: pageSize,
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        include: { company: true, _count: { select: { applications: true } } },
      }),
      prisma.job.count({ where: { deletedAt: null } }),
    ]);
    return { jobs, total, page, totalPages: Math.ceil(total / pageSize) };
  },

  async getApplications(page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize;
    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: {
          job: { include: { company: true } },
          applicant: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.application.count(),
    ]);
    return { applications, total, page, totalPages: Math.ceil(total / pageSize) };
  },

  async getAuditLogs(page = 1, pageSize = 30) {
    const skip = (page - 1) * pageSize;
    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: { admin: { select: { name: true, email: true } } },
      }),
      prisma.auditLog.count(),
    ]);
    return { logs, total, page, totalPages: Math.ceil(total / pageSize) };
  },

  async disableUser(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { disabled: true },
    });
  },

  async closeJob(jobId: string) {
    return prisma.job.update({
      where: { id: jobId },
      data: { status: "CLOSED" },
    });
  },

  async createAuditLog(data: {
    adminId: string;
    action: string;
    entityType: string;
    entityId: string;
    metadata?: string;
  }) {
    return prisma.auditLog.create({ data });
  },

  async getApplicationsByStatus() {
    return prisma.application.groupBy({
      by: ["status"],
      _count: { status: true },
    });
  },

  async getJobsOverTime() {
    const jobs = await prisma.job.findMany({
      where: { deletedAt: null },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });
    const byMonth: Record<string, number> = {};
    for (const job of jobs) {
      const key = job.createdAt.toISOString().slice(0, 7);
      byMonth[key] = (byMonth[key] ?? 0) + 1;
    }
    return Object.entries(byMonth).map(([month, count]) => ({ month, count }));
  },
};
