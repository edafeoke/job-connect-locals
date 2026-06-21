import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/layout/section-card";
import { adminService } from "@/server/services/admin.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DisableUserButton } from "@/features/admin/disable-user-button";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata = { title: "Admin Users — JobConnect Locals" };

export default async function AdminUsersPage() {
  const { users } = await adminService.getUsers();

  return (
    <div className="space-y-8">
      <PageHeader title="Users" description="Manage platform users" />
      <SectionCard contentClassName="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Joined</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={user.id} className={cn(i % 2 === 1 && "bg-muted/20")}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">Admin</span>
                  ) : user.disabled ? (
                    <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-semibold text-destructive">Disabled</span>
                  ) : (
                    <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">Active</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDateTime(user.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  {!user.isAdmin && !user.disabled && (
                    <DisableUserButton userId={user.id} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
