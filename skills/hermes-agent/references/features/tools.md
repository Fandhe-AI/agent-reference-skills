# Tools & Toolsets

Hermes organizes its capabilities into eight tool categories and exposes them through named toolsets. Terminals can run locally, in containers, or on remote infrastructure.

## Tool Categories

| Category | Description | Key Tools |
|----------|-------------|-----------|
| Web | Search and page extraction | `web_search`, `web_extract` |
| X Search | Twitter/X post search | `x_search` (requires xAI credentials) |
| Terminal & Files | Command execution and file operations | `terminal`, `process_manage`, `read_file`, `patch` |
| Browser | Interactive browser automation | `browser_navigate`, `browser_snapshot`, `browser_vision` |
| Media | Multimodal generation and analysis | `vision_analyze`, `image_generate`, `text_to_speech` |
| Agent Orchestration | Planning and task delegation | `todo_list`, `clarify`, `execute_code`, `delegate_task` |
| Memory & Recall | Persistent storage and retrieval | `memory`, `session_search` |
| Automation | Scheduled tasks (create/list/update/pause/resume/run/remove). Outbound delivery is handled by cron's own delivery, the `hermes send` CLI, and the gateway notifier, not by an agent-callable tool | `cronjob_manage` |
| Integrations | MCP server tools and plugin tools (e.g. Home Assistant `ha_*` from the `homeassistant` catalog plugin) | — |

The built-in registry is ~100 tools (Built-in Tools Reference, "Quick counts"), including 10 core browser tools plus CDP-gated and browser-vault tools, 4 file tools, 11 desktop-GUI tools (desktop-app sessions only), 14 kanban tools (registered when the kanban dispatcher spawns the agent), and standalone tools such as `memory`, `clarify`, `delegate_task`, `execute_code`, `cronjob_manage`, `session_search`, `skill_view` / `skill_manage` / `skills_list`, `text_to_speech`, `image_generate`, `vision_analyze`, `video_analyze`, `todo_list`, `computer_use`, `x_search`. About 19 rarely used tools load lazily and are found through Tool Search (v0.22.0; see the Tool Search feature page).

## Available Toolsets

Common toolsets: `web`, `search`, `terminal`, `file`, `browser`, `vision`, `image_gen`, `skills`, `tts`, `todo`, `memory`, `session_search`, `cronjob`, `code_execution`, `delegation`, `clarify`, `messaging`, `discord`, `discord_admin`, `debugging`, `safe`. Platform presets (`hermes-cli`, `hermes-telegram`, ...) and dynamic MCP toolsets (`mcp-<server>`) are listed in the Toolsets Reference. MCP tools appear with the prefix `mcp__<server>__`.

Renamed in v0.22.0: `todo` is now `todo_list`, `cronjob` is now `cronjob_manage`, `process` is now `process_manage` (the old names still work).

## Tool result annotations

- Terminal commands killed by a signal return a human-readable note (e.g. exit `-9` / `137` becomes "terminated by signal 9: SIGKILL ...").
- `read_file` transcodes UTF-16 text files (BOM or byte-pattern detection) to UTF-8 with a hint disclosing the conversion; files over 10 MB and truly binary files are still refused.

## Terminal Backends

| Backend | Purpose |
|---------|---------|
| Local | Default; runs on your machine |
| Docker | Isolated containers for security |
| SSH | Remote execution (prevents self-modification) |
| Singularity | HPC cluster computing |
| Modal | Serverless cloud execution |
| Daytona | Persistent remote dev environments |
| Vercel Sandbox (`vercel_sandbox`) | Cloud microVM with snapshot-backed filesystem persistence |

Home Assistant tools come from the `homeassistant` catalog plugin (moved out of the bundled set in v0.22.0). Nous Portal subscribers can use web search, image generation, TTS, and browser through the Tool Gateway.

## Background Process Management

Start a process with `background=true`. Manage running processes via the `process_manage` tool (formerly `process`; renamed v0.22.0):

| Action | Description |
|--------|-------------|
| list | List all background processes |
| poll | Check current status |
| wait | Block until completion |
| log | Retrieve output logs |
| kill | Terminate a process |
| write | Send input to stdin |

PTY mode (`pty=true`) enables interactive CLI tools. Completed background commands retain exit status and output (newest 64 results, up to 7 days, 200,000-character tail) under `logs/process-results/`, readable only from the conversation that launched them.

## Container Resources

Configure CPU cores, memory (MB), disk (MB), and filesystem persistence for all container backends (defaults: `container_cpu: 1`, `container_memory: 5120`, `container_disk: 51200`, `container_persistent: true`). For Vercel Sandbox leave `container_disk` at the shared default; custom disk sizing is unsupported. See the Configuration page for the full Docker key set.

## Security Features

All container backends run hardened: read-only root filesystem (Docker), all Linux capabilities dropped, no privilege escalation, PID limits (256), full namespace isolation, persistent workspace via volumes. `terminal.docker_forward_env` variables are visible to commands in the container. See the Security page.

## Web Search Providers

Note: this section is no longer on the upstream Tools page in v0.22.2 (see Web Search in the Configuration page and the web-search feature page for current guidance); the content below is retained from earlier docs.

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
