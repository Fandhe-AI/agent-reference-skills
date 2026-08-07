# Non-interactive mode (`codex exec`)

Runs Codex from scripts (CI jobs, pipelines) without opening the interactive TUI. Streams progress to `stderr` and prints only the final agent message to `stdout`.

## Signature / Usage

```bash
codex exec "summarize the repository structure and list the top 5 risky areas"

# Explicit sandbox/permissions for automation
codex exec --sandbox workspace-write "<task>"

# Machine-readable JSON Lines output
codex exec --json "summarize the repo structure" | jq

# Structured output via JSON Schema
codex exec "Extract project metadata" --output-schema ./schema.json -o ./project-metadata.json

# Resume a previous non-interactive session
codex exec resume --last "fix the race conditions you found"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--sandbox workspace-write` \| `read-only` (default) \| `danger-full-access` | flag | Sets least-privilege permissions for the automation task; `danger-full-access` only in a controlled runner/container. |
| `--ephemeral` | flag | Doesn't persist session rollout files to disk. |
| `--json` | flag | Emits a JSONL event stream on `stdout` (`thread.started`, `turn.started`, `turn.completed`, `turn.failed`, `item.*`, `error`). |
| `-o, --output-last-message <path>` | flag | Writes the final message to a file (still also printed to `stdout`). |
| `--output-schema <file>` | flag | Requests a final response conforming to a JSON Schema — useful for stable downstream fields. |
| `--ignore-user-config` | flag | Skips loading `$CODEX_HOME/config.toml`. |
| `--ignore-rules` | flag | Skips user/project execpolicy `.rules` files. |
| `--skip-git-repo-check` | flag | Overrides the requirement that `codex exec` run inside a Git repository. |
| `CODEX_API_KEY` | env var | API key scoped to a single `codex exec` invocation (only supported in `codex exec`, not the interactive CLI). |
| `codex exec resume [--last \| <SESSION_ID>]` | subcommand | Continues a previous non-interactive session (for two-stage pipelines). |

## Notes

- If stdin is piped and a prompt argument is also given, the prompt is the instruction and piped content is additional context (`prompt-plus-stdin`). Use `codex exec -` to force stdin to become the entire prompt instead.
- `codex exec --full-auto` is a deprecated compatibility alias for `--sandbox workspace-write`; prefer the explicit flag.
- If an enabled MCP server has `required = true` and fails to initialize, `codex exec` exits with an error instead of continuing.
- Do not set `OPENAI_API_KEY`/`CODEX_API_KEY` as a job-level environment variable in workflows that check out or run repository-controlled code — build scripts, tests, or a compromised action in the same job can read it. For GitHub Actions, prefer the Codex GitHub Action, which proxies the key instead of exposing it to shell steps.
- Codex requires running inside a Git repository by default (safety check against destructive changes).

## Related

- [Codex GitHub Action](./github-action.md)
- [Agent approvals & security](./agent-approvals-security.md)
- [Codex SDK](./codex-sdk.md)
