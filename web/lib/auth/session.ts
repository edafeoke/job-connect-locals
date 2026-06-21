import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireSession();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isAdmin: true, disabled: true },
  });
  if (!user?.isAdmin || user.disabled) {
    throw new Error("Forbidden");
  }
  return session;
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.user) return null;

  return prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      profile: true,
      companies: { where: { deletedAt: null } },
    },
  });
}
