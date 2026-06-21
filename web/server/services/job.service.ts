import { jobRepository } from "@/server/repositories/job.repository";
import { companyRepository } from "@/server/repositories/company.repository";
import type { JobInput } from "@/lib/validations/job";
import type { JobStatus } from "@prisma/client";

export const jobService = {
  search(filters: Parameters<typeof jobRepository.findMany>[0]) {
    return jobRepository.findMany(filters);
  },

  getById(id: string) {
    return jobRepository.findById(id);
  },

  getFeatured(limit?: number) {
    return jobRepository.getFeatured(limit);
  },

  getCategoryCounts() {
    return jobRepository.getCategoryCounts();
  },

  async create(input: JobInput, ownerId: string) {
    const company = await companyRepository.findById(input.companyId);
    if (!company || company.ownerId !== ownerId) {
      throw new Error("Company not found or unauthorized");
    }

    return jobRepository.create({
      title: input.title,
      description: input.description,
      salary: input.salary ?? null,
      salaryNegotiable: input.salaryNegotiable,
      location: input.location,
      employmentType: input.employmentType,
      experienceLevel: input.experienceLevel,
      category: input.category,
      requirements: input.requirements ?? null,
      benefits: input.benefits ?? null,
      applicationDeadline: input.applicationDeadline
        ? new Date(input.applicationDeadline)
        : null,
      status: "DRAFT",
      company: { connect: { id: input.companyId } },
    });
  },

  async update(id: string, input: Partial<JobInput>, ownerId: string) {
    const job = await jobRepository.findById(id);
    if (!job || job.company.ownerId !== ownerId) {
      throw new Error("Job not found or unauthorized");
    }

    return jobRepository.update(id, {
      title: input.title,
      description: input.description,
      salary: input.salary ?? null,
      salaryNegotiable: input.salaryNegotiable,
      location: input.location,
      employmentType: input.employmentType,
      experienceLevel: input.experienceLevel,
      category: input.category,
      requirements: input.requirements ?? null,
      benefits: input.benefits ?? null,
      applicationDeadline: input.applicationDeadline
        ? new Date(input.applicationDeadline)
        : null,
    });
  },

  async updateStatus(id: string, status: JobStatus, ownerId: string) {
    const job = await jobRepository.findById(id);
    if (!job || job.company.ownerId !== ownerId) {
      throw new Error("Job not found or unauthorized");
    }
    return jobRepository.update(id, { status });
  },

  getByCompany(companyId: string) {
    return jobRepository.findByCompany(companyId);
  },
};
