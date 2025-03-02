import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { files, reports } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { utapi } from "@/server/uploadthing-server";
import { adminUids } from "@/hooks/use-admin";

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
      if (
        (ctx.session.user.id !== fileData?.userId &&
          !adminUids.includes(ctx.session.user.id)) ||
        !fileData
      ) {
        return;
      }
      if (fileData.fileData.id) await utapi.deleteFiles([fileData.fileData.id]);
      await ctx.db.delete(files).where(eq(files.id, input.fileId)).execute();
    }),

  uploadFileMetadata: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string(),
        fileData: z.object({ id: z.string(), url: z.string().url() }),
        imageData: z.array(z.object({ id: z.string(), url: z.string().url() })),
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
