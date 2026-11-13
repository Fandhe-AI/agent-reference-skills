# plugins-server

| Name | Description | Path |
| --- | --- | --- |
| Overview | Plugin package parts, loading, and publishing | [overview.md](./overview.md) |
| Lifecycle | `Plugin.define`, `setup`, context, options | [lifecycle.md](./lifecycle.md) |
| Transforms | Synchronous replayable domain edits and `reload()` | [transforms.md](./transforms.md) |
| Agent | `ctx.agent` list/get/transform | [agent.md](./agent.md) |
| Providers | `ctx.provider` list/get/transform | [providers.md](./providers.md) |
| Models | `ctx.model` list/default/transform | [models.md](./models.md) |
| Commands | `ctx.command` list/transform | [commands.md](./commands.md) |
| Integrations | `ctx.integration` connections, OAuth, command auth, transform | [integrations.md](./integrations.md) |
| Credentials | `ctx.credential.activate` | [credentials.md](./credentials.md) |
| MCP | `ctx.mcp` list/transform | [mcp.md](./mcp.md) |
| Plugins (ctx.plugin) | List active plugins | [plugin-list.md](./plugin-list.md) |
| References | `ctx.reference` local and Git references | [references.md](./references.md) |
| Generate (experimental) | `ctx.experimental.generate` text/image/decisions | [generate.md](./generate.md) |
| Permissions (API) | `ctx.permission` assert/list/get/reply | [permission-api.md](./permission-api.md) |
| Sessions (API) | `ctx.session` create/prompt/compact/instructions | [session-api.md](./session-api.md) |
| Skills | `ctx.skill` list/transform | [skills.md](./skills.md) |
| Storage | `ctx.storage` durable JSON values | [storage.md](./storage.md) |
| Tools (API) | `ctx.tool` list/transform/freeform input | [tool-api.md](./tool-api.md) |
| VCS | `ctx.vcs` info/status/diff and providers | [vcs.md](./vcs.md) |
| Worktrees | `ctx.worktree` strategies and operations | [worktrees.md](./worktrees.md) |
| Websearch | `ctx.websearch` providers and query | [websearch.md](./websearch.md) |
| Events | `ctx.event.subscribe` | [events.md](./events.md) |
| Hooks Overview | Registering and disposing hooks | [hooks-overview.md](./hooks-overview.md) |
| Session Hooks: Prompt | `fork` and `prompt` admission hooks | [session-hooks-prompt.md](./session-hooks-prompt.md) |
| Session Hooks: Model Requests | `context` / `compaction` / `generate` / `title`, provider options | [session-hooks-model-request.md](./session-hooks-model-request.md) |
| Session Hooks: Model | Model resolve, `model.request`, native HTTP | [session-hooks-model.md](./session-hooks-model.md) |
| Session Hooks: WebSocket | Experimental ws handshake/send/receive | [session-hooks-websocket.md](./session-hooks-websocket.md) |
| Session Hooks: Retry | `retry` policy hook | [session-hooks-retry.md](./session-hooks-retry.md) |
| Permission Hooks | `evaluate` hook | [permission-hooks.md](./permission-hooks.md) |
| Shell Hooks | `create.before` hook | [shell-hooks.md](./shell-hooks.md) |
| Tool Hooks | `execute.before` / `execute.after` | [tool-hooks.md](./tool-hooks.md) |
| Support V1 | One package exporting V1 `server()` and V2 `setup()` | [support-v1.md](./support-v1.md) |
| RPC | `Rpc.define`, register, call, subscribe | [rpc.md](./rpc.md) |
| Migrate from V1 | Port V1 `@opencode-ai/plugin` plugins to V2 | [migrate-v1.md](./migrate-v1.md) |
