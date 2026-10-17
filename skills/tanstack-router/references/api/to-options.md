---
source: https://tanstack.com/router/latest/docs/api/router/ToOptionsType
---

# ToOptions

Properties describing a router destination, including `mask` for route masking.

## Signature / Usage

```tsx
type ToOptions = {
  from?: ValidRoutePath | string
  to?: ValidRoutePath | string
  hash?: true | string | ((prev?: string) => string)
  state?: true | HistoryState | ((prev: HistoryState) => HistoryState)
} & SearchParamOptions &
  PathParamOptions &
  MaskOptions

type SearchParamOptions = {
  search?: true | TToSearch | ((prev: TFromSearch) => TToSearch)
}

type PathParamOptions = {
  params?:
    | true
    | Record<string, TPathParam>
    | ((prev: TFromParams) => TToParams)
}

type MaskOptions = {
  mask?: ToMaskOptions<TRouter, TMaskFrom, TMaskTo>
}
```

## Related

- [ToMaskOptions](./to-mask-options.md)
- [NavigateOptions](./navigate-options.md)
- [HistoryState](./history-state.md)
