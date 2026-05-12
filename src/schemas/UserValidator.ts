import { z } from 'zod';

// Definición del Esquema Maestro
export const UserSchema = z.object({
  username: z.string().min(3, "Mínimo 3 letras").max(20),
  email: z.string().email("Correo no válido"),
  points: z.number().positive().int(),
  birthDate: z.date().optional()
});

// Inferencia Automática (¡Magia de TS!)
export type User = z.infer<typeof UserSchema>;