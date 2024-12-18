// src/lib/schema.ts
import { z } from "zod";

export const formSchema = z.object({
  // ... your existing schema
});

export type FormData = z.infer<typeof formSchema>;