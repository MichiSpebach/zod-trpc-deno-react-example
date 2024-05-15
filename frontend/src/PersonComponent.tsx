import { useState } from 'react'
import { trpcClient } from './trpcClient'
import { Person } from './common/Person'
import { SafeParseReturnType, ZodError } from 'zod'

export default function PersonForm() {
	const [name, setName] = useState('')
	const personQuery = trpcClient.getPersons.useQuery();
	const personMutation = trpcClient.addPerson.useMutation()

	return (
		<div>
			{personQuery.isSuccess
				? personQuery.data.map(person => <div>{person.name}</div>)
				: <div>{personQuery.error?.message ?? personQuery.status}</div>
			}
			<input placeholder='name' value={name} onChange={event => setName(event.target.value)}/>
			<button onClick={addPerson}>Add</button>
			{personMutation.isPending && personMutation.status}
			{buildTip()}
		</div>
	)

	async function addPerson(): Promise<void> {
		try {
			await personMutation.mutateAsync({name})
		} catch (error: unknown) {
			// handled globally
			//alert(error)
			return
		}
		setName('')
		personQuery.refetch()
	}

	function buildTip(): JSX.Element {
		const parseResult: SafeParseReturnType<Person, Person> = Person.safeParse({name})
		return parseResult.success
			? <div style={{color: 'green'}}>ok</div>
			: <div style={{color: 'red'}}>{stringifyZodError(parseResult.error)}</div>
	}
}

function stringifyZodError<T>(error: ZodError<T>): string {
	return error.errors.map(error => `${error.path}: ${error.message}`).join(', ')
}