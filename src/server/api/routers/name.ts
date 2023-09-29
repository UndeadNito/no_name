import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

import { nameRules } from '~/utils/validator';

export const name = createTRPCRouter({
  validate: publicProcedure
    .input(z.object({ name: nameRules }))
    .mutation(async ({ input }) => {
      await new Promise((r) => setTimeout(r, 5000));
    }),
});
