import { prisma } from "../lib/prisma";
import { hashPassword } from "better-auth/crypto";

async function main() {
  console.log("Seeding database...");

  const adminPassword = await hashPassword("Admin123!");
  const userPassword = await hashPassword("User1234!");

  await prisma.user.upsert({
    where: { email: "admin@jobconnect.locals" },
    update: {},
    create: {
      name: "Platform Admin",
      email: "admin@jobconnect.locals",
      emailVerified: true,
      isAdmin: true,
      accounts: {
        create: {
          accountId: "admin@jobconnect.locals",
          providerId: "credential",
          password: adminPassword,
        },
      },
    },
  });

  const employer = await prisma.user.upsert({
    where: { email: "employer@jobconnect.locals" },
    update: {},
    create: {
      name: "Ada Okonkwo",
      email: "employer@jobconnect.locals",
      emailVerified: true,
      accounts: {
        create: {
          accountId: "employer@jobconnect.locals",
          providerId: "credential",
          password: userPassword,
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: "seeker@jobconnect.locals" },
    update: {},
    create: {
      name: "Chidi Eze",
      email: "seeker@jobconnect.locals",
      emailVerified: true,
      profile: {
        create: {
          headline: "Experienced Office Administrator",
          bio: "Detail-oriented professional with 5 years of admin experience in Warri and Lagos.",
          phone: "+234 803 000 0001",
          location: "Warri, Delta",
          skills: "Microsoft Office, Scheduling, Customer Service, Bookkeeping",
        },
      },
      accounts: {
        create: {
          accountId: "seeker@jobconnect.locals",
          providerId: "credential",
          password: userPassword,
        },
      },
    },
  });

  const company1 = await prisma.company.upsert({
    where: { slug: "delta-enterprises" },
    update: {},
    create: {
      name: "Delta Enterprises",
      slug: "delta-enterprises",
      description: "Leading business services company in Warri.",
      location: "Warri, Delta",
      industry: "Business Services",
      size: "50-100",
      ownerId: employer.id,
    },
  });

  const company2 = await prisma.company.upsert({
    where: { slug: "lagos-tech-hub" },
    update: {},
    create: {
      name: "Lagos Tech Hub",
      slug: "lagos-tech-hub",
      description: "Innovation hub connecting tech talent with startups.",
      location: "Lagos, Nigeria",
      industry: "Technology",
      size: "20-50",
      ownerId: employer.id,
    },
  });

  const jobs = [
    {
      title: "Secretary Needed",
      description:
        "We are looking for a reliable secretary to manage office operations, scheduling, and correspondence. Must be proficient in Microsoft Office and have excellent communication skills.",
      salary: 50000,
      salaryNegotiable: true,
      location: "Warri",
      employmentType: "FULL_TIME" as const,
      experienceLevel: "MID" as const,
      category: "Administration",
      requirements: "2+ years experience, fluent English, organized",
      benefits: "Health allowance, transport stipend",
      status: "PUBLISHED" as const,
      companyId: company1.id,
    },
    {
      title: "Frontend Developer",
      description:
        "Join our team building modern web applications with React and Next.js. You'll work on user-facing features and collaborate with designers.",
      salary: 350000,
      salaryNegotiable: true,
      location: "Lagos",
      employmentType: "FULL_TIME" as const,
      experienceLevel: "MID" as const,
      category: "IT & Software",
      requirements: "React, TypeScript, 2+ years experience",
      benefits: "Remote-friendly, learning budget",
      status: "PUBLISHED" as const,
      companyId: company2.id,
    },
    {
      title: "Customer Service Representative",
      description:
        "Handle customer inquiries via phone and email. Provide excellent service and resolve issues promptly.",
      salary: 80000,
      salaryNegotiable: false,
      location: "Warri",
      employmentType: "FULL_TIME" as const,
      experienceLevel: "ENTRY" as const,
      category: "Customer Service",
      requirements: "Good communication, patience, basic computer skills",
      benefits: "Performance bonuses",
      status: "PUBLISHED" as const,
      companyId: company1.id,
    },
    {
      title: "Marketing Assistant",
      description:
        "Support marketing campaigns, social media management, and content creation for local businesses.",
      salary: 120000,
      salaryNegotiable: true,
      location: "Lagos",
      employmentType: "PART_TIME" as const,
      experienceLevel: "ENTRY" as const,
      category: "Marketing",
      requirements: "Social media experience, creative mindset",
      benefits: "Flexible hours",
      status: "PUBLISHED" as const,
      companyId: company2.id,
    },
    {
      title: "Security Officer",
      description:
        "Ensure safety and security of premises. Monitor access and conduct regular patrols.",
      salary: 65000,
      salaryNegotiable: false,
      location: "Warri",
      employmentType: "FULL_TIME" as const,
      experienceLevel: "ENTRY" as const,
      category: "Security",
      requirements: "Valid security certification",
      benefits: "Uniform provided",
      status: "PUBLISHED" as const,
      companyId: company1.id,
    },
    {
      title: "Accountant",
      description:
        "Manage financial records, prepare reports, and ensure compliance with local regulations.",
      salary: 200000,
      salaryNegotiable: true,
      location: "Lagos",
      employmentType: "FULL_TIME" as const,
      experienceLevel: "SENIOR" as const,
      category: "Finance",
      requirements: "ICAN/ACCA, 5+ years experience",
      benefits: "Pension, health insurance",
      status: "PUBLISHED" as const,
      companyId: company2.id,
    },
  ];

  for (const job of jobs) {
    const existing = await prisma.job.findFirst({
      where: { title: job.title, companyId: job.companyId },
    });
    if (!existing) {
      await prisma.job.create({ data: job });
    }
  }

  console.log("Seed complete!");
  console.log("Admin: admin@jobconnect.locals / Admin123!");
  console.log("Employer: employer@jobconnect.locals / User1234!");
  console.log("Seeker: seeker@jobconnect.locals / User1234!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
