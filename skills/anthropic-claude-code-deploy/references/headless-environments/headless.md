<!-- source: https://code.claude.com/docs/en/headless.md / last verified: 2026-08-07 -->

# Run Claude Code programmatically

Non-interactive `claude -p` mode for scripts, CI/CD, and the Agent SDK: structured output, streaming, auto-approved tools, and conversation continuation.

## Signature / Usage

```bash
claude -p "Find and fix the bug in auth.py" --allowedTools "Read,Edit,Bash"

# Faster startup: skip auto-discovery of hooks/skills/plugins/MCP/CLAUDE.md
claude --bare -p "Summarize README.md" --allowedTools "Read"

# Structured JSON output
claude -p "Summarize this project" --output-format json

# JSON Schema-constrained output
claude -p "Extract the main function names from auth.py" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}},"required":["functions"]}'

# Streaming
claude -p "Explain recursion" --output-format stream-json --verbose --include-partial-messages

# Continue a conversation
claude -p "Now focus on the database queries" --continue
claude -p "Continue that review" --resume "$session_id"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `-p`, `--print` | flag | Runs non-interactively; not combinable with `--bg` or `--cloud` |
| `--bare` | flag | Skips hooks/skills/plugins/MCP/auto-memory/CLAUDE.md discovery for deterministic CI runs; never reads OAuth/keychain, so set `ANTHROPIC_API_KEY` |
| `--output-format` | `text` \| `json` \| `stream-json` | Response shape; `json` includes `total_cost_usd` and per-model cost |
| `--json-schema` | JSON Schema string | Constrains `--output-format json` to a schema; result lands in `structured_output` |
| `--allowedTools` | permission rule list | Pre-approves specific tools, e.g. `"Bash(git diff *),Read,Edit"` |
| `--permission-mode` | `dontAsk` \| `acceptEdits` \| ... | Session-wide baseline instead of per-tool allowlisting |
| `--continue` / `--resume` | flag / session ID | Continues the most recent or a specific conversation |
| `--append-system-prompt` | string | Adds instructions while keeping the default system prompt |
| `--forward-subagent-text` | flag | Emits subagent text/thinking blocks in the stream, not just tool_use/tool_result (v2.1.211+) |

## Notes

- Exit code 0 on success, non-zero on failure; scripts can branch on it.
- Piped stdin capped at 10MB; write large inputs to a file and reference the path instead.
- A background Bash task started by `claude -p` is killed ~5 seconds after the final result unless it's a background subagent/workflow, which is awaited up to a 10-minute default cap (`CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS`).
- SIGTERM aborts the in-progress turn, kills the Bash process tree, runs `SessionEnd` hooks, and exits 143.

## Related

- [cloud-environments.md](./cloud-environments.md)
- [devcontainer.md](./devcontainer.md)
