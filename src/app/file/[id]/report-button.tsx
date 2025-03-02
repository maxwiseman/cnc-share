"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { IconFlag } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export function ReportButton({ fileId }: { fileId: string }) {
  const session = useSession();
  const [isReporting, setIsReporting] = useState(false);
  const [reason, setReason] = useState("");

  const reportFile = api.file.reportFile.useMutation();

  if (session.status !== "authenticated") {
    return null;
  }

  return (
    <Dialog open={isReporting} onOpenChange={setIsReporting}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsReporting(true)} variant={"outline"}>
          <IconFlag />
          Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-6">
          <DialogTitle>Report File</DialogTitle>
          <DialogDescription>
            Please provide a reason why you are reporting this file.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="reason">Reason</Label>
          <Textarea
            id="reason"
            placeholder="Type something..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsReporting(false);
              reportFile
                .mutateAsync({ fileId, reason })
                .then(() => {
                  toast.success("File reported successfully!");
                })
                .catch(() => {
                  toast.error("Failed to report file!");
                });
            }}
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
