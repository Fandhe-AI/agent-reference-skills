# Environment Variables

Complete reference of environment variables read by Hermes Agent. Secrets (API keys, bot tokens, OAuth secrets) belong in `~/.hermes/.env`; non-secret behaviour belongs in `config.yaml` when a config key exists.

## Signature / Usage

```bash
# Set via the CLI (writes UPPER_SNAKE names to ~/.hermes/.env, never config.yaml)
hermes config set OPENROUTER_API_KEY sk-or-...

# Process-level overrides
export HERMES_HOME=/path/to/home
export HERMES_WRITE_SAFE_ROOT=/path/to/project:/home/you/.hermes
```

## Options / Props

Core variables by group (the source page lists several hundred; per-platform allowlist / home-channel / `*_ALLOW_ALL_USERS` variants follow the same pattern as the groups shown).

### LLM providers

| Variable | Description |
|----------|-------------|
| `OPENROUTER_API_KEY` | OpenRouter API key (recommended for flexibility) |
| `OPENROUTER_BASE_URL` | Override the OpenRouter-compatible base URL |
| `OPENAI_API_KEY` | OpenAI API key, or the key for a custom endpoint when `OPENAI_BASE_URL` is set (sent only to that exact origin). Counts as an OpenRouter key only when it starts with `sk-or-` |
| `OPENAI_BASE_URL` | Base URL for a custom endpoint (VLLM, SGLang, etc.) |
| `ANTHROPIC_API_KEY` | Anthropic Console API key |
| `ANTHROPIC_BASE_URL` | Override the Anthropic API base URL |
| `ANTHROPIC_TOKEN` | Manual or legacy Anthropic OAuth/setup-token override |
| `GOOGLE_API_KEY` / `GEMINI_API_KEY` | Google AI Studio API key (`GEMINI_API_KEY` is an alias) |
| `VERTEX_CREDENTIALS_PATH` | Service account JSON for Vertex AI; falls back to `GOOGLE_APPLICATION_CREDENTIALS`, then ADC |
| `GLM_API_KEY` | z.ai / ZhipuAI key (aliases `ZAI_API_KEY`, `Z_AI_API_KEY`) |
| `KIMI_API_KEY` | Kimi / Moonshot AI key (`KIMI_CN_API_KEY` for China) |
| `MINIMAX_API_KEY` | MiniMax global key (`MINIMAX_CN_API_KEY` for China). Not used by `minimax-oauth` |
| `DEEPSEEK_API_KEY` | DeepSeek key |
| `XAI_API_KEY` | xAI (Grok) key for chat + TTS + web search |
| `NVIDIA_API_KEY` | NVIDIA NIM key; `NVIDIA_BASE_URL` can point at a local NIM |
| `HF_TOKEN` | Hugging Face Inference Providers token |
| `AZURE_FOUNDRY_API_KEY` / `AZURE_FOUNDRY_BASE_URL` | Microsoft Foundry / Azure OpenAI. Key not needed when `model.auth_mode: entra_id` |
| `AWS_REGION` / `AWS_PROFILE` | AWS region / named profile for Bedrock (read by boto3) |
| `HERMES_MODEL` | Override model at process level (used by the cron scheduler; prefer `config.yaml`) |
| `HERMES_INFERENCE_MODEL` | Force the model for the session / `hermes -z` / `hermes chat` without touching `config.yaml` (same as `-m` / `--model`) |

Each provider also has a `<PROVIDER>_BASE_URL` override (for example `GLM_BASE_URL`, `KIMI_BASE_URL`, `DEEPSEEK_BASE_URL`); defaults are listed on the official page.

### Core / home

