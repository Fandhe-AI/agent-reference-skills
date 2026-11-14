---
source: https://opencode.ai/docs/config/#snapshots
---

# Config: Snapshots, Watcher, Formatter, Media, Output, Search

Config keys for filesystem snapshots, file watching, formatting, image handling, tool output limits, and web search.

## Signature / Usage

### Snapshots

Enable or disable filesystem snapshots used by undo and revert behavior.

```jsonc
{
  "snapshots": false,
}
```

See the [snapshots guide](https://opencode.ai/docs/snapshots/) for undo and redo behavior.

### Watcher

Ignore files and directories that should not trigger filesystem updates.

```jsonc
{
  "watcher": {
    "ignore": ["dist/**", "coverage/**"],
  },
}
```

### Formatter

Format files after the `write`, `edit`, or `patch` tools change them. Set
`formatter` to `true` to enable available built-in formatters.

```jsonc
{
  "formatter": true,
}
```

See the [formatters guide](https://opencode.ai/docs/formatters/) for built-ins and custom formatters.

### Media

Control how oversized images loaded by the `read` tool are resized or rejected
before they are sent to a model.

```jsonc
{
  "media": {
    "image": {
      "auto_resize": true,
      "max_width": 2000,
      "max_height": 2000,
      "max_base64_bytes": 5242880,
    },
  },
}
```

See the [attachments guide](https://opencode.ai/docs/attachments/) for image processing and limits.

### Output

Set the maximum number of lines and bytes retained from a tool result.

```jsonc
{
  "tool_output": {
    "max_lines": 2000,
    "max_bytes": 51200,
  },
}
```

### Search

Choose how OpenCode searches the web. Use `"random"` to select an available
provider automatically.

```jsonc
{
  "websearch": {
    "provider": "random",
  },
}
```

See the [web search guide](https://opencode.ai/docs/websearch/) for providers, credentials, selection,
rate limits, and disabling search.

## Related

- [formatters.md](./formatters.md)
- [attachments.md](./attachments.md)
