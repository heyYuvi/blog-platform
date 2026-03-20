import { z } from 'zod';

const postCheck = z.object({
    title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title too long'),
    content: z
    .string()
    .trim()
    .min(10, 'Content must be at lesat 10 chearcters')
    .max(3000, 'Content too long'),
});

export default postCheck;