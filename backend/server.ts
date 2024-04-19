import { initTRPC } from 'npm:@trpc/server'
import { createHTTPServer } from 'npm:@trpc/server@^10.45/adapters/standalone'
import cors from 'npm:cors@^2.8'
import { z as zod } from 'npm:zod'
import { Person } from '../frontend/src/common/Person.ts';

const trpc = initTRPC.create()

export const router = trpc.router({
	greet: trpc.procedure
		.input(zod.string())
		.query(({input}) => `Hello ${input}`),

	addPerson: trpc.procedure.input(Person).mutation(({input}) => {
		persons.push(input)
		return input
	}),

	getPersons: trpc.procedure.query(() => persons)
})

export type Router = typeof router

const server = createHTTPServer({
	middleware: cors(), // TODO: not meant for production
	router
})
server.listen(8000)

const persons: Person[] = [
	{name: 'Satoshi Nakamoto'}
]