| Variable | Description |
|----------|-------------|
| `HERMES_HOME` | Configuration and user-data home. `~` and `$VAR` are expanded. Defaults to `~/.hermes` (POSIX) or `%LOCALAPPDATA%\hermes` (Windows); official Docker image uses `/opt/data` |
| `HERMES_CONFIG_BACKEND` | Where the profile's `config.yaml` user layer is read and written: `file` (default, local `config.yaml`) or `remote` (Remote Config). Any other value, or a remote backend that cannot serve config, stops Hermes at startup. Read from the launch environment and `.env`, never from `config.yaml` |
| `HERMES_CONFIG_REMOTE_URL` | Base URL of the Remote Config plane (default `https://config-config.nousresearch.com`; `https://` only, plain `http://` only to loopback) |
| `HERMES_CONFIG_INSTANCE_ID` | This agent's id in the Remote Config plane; required with `HERMES_CONFIG_BACKEND=remote` |
| `HERMES_TIMEZONE` | IANA timezone override (also exported as `TZ` to `execute_code` children on Linux/macOS) |
| `HERMES_DUMP_REQUESTS` | Dump API request payloads to log files (`true`/`false`) |
| `HERMES_PREFILL_MESSAGES_FILE` | JSON file of ephemeral prefill messages injected at API-call time |

### Tool APIs

| Variable | Description |
|----------|-------------|
| `PARALLEL_API_KEY`, `FIRECRAWL_API_KEY`, `TAVILY_API_KEY`, `EXA_API_KEY`, `PERPLEXITY_API_KEY`, `BRAVE_SEARCH_API_KEY` | Web search / extract backends |
| `SEARXNG_URL` | SearXNG instance URL (keyless self-hosted search) |
| `BROWSERBASE_API_KEY` / `BROWSERBASE_PROJECT_ID` | Browserbase browser automation |
| `BROWSER_USE_API_KEY` | Browser Use cloud browser |
| `BROWSER_CDP_URL` | Chrome DevTools Protocol endpoint the browser tools attach to instead of launching Chromium (set by `/browser connect`; same as `browser.cdp_url`) |
| `CAMOFOX_*` | Read only by the Camofox plugin (`hermes plugins install camofox`); core Hermes ignores them |
| `AGENT_BROWSER_*` | No longer read. On update, values in the profile's `.env` are copied into config when the key is unset: `AGENT_BROWSER_EXECUTABLE_PATH` -> `browser.executable_path`, `AGENT_BROWSER_PROFILE` -> `browser.user_data_dir`, `AGENT_BROWSER_ARGS` -> `browser.chromium_args`, `AGENT_BROWSER_HEADED` -> `browser.headed`, `AGENT_BROWSER_ENGINE` -> `browser.engine` |
| `FAL_KEY` | FAL.ai image generation |
| `KREA_API_KEY` | Krea API key for Krea 3 and Krea 2 image generation |
| `GROQ_API_KEY` | Groq Whisper STT |
| `ELEVENLABS_API_KEY` | ElevenLabs TTS |
| `GITHUB_TOKEN` | Skills Hub (higher rate limits, publish) and desktop update check (`GH_TOKEN` honoured too) |
| `HONCHO_API_KEY`, `MEM0_API_KEY`, `HINDSIGHT_API_KEY`, `RETAINDB_API_KEY`, `SUPERMEMORY_API_KEY` | Memory provider keys |
| `DAYTONA_API_KEY`, `VERCEL_TOKEN` (+ `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID`) | Cloud sandbox backends |
| `SPRITES_TOKEN` | Sprites cloud sandboxes, read by the `sprites` plugin |

### Terminal backend

| Variable | Description |
|----------|-------------|
| `TERMINAL_ENV` | Backend: `local`, `docker`, `ssh`, `modal`, `daytona`, `vercel_sandbox`, or a plugin backend (`singularity`, `sprites`) |
| `TERMINAL_DOCKER_IMAGE` | Docker image (default `nousresearch/hermes-sandbox:desktop`) |
| `HERMES_DOCKER_BINARY` | Container binary override (e.g. `podman`) |
| `TERMINAL_DOCKER_VOLUMES` | Extra volume mounts (comma-separated `host:container`) |
| `TERMINAL_TIMEOUT` / `TERMINAL_LIFETIME_SECONDS` | Command timeout / max session lifetime (seconds) |
| `TERMINAL_SSH_HOST` / `TERMINAL_SSH_USER` / `TERMINAL_SSH_PORT` / `TERMINAL_SSH_KEY` | SSH backend (port default 22) |
| `TERMINAL_CONTAINER_CPU` / `_MEMORY` / `_DISK` | Container resources (defaults 1 core, 5120 MB, 51200 MB) |
| `TERMINAL_CONTAINER_PERSISTENT` | Persist container filesystem across sessions (default `true`) |
| `SUDO_PASSWORD` | Enable sudo without interactive prompt |

