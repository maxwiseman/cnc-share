import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { files } from "@/server/db/schema";

export const fileRouter = createTRPCRouter({
  getFiles: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.files.findMany();
  }),

  uploadFileMetadata: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string(),
        fileUrl: z.string().url(),
        images: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(files).values({
        ...input,
        userId: ctx.session.user.id,
      });
    }),
});
