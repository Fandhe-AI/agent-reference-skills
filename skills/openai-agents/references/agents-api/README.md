# agents-api

| Name | Description | Path |
|------|-------------|------|
| Architecture | OpenAI runs the agent harness; the application sends it work and… | [architecture.md](./architecture.md) |
| Computer Use (Agents API) | Computer use lets an agent navigate websites and interact with br… | [computer-use.md](./computer-use.md) |
| Configuring Agents | An agent configuration defines how the agent behaves. Supply it wh… | [configuration.md](./configuration.md) |
| Errors and Recovery | Where to look for Agents API failures (HTTP request, turn, session… | [errors.md](./errors.md) |
| Files and Artifacts | Files live in the agent's environment. An artifact is a published … | [files-and-artifacts.md](./files-and-artifacts.md) |
| Functions | Function tools let an agent call your application code. You defi… | [functions.md](./functions.md) |
| Manage Sessions | Store each session ID in your data store; use it to retrieve curr… | [manage-sessions.md](./manage-sessions.md) |
| MCP Connections | An MCP server publishes tool definitions and runs tool calls. The … | [mcp-connections.md](./mcp-connections.md) |
| Multi-agent (Agents API) | Multi-agent lets an agent delegate tasks to subagents. Each subage… | [multi-agent.md](./multi-agent.md) |
| Observability and Usage | Track live agent activity, inspect completed work, identify deleg… | [observability.md](./observability.md) |
| OpenAI-hosted Sandboxes | An OpenAI-hosted sandbox gives the agent a Linux workspace with Py… | [openai-hosted-sandboxes.md](./openai-hosted-sandboxes.md) |
| Agents API | The Agents API gives an application access to the Codex harness t… | [overview.md](./overview.md) |
| Plugins | A plugin packages skills, MCP configuration, or both. Load its fil… | [plugins.md](./plugins.md) |
| Pre-warm Sandboxes | Pre-warmed environments let you create an OpenAI-hosted sandbox, i… | [prewarmed-sandboxes.md](./prewarmed-sandboxes.md) |
| AWS Lambda MicroVMs | Run an agent's tools in your AWS account with AWS Lambda MicroVMs … | [provider-aws.md](./provider-aws.md) |
| Blaxel | Blaxel as a self-hosted sandbox provider for the Agents API, using… | [provider-blaxel.md](./provider-blaxel.md) |
| Cloudflare | Cloudflare Containers as a self-hosted sandbox provider using webh… | [provider-cloudflare.md](./provider-cloudflare.md) |
| Daytona | Daytona as a self-hosted sandbox provider for the Agents API, wit… | [provider-daytona.md](./provider-daytona.md) |
| DigitalOcean | DigitalOcean Managed Agents Runtime Services (M.A.R.S.) starts a … | [provider-digitalocean.md](./provider-digitalocean.md) |
| E2B | E2B as a self-hosted sandbox provider for the Agents API, with app… | [provider-e2b.md](./provider-e2b.md) |
| Modal | Modal sandboxes as a self-hosted sandbox provider for the Agents A… | [provider-modal.md](./provider-modal.md) |
| Oracle Cloud Infrastructure (OCI) | OCI GenAI Sandboxes (beta) as a self-hosted sandbox provider using… | [provider-oci.md](./provider-oci.md) |
| Runloop | Runloop Devboxes as a self-hosted sandbox provider using applicati… | [provider-runloop.md](./provider-runloop.md) |
| Vercel | Vercel Sandbox as a self-hosted sandbox provider for the Agents AP… | [provider-vercel.md](./provider-vercel.md) |
| Agents API Quickstart | Build a coding assistant that writes `tree.py`, runs it, and show… | [quickstart.md](./quickstart.md) |
| Sandbox Lifecycle | An agent session can outlive its environment. Your application man… | [sandbox-lifecycle.md](./sandbox-lifecycle.md) |
| Sandbox Security | Agent-generated code can access the files, credentials, and netwo… | [sandbox-security.md](./sandbox-security.md) |
| Self-hosted Sandboxes | Connect your own environment (laptop, container, or remote sandbox… | [self-hosted-sandboxes.md](./self-hosted-sandboxes.md) |
| Events and Items | Events report what happens as an agent works; items are the saved… | [session-events.md](./session-events.md) |
| Session Webhooks | Webhooks respond to session state changes without keeping an event… | [session-webhooks.md](./session-webhooks.md) |
| Run and Continue Sessions | A session keeps an agent's configuration, conversation, and saved… | [sessions.md](./sessions.md) |
| Tracing (Agents API) | A session keeps conversation and work together; a session has sev… | [tracing.md](./tracing.md) |
| Vaults | A vault stores credentials outside the agent's instructions and co… | [vaults.md](./vaults.md) |
| Web Search (Agents API) | Built-in `web_search` tool for Agents API sessions: lets the agen… | [web-search.md](./web-search.md) |
