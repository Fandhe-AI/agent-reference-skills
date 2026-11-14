# Security & Automation

| Name | Description | Path |
| --- | --- | --- |
| Agent approvals & security | Sandbox mode + approval policy model, retired `untrusted` migration, safety monitoring, network isolation, auto-review integration, OS enforcement, Dev Containers, telemetry | [agent-approvals-security.md](./agent-approvals-security.md) |
| Sandbox | Core sandbox concept and modes (`read-only`/`workspace-write`/`danger-full-access`), approval policies, per-OS prerequisites | [sandbox.md](./sandbox.md) |
| Permission profiles | Newer `default_permissions` / `[permissions.<name>]` profile system (filesystem + network least-privilege) | [permission-profiles.md](./permission-profiles.md) |
| Permissions (modes) | Desktop app / CLI / IDE permission modes: Ask for approval, Approve for me, Full access | [permission-modes.md](./permission-modes.md) |
| Auto-review | Reviewer-agent replacement for manual approvals at the sandbox boundary | [auto-review.md](./auto-review.md) |
| Windows sandbox | Native Windows sandbox (`mxc`, legacy `elevated` / `unelevated`) setup and troubleshooting | [windows-sandbox.md](./windows-sandbox.md) |
| WSL | Running Codex inside WSL2 instead of the native Windows sandbox | [windows-wsl.md](./windows-wsl.md) |
| Non-interactive mode (`codex exec`) | Running Codex from scripts/CI, JSON/JSONL output, structured schemas, auth in automation, common automation patterns | [non-interactive-mode.md](./non-interactive-mode.md) |
| Codex GitHub Action | `openai/codex-action@v1` for CI/CD workflows, patch generation, PR review | [github-action.md](./github-action.md) |
| Codex SDK | TypeScript/Python SDKs for programmatic control of local Codex threads | [codex-sdk.md](./codex-sdk.md) |
| Codex App Server | JSON-RPC interface for rich clients: auth, threads, turns, approvals, streamed events; successor to `codex mcp-server` | [app-server.md](./app-server.md) |
| Codex MCP server removal | `codex mcp-server` and the `codex-mcp-server` binary were removed; migrate to App Server | [agents-sdk-mcp-server.md](./agents-sdk-mcp-server.md) |
| Recommended configuration for cybersecurity workflows | Security controls for Daybreak Blue / Daybreak Red and other higher-risk cybersecurity workflows: isolation, least-privilege permission profiles, protected credentials, Auto-review, independent monitoring, and cleanup. | [cyber-safety-recommended-configuration.md](./cyber-safety-recommended-configuration.md) |
| Models and Trusted Access | OpenAI Daybreak gives approved users access to models for authorized defensive cybersecurity work: Daybreak Blue (flagship models with reduced refusals for defensive workflows) and Daybreak Red (separately approved specialist... | [cyber-safety.md](./cyber-safety.md) |
