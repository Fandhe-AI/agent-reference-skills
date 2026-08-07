# Agents SDK

| Name | Description | Path |
|------|-------------|------|
| Agent Definitions | An `Agent` is the core unit of an SDK-based workflow. It packages a model, instructions, and optional runtime behavior such as tools, guardrails, MCP servers, handoffs, and structured outputs. | [define-agents.md](./define-agents.md) |
| Models and Providers | Every SDK run resolves a model and a transport. Choose models explicitly, use the standard OpenAI provider path by default, and reach for provider/transport overrides only when needed. | [models-and-providers.md](./models-and-providers.md) |
| Agents SDK Overview | Agents are applications that plan, call tools, collaborate across specialists, and keep enough state to complete multi-step work. | [overview.md](./overview.md) |
| Quickstart | The shortest path to a working SDK-based agent: install the SDK, define an agent, run it, then add tools and specialist agents as the workflow grows. | [quickstart.md](./quickstart.md) |
| Results and State | The result of an agent run is more than the final answer: it's also the handoff boundary, the next-turn continuation surface, and the resumable snapshot when a run pauses for review. | [results-and-state.md](./results-and-state.md) |
| Running Agents | Defining an agent is the setup step; running it is the runtime question. One SDK run is one application-level turn, driven by the agent loop. | [running-agents.md](./running-agents.md) |
| Sandbox Agents | `SandboxAgent` runs an agent against an isolated, Unix-like execution environment (filesystem, shell, mounts, ports, snapshots) instead of prompt context alone. | [sandboxes.md](./sandboxes.md) |
