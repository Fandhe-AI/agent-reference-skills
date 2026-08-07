# resolvePath

Returns a resolved `Path` object relative to a given pathname.

## Signature / Usage

```typescript
function resolvePath(to: To, fromPathname = "/"): Path
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `to` | `To` (string or partial `Path` object) | — | The path to resolve |
| `fromPathname` | `string` | `"/"` | The pathname to resolve the path from |

Returns a `Path` object containing `pathname`, `search`, and `hash`.

## Notes

- Available in **Framework Mode**, **Data Mode**, and **Declarative Mode** (all three modes)

## Related

- [createPath](./createPath.md)
- [parsePath](./parsePath.md)
