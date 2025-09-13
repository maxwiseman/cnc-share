"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { IconHeart } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type LikeButtonProps = {
  fileId: string;
  initialCount?: number;
  initialLiked?: boolean;
  size?: "sm" | "default" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
};

export function LikeButton({
  fileId,
  initialCount,
  initialLiked,
  size = "default",
  variant = "outline",
  className,
}: LikeButtonProps) {
  const { status } = useSession();
  const router = useRouter();

  const utils = api.useUtils();
  const { data: likeInfo, refetch } = api.file.getLikeInfo.useQuery(
    { fileId },
    { enabled: initialCount === undefined || initialLiked === undefined },
  );
  const toggle = api.file.toggleLike.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.file.getLikeInfo.invalidate({ fileId }),
        utils.file.getLikesForFiles.invalidate(),
      ]);
    },
  });

  const [count, setCount] = useState<number>(
    initialCount ?? likeInfo?.count ?? 0,
  );
  const [liked, setLiked] = useState<boolean>(
    initialLiked ?? likeInfo?.liked ?? false,
  );

  useEffect(() => {
    if (likeInfo) {
      setCount(likeInfo.count);
      setLiked(likeInfo.liked);
    }
  }, [likeInfo]);

  return (
    <Button
      aria-pressed={liked}
      size={size}
      variant={variant}
      className={className}
      disabled={toggle.isPending}
      onClick={async (e) => {
        // Prevent parent Link navigation when used inside clickable cards
        e.preventDefault();
        e.stopPropagation();

        if (status !== "authenticated") {
          router.push("/auth/signin");
          return;
        }
        // optimistic update
        setLiked((prev) => !prev);
        setCount((c) => (liked ? Math.max(0, c - 1) : c + 1));
        const res = await toggle.mutateAsync({ fileId });
        setLiked(res.liked);
        setCount(res.count);
      }}
    >
      <IconHeart
        className={
          liked ? "mr-1 h-4 w-4 fill-current text-red-500" : "mr-1 h-4 w-4"
        }
      />
      {count}
    </Button>
  );
}

export default LikeButton;
