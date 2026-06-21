import { prisma } from "@/lib/prisma";
import type { NotificationType } from "@prisma/client";

export const notificationRepository = {
  async create(data: {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    payload?: string;
  }) {
    return prisma.notification.create({ data });
  },

  async findByUser(userId: string, limit = 20) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  },

  async countUnread(userId: string) {
    return prisma.notification.count({ where: { userId, read: false } });
  },

  async markRead(id: string, userId: string) {
    return prisma.notification.updateMany({
      where: { id, userId },
      data: { read: true },
    });
  },

  async markAllRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  },
};
