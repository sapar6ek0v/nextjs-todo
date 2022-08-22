import { router } from '@trpc/server'
import superjson from 'superjson'

import { ContextType } from './createContext'

export function createRouter() {
  return router<ContextType>().transformer(superjson)
}
