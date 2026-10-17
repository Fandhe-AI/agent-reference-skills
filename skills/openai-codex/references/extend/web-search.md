# Web search

ChatGPT includes a first-party web search tool. Treat all web results as untrusted input.

## Signature / Usage

```bash
codex --search "Summarize the latest release notes for this dependency"
```

Searches appear as `web_search` items in the interactive transcript and in `codex exec --json` output.

## Options / Props

```toml
web_search = "live"
```

| Value | Description |
|-------|-------------|
| (default) | Cached search for local Codex chats, using an OpenAI-maintained index. |
| `"live"` | Fetch live results; use when the task depends on the latest information. |
| `"indexed"` | Permits external web access only when the search index gates the request. |
| `"disabled"` | Turns the tool off. |

Related keys: `tools.web_search.allowed_domains`, managed `allowed_web_search_modes`.

### Custom model provider

```toml
model_provider = "custom"
web_search = "live"

[model_providers.custom]
name = "Custom Responses provider"
base_url = "https://example.com/v1"
env_key = "CUSTOM_RESPONSES_API_KEY"
supports_standalone_web_search = true
```

## Notes

- Cached mode lowers but does not remove prompt injection risk. With full access, web search defaults to live.
- Web search is a hosted tool separate from sandboxed command networking: it does not use the permission profile's network proxy or domain allowlist and can remain available when command network access is disabled. Search-domain filters do not restrict local command traffic, apps, connectors, or MCP servers.
- `supports_standalone_web_search` defaults to `false`; standalone web search is under development and off by default, and the provider, model, and runtime must all support it. Workspace and managed restrictions still apply.
- Desktop app: ask for current information in a chat; use the Deep research plugin (Work > Plugins > Deep research) for multi-source reports. Web: deep research via the + menu in Work, if available. Workspace settings can limit search.
- IDE extension uses the connected Codex host's search mode.
- Network boundaries for Codex cloud environments are covered by the Internet access page.
- Source: https://learn.chatgpt.com/docs/web-search (retrieved 2026-10).

## Related

- [Plugins](./plugins.md)
- [Browser](./browser.md)
