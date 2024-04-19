import { createTRPCProxyClient, httpBatchLink } from 'npm:@trpc/client@^10.45'
import type { Router } from '../backend/server.ts'

const client = createTRPCProxyClient<Router>({
	links: [httpBatchLink({url: 'http://localhost:8000'})]
})

const startTime = new Date()
console.log('start greetAll')

console.log(await client.greet.query('World'))

console.log(`greetAll finished within ${new Date().getTime() - startTime.getTime()} milliseconds`)