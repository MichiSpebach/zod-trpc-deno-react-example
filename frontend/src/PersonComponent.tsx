import { trpcClient } from './trpcClient'
import { Person } from './common/Person'
import { FieldError, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function PersonForm() {
	const personQuery = trpcClient.getPersons.useQuery();
	const personMutation = trpcClient.addPerson.useMutation()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, touchedFields, dirtyFields },
	} = useForm({
		resolver: zodResolver(Person),
		mode: 'all'
	})

	return (
		<>
			{personQuery.isSuccess
				? personQuery.data.map(person => <div>{person.name}</div>)
				: <div>{personQuery.error?.message ?? personQuery.status}</div>
			}
			<form onSubmit={handleSubmit(person => addPerson(person))}>
				<input placeholder='name' {...register('name')}/>
				<div>{(touchedFields.name || dirtyFields.name) && buildTip(errors.name)}</div>
				<input type='submit' value='Add' />
				{personMutation.isPending && personMutation.status}
			</form>
		</>
	)

	async function addPerson(person: Person): Promise<void> {
		try {
			await personMutation.mutateAsync(person)
			reset()
			personQuery.refetch()
		} catch (error: unknown) {
			// handled globally
			//alert(error)
			return
		}
	}

	function buildTip(error: FieldError|undefined): JSX.Element {
		return error
			? <div style={{color: 'red'}}>{stringifyZodError(error)}</div>
			: <div style={{color: 'green'}}>ok</div>
	}
}

function stringifyZodError(error: FieldError): string {
	return String(error.message)
}