# matchPath

Performs pattern matching on a URL pathname and returns information about the match.

## Signature / Usage

```typescript
function matchPath<Path extends string>(
  pattern: PathPattern<Path> | Path,
  pathname: string,
): PathMatch<ParamParseKey<Path>> | null
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `pattern` | `PathPattern<Path> \| Path` | The pattern to match against the URL pathname. A plain string is treated as a pattern with `caseSensitive: false` and `end: true`; a `PathPattern` object allows finer control |
| `pathname` | `string` | The URL pathname to match against the pattern |

Returns a `PathMatch` object if the pattern matches, or `null` otherwise.

## Notes

- Available in **Framework Mode**, **Data Mode**, and **Declarative Mode** (all three modes)

## Related

- [matchRoutes](./matchRoutes.md)
- [generatePath](./generatePath.md)
