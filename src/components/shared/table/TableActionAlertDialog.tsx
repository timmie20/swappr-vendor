import { useState, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { AlertDialogTooltip } from "@/components/shared/table/TableActionTooltip";
import { ServerActionResponse } from "@/types/server-action";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  title: string;
  description: string;
  tooltipContent: string;
  actionButtonText: string;
  toastSuccessMessage: string;
  queryKey: string;
  children: React.ReactNode;
  action: () => Promise<ServerActionResponse>;
};

export function TableActionAlertDialog({
  title,
  description,
  tooltipContent,
  actionButtonText,
  toastSuccessMessage,
  queryKey,
  children,
  action,
}: Props) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await action();

      if ("dbError" in result) {
        toast.error(result.dbError);
      } else {
        toast.success(toastSuccessMessage, { position: "top-center" });
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        setIsDialogOpen(false);
      }
    });
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTooltip content={tooltipContent}>
        {children}
      </AlertDialogTooltip>

      <AlertDialogContent>
        <AlertDialogHeader className="mb-4">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={handleConfirm}
            type="submit"
            size="lg"
            variant="destructive"
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {actionButtonText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
