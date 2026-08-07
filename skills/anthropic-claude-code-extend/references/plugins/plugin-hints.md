<!-- source: https://code.claude.com/docs/en/plugin-hints.md / last verified: 2026-08-07 -->

# Recommend your plugin from your CLI

Emit a one-line marker from your CLI so Claude Code prompts users to install your official plugin.

## Signature / Usage

```javascript
// Node.js
if (process.env.CLAUDECODE) {
  process.stderr.write(
    '<claude-code-hint v="1" type="plugin" value="example-cli@claude-plugins-official" />\n',
  )
}
```

```python
# Python
import os, sys
if os.environ.get("CLAUDECODE"):
    print('<claude-code-hint v="1" type="plugin" value="example-cli@claude-plugins-official" />', file=sys.stderr)
```

## Options / Props

| Attribute | Required | Description |
| --- | --- | --- |
| `v` | Yes | Protocol version; `1` is the only supported value |
| `type` | Yes | Hint kind; `plugin` is the only supported value |
| `value` | Yes | Plugin identifier in `name@marketplace` form |

| Gating variable | Reaches |
| --- | --- |
| `CLAUDECODE` | Every Bash/PowerShell subprocess Claude Code runs, plus tmux sessions and IDE integrated terminals (may reach a human directly) |
| `CLAUDE_CODE_CHILD_SESSION` | Only subprocesses Claude Code itself spawns (v2.1.172+) |

## Notes

- Hint prompts only fire for plugins listed in the official Anthropic marketplace (`claude-plugins-official`); hints pointing elsewhere are silently dropped.
- The tag must occupy its own line; embedding mid-line (e.g. inside a log statement) is ignored. It is always stripped before reaching the model and never counted toward token usage.
- Prompt frequency is bounded: once per plugin ever, at most one hint prompt per Claude Code session across all CLIs, and never shown when telemetry is disabled.
- Claude Code never installs a plugin automatically — the user always confirms.

## Related

- [Discover and install plugins](./discover-plugins.md)
- [Create plugins](./plugins.md)
