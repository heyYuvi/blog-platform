import { z } from 'zod';

const updateCommentCheck = z.object({
    text: z.string()
    .trim()
    .min(3, "Text must contain at least 3 characters")
    .max(3000, "Text too long")
});

export default updateCommentCheck;