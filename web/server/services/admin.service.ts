import { adminRepository } from "@/server/repositories/admin.repository";

export const adminService = {
  getStats() {
    return adminRepository.getStats();
  },

  getUsers(page?: number) {
    return adminRepository.getUsers(page);
  },

  getJobs(page?: number) {
    return adminRepository.getJobs(page);
  },

  getApplications(page?: number) {
    return adminRepository.getApplications(page);
  },

  getAuditLogs(page?: number) {
    return adminRepository.getAuditLogs(page);
  },

  getApplicationsByStatus() {
    return adminRepository.getApplicationsByStatus();
  },

  getJobsOverTime() {
    return adminRepository.getJobsOverTime();
  },

  async disableUser(adminId: string, userId: string) {
    const user = await adminRepository.disableUser(userId);
    await adminRepository.createAuditLog({
      adminId,
      action: "DISABLE_USER",
      entityType: "User",
      entityId: userId,
    });
    return user;
  },

  async closeJob(adminId: string, jobId: string) {
    const job = await adminRepository.closeJob(jobId);
    await adminRepository.createAuditLog({
      adminId,
      action: "CLOSE_JOB",
      entityType: "Job",
      entityId: jobId,
    });
    return job;
  },
};
