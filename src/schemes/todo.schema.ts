import z from 'zod'

export const TodoSchema = z.object({
  id: z.string().cuid(),
  content: z.string({
    required_error: 'Content is required',
    invalid_type_error: 'Content must be a string',
  }),
})

export const TodoInputSchema = TodoSchema.omit({
  id: true,
})

export type TodoInput = z.TypeOf<typeof TodoInputSchema>
