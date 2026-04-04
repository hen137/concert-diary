import { z } from "zod";

export const serverErrorSchema = z
  .object({
    message: z.string(),
  })
  .meta({ description: "500 internal server error response" });
