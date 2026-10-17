# CLI for Coding Agents

Let coding agents such as Claude Code, Cursor, and Codex use the Inngest CLI to read real execution traces when debugging or iterating on functions.

## Signature / Usage

Sign in with OAuth in the environment where the agent runs shell commands:

```bash
npx inngest-cli@latest login
```

Add this to the project's `CLAUDE.md`, `.cursorrules`, or equivalent:

```markdown
### Inngest debugging

Use the Inngest CLI to inspect function runs and traces:

- Get a run: `npx inngest-cli@latest api --prod --env production get-function-run <run_id>`
- Get a trace: `npx inngest-cli@latest api --prod --env production get-function-trace <run_id> --include-output`
- Get runs from an event: `npx inngest-cli@latest api --prod --env production get-event-runs <event_id> --include-output --limit 5`
- Invoke locally: `npx inngest-cli@latest api invoke-function <app_id> <function_id> --data '{...}'`

Output is JSON. Use jq to filter.
Cloud commands use the stored OAuth login unless INNGEST_API_KEY or an explicit key flag overrides it.
Set --env to the intended environment.
If access is denied, ask the user to review the session's permissions.
```

Debug a failing run, then verify the fix locally:

```bash
npx inngest-cli@latest api --prod --env production get-function-trace 01ABC123 --include-output

npx inngest-cli@latest api invoke-function my-app process-order \
  --data '{"orderId": "test-123"}'
npx inngest-cli@latest api get-event-runs <event_id> --include-output
```

## Notes

- Prerequisites: Inngest CLI (`npx inngest-cli@latest`), an Inngest account for Cloud access, and a coding agent that can run shell commands.
- Complete the browser approval yourself: choose account, environment access, permissions, and session duration. Grant read access to what the agent inspects (apps, functions, events, runs); add write access only if it must change Cloud data. OAuth scopes restrict each operation to the approved permissions and your current account role.
- Credentials are stored in the OS credential store and access tokens refresh automatically. Check with `npx inngest-cli@latest auth status`; revoke with `npx inngest-cli@latest logout`; for a terminal without a browser use `login --no-browser` and open the displayed URL yourself.
- API keys remain an option for CI or unattended agents via `INNGEST_API_KEY`; an API key overrides the stored OAuth login, so unset it when switching to OAuth. Local Dev Server commands do not require Cloud authentication.
- Without the CLI an agent must guess from code alone; with it, the agent reads which steps ran, which failed, the error, and the output.
- Source: https://www.inngest.com/docs-markdown/ai-patterns/cli-for-coding-agents (fetched 2026-10).

## Related

- [AI Dev Tools](./ai-dev-tools.md)
- [MCP Dev Server](./mcp-dev-server.md)
- [Agent Skills](./agent-skills.md)
