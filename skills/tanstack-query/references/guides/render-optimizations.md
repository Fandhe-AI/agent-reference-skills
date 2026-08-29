---
source: https://tanstack.com/query/latest/docs/framework/react/guides/render-optimizations
---

# Render Optimizations

Automatic techniques that limit re-renders to only what actually changed.

## Signature / Usage

```js
export const useTodos = (select) => useQuery({ queryKey: ['todos'], queryFn: fetchTodos, select })
export const useTodoCount = () => useTodos(useCallback((data) => data.length, []))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `structuralSharing` | `boolean \| (oldData, newData) => data` | Keeps unchanged references stable; default `true`, JSON-compatible data only |
| `notifyOnChangeProps` | `string[] \| 'all'` | Restricts which property changes trigger re-render; default is tracked-properties behavior |
| `select` | `(data) => selected` | Subscribes the component only to a derived subset of `data` |

## Notes

- Tracked properties (via Proxy) mean the component only re-renders when a property it actually accessed changes — destructuring with object rest (`const { ...rest } = query`) disables this optimization.
- `select` only re-runs when the function reference changes or `data` changes — memoize inline selectors with `useCallback` or hoist them to a stable module-level function.
- `select` should not throw for error handling; errors should be handled in `queryFn` instead — a throwing `select` results in `data: undefined`, `isSuccess: true`.

## Related

- [important-defaults.md](./important-defaults.md)
