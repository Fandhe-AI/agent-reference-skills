<!-- source: https://code.claude.com/docs/en/agent-sdk/migration-guide.md / last verified: 2026-11-14 -->

# Migrate to Claude Agent SDK

Guide for migrating the Claude Code TypeScript and Python SDKs, renamed to the Claude Agent SDK, reflecting broader agent-building capabilities beyond coding tasks.

## Signature / Usage

```python
# Before (claude-code-sdk)
from claude_code_sdk import query, ClaudeCodeOptions
options = ClaudeCodeOptions(model="claude-opus-4-7", permission_mode="acceptEdits")

# After (claude-agent-sdk)
from claude_agent_sdk import query, ClaudeAgentOptions
options = ClaudeAgentOptions(model="claude-opus-4-7", permission_mode="acceptEdits")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Package name (TS/JS) | `@anthropic-ai/claude-code` → `@anthropic-ai/claude-agent-sdk` | npm package rename |
| Python package | `claude-code-sdk` → `claude-agent-sdk` | pip package rename |
| Python type | `ClaudeCodeOptions` → `ClaudeAgentOptions` | Renamed option type |

## Notes

- System prompt no longer default: v0.1.0+ uses a minimal system prompt by default instead of Claude Code's full prompt. To restore old behavior, set `systemPrompt: { type: "preset", preset: "claude_code" }` (TS) / `system_prompt={"type": "preset", "preset": "claude_code"}` (Python).
- `settingSources` default: briefly changed in v0.1.0 then reverted; omitting it loads user, project, and local filesystem settings, matching the CLI. Pass `settingSources: []` to run isolated.
- Python SDK 0.1.59 and earlier treated an empty `setting_sources` list the same as omitting the option; upgrade before relying on `setting_sources=[]`.
- If `@anthropic-ai/claude-code` is still listed in `package.json`, replace it with `@anthropic-ai/claude-agent-sdk` and update the version range as well, for example from `"^0.0.42"` to `"^0.3.0"`.
- Steps: TypeScript `npm uninstall @anthropic-ai/claude-code` then `npm install @anthropic-ai/claude-agent-sdk`; Python `pip uninstall -y claude-code-sdk` then `pip install claude-agent-sdk` (pip's `Skipping claude-code-sdk as it is not installed` warning is expected). Also replace `claude-code-sdk` in `requirements.txt` / `pyproject.toml`.
- Migrating from the OpenAI Agents SDK instead: see the cookbook recipe https://platform.claude.com/cookbook/claude-agent-sdk-04-migrating-from-openai-agents-sdk
- Source: https://code.claude.com/docs/en/agent-sdk/migration-guide.md (fetched 2026-11-14)
- TypeScript imports change from `@anthropic-ai/claude-code` to `@anthropic-ai/claude-agent-sdk`; Python imports change from `claude_code_sdk` to `claude_agent_sdk`.

## Related

- [Agent SDK overview](./overview.md)
- [Modifying system prompts](../control/modifying-system-prompts.md)
- [Use Claude Code features in the SDK](./claude-code-features.md)