### Messaging gateway

Each platform follows the pattern `<PLATFORM>_*` for credentials, `*_ALLOWED_USERS`, `*_ALLOW_ALL_USERS` (dev only) and `*_HOME_CHANNEL` (cron delivery).

| Variable | Description |
|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | Telegram bot token (from @BotFather) |
| `TELEGRAM_WEBHOOK_URL` | Public HTTPS URL for webhook mode; `TELEGRAM_WEBHOOK_SECRET` is required whenever it is set (gateway refuses to start without it) |
| `TELEGRAM_ALLOWED_TOPICS` | Comma-separated forum topic/thread IDs the bot handles; messages from any other group/forum topic are ignored (DMs never filtered; General topic is ID `1`; applied before `TELEGRAM_IGNORED_THREADS`). Same as `telegram.allowed_topics` |
| `TELEGRAM_FREE_RESPONSE_CHATS` / `TELEGRAM_FREE_RESPONSE_TOPICS` | Chat IDs / `<chat_id>:<thread_id>` pairs where `require_mention` is bypassed (same as `telegram.free_response_chats` / `telegram.free_response_topics`) |
| `DISCORD_BOT_TOKEN` | Discord bot token |
| `SLACK_THREAD_FOLLOWUP_SILENCE` | Let a bare silence marker stand on unaddressed Slack channel-thread replies instead of posting the unexpected-silence notice (default `false`) |
| `SLACK_BOT_TOKEN` / `SLACK_APP_TOKEN` | Slack `xoxb-` / `xapp-` (app token required for Socket Mode) |
| `WHATSAPP_ENABLED` / `WHATSAPP_MODE` | WhatsApp bridge; mode `bot` or `self-chat` |
| `SIGNAL_HTTP_URL` / `SIGNAL_ACCOUNT` | signal-cli daemon endpoint / bot number (E.164) |
| `EMAIL_ADDRESS`, `EMAIL_PASSWORD`, `EMAIL_IMAP_HOST`, `EMAIL_SMTP_HOST` | Email adapter |
| `MATRIX_HOMESERVER` / `MATRIX_ACCESS_TOKEN` | Matrix homeserver / bot token |
| `MATTERMOST_URL` / `MATTERMOST_TOKEN` | Mattermost |
| `WEBHOOK_ENABLED` / `WEBHOOK_PORT` (default 8644) / `WEBHOOK_SECRET` | Webhook adapter |
| `API_SERVER_ENABLED` / `API_SERVER_KEY` | OpenAI-compatible API server; the key is required whenever it is enabled. Defaults: host `127.0.0.1`, port `8642` |
| `GATEWAY_ALLOWED_USERS` | Comma-separated user IDs allowed across all platforms |
| `GATEWAY_ALLOW_ALL_USERS` | Allow everyone (default `false`); also `gateway.allow_all_users` |
| `GATEWAY_PROXY_URL` / `GATEWAY_PROXY_KEY` | Forward messages to a remote Hermes API server (proxy mode) |

Other platform families documented on the page: Google Chat, Twilio SMS, DingTalk, Feishu/Lark, WeCom (+ callback), Weixin, BlueBubbles, QQ, LINE, ntfy, IRC, SimpleX, Photon, Buzz, Microsoft Teams, Microsoft Graph (`MSGRAPH_*`), Raft, Home Assistant (`HASS_*`, plugin).

