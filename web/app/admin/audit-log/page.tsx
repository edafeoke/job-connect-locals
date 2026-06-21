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
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata = { title: "Audit Log — JobConnect Locals" };

export default async function AuditLogPage() {
  const { logs } = await adminService.getAuditLogs();

  return (
    <div className="space-y-8">
      <PageHeader title="Audit Log" description="Record of admin actions on the platform" />
      <SectionCard contentClassName="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="font-semibold">Action</TableHead>
              <TableHead className="font-semibold">Entity</TableHead>
              <TableHead className="font-semibold">Admin</TableHead>
              <TableHead className="font-semibold">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-muted-foreground">
                  No audit logs yet
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log, i) => (
                <TableRow key={log.id} className={cn(i % 2 === 1 && "bg-muted/20")}>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {log.entityType} · {log.entityId.slice(0, 8)}…
                  </TableCell>
                  <TableCell>{log.admin.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDateTime(log.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
