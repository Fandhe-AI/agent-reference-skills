# indent

Source: https://syncpack.dev/config/indent/

When syncpack writes to package.json files, determines which characters to indent the JSON with.

## Property

| Name | Type | Default |
|------|------|---------|
| `indent` | `string` | `"  "` (two spaces) |

## Configuration

```json
{
  "indent": "  "
}
```

## Common Values

| Value | Description |
|-------|-------------|
| `"  "` | Two spaces (default) |
| `"    "` | Four spaces |
| `"\t"` | Tab character |

## Notes

- Controls whitespace applied during all syncpack write operations
- Set this to match your project's existing formatting preferences