### Agent behavior

| Variable | Description |
|----------|-------------|
| `HERMES_MAX_ITERATIONS` | Max tool-calling iterations per conversation (default 500) |
| `HERMES_YOLO_MODE` | `1` bypasses dangerous-command approval prompts (equals `--yolo`) |
| `HERMES_ACCEPT_HOOKS` | Auto-approve unseen shell hooks (equals `--accept-hooks`) |
| `HERMES_IGNORE_USER_CONFIG` | Skip `~/.hermes/config.yaml` (equals `--ignore-user-config`) |
| `HERMES_IGNORE_RULES` | Skip auto-injection of `AGENTS.md`, `SOUL.md`, `.cursorrules`, memory, preloaded skills |
| `HERMES_SAFE_MODE` | Legacy in-process troubleshooting switch: skips plugin discovery, MCP server loading and shell-hook registration for that process. `hermes chat --safe-mode` no longer sets it (the gateway freezes the safe policy into the session and runs it in an isolated worker) |
| `HERMES_RESTART_DRAIN_TIMEOUT` | Overrides `agent.restart_drain_timeout`: seconds in-flight chat turns may keep running once the gateway stops or restarts before they are interrupted (default `0`, interrupt at once) |
| `HERMES_ACP_SKIP_CONFIGURED_MCP` | Obsolete: no longer read. `hermes acp` is a viewer of the gateway daemon and never starts `config.yaml` MCP servers itself |
| `HERMES_API_TIMEOUT` | LLM API call timeout in seconds (default 1800) |
| `HERMES_STREAM_READ_TIMEOUT` | Streaming socket read timeout (default 120) |
| `HERMES_STREAM_STALE_TIMEOUT` | Stale stream detection timeout (default 180) |
| `HERMES_STREAM_RETRIES` | Mid-stream reconnect attempts (default 3) |
| `HERMES_AGENT_TIMEOUT` | Gateway inactivity timeout for a running agent (default 1800; `0` disables) |
| `HERMES_CRON_TIMEOUT` | Inactivity timeout for cron agent runs (default 600; `0` unlimited) |
| `HERMES_CRON_MAX_PARALLEL` | Max cron jobs per tick (default 4) |
| `HERMES_EXEC_ASK` | Enable execution approval prompts in gateway mode |
| `HERMES_ALLOW_PRIVATE_URLS` | Allow tools to fetch localhost/private-network URLs (off by default in gateway mode) |
| `HERMES_REDACT_SECRETS` | Secret redaction in tool output / logs / chat (default `true`) |
| `HERMES_WRITE_SAFE_ROOT` | Directory prefix(es) that hard-block `write_file` / `patch` outside them (separated by `:` on Unix, `;` on Windows) |
| `HERMES_ENABLE_PROJECT_PLUGINS` | Auto-discover repo-local plugins from `./.hermes/plugins/` (default disabled) |
| `HERMES_EPHEMERAL_SYSTEM_PROMPT` | Ephemeral system prompt injected at API-call time, never persisted |
| `DELEGATION_MAX_CONCURRENT_CHILDREN` | Max parallel subagents per `delegate_task` batch (default 3); `delegation.max_concurrent_children` takes priority |
| `HERMES_TUI` | `1` launches the TUI (equals `--tui`) |
| `HERMES_SESSION_ID` | Exported automatically into every tool subprocess; do not set manually |
| `AI_AGENT` / `HERMES_AGENT` | Set by Hermes (`hermes-agent` / `true`) in terminal shells for child-process attribution; do not set manually |
| `AUXILIARY_VISION_PROVIDER` / `_MODEL` / `_BASE_URL` / `_API_KEY` | Override the auxiliary vision task |

### Web dashboard and Desktop

