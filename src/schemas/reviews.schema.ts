import z from 'zod';

export const reviewSchema = z.object({
  review_id: z.uuid(),
});
