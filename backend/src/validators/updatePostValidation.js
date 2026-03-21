import { z } from 'zod';

const updatePostCheck = z.object({
    title: z
    .string()
    .optional(),
    content: z
    .string()
    .optional()
});

export default updatePostCheck;