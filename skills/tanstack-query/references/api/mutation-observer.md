---
source: https://tanstack.com/query/latest/docs/framework/react/reference/classes/MutationObserver
---

# MutationObserver

Observes a single mutation and derives a `MutationObserverResult` from it. `useMutation` creates one per hook call, calls `setOptions` on option changes, subscribes to re-render, and reads `getCurrentResult()`. Calling `mutate()` builds a new `Mutation` in the `MutationCache` and executes it. Extends `Subscribable`.

## Signature / Usage

```ts
const observer = new MutationObserver(queryClient, {
  mutationFn: (variables: { title: string }) => addPost(variables),
})
```

Type parameters: `TData = unknown`, `TError = DefaultError`, `TVariables = void`, `TOnMutateResult = unknown`.

```ts
new MutationObserver<TData, TError, TVariables, TOnMutateResult>(client: QueryClient, options: MutationObserverOptions<TData, TError, TVariables, TOnMutateResult>)
```

## Methods

| Name | Description |
|------|-------------|
| `options` (property) | `MutationObserverOptions<...>` current options |
| `getCurrentResult()` | Returns the current `MutationObserverResult`; default `idle` state if no mutation built yet (before first `mutate()` or after `reset()`) |
| `hasListeners(): boolean` | `true` while at least one listener is registered |
| `mutate(variables, options?: MutateOptions): Promise<TData>` | Builds a new `Mutation` with current options, detaches from the previous one, attaches to the new one and executes. Per-call `onSuccess` / `onError` / `onSettled` run in addition to observer-level callbacks. Resolves with data or rejects with the error |
| `reset(): void` | Detaches from the observed mutation and resets the result to `idle`. Does not cancel an in-flight mutation; its callbacks still fire |
| `setOptions(options): void` | Updates options (defaulted with `QueryClient#defaultMutationOptions`). If `mutationKey` changed (both defined), resets; otherwise updates a still-`pending` mutation in place |
| `subscribe(listener): () => void` | Registers a listener; returns an unsubscribe function |

## Related

- [Mutation](./mutation.md)
- [useMutation](./use-mutation.md)
- [QueryClient](./query-client.md)
