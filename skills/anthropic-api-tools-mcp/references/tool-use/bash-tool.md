<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/bash-tool / last verified: 2026-11-14 -->

# Bash tool

Client tool: Claude requests shell commands that your application runs in a persistent bash session it owns, returning output as `tool_result`.

## Signature / Usage

```json
{"type": "bash_20250124", "name": "bash"}
```

```json
{"command": "ls -la *.py"}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| command | string | Required unless using `restart`; the bash command to run |
| restart | boolean (optional) | Set `true` to kill and restart the bash session (clean state: no cwd/env/processes carried over) |

## Notes

- Schema-less tool: no `input_schema` to provide, the schema is built into the model. `name` must be `bash`.
- Flow: Claude returns `tool_use` with `command` → your app runs it in its bash session → return combined stdout+stderr in `tool_result` → Claude requests another command or responds. Multiple `tool_use` blocks in one response run in order in the same session, with all results returned together in one user message (see parallel-tool-use.md).
- The API itself is stateless — no shell session state travels between requests; your application owns session lifetime (start, persistence, restart).
- Current version `bash_20250124` needs no beta header, works from Claude Sonnet 3.7 onward. Legacy `bash_20241022` (computer-use beta, `anthropic-beta: computer-use-2024-10-22`) only works with the retired Claude Sonnet 3.5 (Oct 2024); new integrations should use `bash_20250124`.
- Security: run the session in an isolated container/VM as a least-privileged user; treat every command as untrusted. Validate commands with an allowlist (not a blocklist), set resource limits (`ulimit`), log every command+output, redact secrets before returning output to Claude.
- Pricing: bash tool definition adds 325 input tokens (Claude 4.7 and later models and Claude Mythos Preview) or 244 tokens (Claude 4.6 and earlier models) on top of the per-model tool-use system prompt; command outputs/errors/file contents consume additional tokens.
- Limitations: no interactive commands (vim, less, password prompts); no GUI apps; session state is entirely client-side; the API does not truncate oversized tool results (rejects the request instead) — truncate large output yourself; no streaming, output reaches Claude only via the next `tool_result`.
- Errors: return failures (timeout, `command not found`, `Permission denied`) as the `tool_result` content with `is_error: true`. Give every command a deadline; a command that never completes (for example one waiting for input) blocks the session forever, so on timeout stop the shell and everything it started, then restart the session.
- Availability: current models all accept `bash_20250124` (no beta header; supported list now runs through Claude Fable 5.2 / Mythos 5.2, Opus 5.5, Sonnet 5.5, Haiku 5.5 and Claude 4.5/4.6/4.7/4.8 models). Stable on the Claude API, Amazon Bedrock, Claude Platform on AWS, Claude Models on Google Cloud (Google managed) and Microsoft Foundry; ZDR-eligible (excludes Covered Models) and HIPAA-ready.
- Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/bash-tool (fetched 2026-11-14)
- Pairs well with the text editor tool (edit with one, run with the other). If also using the code execution tool, note bash and code execution are two separate, non-state-sharing environments.

## Related

- [text-editor-tool](./text-editor-tool.md)
- [code-execution-tool](./code-execution-tool.md)
- [handle-tool-calls](./handle-tool-calls.md)
