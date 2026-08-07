# parsePath

Parses a string URL path into its separate pathname, search, and hash components.

## Signature / Usage

```typescript
function parsePath(path: string): Partial<Path>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` | The URL path to parse |

Returns a `Partial<Path>` object containing the parsed `pathname`, `search`, and `hash` components.

## Notes

- Available in **Framework Mode**, **Data Mode**, and **Declarative Mode** (all three modes)
- Inverse of `createPath`

## Related

- [createPath](./createPath.md)
- [resolvePath](./resolvePath.md)
