# Architecture

OpenAI runs the agent harness; the application sends it work and receives results. An environment is added only when the agent needs compute or files.

## Signature / Usage

Start without an environment (fragment; session creation also needs an agent and initial input):

```json
{
  "environment": {
    "type": "none"
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `environment.type: "none"` | string | No compute or files. Harness calls the model, uses configured tools, calls remote MCP directly; function tool calls go to your code |
| `environment.type: "openai_hosted"` | string | OpenAI creates and manages a sandbox for the session; you configure packages, files, network access |
| `environment.type: "self_hosted"` | string | Your infrastructure; your code starts the environment and connects an executor to the session |

## Notes

- Pieces: **Harness** (OpenAI-hosted Codex instance running the model and tool loop and maintaining the session), **Environment** (remote sandbox, laptop, Docker container, or AWS Lambda function), **Application server** (your code: submits tasks, receives events, handles function tools; manages environment lifecycle when you provide it).
- Without an environment, the built-in Bash and apply-patch tools, workspace files, and executor MCPs are unavailable.
- Self-hosted: you own provisioning, reconnection, shutdown, and files to preserve. Before stopping compute, coordinate incoming work and confirm no execution is pending.
- Progress and results: use streaming (detailed events) and/or webhooks (state changes without an open stream).
- Function tools need a handler that receives calls and returns results; if unavailable, the agent can remain waiting for a result. Failures in event or lifecycle handlers can interrupt progress updates or environment management.
- Source: https://developers.openai.com/api/docs/guides/agents-api/architecture (fetched 2026-10).

## Related

- [Agents API](./overview.md)
- [OpenAI-hosted Sandboxes](./openai-hosted-sandboxes.md)
- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
- [Session Webhooks](./session-webhooks.md)
