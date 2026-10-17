---
source: https://tanstack.com/router/latest/docs/api/router/ToMaskOptionsType
---

# ToMaskOptions

Includes the same destination fields as `ToOptions`, excluding `mask`, and adds options specific to route masking.

## Signature / Usage

```tsx
type ToMaskOptions = {
  from?: ValidRoutePath | string
  to?: ValidRoutePath | string
  hash?: true | string | ((prev?: string) => string)
  state?: true | HistoryState | ((prev: HistoryState) => HistoryState)
} & SearchParamOptions &
  PathParamOptions & {
    unmaskOnReload?: boolean
  }
```

## Related

- [ToOptions](./to-options.md)
- [RouteMask](./route-mask.md)
