# managed-agents

| Name | Description | Path |
|------|-------------|------|
| Agents overview | Managed agents on the Gemini API: a configurable agent harness where one API call provisions a Linux sandbox for autonomous work. | [agents-overview.md](./agents-overview.md) |
| Antigravity agent | General-purpose managed agent on the Gemini API that reasons, runs code, and browses the web inside a Google-hosted Linux sandbox. | [antigravity-agent.md](./antigravity-agent.md) |
| Credentials in managed agents | Server-managed secrets that let agents reach third-party services without the secret entering the agent environment. | [credentials.md](./credentials.md) |
| Building managed agents | Extend the Antigravity agent with your own instructions, skills, and data, inline or saved as a managed agent invoked by ID. | [custom-agents.md](./custom-agents.md) |
| Gemini Deep Research agent | Autonomous research agent that plans, executes, and synthesizes multi-step research into cited reports; tasks must run with `background=true`. | [deep-research.md](./deep-research.md) |
| Environments in managed agents | Managed Linux sandboxes where agents execute code and persist files, decoupled from interaction context and reusable across interactions. | [environments.md](./environments.md) |
| Hooks (managed agents) | Hooks run custom scripts or external HTTP requests before or after the agent executes code or modifies files in its sandbox. | [hooks.md](./hooks.md) |
| Managed agents quickstart | Create and use managed agents with the Antigravity agent: first call, multi-turn, streaming, downloading sandbox files, and saving a reusable agent. | [quickstart.md](./quickstart.md) |
