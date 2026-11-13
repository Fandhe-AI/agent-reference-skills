---
source: https://opencode.ai/docs/config/
---

# Config Variable Substitution

Keep secrets out of `opencode.jsonc` with `{env:NAME}` and `{file:path}` references.

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "{env:OPENCODE_MODEL}",
  "providers": {
    "anthropic": {
      "settings": {
        "apiKey": "{env:ANTHROPIC_API_KEY}",
      },
    },
  },
}
```

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "openai": {
      "settings": {
        "apiKey": "{file:~/.secrets/openai-key}",
      },
    },
  },
}
```

## Notes

- An unset environment variable, or a missing file, is replaced with an empty string.
- File paths are relative to the config file directory, absolute, or start with `~/`.
- References go inside JSON strings.
