import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { files, reports } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const fileRouter = createTRPCRouter({
  getFiles: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.files.findMany({ with: { user: true } });
  }),

  deleteFile: protectedProcedure
    .input(z.object({ fileId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const fileData = await ctx.db.query.files.findFirst({
        where: eq(files.id, input.fileId),
      });
      if (ctx.session.user.id !== fileData?.userId || !fileData) {
        return;
      }
      // TODO: Make this work. (see #9)
      // if (fileData.fileUrl) await utapi.deleteFiles([fileData.fileUrl]);
      await ctx.db.delete(files).where(eq(files.id, input.fileId)).execute();
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
      return await ctx.db
        .insert(files)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();
    }),

  reportFile: protectedProcedure
    .input(
      z.object({
        fileId: z.string().min(1),
        reason: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(reports)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();
    }),
});
