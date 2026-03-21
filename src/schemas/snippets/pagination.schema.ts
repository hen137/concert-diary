import { z } from "zod";

export const paginationSchema = z.object({
    "cursor": z.string(),
    "page_size": z.number(),
    "first_cursor": z.string(),
    "last_cursor": z.string(),
    "next_cursor": z.string(),
    "previous_cursor": z.string(),
})