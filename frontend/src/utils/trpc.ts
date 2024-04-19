import { createTRPCReact } from '@trpc/react-query'
import type { Router } from '../../../backend/server'

export const trpc = createTRPCReact<Router>()