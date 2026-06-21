import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/shared/google-icon";

interface GoogleSignInButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function GoogleSignInButton({ onClick, disabled }: GoogleSignInButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full gap-3 border-border bg-background font-medium shadow-sm hover:bg-muted/50"
      onClick={onClick}
      disabled={disabled}
    >
      <GoogleIcon />
      Continue with Google
    </Button>
  );
}
