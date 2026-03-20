# source

Source: https://syncpack.dev/config/source/

Glob patterns to discover which package.json files syncpack should manage. Useful for monorepos and distributed project structures.

## Property

| Name | Type | Default |
|------|------|---------|
| `source` | `string[]` | Workspace/Lerna config or `["package.json", "packages/*/package.json"]` |

## Resolution Priority

Syncpack resolves package.json files in the following order (highest to lowest priority):

1. `--source` CLI option
2. `source` configuration property
3. Workspace configurations (npm, Yarn, or pnpm `workspaces`)
4. Lerna configuration
5. Default patterns: `"package.json"` and `"packages/*/package.json"`

## Example

```json
{
  "source": ["./*/package.json", "./*/packages/*/package.json"]
}
```

## Notes

- Supports any glob pattern valid for your file system
- Can target multiple repository structures simultaneously
- Syncpack does not require a monorepo setup; `source` can point to multiple separate repositories
- Placing a `.syncpackrc.json` with appropriate `source` patterns in a shared parent directory allows cross-repo dependency management
