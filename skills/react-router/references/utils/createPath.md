# createPath

Creates a string URL path from the given pathname, search, and hash components.

## Signature / Usage

```typescript
function createPath({
  pathname = "/",
  search = "",
  hash = "",
}: Partial<Path>): string
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `pathname` | `string` | `"/"` | The path portion of the URL |
| `search` | `string` | `""` | The query string portion (including the `?`) |
| `hash` | `string` | `""` | The hash fragment (including the `#`) |

## Notes

- Available in **Framework Mode**, **Data Mode**, and **Declarative Mode** (all three modes)
- Inverse of `parsePath`

## Related

- [parsePath](./parsePath.md)
- [resolvePath](./resolvePath.md)
