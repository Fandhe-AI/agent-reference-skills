<!-- source: https://code.claude.com/docs/en/agent-sdk/plugins / last verified: 2026-11-14 -->

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

### Reload and add plugins in a running session

In the TypeScript SDK, `reloadPlugins()` on the `Query` object that `query()` returned applies changes to a plugin's skills, commands, agents, or hooks without a new session; its `addPlugins` option loads more plugin folders (requires TypeScript Agent SDK v0.3.301+). In this example `q` is the `Query` object.

```typescript
const result = await q.reloadPlugins({
  addPlugins: [{ type: "local", path: "/home/user/plugins/another-plugin" }]
});

console.log(result.plugins.map((plugin) => plugin.path));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `"local"` | Only value accepted by the SDK |
| `path` | string | Relative (resolved against the `cwd` option) or absolute path to the plugin root (parent of `skills/`, `agents/`, `hooks/`, `commands/`, or `.claude-plugin/`) |
| `reloadPlugins({ addPlugins })` | method (TypeScript) | Reloads plugins in a running session; each `addPlugins` entry is `{ type: "local", path }` with an absolute `path` |

## Notes

- Plugin `skills/` are namespaced as `plugin-name:skill-name`; invoke directly via `/plugin-name:skill-name`.
- The SDK doesn't expand tilde paths (`~/plugins`); a nonexistent path is silently skipped and the plugin won't appear in the `init` message's `plugins` list.
- `commands/` holds skills as flat Markdown files; use `skills/` for new plugins (Claude Code supports both). The `.claude-plugin/plugin.json` manifest is optional; without it components are auto-discovered from the directory layout.
- The Python SDK has no `reloadPlugins()` equivalent; send `/reload-plugins` as a prompt in the session instead.
- Verify loading in the `init` message: `plugins` (name and path), `skills` (namespaced, e.g. `my-plugin:greet`), and `slash_commands`. If a plugin is missing from `plugins`, check the init message's `plugin_errors` field, then the path, `plugin.json` JSON validity, directory permissions, and existence. Each skill needs `skills/<name>/SKILL.md`.
- Servers provided by a plugin use the plugin-scoped `plugin_`-prefixed name in `mcp__<server-name>__<tool-name>` (see MCP).
- Source: https://code.claude.com/docs/en/agent-sdk/plugins (fetched 2026-11-14)
- This is Claude Agent SDK (library) plugin loading (`plugins` option, local paths only). The Claude Code CLI's own plugin installation via marketplaces (`/plugin install`) is documented under anthropic-claude-code-extend; a marketplace-installed plugin can still be loaded here by pointing `path` at its local installation directory under `~/.claude/plugins/`.

## Related

- [Skills](./skills.md)
- [Slash Commands](./slash-commands.md)
- [Subagents](./subagents.md)
