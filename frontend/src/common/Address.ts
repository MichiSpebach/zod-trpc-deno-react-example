import {z as zod} from 'zod'

export type Address = zod.infer<typeof Address>
export const Address = zod.object({
	street: zod.string(),
	zipCode: zod.string()
})