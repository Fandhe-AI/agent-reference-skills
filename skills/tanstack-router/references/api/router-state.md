---
source: https://tanstack.com/router/latest/docs/api/router/RouterStateType
---

# RouterState

The observable state of the router, including the requested and resolved locations, match presentation, and foreground loading status.

## Signature / Usage

```tsx
type RouterState = {
  status: 'pending' | 'idle'
  isLoading: boolean
  matches: Array<RouteMatch>
  location: ParsedLocation
  resolvedLocation?: ParsedLocation
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `status` | `'pending' \| 'idle'` | Current foreground status. `pending` means the requested route is still loading or waiting for its framework transition to settle |
| `isLoading` | `boolean` | `true` when `status` is `pending` |
| `matches` | `Array<RouteMatch>` | The match presentation currently exposed to the application |
| `location` | `ParsedLocation` | The latest location parsed from the browser history; may not be resolved and loaded yet |
| `resolvedLocation` | `ParsedLocation \| undefined` | The location whose load and framework transition have settled. `undefined` before the initial location resolves |

## Notes

- Background loader refreshes do not change `isLoading`. Inspect each match's `isFetching` field to observe foreground `beforeLoad`/loader work and background loader work.
- A navigation can keep the previous presentation visible until pending UI is published. Once the destination is presented, `matches` contains its complete structurally matched lane, including descendants that are still loading.
- Error and not-found results also preserve the complete structurally matched lane. Rendering stops at the selected pending or terminal boundary; it does not truncate this array.

## Related

- [useRouterState](./use-router-state.md)
- [RouteMatch](./route-match.md)
- [ParsedLocation](./parsed-location.md)
