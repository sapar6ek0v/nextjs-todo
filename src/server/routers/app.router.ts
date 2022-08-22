import { createRouter } from '../createRouter'
import { todoRouter } from './todo.router'

export const appRouter = createRouter().merge('todos.', todoRouter)

export type AppRouter = typeof appRouter
