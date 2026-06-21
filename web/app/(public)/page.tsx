import { jobService } from "@/server/services/job.service";
import { companyRepository } from "@/server/repositories/company.repository";
import { applicationRepository } from "@/server/repositories/application.repository";
import { jobRepository } from "@/server/repositories/job.repository";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingStats } from "@/components/landing/landing-stats";
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works";
import { LandingFeaturedJobs } from "@/components/landing/landing-featured-jobs";
import { LandingCategories } from "@/components/landing/landing-categories";
import { LandingTestimonials } from "@/components/landing/landing-testimonials";
import { LandingFAQ } from "@/components/landing/landing-faq";
import { LandingCTA } from "@/components/landing/landing-cta";

export default async function HomePage() {
  const [featuredJobs, categoryCounts, jobCount, companyCount, applicationCount] =
    await Promise.all([
      jobService.getFeatured(6),
      jobService.getCategoryCounts(),
      jobRepository.countPublished(),
      companyRepository.count(),
      applicationRepository.count(),
    ]);

  return (
    <div className="overflow-hidden">
      <LandingHero />
      <LandingStats
        jobCount={jobCount}
        companyCount={companyCount}
        applicationCount={applicationCount}
      />
      <LandingHowItWorks />
      <LandingFeaturedJobs jobs={featuredJobs} />
      <LandingCategories categories={categoryCounts} />
      <LandingTestimonials />
      <LandingFAQ />
      <LandingCTA />
    </div>
  );
}
