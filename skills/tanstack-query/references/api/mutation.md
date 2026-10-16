---
source: https://tanstack.com/query/latest/docs/framework/react/reference/classes/Mutation
---

# Mutation (class)

Represents a single mutation attempt. Holds the mutation's options, state (data/error/status), and the `MutationObserver`s subscribed to it. Extends `Removable`.

## Signature / Usage

```ts
const mutationCache = queryClient.getMutationCache()

const mutation = mutationCache.find({ mutationKey: ['addPost'] })
```

Type parameters: `TData = unknown`, `TError = DefaultError`, `TVariables = unknown`, `TOnMutateResult = unknown`.

```ts
new Mutation<TData, TError, TVariables, TOnMutateResult>(config: MutationConfig<TData, TError, TVariables, TOnMutateResult>)
```

## Properties

| Name | Type | Description |
|------|------|-------------|
| `gcTime` | `number` | Inherited from `Removable` |
| `mutationId` | `readonly number` | Mutation id |
| `options` | `MutationOptions<TData, TError, TVariables, TOnMutateResult>` | Mutation options |
| `state` | `MutationState<TData, TError, TVariables, TOnMutateResult>` | Current state |
| `meta` (getter) | `Record<string, unknown> \| undefined` | The `meta` passed in options, if any |

## Methods

| Name | Description |
|------|-------------|
| `continue(): Promise<unknown>` | Resumes a paused mutation or one restored from a dehydrated `pending` state. Resumes the retryer if present; else if `pending`, calls `execute` again with the last variables; else resolves immediately. Rejects if the mutation fails |
| `destroy(): void` | Clears the pending gc timeout (inherited from `Removable`) |
| `execute(variables: TVariables): Promise<TData>` | Runs the mutation function through a retryer and drives state and callbacks. If already `pending` (restored), skips `onMutate` and dispatches `continue`. Cache callbacks run before the mutation's own `onSuccess` / `onError` / `onSettled`; each failure callback is individually caught so it cannot mask the original error, which is re-thrown |

## Notes

- Created and managed internally by `MutationCache`; use `useMutation` or `QueryClient` normally. Direct access is via `mutationCache.find()` / `getAll()`.
- `execute` is called internally by `MutationObserver.mutate` and `Mutation.continue`; applications normally trigger mutations through those.
- Defined in `packages/query-core/src/mutation.ts`.

## Related

- [MutationCache](./mutation-cache.md)
- [MutationObserver](./mutation-observer.md)
- [matchMutation](./match-mutation.md)
- [useMutation](./use-mutation.md)
