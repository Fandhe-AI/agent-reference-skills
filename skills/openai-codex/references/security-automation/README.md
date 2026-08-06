# Security & Automation

| Name | Description | Path |
|------|-------------|------|
| Agent approvals & security | Sandbox mode + approval policy model, network isolation, auto-review integration, OS enforcement, Dev Containers, telemetry | [agent-approvals-security.md](./agent-approvals-security.md) |
| Sandbox | Core sandbox concept and modes (`read-only`/`workspace-write`/`danger-full-access`), approval policies, per-OS prerequisites | [sandbox.md](./sandbox.md) |
| Permission profiles | Newer `default_permissions` / `[permissions.<name>]` profile system (filesystem + network least-privilege) | [permission-profiles.md](./permission-profiles.md) |
| Auto-review | Reviewer-agent replacement for manual approvals at the sandbox boundary | [auto-review.md](./auto-review.md) |
| Windows sandbox | Native Windows `elevated`/`unelevated` sandbox setup and troubleshooting | [windows-sandbox.md](./windows-sandbox.md) |
| Non-interactive mode (`codex exec`) | Running Codex from scripts/CI, JSON/JSONL output, structured schemas, auth in automation | [non-interactive-mode.md](./non-interactive-mode.md) |
| Codex GitHub Action | `openai/codex-action@v1` for CI/CD workflows, patch generation, PR review | [github-action.md](./github-action.md) |
| Codex SDK | TypeScript/Python SDKs for programmatic control of local Codex threads | [codex-sdk.md](./codex-sdk.md) |
| Use Codex with the Agents SDK | Running Codex CLI as an MCP server for multi-agent orchestration | [agents-sdk-mcp-server.md](./agents-sdk-mcp-server.md) |
