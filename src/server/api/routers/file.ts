import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { files, reports, likes } from "@/server/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { utapi } from "@/server/uploadthing-server";
import { adminUids } from "@/hooks/use-admin";

export const fileRouter = createTRPCRouter({
  getFiles: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.files.findMany({ with: { user: true } });
  }),

  getLikeInfo: publicProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ ctx, input }) => {
      const allLikes = await ctx.db.query.likes.findMany({
        where: eq(likes.fileId, input.fileId),
      });
      const userId = ctx.session?.user.id;
      const liked = userId ? allLikes.some((l) => l.userId === userId) : false;
      return { count: allLikes.length, liked };
    }),

  getLikesForFiles: publicProcedure
    .input(z.object({ fileIds: z.array(z.string()).min(1) }))
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db.query.likes.findMany({
        where: inArray(likes.fileId, input.fileIds),
      });
      const userId = ctx.session?.user.id;
      const result: Record<string, { count: number; liked: boolean }> = {};
      for (const id of input.fileIds) result[id] = { count: 0, liked: false };
      for (const row of rows) {
        const entry = result[row.fileId] ?? { count: 0, liked: false };
        entry.count += 1;
        if (userId && row.userId === userId) entry.liked = true;
        result[row.fileId] = entry;
      }
      return result;
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

  toggleLike: protectedProcedure
    .input(z.object({ fileId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.query.likes.findFirst({
        where: and(eq(likes.fileId, input.fileId), eq(likes.userId, userId)),
      });
      if (existing) {
        await ctx.db
          .delete(likes)
          .where(and(eq(likes.fileId, input.fileId), eq(likes.userId, userId)))
          .execute();
      } else {
        await ctx.db
          .insert(likes)
          .values({ fileId: input.fileId, userId })
          .execute();
      }
      const allLikes = await ctx.db.query.likes.findMany({
        where: eq(likes.fileId, input.fileId),
      });
      const liked = !existing;
      return { count: allLikes.length, liked };
    }),
});
