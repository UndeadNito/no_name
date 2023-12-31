import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

import { nameRules } from '~/utils/validator';

export const posts = createTRPCRouter({
  getPosts: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullable(),
        names: nameRules.array().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.thought.findMany({
        take: 10,
        skip: input.cursor ? 1 : undefined,
        cursor: input.cursor
          ? {
              id: input.cursor,
            }
          : undefined,
        where: input.names
          ? {
              author: {
                name: {
                  in: input.names,
                },
              },
            }
          : undefined,
        include: {
          author: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }),
  makePost: publicProcedure
    .input(z.object({ name: nameRules, text: z.string().min(1).max(400) }))
    .mutation(async ({ ctx, input }) => {
      const author = await ctx.db.name.upsert({
        create: {
          name: input.name,
          lastUsedAt: new Date(),
        },
        update: {
          name: input.name,
          lastUsedAt: new Date(),
        },
        where: {
          name: input.name,
        },
      });
      return await ctx.db.thought.create({
        data: {
          text: input.text,
          author: {
            connect: author,
          },
        },
        include: {
          author: true,
        },
      });
    }),
});
