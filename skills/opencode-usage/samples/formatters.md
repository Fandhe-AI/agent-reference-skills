---
source: https://opencode.ai/docs/formatters/
---

# Formatters

Format files after OpenCode's `write`, `edit`, or `patch` tools change them.

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": true,
}
```

Customize a built-in and add a custom formatter:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": {
    "prettier": {
      "environment": {
        "NODE_ENV": "development",
      },
      "extensions": [".js", ".ts"],
    },
    "deno-markdown": {
      "command": ["deno", "fmt", "$FILE"],
      "extensions": [".md"],
    },
  },
}
```

Disable one built-in:

```jsonc title="opencode.jsonc"
{
  "formatter": {
    "prettier": {
      "disabled": true,
    },
  },
}
```

## Notes

- Formatters are disabled by default until `formatter` is set.
- `command` is an argument array, not a shell string; `$FILE` is replaced with the absolute file path.
- A custom formatter needs both `command` and `extensions`; extension matching is case-sensitive on the final extension.
- Set `formatter` to `false` to disable formatting enabled by a lower-priority file.
