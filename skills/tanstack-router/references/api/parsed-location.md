---
source: https://tanstack.com/router/latest/docs/api/router/ParsedLocationType
---

# ParsedLocation

Represents a parsed location in TanStack Router: pathname, search params, hash, location state, and route masking information.

## Signature / Usage

```tsx
const location = useLocation()
// location.pathname, location.search, location.hash, ...
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `href` | `string` | Full href of the location |
| `pathname` | `string` | Pathname portion |
| `search` | `TFullSearchSchema` | Parsed search params object |
| `searchStr` | `string` | Raw search string |
| `state` | `ParsedHistoryState` | Location state |
| `hash` | `string` | Hash fragment |
| `maskedLocation` | `ParsedLocation` | The masked (displayed) location, if masking is in effect (optional) |
| `unmaskOnReload` | `boolean` | Whether the mask is removed on a full page reload (optional) |

## Related

- [useLocation](./use-location.md)
- [NavigateOptions](./navigate-options.md)
