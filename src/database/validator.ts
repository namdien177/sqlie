import { z } from "zod";

export const relationalConnectionSchema = z.object({
  host: z.string(),
  user: z.string(),
  password: z.string(),
  database: z.string(),
  port: z.coerce.number(),
  multipleStatements: z.boolean(),
});

export type RelationalConnection = z.infer<typeof relationalConnectionSchema>;
