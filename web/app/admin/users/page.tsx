import { adminService } from "@/server/services/admin.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DisableUserButton } from "@/features/admin/disable-user-button";
import { formatDateTime } from "@/lib/format";

export const metadata = { title: "Admin Users — JobConnect Locals" };

export default async function AdminUsersPage() {
  const { users } = await adminService.getUsers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.isAdmin ? (
                  <Badge>Admin</Badge>
                ) : user.disabled ? (
                  <Badge variant="destructive">Disabled</Badge>
                ) : (
                  <Badge variant="outline">Active</Badge>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDateTime(user.createdAt)}
              </TableCell>
              <TableCell>
                {!user.isAdmin && !user.disabled && (
                  <DisableUserButton userId={user.id} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
