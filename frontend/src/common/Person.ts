import { z as zod } from 'zod'

export type Person = zod.infer<typeof Person>
export const Person = zod.object({
	name: zod.string().min(4)
})