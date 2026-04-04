import { z } from "zod";

export const paginationQueryString = z.object({
    limit: z.coerce
      .number()
      .int()
      .positive()
      .default(10)
      .meta({ description: "Number of items to return per page for pagination" }),
  cursor: z
    .string()
    .default("")
    .meta({ description: "Cursor for pagination, encoded as base64 string" }),
});

export const paginationSchema = z.object({
  cursor: z.string(),
  limit: z.number(),
  //   first_cursor: z.string(),
  //   last_cursor: z.string(),
  next_cursor: z.string(),
  previous_cursor: z.string(),
});
