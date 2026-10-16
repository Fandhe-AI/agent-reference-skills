<!-- source: https://code.claude.com/docs/en/plugins/cli-hints.md / last verified: 2026-10-17 -->

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

- This applies only if the plugin is listed in `claude-plugins-official` or another marketplace with one of Anthropic's official marketplace names; the community marketplace `claude-community` is not one of them. Hints pointing elsewhere are silently dropped.
- The tag must occupy its own line; a tag embedded mid-line is ignored. Values may be double-quoted or unquoted (an unquoted value can't contain whitespace). Claude Code removes the line from Bash and PowerShell tool output before the model sees it, even when `v` or `type` is unrecognized, and it is never counted toward token usage.
- `CLAUDECODE=1` is set in commands run through the Bash and PowerShell tools and in hook commands (by every version; IDE extensions also set it in their integrated terminals). `CLAUDE_CODE_CHILD_SESSION=1` (v2.1.172+) is set only in subprocesses Claude Code itself starts. You can emit the hint on every invocation because Claude Code prompts for each plugin once. To check the emitter, run `CLAUDECODE=1 example-cli` and confirm the tag line appears on stderr.
- The prompt appears only in interactive terminal sessions (the tag is stripped with no prompt in `claude -p`, subagent runs and hook command output) and only when all of these hold: `value` names a plugin found in Claude Code's local copy of an official marketplace that isn't already installed and no policy blocks; analytics are on (no `DISABLE_TELEMETRY`, `DO_NOT_TRACK` or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, and no third-party provider such as Amazon Bedrock); frequency limits (one prompt per session, one ever per plugin regardless of the answer, none once 100 plugins have been prompted for on the machine); the user hasn't chosen **No, and don't show plugin installation hints again**; the session is local and attended (not `--cloud`, Remote Control, or an agent-team teammate).
- The **Plugin recommendation** dialog names the first word of the shell command Claude ran and offers: **Yes, install** (installs at user scope), **No**, **No, and don't show plugin installation hints again**; no answer for 30 seconds counts as **No**.
- Claude Code never installs a plugin automatically — the user always confirms.

## Related

- [Discover and install plugins](./discover-plugins.md)
- [Create plugins](./plugins.md)
