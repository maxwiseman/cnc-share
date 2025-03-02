"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/use-admin";
import { api } from "@/trpc/react";
import { IconTrash } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function DeleteButton({
  authorId,
  fileId,
}: {
  authorId: string;
  fileId: string;
}) {
  const { data: session, status } = useSession();
  const { isAdmin } = useAdmin();
  const deleteMutation = api.file.deleteFile.useMutation();

  if (
    (status !== "authenticated" || authorId !== session?.user.id) &&
    !isAdmin
  ) {
    return null;
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
          <IconTrash className="h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your file
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteMutation.mutateAsync({ fileId });
              redirect("/");
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
