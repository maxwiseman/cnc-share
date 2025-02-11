import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { files } from "@/server/db/schema";

export const fileRouter = createTRPCRouter({
  getFiles: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.files.findMany({ with: { user: true } });
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

  searchFiles: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const searchQuery = `%${input.query.toLowerCase()}%`;
      const results = await ctx.db.query.files.findMany({
        where: (file) =>
          file.title.toLowerCase().includes(searchQuery) ||
          file.description.toLowerCase().includes(searchQuery),
      });
      return results;
    }),
});
