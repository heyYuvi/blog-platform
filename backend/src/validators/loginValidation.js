import { z } from 'zod';

const loginSchema = z.object({
    email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Invalid Email'),
    password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
});

export default loginSchema;