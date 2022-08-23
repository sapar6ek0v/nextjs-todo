import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { z } from 'zod'
import { TodoInputSchema } from '../../schemes/todo.schema'
import { createRouter } from '../createRouter'

export const todoRouter = createRouter()
  .mutation('create', {
    input: TodoInputSchema,
    async resolve({ ctx, input }) {
      try {
        const { content } = input

        const todo = await ctx.prisma.todo.create({
          data: { content },
        })

        return todo
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P202') {
            throw new trpc.TRPCError({
              code: 'BAD_REQUEST',
              message: 'Please, Check all inputs',
            })
          }
        }

        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong!',
        })
      }
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      try {
        const todos = await ctx.prisma.todo.findMany({
          orderBy: { createdAt: 'desc' },
        })

        return todos
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Something went wrong! ${error}`,
        })
      }
    },
  })
  .query('getById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        const todo = await ctx.prisma.todo.findUnique({
          where: { id: input.id },
        })

        return todo
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `We coundn\`t find todo with id ${input.id}!`,
        })
      }
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.string(),
      data: TodoInputSchema,
    }),
    async resolve({ input, ctx }) {
      try {
        const updatedTodo = await ctx.prisma.todo.update({
          where: { id: input.id },
          data: {
            content: input.data.content,
          },
        })

        return updatedTodo
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `We coundn\`t update todo with id ${input.id}!`,
        })
      }
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        const updatedTodo = await ctx.prisma.todo.delete({
          where: { id: input.id },
        })

        return updatedTodo
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `We coundn\`t delete todo with id ${input.id}!`,
        })
      }
    },
  })
