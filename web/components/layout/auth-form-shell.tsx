interface AuthFormShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function AuthFormShell({ title, description, children }: AuthFormShellProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="mt-1.5 text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
