# sortExports

Source: https://syncpack.dev/config/sort-exports/

When using the `format` command, orders the properties of the `exports` field in package.json according to the specified array. Aligns with Node.js documentation for conditional exports.

## Property

| Name | Type | Default |
|------|------|---------|
| `sortExports` | `string[]` | See below |

## Default Value

```json
{
  "sortExports": [
    "types",
    "node-addons",
    "node",
    "browser",
    "module",
    "import",
    "require",
    "svelte",
    "development",
    "production",
    "script",
    "default"
  ]
}
```

## Disable Sorting

```json
{
  "sortExports": []
}
```

## Notes

- Applies only to the `format` command
- No corresponding CLI option is available; must be set in the config file
- An empty array disables export sorting entirely
- The default order follows Node.js package export conventions
