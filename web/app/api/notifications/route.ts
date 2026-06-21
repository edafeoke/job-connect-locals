import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { notificationRepository } from "@/server/repositories/notification.repository";

export async function GET() {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [notifications, unread] = await Promise.all([
    notificationRepository.findByUser(session.user.id),
    notificationRepository.countUnread(session.user.id),
  ]);

  return NextResponse.json({ notifications, unread });
}
