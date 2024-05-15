import { DefaultError, Mutation, MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react';
import { trpcClient as trpc } from './trpcClient'
import PersonForm from './PersonComponent';

export function App() {
	const [queryClient] = useState(() => new QueryClient({
		queryCache: new QueryCache({
			onError: (error, query) => {
				alert(error)
			}
		}),
		mutationCache: new MutationCache({
			onError: (error: DefaultError, variables: unknown, context: unknown, mutation: Mutation<unknown, unknown, unknown>) => {
				alert(`Request to server failed: ${error}\n\n`
					+ `variables: ${JSON.stringify(variables, null, '\t')}\n\n`
					+ `context: ${JSON.stringify(context, null, '\t')}\n\n`
					+ `mutation: ${JSON.stringify(mutation, null, '\t')}`
				)
			}
		})
	}))
	const [trpcClient] = useState(() => trpc.createClient({
		links: [
			httpBatchLink({
				url: 'http://localhost:8000'
			})
		]
	}))
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<div style={{margin: '50px'}}>
					<h1>React frontend with Zod, tRPC and Deno backend</h1>
					<PersonForm />
				</div>
			</QueryClientProvider>
		</trpc.Provider>
	);
}
