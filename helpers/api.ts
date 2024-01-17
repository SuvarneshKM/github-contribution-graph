import { z } from "zod";

export const ApiValidator = z.object({
  username: z.string(),
});

export type APIRequest = z.infer<typeof ApiValidator>;
