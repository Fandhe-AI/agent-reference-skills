# Browser Provider Plugins

Browser provider plugins register a cloud browser backend that services cloud-mode `browser_*` tool calls. A provider implements session lifecycle only (create a remote session, return a CDP websocket URL, tear down); Hermes' browser stack (`agent-browser` + `tools/browser_tool.py`) drives the page.

## Signature / Usage

```
plugins/browser/my-backend/
├── __init__.py     # register() entry point
├── provider.py     # BrowserProvider subclass
└── plugin.yaml     # Manifest with kind: backend and provides_browser_providers
```

```yaml
name: browser-my-backend
version: 1.0.0
description: "My cloud browser backend. Requires MY_BACKEND_API_KEY."
author: you
kind: backend
provides_browser_providers:
  - my-backend
```

```python
from agent.browser_provider import BrowserProvider

class MyBackendProvider(BrowserProvider):
    @property
    def name(self) -> str:
        return "my-backend"          # the browser.cloud_provider config value

    @property
    def display_name(self) -> str:
        return "My Backend"          # shown in `hermes tools`

    def is_available(self) -> bool:
        return bool(os.environ.get("MY_BACKEND_API_KEY"))   # NO network calls

    def create_session(self, task_id: str) -> dict:
        session = my_api.create_browser(...)
        return {
            "session_name": f"my-backend-{task_id}",
            "bb_session_id": session.id,
            "cdp_url": session.cdp_ws_url,
            "features": {"stealth": True},
        }

    def close_session(self, session_id: str) -> bool: ...
    def emergency_cleanup(self, session_id: str) -> None: ...

def register(ctx) -> None:
    ctx.register_browser_provider(MyBackendProvider())
```

```yaml
browser:
  cloud_provider: my-backend
```

## Options / Props

`create_session()` metadata contract:

| Key | Description |
|-----|-------------|
| `session_name` | Unique agent-browser session name |
| `bb_session_id` | Provider session ID (legacy key name kept for `tools/browser_tool.py`; do not rename) |
| `cdp_url` | CDP websocket URL |
| `features` | Feature flags enabled |
| `external_call_id` | Optional; managed-gateway billing |

`get_setup_schema()` returns `{"name", "badge", "tag", "env_vars": [{"key", "prompt", "url"}], "post_setup": "agent_browser"}` for the `hermes tools` Browser Automation picker.

## Notes

- Discovery: bundled `plugins/browser/<name>/` (auto-loaded, `kind: backend`), user `~/.hermes/plugins/browser/<name>/` (opt-in via `plugins.enabled` or `hermes plugins enable <name>`), pip entry point `hermes_agent.plugins`. The registry is `agent/browser_registry.py`; the dispatcher is a pure registry lookup.
- `create_session()` may raise (`ValueError` for missing credentials, `RuntimeError` for network/API failures); `close_session()` and `emergency_cleanup()` must never raise.
- `name` must be lowercase and stable (it is a user-written config value). `is_available()` runs at tool registration and on every `hermes tools` paint.
- A backend that cannot be selected and configured through `hermes tools` is not done.
- Reference implementations under `plugins/browser/`: `firecrawl` (simplest), `browser_use`, `browserbase` (stealth/proxy/keep-alive flags).
- Source: developer-guide/browser-provider-plugin (v0.22.2 snapshot).

## Related

- [Web Search Provider Plugins](./web-search-provider-plugin.md)
- [Image Generation Provider Plugins](./image-gen-provider-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
