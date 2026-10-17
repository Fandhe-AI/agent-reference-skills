# Web Search Provider Plugins

Web-search provider plugins register a backend that services `web_search`, `web_extract` and optional deep-crawl tool calls. Built-in providers (Firecrawl, SearXNG, Tavily, Perplexity, Exa, Parallel, Keenable, Brave Search free tier, xAI, DDGS) ship under `plugins/web/<name>/`.

## Signature / Usage

```
plugins/web/my-backend/
├── __init__.py     # register() entry point
├── provider.py     # WebSearchProvider subclass
└── plugin.yaml     # Manifest with kind: backend and provides_web_providers
```

```python
# provider.py
import os

from agent.web_search_provider import WebSearchProvider

class MyBackendWebSearchProvider(WebSearchProvider):
    @property
    def name(self) -> str:
        return "my-backend"   # id used in web.search_backend / web.extract_backend / web.backend

    @property
    def display_name(self) -> str:
        return "My Backend"

    def is_available(self) -> bool:
        return bool(os.getenv("MY_BACKEND_API_KEY", "").strip())   # no network calls

    def supports_search(self) -> bool:
        return True

    def supports_extract(self) -> bool:
        return False

    def search(self, query: str, limit: int = 5):
        ...
        return {"success": True, "data": {"web": [
            {"title": "...", "url": "...", "description": "...", "position": 1}]}}

# __init__.py
from plugins.web.my_backend.provider import MyBackendWebSearchProvider


def register(ctx) -> None:
    ctx.register_web_search_provider(MyBackendWebSearchProvider())
```

```yaml
name: web-my-backend
version: 1.0.0
description: "My Backend web search — Bearer-auth REST API"
author: Your Name
kind: backend
provides_web_providers:
  - my-backend
requires_env:
  - MY_BACKEND_API_KEY
```

```yaml
# ~/.hermes/config.yaml
web:
  search_backend: "brave-free"
  extract_backend: "firecrawl"
```

## Options / Props

ABC members (`agent/web_search_provider.py`):

| Member | Required | Default | Purpose |
|--------|----------|---------|---------|
| `name` | yes | — | Stable id used in `web.*_backend` config |
| `display_name` | no | `name` | Label in `hermes tools` |
| `is_available()` | yes | — | Cheap availability gate |
| `supports_search()` | no | `True` | `web_search` routing flag |
| `supports_extract()` | no | `False` | `web_extract` routing flag |
| `search(query, limit)` | conditional | raises | Required when `supports_search()` is true |
| `extract(urls, **kwargs)` | conditional | raises | Required when `supports_extract()` is true (deep crawl is a mode of `extract()`) |

Config selection:

| Capability | Config key | Falls back to |
|------------|------------|---------------|
| `web_search` | `web.search_backend` | `web.backend` |
| `web_extract` | `web.extract_backend` | `web.backend` |
| Deep crawl inside `web_extract` | `web.extract_backend` | `web.backend` |

Response envelope: search success `{"success": True, "data": {"web": [{"title", "url", "description", "position"}]}}`; extract success `{"success": True, "data": [{"url", "title", "content", "raw_content", "metadata"?, "error"?}]}`; failure `{"success": False, "error": "..."}`.

`plugin.yaml` keys: `kind: backend` (backend-loading path), `provides_web_providers` (provider names advertised in `hermes tools` before `register()` runs), `requires_env` (credential prompt during install).

## Notes

- Discovery: bundled `plugins/web/<name>/`, user `~/.hermes/plugins/web/<name>/` (opt-in via `plugins.enabled` or `hermes plugins enable <name>`), pip entry point `hermes_agent.plugins` (`my-backend-web = "my_backend_web_package"`, top-level `register`). Registry: `agent/web_search_registry.py`.
- With neither key set Hermes auto-detects the backend from environment API keys/URLs; if no provider passes the capability gate the tool returns an error pointing at `hermes tools`.
- `search()` / `extract()` may be `async def`; the dispatcher detects coroutines.
- `is_available()` must not make network calls (runs on every `hermes tools` paint). Use `pm.available("extra-name")` there and `pm.ensure_import("extra-name")` in the operation; report `InstallError`. Third-party plugins declare their own dependencies in manifest or `pyproject.toml`.
- Reference implementations: `brave_free/` (API-key search-only template), `ddgs/` (no-key, lazy-installs SDK), `firecrawl/` (search + extract + crawl), `searxng/` (self-hosted, no auth), `xai/` (LLM-backed search reusing existing credentials).
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/web-search-provider-plugin (pinned to v0.22.2)

## Related

- [Browser Provider Plugins](./browser-provider-plugin.md)
- [Image Generation Provider Plugins](./image-gen-provider-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
