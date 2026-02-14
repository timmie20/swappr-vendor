import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";

interface Props
  extends VariantProps<typeof buttonVariants>,
    Omit<React.ComponentProps<"button">, "children"> {
  isPending: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormSubmitButton({
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
      {!isPending && children}
    </Button>
  );
}
