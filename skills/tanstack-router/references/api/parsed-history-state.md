---
source: https://tanstack.com/router/latest/docs/api/router/ParsedHistoryStateType
---

# ParsedHistoryState

Represents a parsed state object. In addition to `HistoryState`, it contains the index and the unique key of the route.

## Signature / Usage

```tsx
export type ParsedHistoryState = HistoryState & {
  key?: string
  __TSR_key?: string
  __TSR_index: number
}
```

## Notes

- The official type definition carries a source comment on `key` saying it is slated for removal in v2 and that `__TSR_key` should be used instead (comment omitted from the snippet above).

## Related

- [HistoryState](./history-state.md)
- [ParsedLocation](./parsed-location.md)
