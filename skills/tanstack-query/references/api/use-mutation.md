---
source: https://tanstack.com/query/latest/docs/framework/react/reference/useMutation
---

# useMutation

React hook for managing asynchronous mutations, with state management, automatic retries, optimistic updates, and lifecycle callbacks.

## Signature / Usage

```tsx
const {
  mutate,
  mutateAsync,
  data,
  error,
  isPending,
} = useMutation({
  mutationFn: (variables) => postTodo(variables),
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mutationFn` | `(variables, context: MutationFunctionContext) => Promise<TData>` | Required unless defaults are set. Performs an asynchronous task and returns a promise |
| `mutationKey` | `MutationKey` | Enables inheritance of defaults via `queryClient.setMutationDefaults` |
| `onMutate` | `(variables) => Promise<TContext> \| TContext` | Executes before `mutationFn`; ideal for optimistic updates. Return value is passed to `onError`/`onSettled` for rollback |
| `onSuccess` | `(data, variables, onMutateResult, context) => void` | Fires when the mutation is successful |
| `onError` | `(error, variables, onMutateResult, context) => void` | Fires when the mutation fails |
| `onSettled` | `(data, error, variables, onMutateResult, context) => void` | Fires when the mutation is either successfully fetched or encounters an error |
| `retry` | `boolean \| number \| function` | Default `0`. `false`: no retries, `true`: infinite, number: max attempts |
| `retryDelay` | `(attempt, error) => number` | Returns millisecond delay; supports exponential/linear backoff |
| `networkMode` | `'online' \| 'always' \| 'offlineFirst'` | Default `'online'` |
| `throwOnError` | `boolean \| (error) => boolean` | Determines if errors propagate to error boundaries |
| `meta` | `Record<string, unknown>` | Stores additional information on the mutation cache entry |
| `gcTime` | `number` | Time unused/inactive cache data remains in memory; set to `Infinity` to disable garbage collection |

## Returns

| Name | Type | Description |
|------|------|-------------|
| `mutate(variables, options?)` | function | Triggers the mutation; return value is ignored (void function). Callback fires only for the latest invocation if multiple requests made |
| `mutateAsync(variables, options?)` | `() => Promise<TData>` | Promise-based variant |
| `status` | `'idle' \| 'pending' \| 'error' \| 'success'` | Mutation status |
| `isIdle` / `isPending` / `isError` / `isSuccess` / `isPaused` | `boolean` | Derived from `status`; `isPaused` indicates network mode pause state |
| `data` | `TData \| undefined` | Last successfully resolved data for the mutation |
| `error` | `TError \| null` | Mutation error object; `null` if no error |
| `variables` | `TVariables` | The variables object passed to `mutationFn` |
| `reset()` | function | Cleans internal state, returning the mutation to initial condition |
| `failureCount` | `number` | Incremented per failure; resets to `0` on success |
| `failureReason` | `TError \| null` | Latest error; resets to `null` on success |
| `submittedAt` | `number` | Timestamp when mutation was submitted; defaults to `0` |

## Notes

- Mutations with identical `scope.id` execute serially; the default scope allows parallel execution
- Multiple callbacks can be attached both at hook initialization and at invocation
- Supports a custom `QueryClient` instance as a second argument

## Related

- [useMutationState](./use-mutation-state.md)
- [mutationOptions](./mutation-options.md)
- [MutationCache](./mutation-cache.md)
