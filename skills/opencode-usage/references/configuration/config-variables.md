---
source: https://opencode.ai/docs/config/#variables
---

# Config: Variables

Variable substitution in config files references environment variables and file contents. Place references inside JSON strings.

## Signature / Usage

### Env vars

Use `{env:VARIABLE_NAME}` to substitute environment variables:

```jsonc
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

If the environment variable is not set, it will be replaced with an empty string.

### Files

Use `{file:path/to/file}` to substitute the contents of a file:

```jsonc
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

File paths can be:

- Relative to the config file directory
- Absolute, or starting with `~/` for your home directory

If the file does not exist, it will be replaced with an empty string.

These are useful for:

- Keeping sensitive data like API keys in separate files.
- Sharing common configuration snippets across multiple config files.

## Notes

- Keep secret files out of version control.

## Related

- [config-locations.md](./config-locations.md)
