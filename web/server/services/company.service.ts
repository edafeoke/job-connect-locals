import { companyRepository } from "@/server/repositories/company.repository";
import { slugify } from "@/lib/format";
import type { CompanyInput } from "@/lib/validations/profile";

export const companyService = {
  getByOwner(ownerId: string) {
    return companyRepository.findByOwner(ownerId);
  },

  getById(id: string) {
    return companyRepository.findById(id);
  },

  async create(ownerId: string, input: CompanyInput) {
    const baseSlug = slugify(input.name);
    let slug = baseSlug;
    let counter = 1;
    while (await companyRepository.findBySlug(slug)) {
      slug = `${baseSlug}-${counter++}`;
    }

    return companyRepository.create({
      name: input.name,
      slug,
      description: input.description ?? null,
      location: input.location ?? null,
      website: input.website || null,
      industry: input.industry ?? null,
      size: input.size ?? null,
      owner: { connect: { id: ownerId } },
    });
  },

  async update(id: string, input: CompanyInput, ownerId: string) {
    const company = await companyRepository.findById(id);
    if (!company || company.ownerId !== ownerId) {
      throw new Error("Company not found or unauthorized");
    }

    return companyRepository.update(id, {
      name: input.name,
      description: input.description ?? null,
      location: input.location ?? null,
      website: input.website || null,
      industry: input.industry ?? null,
      size: input.size ?? null,
    });
  },
};
