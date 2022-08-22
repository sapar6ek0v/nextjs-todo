import z from 'zod'

export const createTodoSchema = z.object({
  content: z.string({
    required_error: 'Content is required',
    invalid_type_error: 'Content must be a string',
  }),
})

export const getSingleTodoSchema = z.object({
  id: z.string().cuid(),
})

export const TodoSchema = z.object({
  id: z.string().cuid(),
  content: z.string(),
  createdAt: z.date(),
})

export type CreateTodoInput = z.TypeOf<typeof createTodoSchema>