| Variable | Description |
|----------|-------------|
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` / `_PASSWORD` / `_PASSWORD_HASH` / `_SECRET` / `_TTL_SECONDS` | Bundled username/password dashboard-auth provider (hash preferred; trusted LAN / VPN only) |
| `HERMES_DASHBOARD_OAUTH_CLIENT_ID` | OAuth client id for the Nous provider (provision with `hermes dashboard register`) |
| `HERMES_DASHBOARD_OIDC_ISSUER` / `_CLIENT_ID` / `_SCOPES` | Self-hosted OIDC provider (default scopes `openid profile email`) |
| `HERMES_DASHBOARD_PUBLIC_URL` | Public URL behind a reverse proxy; controls OAuth callbacks and Host/Origin guard |
| `HERMES_DESKTOP_REMOTE_URL` | (Desktop side) base URL of a remote backend, e.g. `http://host:9119` |

## Notes

- Some variables are process-only overrides or internal bridge variables (`HERMES_DATA_DIR_SUFFIX`, `HERMES_REPO_URL`, `HERMES_UPDATE_*`, `HERMES_KANBAN_TASK`, egress-proxy variables injected into Docker sandboxes); do not put them in `.env`.
- Context compression, fallback providers (`fallback_providers`), and provider routing (`provider_routing`: `sort`, `only`, `ignore`, `order`, `require_parameters`, `data_collection`) are `config.yaml` only; there are no environment variables for them.
- Do not point `HERMES_WRITE_SAFE_ROOT` at a project directory alone: writes to `~/.hermes/skills/` or cron files then fail with `outside HERMES_WRITE_SAFE_ROOT`. List both prefixes.
- `AUXILIARY_WEB_EXTRACT_*` variables are obsolete. `HERMES_TOOL_PROGRESS` is ignored (use `display.tool_progress`); `HERMES_HUMAN_DELAY_*` are no longer read (use the `human_delay` config section).
- `TERMINAL_CWD` and `MESSAGING_CWD` are deprecated in favour of `terminal.cwd` in `config.yaml`.
- Names on the env writer's denylist (`HERMES_HOME`, `HERMES_YOLO_MODE`, `PATH`, ...) are refused by `hermes config set`.
- `HERMES_LOCAL_STT_LANGUAGE` is now only a fallback STT language hint, used when both the provider's own `language` and the global `stt.language` are empty; command backends may apply their own default (`en`).
- `HERMES_TELEGRAM_TEXT_BATCH_DELAY_SECONDS` is the grace window before flushing Telegram text over 1,024 characters (default `1.5`; shorter text keeps the adaptive 0.18/0.24-second fast paths).
- `AUXILIARY_WEB_EXTRACT_*`: `web_extract` no longer uses an auxiliary LLM (long pages are truncated deterministically). `HERMES_DESKTOP_DEV_SERVER` / `HERMES_DESKTOP_CDP_PORT` are set by `pnpm run dev` in v0.23 (was `npm run dev`); `HERMES_TUI_DIR` skips the first-launch `pnpm install`. `NOTION_API_KEY` is now listed under the Teams meeting pipeline's Notion sink, not a `notion` skill.
- Source: https://hermes-agent.nousresearch.com/docs/reference/environment-variables (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

Migration (v0.22 -> v0.23): the GitHub Copilot variables (`COPILOT_GITHUB_TOKEN`, `HERMES_COPILOT_ACP_COMMAND`, `COPILOT_CLI_PATH`, `HERMES_COPILOT_ACP_ARGS`, `COPILOT_ACP_BASE_URL`, `COPILOT_API_BASE_URL`) are no longer in the environment-variable reference; `GH_TOKEN` / `GITHUB_TOKEN` remain as GitHub tokens for Skills Hub, git credentials and update checks. The `CAMOFOX_*` variables are read only by the Camofox plugin, and `AGENT_BROWSER_*` are no longer read (copied into `browser.*` config on update). `HERMES_ACP_SKIP_CONFIGURED_MCP` is obsolete. `singularity` is now a plugin terminal backend.

## Related

- [Tools Reference](./tools-reference.md)
- [Toolsets Reference](./toolsets-reference.md)
- [MCP Config Reference](./mcp-config-reference.md)
