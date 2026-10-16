# Plugins

A plugin packages skills, MCP configuration, or both. Load its files into your own environment or upload a ZIP to an OpenAI-hosted environment.

## Signature / Usage

Plugin layout:

```text
docs-helper/
├── .codex-plugin/plugin.json
├── .mcp.json
└── skills/docs-search/SKILL.md
```

`.codex-plugin/plugin.json`:

```json
{
  "name": "docs-helper",
  "version": "1.0.0",
  "description": "Find answers in OpenAI developer documentation.",
  "skills": "./skills/",
  "mcpServers": "./.mcp.json"
}
```

Register in a self-hosted sandbox (copy the plugin to `/workspace/plugins/docs-helper`):

```python
from openai import OpenAI

client = OpenAI()

result = client.beta.agents.sessions.create(
    agent={"model": "gpt-6-astra"},
    environment={
        "type": "self_hosted",
        "workspace_directory": "/workspace",
        "capability_directories": ["/workspace/plugins/docs-helper"],
    },
)
print(result.id)
```

Upload to an OpenAI-hosted sandbox: set `environment.plugins` to entries of the form below (one base64 ZIP per plugin):

```json
{
  "type": "inline",
  "name": "docs-helper",
  "description": "Find answers in OpenAI developer documentation.",
  "source": {
    "type": "base64",
    "media_type": "application/zip",
    "data": "<base64 ZIP>"
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `environment.capability_directories` | string[] | Self-hosted: absolute plugin roots (each containing `.codex-plugin/plugin.json`) |
| `environment.plugins` | array | OpenAI-hosted: one ZIP per plugin; ZIP holds one plugin folder; name and description must match the manifest |
| `environment.environment_template_id` | string | Reuse a saved environment template (omit `plugins` to inherit its list; supplying a list replaces it) |
| `bearer_token_env_var` | string | Plugin HTTP MCP: environment variable whose value is sent as a bearer token |
| `http_headers` | object | Plugin HTTP MCP: literal headers (`env_http_headers` is not supported) |
| `env_vars` | string[] | Plugin stdio MCP: environment variables to pass to the server process |

## Notes

- Manifest paths resolve from the plugin root, must start with `./`, stay inside the plugin, and contain no `..` components.
- `.mcp.json` uses the plugin format (`mcpServers` with `type` / `url`), which differs from `agent.tools`.
- Connect the executor before the agent uses a self-hosted plugin; the environment must reach any MCP URL. For multiple plugins list each root; a parent directory can discover nested skills but does not load every child plugin's MCP configuration.
- Each session gets its own environment; the root agent and its subagents share it.
- Plugin MCP connections run from the session's environment. Stdio: install the executable and dependencies in the environment; a relative `cwd` resolves from the plugin root. For hosted stdio MCPs omit the network policy or set it to `enabled`; `disabled` and `restricted` are not supported.
- Keep secrets out of plugin files and archives.
- Testing: ask for the skill in a normal session message, then check the turn completed and saved items include a successful call to the MCP server (not required for a skill-only plugin). Create a new session after changing plugin files or a template; existing sessions do not reload tools. Delete test sessions and stop self-hosted compute.
- The plugin / SKILL.md format here is the Codex plugin format used by the Agents API environment, not Claude Code Agent Skills.
- Source: https://developers.openai.com/api/docs/guides/agents-api/tools/plugins (fetched 2026-10).

## Related

- [MCP Connections](./mcp-connections.md)
- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [OpenAI-hosted Sandboxes](./openai-hosted-sandboxes.md)
