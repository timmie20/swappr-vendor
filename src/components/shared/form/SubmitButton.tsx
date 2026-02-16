import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  isPending: boolean;
  children: React.ReactNode;
  className: string | null;
}

export function SubmitButton({
  isPending,
  className,
  children,
  ...props
}: Props) {
  return (
    <Button
      disabled={isPending}
      type="submit"
      className={cn(className)}
      size="lg"
      {...props}
    >
      {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
      {children}
    </Button>
  );
}
