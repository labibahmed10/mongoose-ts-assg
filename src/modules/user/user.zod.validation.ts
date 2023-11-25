import { z } from 'zod';

const fullNameZodValidation = z.object({
  firstName: z.string().trim().max(20),
  lastname: z.string().trim().max(20),
});

const addressZodValidation = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

export const userZodValidation = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: fullNameZodValidation,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressZodValidation,
});

export const ordersZodValidation = z.object({
  productName: z.string().min(1),
  price: z.number().min(1),
  quantity: z.number(),
});
