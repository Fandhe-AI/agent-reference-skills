# renderMatches

Renders the result of `matchRoutes` into a React element.

## Signature / Usage

```typescript
function renderMatches(
  matches: RouteMatch[] | null,
): React.ReactElement | null
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `matches` | `RouteMatch[] \| null` | The array of route matches (typically from `matchRoutes`) to render |

Returns a `React.ReactElement` that renders the matched routes, or `null` if no matches are provided.

## Notes

- Available in **Framework Mode**, **Data Mode**, and **Declarative Mode** (all three modes)
- Typically used together with `matchRoutes` to programmatically render matched routes

## Related

- [matchRoutes](./matchRoutes.md)
