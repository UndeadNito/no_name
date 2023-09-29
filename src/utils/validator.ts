import { z } from "zod";
import { env } from "~/env.mjs";

export const nameRules = z
  .string()
  .min(5, "Name should be longer than 4 symbols")
  .max(20, "Name should be shorter than 21 symbols")
  .regex(
    /^[\p{L}\d_]*$/u,
    "Name should only contain letters numbers and underscores",
  )
  .refine((name) => {
    if (name == env.SUPERNAME) return false;
    return true;
  }, "The is so many names but you want to be the Ruler? No");
