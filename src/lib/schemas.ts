import { z } from 'zod'
import { TICKET_CATEGORIES, TICKET_PRIORITIES } from '@/lib/types'

export const loginSchema = z.object({
  username: z.string().min(1, 'Username wajib diisi'),
  password: z.string().min(1, 'Password wajib diisi'),
})

export const createTicketSchema = z.object({
  title: z
    .string()
    .min(5, 'Judul minimal 5 karakter')
    .max(100, 'Judul maksimal 100 karakter'),
  category: z.enum(TICKET_CATEGORIES, { error: 'Pilih kategori' }),
  priority: z.enum(TICKET_PRIORITIES, { error: 'Pilih prioritas' }),
  description: z
    .string()
    .min(10, 'Deskripsi minimal 10 karakter')
    .max(1000, 'Deskripsi maksimal 1000 karakter'),
})

export const editProfileSchema = z.object({
  firstName: z.string().min(1, 'Nama depan wajib diisi'),
  lastName: z.string().min(1, 'Nama belakang wajib diisi'),
  email: z.email('Format email tidak valid'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type CreateTicketFormValues = z.infer<typeof createTicketSchema>
export type EditProfileFormValues = z.infer<typeof editProfileSchema>