# sourceMode

Source: https://syncpack.dev/config/source-mode/

Determines how custom `source` patterns interact with package files automatically discovered from your package manager's workspace configuration.

## Property

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sourceMode` | `"replace" \| "extend"` | `"replace"` | How custom `source` patterns interact with workspace discovery |

## Usage

```json
{
  "sourceMode": "extend",
  "source": ["tools/scripts/package.json"]
}
```

## Values

| Value | Behavior |
|-------|----------|
| `"replace"` (default) | Custom `source` patterns completely override workspace discovery from `workspaces`, `pnpm-workspace.yaml`, or `lerna.json` |
| `"extend"` | Custom `source` patterns are added after auto-discovered patterns; enables gitignore-style negation like `!apps/legacy` |

## CLI Override

`--source-mode <replace|extend>` takes precedence over the configuration file setting.

## Notes

- When using `extend`, discovered patterns appear first; custom patterns follow
- Added in v15.2.0

## Related

- [source](./source.md)
- [update command](../commands/update.md)
