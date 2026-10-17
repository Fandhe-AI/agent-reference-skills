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
| `CODEX_API_KEY` | env var | API key for a single invocation; usable with `codex exec`, `codex review`, the TypeScript SDK, and `codex exec-server --remote` (not the interactive CLI). |
| `--approve-for-me` | flag | Routes approval requests through automatic review with the workspace-write sandbox. |
| `codex exec resume [--last \| <SESSION_ID>]` | subcommand | Continues a previous non-interactive session (for two-stage pipelines). |

## Notes

- If stdin is piped and a prompt argument is also given, the prompt is the instruction and piped content is additional context (`prompt-plus-stdin`). Use `codex exec -` to force stdin to become the entire prompt instead.
- `--full-auto` is no longer supported. Update scripts to use `--sandbox workspace-write`, or use `--approve-for-me` to route approval requests through automatic review with the workspace-write sandbox.
- `codex exec` runs in a read-only sandbox by default and streams progress to `stderr` while printing only the final agent message to `stdout` (e.g. `codex exec "..." | tee release-notes.md`). `--ephemeral` avoids persisting rollout files.
- `--ignore-user-config` skips `$CODEX_HOME/config.toml`; `--ignore-rules` skips user and project execpolicy `.rules` files, for a controlled automation environment.
- `--json` items include agent messages, reasoning, command executions, file changes, MCP tool calls, web searches, and plan updates; `turn.completed` carries `usage` (`input_tokens`, `cached_input_tokens`, `output_tokens`, `reasoning_output_tokens`). `-o` writes the final message to a file and still prints it to `stdout`.
- Authenticate in automation: `codex exec` reuses saved CLI authentication by default. In GitHub Actions use the Codex GitHub Action (installs Codex, starts a Responses API proxy, runs with a configurable safety strategy). Elsewhere set `CODEX_API_KEY` only for the invocation that needs it (`CODEX_API_KEY=<api-key> codex exec --json "triage open bug reports"`) and make sure no untrusted code runs in the same process environment. ChatGPT-managed auth in CI/CD is an advanced path: treat `~/.codex/auth.json` like a password, don't use it for public or open-source repositories, and see "Maintain Codex account auth in CI/CD (advanced)" in the auth docs.
- Common automation pattern, autofix CI failures: trigger a follow-up workflow (`workflow_run`) when the main CI workflow fails; check out the failing commit with `contents: read` only (`persist-credentials: false`); run setup before Codex without exposing the API key; run `openai/codex-action@v1` with `openai-api-key: ${{ secrets.OPENAI_API_KEY }}` and a prompt; save local changes as a patch artifact (`git add -N .` then `git diff --binary HEAD > codex.patch`); in a separate `open_pr` job with `contents: write` and `pull-requests: write` (and no API key), `git apply --index codex.patch`, push `codex/auto-fix-$RUN_ID`, and `gh pr create`.
- Advanced stdin piping: prompt-plus-stdin (you write the instruction, piped output is context) e.g. `npm test 2>&1 | codex exec "summarize the failing tests and propose the smallest likely fix" | tee test-summary.md`; further examples: summarize logs (`tail -n 200 app.log | codex exec "..."`), inspect TLS or HTTP issues (`curl -vv https://api.example.com/health 2>&1 | codex exec "..."`), prepare a Slack-ready update and draft a pull request comment from CI logs (`gh run view 123456 --log | codex exec "..." | gh pr comment 789 --body-file -`). `codex exec -` makes stdin the entire prompt (`cat prompt.txt | codex exec -`, `generate_prompt.sh | codex exec - --json > result.jsonl`); omitting the prompt argument also reads the prompt from stdin.
- If an enabled MCP server has `required = true` and fails to initialize, `codex exec` exits with an error instead of continuing.
- Do not set `OPENAI_API_KEY`/`CODEX_API_KEY` as a job-level environment variable in workflows that check out or run repository-controlled code — build scripts, tests, or a compromised action in the same job can read it. For GitHub Actions, prefer the Codex GitHub Action, which proxies the key instead of exposing it to shell steps.
- Codex requires running inside a Git repository by default (safety check against destructive changes).

## Related

- [Codex GitHub Action](./github-action.md)
- [Agent approvals & security](./agent-approvals-security.md)
- [Codex SDK](./codex-sdk.md)
