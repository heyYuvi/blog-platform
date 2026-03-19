import { z } from 'zod';

const userValidationSchema = z.object({
    name: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 character'),
    email: z
    .string()
    .trim()
    .email('Invalid email'),
    password: z
    .string()
    .min(8, 'Password should be at least 8 character'),
    avatar: z
    .string()
    .url('Avatar must be a url')
    .optional()
});

export default userValidationSchema;
