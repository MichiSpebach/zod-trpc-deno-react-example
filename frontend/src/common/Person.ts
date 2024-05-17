import { z as zod } from 'zod'
import { Address } from './Address.ts'

export type Person = zod.infer<typeof Person>
export const Person = zod.object({
	name: zod.string().min(4),
	address: Address.optional() // nesting Zod schemas into Zod schemas
})