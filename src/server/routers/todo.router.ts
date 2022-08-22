import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import {
  createTodoSchema,
  getSingleTodoSchema,
} from '../../schemes/todo.schema'
import { createRouter } from '../createRouter'

export const todoRouter = createRouter()
  .mutation('create', {
    input: createTodoSchema,
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
        const todos = await ctx.prisma.todo.findMany()

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
    input: getSingleTodoSchema,
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
