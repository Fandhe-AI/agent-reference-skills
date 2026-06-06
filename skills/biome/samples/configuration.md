# Configuration

Configure formatter, linter, and per-language options in `biome.json`.

```json
{
  "$schema": "https://biomejs.dev/schemas/2.3.11/schema.json",
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noDebugger": "off"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded",
      "trailingCommas": "all"
    }
  },
  "files": {
    "includes": ["src/**", "!src/generated/**"]
  },
  "overrides": [
    {
      "includes": ["**/*.config.js"],
      "javascript": {
        "formatter": { "quoteStyle": "double" }
      }
    }
  ]
}
```

## Notes

- Default `indentStyle` is `tab`; switch to `space` when the project requires it
- Rule severity levels: `"error"`, `"warn"`, `"info"`, `"on"`, `"off"`
- `files.includes` with `!` prefix excludes paths; `!!` completely excludes (scanner ignores them too)
- `overrides` patterns are evaluated in order; the first match wins
