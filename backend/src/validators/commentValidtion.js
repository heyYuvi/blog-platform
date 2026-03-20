import { z } from 'zod';

const commentCheck = z.object({
    text: z
    .string()
    .trim()
    .min(3, 'Text must be at least 3 characters')
    .max(3000, 'Text to long'),
    post: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Post ID')
});

export default commentCheck;