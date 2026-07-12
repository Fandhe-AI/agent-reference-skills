# Tools & Toolsets

Hermes organizes its capabilities into eight tool categories and exposes them through named toolsets. Terminals can run locally, in containers, or on remote infrastructure.

## Tool Categories

| Category | Description | Key Tools |
|----------|-------------|-----------|
| Web | Search and page extraction | `web_search`, `web_extract` |
| X Search | Twitter/X post search | `x_search` (requires xAI credentials) |
| Terminal & Files | Command execution and file operations | `terminal`, `process`, `read_file`, `patch` |
| Browser | Interactive browser automation | `browser_navigate`, `browser_snapshot`, `browser_vision` |
| Media | Multimodal generation and analysis | `vision_analyze`, `image_generate`, `text_to_speech` |
| Agent Orchestration | Planning and task delegation | `todo`, `clarify`, `execute_code`, `delegate_task` |
| Memory & Recall | Persistent storage and retrieval | `memory`, `session_search` |
| Automation & Delivery | Scheduled tasks and messaging | `cronjob`, `send_message` |
| Integrations | Home Assistant, MCP servers, RL training | — |

The central registry (`tools/registry.py`) contains 70+ registered tools across ~28 toolsets.

## Available Toolsets

Common preset names: `web`, `terminal`, `file`, `browser`, `vision`, `image_gen`, `moa`, `skills`, `tts`, `todo`, `memory`, `session_search`, `cronjob`, `code_execution`, `delegation`, `clarify`, `homeassistant`, `rl`

## Terminal Backends

| Backend | Purpose |
|---------|---------|
| Local | Default; runs on your machine |
| Docker | Isolated containers for security |
| SSH | Remote execution (prevents self-modification) |
| Singularity | HPC cluster computing |
| Modal | Serverless cloud execution |
| Daytona | Persistent remote dev environments |

## Background Process Management

Start a process with `background=true`. Manage running processes via the `process` tool:

| Action | Description |
|--------|-------------|
| list | List all background processes |
| poll | Check current status |
| wait | Block until completion |
| log | Retrieve output logs |
| kill | Terminate a process |
| write | Send input to stdin |

## Container Resources

Configure CPU cores, memory (MB), disk (MB), and filesystem persistence when using container backends.

## Security Features

- Read-only root filesystem
- Dropped Linux capabilities
- No privilege escalation
- PID limits enforced
- Full namespace isolation

## Web Search Providers

`web_search` / `web_extract` dispatch to a registered provider. Selection precedence:

1. `web.search_backend` / `web.extract_backend` in `config.yaml` (per-capability override)
2. `web.backend` (shared fallback)
3. The only registered-and-available provider, if exactly one qualifies
4. Legacy preference order, filtered by availability:
   `firecrawl` → `parallel` → `tavily` → `exa` → `searxng` → `brave-free` → `ddgs`
5. Otherwise `None` — the tool errors and points at `hermes tools`

| Provider | Requires | Search | Extract |
|----------|----------|--------|---------|
| `firecrawl` | `FIRECRAWL_API_KEY` | ✅ | ✅ |
| `parallel` | `PARALLEL_API_KEY` | ✅ | ✅ |
| `tavily` | `TAVILY_API_KEY` | ✅ | ✅ |
| `exa` | `EXA_API_KEY` | ✅ | ✅ |
| `searxng` | `SEARXNG_URL` (self-hosted, no key) | ✅ | — |
| `brave-free` | `BRAVE_SEARCH_API_KEY` | ✅ | — |
| `ddgs` | the optional `ddgs` package installed | ✅ | — |

Pin the backend explicitly rather than relying on the fallback order:

```bash
hermes config set web.search_backend searxng
```

### Self-hosted SearXNG

`SEARXNG_URL=http://127.0.0.1:8888` is enough — but **SearXNG ships with its JSON API disabled**, and Hermes needs it. Add `json` to `search.formats` in `settings.yml`, or every query fails with HTTP 403:

```yaml
search:
  formats:
    - html
    - json
```

Verify before wiring it up:

```bash
curl -s 'http://127.0.0.1:8888/search?q=test&format=json' | head -c 200
```

Note that SearXNG is search-only. If you also need `web_extract`, point `web.extract_backend` at an extract-capable provider.

## Sudo Support

Sudo prompts are handled interactively (password cached for the session) or via the `SUDO_PASSWORD` environment variable for unattended use.

## Related

- [Memory](./memory.md)
- [MCP](./mcp.md)
