"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group text-xs"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg [&_[data-title]]:!text-popover-foreground [&_[data-description]]:!text-muted-foreground",
          error:
            "group-[.toaster]:!bg-destructive group-[.toaster]:!text-destructive-foreground group-[.toaster]:!border-destructive/50 [&_[data-title]]:!text-destructive-foreground [&_[data-description]]:!text-destructive-foreground/90",
          success:
            "group-[.toaster]:!bg-primary group-[.toaster]:!text-primary-foreground [&_[data-title]]:!text-primary-foreground [&_[data-description]]:!text-primary-foreground/90",
          info: "[&_[data-title]]:!text-popover-foreground [&_[data-description]]:!text-muted-foreground",
          title: "!text-inherit text-sm font-medium",
          description: "!text-inherit text-sm opacity-90",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          icon: "!size-6 [&>svg]:size-6",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };