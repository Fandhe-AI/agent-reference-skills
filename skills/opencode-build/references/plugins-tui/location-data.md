---
source: https://opencode.ai/docs/build/plugins/cli/#location-data
---

# Location data

Location state exposes the default location, version-control info, and list/sync/invalidate data for agents, commands, integrations, models, providers, references, skills, and MCP.

## Signature / Usage

Location state exposes the default location and refresh controls.

```ts
const location = context.data.location.default()
await context.data.location.sync(location)
context.data.location.invalidate(location)
```

Version-control state exposes repository information at a location.

```ts
await context.data.location.vcs.sync(context.location)
const vcs = context.data.location.vcs.info(context.location)
const branch = vcs?.branch.current
context.data.location.vcs.invalidate(context.location)
```

Agents, commands, integrations, models, providers, references, skills, and MCP data share `list`, `sync`, and
`invalidate` methods.

```ts
const location = context.location
await Promise.all([
  context.data.location.agent.sync(location),
  context.data.location.command.sync(location),
  context.data.location.integration.sync(location),
  context.data.location.model.sync(location),
  context.data.location.provider.sync(location),
  context.data.location.reference.sync(location),
  context.data.location.skill.sync(location),
  context.data.location.mcp.server.sync(location),
  context.data.location.mcp.resource.sync(location),
])

const agents = context.data.location.agent.list(location) ?? []
const commands = context.data.location.command.list(location) ?? []
const integrations = context.data.location.integration.list(location) ?? []
const models = context.data.location.model.list(location) ?? []
const providers = context.data.location.provider.list(location) ?? []
const references = context.data.location.reference.list(location) ?? []
const skills = context.data.location.skill.list(location) ?? []
const servers = context.data.location.mcp.server.list(location) ?? []
const resources = context.data.location.mcp.resource.list(location) ?? []

context.data.location.model.invalidate(location)
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).
- OpenCode skills are distinct from Claude Code Agent Skills (anthropic-claude-code-extend) and Codex skills (openai-codex).
- The MCP protocol spec is covered by the mcp-spec skill; Claude Code and Codex MCP configuration are covered by other skills.

## Related

- [sessions.md](./sessions.md)
- [client.md](./client.md)
