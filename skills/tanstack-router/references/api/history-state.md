---
source: https://tanstack.com/router/latest/docs/api/router/historyStateInterface
---

# HistoryState

Interface exported by the `history` package describing the shape of the state object used with the `history` package and the `window.location` API. It can be extended to add properties to the state object across your application.

## Signature / Usage

```tsx
// src/main.tsx
declare module '@tanstack/react-router' {
  // ...

  interface HistoryState {
    additionalRequiredProperty: number
    additionalProperty?: string
  }
}
```

## Related

- [ParsedHistoryState](./parsed-history-state.md)
- [ToOptions](./to-options.md)
