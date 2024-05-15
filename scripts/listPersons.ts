import { createTRPCProxyClient, httpBatchLink } from 'npm:@trpc/client'
import type { Router } from '../backend/server.ts'
import { Person } from '../frontend/src/common/Person.ts'
import { SafeParseReturnType, ZodIssue } from 'zod'

const client = createTRPCProxyClient<Router>({
	links: [httpBatchLink({url: 'http://localhost:8000'})]
})

const rawPersons: Person[] = await client.getPersons.query()
console.log('rawPersons: ', rawPersons)

const validPersons: {data: Person, rawData: Person}[] = []
const invalidPersons: {issues: ZodIssue[], rawData: unknown}[] = []
for (const rawPerson of rawPersons) {
	const parseResult: SafeParseReturnType<Person, Person> = Person.safeParse(rawPerson)
	if (parseResult.success) {
		validPersons.push({data: parseResult.data, rawData: rawPerson})
	} else {
		invalidPersons.push({issues: parseResult.error.errors, rawData: rawPerson})
	}
}

if (invalidPersons.length > 0) {
	console.warn(`there are ${invalidPersons.length} invalid persons:`, invalidPersons)
} else {
	console.log('there are no invalid persons')
}
console.log('validPersons:', validPersons)
