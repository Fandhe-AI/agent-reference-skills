<!-- source: https://code.claude.com/docs/en/agent-sdk/plugins / last verified: 2026-08-07 -->

# Plugins in the SDK

Load custom plugins from local directories to add skills, agents, hooks, and MCP servers to an Agent SDK session.

## Signature / Usage

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Hello",
  options: {
    plugins: [
      { type: "local", path: "./my-plugin" },
      { type: "local", path: "/absolute/path/to/another-plugin" }
    ]
  }
})) {
  // Plugin commands, agents, and other features are now available
}
```

```python
options = ClaudeAgentOptions(
    plugins=[
        {"type": "local", "path": "./my-plugin"},
    ]
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `"local"` | Only value accepted by the SDK |
| `path` | string | Relative or absolute path to the plugin root (parent of `skills/`, `agents/`, `hooks/`, `commands/`, or `.claude-plugin/`) |

## Notes

- Plugin `skills/` are namespaced as `plugin-name:skill-name`; invoke directly via `/plugin-name:skill-name`.
- The SDK doesn't expand tilde paths (`~/plugins`); a nonexistent path is silently skipped and the plugin won't appear in the `init` message's `plugins` list.
- `commands/` is a legacy plugin directory; use `skills/` for new plugins.
- This is Claude Agent SDK (library) plugin loading (`plugins` option, local paths only). The Claude Code CLI's own plugin installation via marketplaces (`/plugin install`) is documented under anthropic-claude-code-extend; a marketplace-installed plugin can still be loaded here by pointing `path` at its local installation directory under `~/.claude/plugins/`.

## Related

- [Skills](./skills.md)
- [Slash Commands](./slash-commands.md)
- [Subagents](./subagents.md)
