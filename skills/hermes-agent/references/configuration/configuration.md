# Configuration

Hermes agent configuration reference. Settings are stored in `~/.hermes/` and can be managed via the `hermes config` commands.

## Directory Structure

```
~/.hermes/
  config.yaml      # Main settings (model, terminal, TTS, compression)
  .env             # API keys and secrets
  auth.json        # OAuth provider credentials
  SOUL.md          # Primary agent identity
  memories/        # Persistent memory files
  skills/          # Agent-created skills
  cron/            # Scheduled jobs
  sessions/        # Gateway sessions
  logs/            # Error and gateway logs
```

## Configuration Management Commands

```bash
hermes config           # View current configuration
hermes config edit      # Open config.yaml in editor
hermes config set KEY VAL  # Set a specific value
hermes config check     # Verify configuration after updates
hermes config migrate   # Add missing options with defaults
```

## Configuration Precedence

Highest to lowest priority:

1. CLI arguments (per-invocation overrides)
2. `~/.hermes/config.yaml` (primary non-secret settings)
3. `~/.hermes/.env` (secrets and fallback env vars)
4. Built-in defaults

## Environment Variable Substitution

Reference environment variables in `config.yaml` using `${VAR_NAME}` syntax:

```yaml
auxiliary:
  vision:
    api_key: ${GOOGLE_API_KEY}
    base_url: ${CUSTOM_VISION_URL}
delegation:
  api_key: ${DELEGATION_KEY}
```

- Multiple references work in single values: `url: "${HOST}:${PORT}"`
- Undefined variables remain verbatim as `${UNDEFINED_VAR}`
- Only `${VAR}` syntax is supported — bare `$VAR` is not expanded

## Local OpenAI-Compatible Servers (vLLM, Ollama, llama.cpp)

Point `model.base_url` at the server and set `model.provider` to **`custom`**:

```bash
hermes config set model.provider custom
hermes config set model.base_url http://<host>:8000/v1
hermes config set model.default <served-model-name>
```

`vllm`, `ollama`, and `llamacpp` are documented as aliases of `custom`, but `hermes doctor` in v0.18.x reports them as unknown providers (`model.provider 'vllm' is unknown`). Inference still works; the check does not recognize them. Use the canonical `custom` to keep `doctor` clean. LM Studio is first-class — use `provider: lmstudio`.

Local servers commonly need no API key. Leave `.env` empty rather than inventing a placeholder key.

## Quieting a Chat Bot

Gateway platforms stream by progressively editing the message, and each edit can fire a notification. To make a bot post exactly one finished answer:

```bash
hermes --profile <name> config set display.tool_progress off
hermes --profile <name> config set display.interim_assistant_messages false
hermes --profile <name> config set display.cleanup_progress true
hermes --profile <name> config set display.long_running_notifications false
hermes --profile <name> config set display.background_process_notifications error
hermes --profile <name> config set streaming.enabled false
```

Trade-off: the reply lands later, but the edit-per-token notification storm is gone. These are per-profile, so a chat bot can be quiet while the CLI profile keeps streaming.

Note that `hermes config set display.tool_progress off` stores the boolean `false` rather than the string `"off"`. That is handled — the loader maps `False` to `"off"` — so the setting takes effect as written.

## Terminal Backend Configuration

### Local (default)

No isolation. Commands run directly on the host machine. No additional configuration required.

```yaml
terminal:
  backend: local
```

### Docker

Containerized execution with security hardening.

```yaml
terminal:
  backend: docker
  docker_image: "nousresearch/hermes-sandbox:desktop"
  docker_mount_cwd_to_workspace: false  # Mount launch dir to /workspace
  docker_forward_env:                   # Env vars to forward into container
    - "GITHUB_TOKEN"
  docker_volumes:                       # Host directory mounts
    - "/home/user/projects:/workspace/projects"
    - "/home/user/data:/data:ro"        # :ro for read-only
  container_cpu: 1                      # CPU cores (0 = unlimited)
  container_memory: 5120               # MB (0 = unlimited)
  container_disk: 51200                # MB (requires overlay2 on XFS+pquota)
  container_persistent: true           # true = persist /workspace + /root, shared container; false = fresh container per session
  docker_persist_across_processes: true   # Reuse container across Hermes restarts
  docker_shared_container_key: ""         # Opt in trusted profiles to one container identity
  docker_orphan_reaper: true              # Sweep abandoned Exited containers at startup
  docker_network: true                    # false = --network=none
  docker_extra_args: []                   # Extra flags appended verbatim to `docker run`
```

Security hardening applied automatically: `--cap-drop ALL` with only `DAC_OVERRIDE`, `CHOWN`, `FOWNER` re-added; `--security-opt no-new-privileges`; `--pids-limit 256`; sized tmpfs mounts.

Container lifecycle (v0.22.x docs): Hermes starts one long-lived container shared across processes and sessions, found again by label (`hermes-agent`, `hermes-task-id`, `hermes-profile`, `hermes-environment`). Default cleanup on exit is a no-op. The container is torn down only with `docker_persist_across_processes: false`, by the idle reaper (`lifetime_seconds`, default 300, non-persist envs only), by the orphan reaper (Exited hermes-labeled containers older than `2 × lifetime_seconds`, profile-scoped; running containers never touched), or by direct user action. `docker_shared_container_key` lets trusted profiles share one container; the profile that creates it fixes its image and mounts. Every `terminal:` key has a `TERMINAL_<KEY_UPPERCASE>` env override (e.g. `TERMINAL_DOCKER_PERSIST_ACROSS_PROCESSES`, `TERMINAL_DOCKER_SHARED_CONTAINER_KEY`, `TERMINAL_DOCKER_ORPHAN_REAPER`); `HERMES_DOCKER_BINARY=podman` forces Podman.

### SSH

Remote execution via SSH.

```yaml
terminal:
  backend: ssh
  persistent_shell: true  # default: true for SSH
```

Required environment variables:

```
TERMINAL_SSH_HOST=my-server.example.com
TERMINAL_SSH_USER=ubuntu
```

Optional:

```
TERMINAL_SSH_PORT=22                    # SSH port (default: 22)
TERMINAL_SSH_KEY=/path/to/private/key  # SSH private key path
TERMINAL_SSH_PERSISTENT=true            # Override persistent shell for SSH
```

Uses ControlMaster for connection reuse with 5-minute idle keepalive. Connects with `BatchMode=yes` and `StrictHostKeyChecking=accept-new`.

### Modal

Cloud sandbox execution.

```yaml
terminal:
  backend: modal
  modal_image: "nousresearch/hermes-sandbox:desktop"
  container_cpu: 1
  container_memory: 5120   # MB
  container_disk: 51200    # MB
  container_persistent: true  # Snapshot/restore filesystem
```

Required: `MODAL_TOKEN_ID` + `MODAL_TOKEN_SECRET`, or `~/.modal.toml`. When `container_persistent` is enabled, the sandbox filesystem is snapshotted on cleanup and restored on next session. Snapshots tracked in `~/.hermes/modal_snapshots.json`.

### Daytona

Managed workspace execution.

```yaml
terminal:
  backend: daytona
  daytona_image: "nousresearch/hermes-sandbox:desktop"
  container_cpu: 1
  container_memory: 5120   # MB, converted to GiB
  container_disk: 10240    # MB, max 10 GiB enforced
  container_persistent: true  # Stop/resume instead of delete
```

Required: `DAYTONA_API_KEY`. Sandboxes follow naming pattern `hermes-{task_id}`. Disk requests above 10 GiB are capped with a warning.

### Singularity / Apptainer

HPC-friendly containerization. In v0.23.1 it is the official `singularity` plugin (formerly built into core; `hermes update` installs it for profiles that already use it):

```bash
hermes plugins install singularity
```

```yaml
terminal:
  backend: singularity
  singularity_image: "docker://nousresearch/hermes-sandbox:desktop"
  container_cpu: 1
  container_memory: 5120   # MB
  container_persistent: true  # Writable overlay persists
```

Required: the `singularity` plugin and an `apptainer` or `singularity` binary in `$PATH`.

Scratch directory resolution order (v0.23.1):
1. `TERMINAL_SCRATCH_DIR`
2. `/scratch/$USER/hermes-agent` when `/scratch` is writable (HPC convention)
3. `TERMINAL_SANDBOX_DIR/singularity` (default `~/.hermes/sandboxes/singularity`)

Full namespace isolation with `--containall --no-home`.

### Sprites (plugin)

A [Sprite](https://fly.io/sprites) is a stateful cloud sandbox on Fly.io with checkpoint and restore, provided by the `sprites` plugin (NousResearch/hermes-plugin-sprites):

```bash
hermes plugins install NousResearch/hermes-plugin-sprites --enable
hermes config set terminal.backend sprites
```

```yaml
terminal:
  backend: sprites
  container_persistent: true       # Keep the Sprite between sessions (default)
```

Required: `SPRITES_TOKEN` in `~/.hermes/.env` (created in the organization's Sprites settings in the Fly.io dashboard; `sprite login` alone gives Hermes no token). A persistent Sprite is resumed by name (`hermes-{task_id}` on the default profile, `hermes-{profile}-{task_id}-{digest}` on named profiles); with `container_persistent: false` each run gets a uniquely named Sprite deleted on cleanup. Optional settings under `plugins.entries.sprites.settings`: `name_prefix`, `scope` (`session` or `instance`), `image`, `max_cpus`, `max_ram_gb`, `max_disk_gb`; an invalid value stops the backend from starting and `hermes doctor` names it. Gateway and WebUI sessions each get their own Sprite, `delegate_task` subagents share their parent's, and CLI / cron share the profile's default Sprite. Nothing is synced back to the host.

## Persistent Shell

```yaml
terminal:
  persistent_shell: true   # default: true for SSH, false for local
```

What persists across commands: working directory (`cd` sticks), exported env vars, shell variables.

Environment variable overrides (highest precedence):
- `TERMINAL_SSH_PERSISTENT` — controls SSH backend
- `TERMINAL_LOCAL_PERSISTENT` — enables for local backend

Commands requiring `stdin_data` or sudo automatically fall back to one-shot mode.

## Memory Configuration

```yaml
memory:
  memory_enabled: true        # Toggle memory persistence
  user_profile_enabled: true
  memory_char_limit: 2200     # ~800 tokens
  user_char_limit: 1375       # ~500 tokens
```

Persistent memory stored in `~/.hermes/memories/` (`MEMORY.md`, `USER.md`).

## File Read Safety

```yaml
file_read_max_chars: 100000  # default, ~25-35K tokens
```

Controls maximum characters returned per file read operation. Prevents large files (minified JS, data dumps) from flooding the context window. Agent deduplicates reads; counter resets on context compression.

## Git Worktree Isolation

```yaml
worktree: true   # Always create a worktree (same as hermes -w flag)
```

Each session creates a fresh worktree under `.worktrees/` with an isolated branch. Add a `.worktreeinclude` file in the repo root to list gitignored files that should be copied into each worktree.

## Context Compression

```yaml
compression:
  enabled: true
  threshold: 0.50                                    # Compress at 50% of context limit
  target_ratio: 0.20                                 # Preserve 20% as recent tail
  protect_last_n: 20                                 # Min recent messages to keep uncompressed
  summary_model: "google/gemini-3-flash-preview"
  summary_provider: "auto"                           # auto, openrouter, nous, codex, main, etc.
  summary_base_url: null                             # Custom OpenAI-compatible endpoint
  prepare_ahead: false                               # Opt-in (v0.23.1): prepare the next summary in the background near the trigger
```

`prepare_ahead` writes the next compaction summary in the background once the session is close to the trigger; if the summarized messages still match when compaction fires, the prepared summary is used (compaction waits for one still being written). It spends an auxiliary call that may go unused, does not apply to manual `/compress`, plugin context engines or native compaction, and switches itself off after the first compaction when a memory provider adds context to summaries.

| `summary_provider` | `summary_base_url` | Result |
|--------------------|--------------------|--------|
| `auto` (default)   | not set            | Auto-detect best provider |
| `nous`/`openrouter`| not set            | Force that provider |
| any                | set                | Use custom endpoint directly |

## Iteration Budget Pressure

```yaml
agent:
  max_turns: 90  # Max iterations per conversation turn
```

| Threshold | Level   | Injected Message |
|-----------|---------|-----------------|
| 70%       | Caution | `[BUDGET: 63/90. 27 iterations left. Start consolidating.]` |
| 90%       | Warning | `[BUDGET WARNING: 81/90. Only 9 left. Respond NOW.]` |

Warnings inject into the last tool result's JSON as `_budget_warning` to preserve prompt caching.

## Context Pressure Warnings

Automatic, no configuration required.

| Progress toward threshold | Level   | Behavior |
|---------------------------|---------|----------|
| ≥60%                      | Info    | Cyan progress bar (CLI); informational notice (gateway) |
| ≥85%                      | Warning | Bold yellow bar (CLI); warns compaction imminent (gateway) |

Does not modify the message stream or inject into model context.

## Credential Pool Strategies

```yaml
credential_pool_strategies:
  openrouter: round_robin   # cycle through keys evenly
  anthropic: least_used     # pick least-used key
```

| Strategy    | Behavior |
|-------------|----------|
| `fill_first` (default) | Use keys in order, move to next when depleted |
| `round_robin`          | Cycle through keys evenly |
| `least_used`           | Always pick the least-used key |
| `random`               | Random selection |

## Auxiliary Models

Universal config pattern for all auxiliary tasks:

```yaml
auxiliary:
  vision:          # Image analysis and browser screenshots
    provider: "auto"
    model: ""
    base_url: ""
    api_key: ""
    timeout: 30
    download_timeout: 30   # Image HTTP download timeout (vision only)

  web_extract:     # Web summarization and text extraction
    provider: "auto"
    model: ""
    base_url: ""
    api_key: ""
    timeout: 30

  approval:        # Dangerous command classifier (smart approvals)
    provider: "auto"
    model: ""
    base_url: ""
    api_key: ""
    timeout: 30

  compression:     # Context compression summarizer
    timeout: 120

  session_search:  # Summarizes past session matches
    provider: "auto"
    model: ""
    base_url: ""
    api_key: ""
    timeout: 30

  mcp:             # MCP tool dispatch
    provider: "auto"
    model: ""
    base_url: ""
    api_key: ""
    timeout: 30

  flush_memories:  # Conversation summarization for persistent memory
    provider: "auto"
    model: ""
    base_url: ""
    api_key: ""
    timeout: 30
```

Provider hierarchy: `base_url` (if set) overrides `provider`. `"auto"` selects best available. Supported providers: `auto`, `openrouter`, `nous`, `codex`, `anthropic`, `main`, `zai`, `kimi-coding`, `minimax` (v0.23.1 removes `copilot` / `copilot-acp` from the documented provider list), plus any named custom provider from the `providers:` dict. `fallback_chain` is available on any auxiliary task (`compression`, `vision`, `approval`, `mcp`, ...). Tasks the dashboard does not list are configured here; dashboard slots include `review` and voice chat (see configuring-models.md).

## Reasoning Effort

```yaml
agent:
  reasoning_effort: ""  # empty = medium (default)
```

Valid values: `xhigh`, `high`, `medium` (default), `low`, `minimal`, `none`.

Runtime overrides: `/reasoning high`, `/reasoning none`, `/reasoning show`, `/reasoning hide`.

## Tool-Use Enforcement

```yaml
agent:
  tool_use_enforcement: "auto"  # "auto" | true | false | ["model-substring", ...]
```

| Value | Behavior |
|-------|----------|
| `"auto"` | Enabled for GPT models, disabled for others |
| `true`   | Always enabled |
| `false`  | Always disabled |
| `["gpt-", "o1-"]` | Enabled for models matching any listed substring |

## TTS Configuration

```yaml
tts:
  provider: "edge"  # edge | elevenlabs | openai | neutts

  edge:
    voice: "en-US-AriaNeural"           # 322 voices, 74 languages

  elevenlabs:
    voice_id: "pNInz6obpgDQGcFmaJgB"
    model_id: "eleven_multilingual_v2"

  openai:
    model: "gpt-4o-mini-tts"
    voice: "alloy"                       # alloy, echo, fable, onyx, nova, shimmer
    base_url: "https://api.openai.com/v1"  # Override for compatible endpoints

  neutts:
    ref_audio: ''
    ref_text: ''
    model: "neuphonic/neutts-air-q4-gguf"
    device: cpu
```

Controls both the `text_to_speech` tool and spoken replies in voice mode.

## Display Settings

```yaml
display:
  tool_progress: all           # off | new | all | verbose
  tool_progress_command: false # Enable /verbose in gateway
  skin: default
  theme_mode: auto             # auto | light | dark
  streaming: false             # Stream tokens in real-time (CLI)
  show_reasoning: false        # Show model thinking tokens
  show_cost: false             # Show estimated $ cost
  bell_on_complete: false      # Terminal bell on task completion
```

## Privacy

```yaml
privacy:
  redact_pii: false  # Redact PII from LLM context
```

## STT Configuration

```yaml
stt:
  provider: "local"  # local | groq | openai
  local:
    model: "base"    # tiny, base, small, medium, large-v3
  openai:
    model: "whisper-1"  # whisper-1 | gpt-4o-mini-transcribe | gpt-4o-transcribe
  groq:
    # Uses GROQ_API_KEY automatically
```

Environment variable overrides:

```
STT_GROQ_MODEL=whisper-large-v3-turbo
STT_OPENAI_MODEL=whisper-1
GROQ_BASE_URL=https://api.groq.com/openai/v1
STT_OPENAI_BASE_URL=https://api.openai.com/v1
```

Fallback chain: `local` → `groq` → `openai` if requested provider is unavailable.

Language hint: the first nonempty of `stt.<provider>.language` -> `stt.language` -> `HERMES_LOCAL_STT_LANGUAGE` wins; a blank value means "continue to the next source", not "force auto-detection". The global default is `stt.language: "en"`, so a blank provider language still resolves to `en`. For auto-detection with local faster-whisper set both blank and remove any `HERMES_LOCAL_STT_LANGUAGE`:

```yaml
stt:
  provider: local
  language: ""
  local:
    language: ""
```

ElevenLabs also accepts `stt.elevenlabs.language_code`. Command backends fall back to `en` for the `{language}` placeholder when nothing resolves, so blank settings do not guarantee auto-detection on a Whisper CLI fallback.

## Voice Mode (CLI)

```yaml
voice:
  record_key: "ctrl+b"         # Push-to-talk key
  max_recording_seconds: 120   # Hard stop for long recordings
  auto_tts: false              # Enable spoken replies automatically with /voice on
  silence_threshold: 200       # RMS threshold for speech detection
  silence_duration: 3.0        # Seconds of silence before auto-stop
```

CLI commands: `/voice on` to enable microphone mode, press `record_key` to start/stop recording, `/voice tts` to toggle spoken replies.

## Streaming

### CLI

```yaml
display:
  streaming: true          # Stream tokens to terminal in real-time
  show_reasoning: true     # Also stream reasoning/thinking tokens
```

Responses appear token-by-token in a streaming box. Falls back automatically if provider lacks streaming support.

### Gateway (Telegram, Discord, Slack)

```yaml
streaming:
  enabled: true            # Enable progressive message editing
  transport: edit          # "edit" or "off"
  edit_interval: 0.3       # Seconds between message edits
  buffer_threshold: 40     # Characters before forcing edit flush
  cursor: " ▉"             # Cursor shown during streaming
```

Bot sends message on first token, progressively edits as tokens arrive. Platforms lacking edit support auto-detect and gracefully disable.

## Group Chat Session Isolation

```yaml
group_sessions_per_user: true  # true = per-user isolation; false = shared session
```

- `true` (default): Each sender gets their own session in Discord channels, Telegram groups, and Slack channels (when platform provides user ID). DMs always per-user. Threads isolated from parent channel.
- `false`: One shared conversation per chat room.

## Unauthorized DM Behavior

```yaml
unauthorized_dm_behavior: pair  # pair | ignore

# Platform-specific override:
whatsapp:
  unauthorized_dm_behavior: ignore
```

| Value | Behavior |
|-------|----------|
| `pair` (default) | Deny access, reply with one-time pairing code |
| `ignore`         | Silently drop unauthorized DMs |

## Quick Commands

Define zero-argument shell commands invocable without consuming tokens:

```yaml
quick_commands:
  status:
    type: exec
    command: systemctl status hermes-agent
  disk:
    type: exec
    command: df -h /
```

30-second timeout — long-running commands are killed with an error message. Quick commands are checked before skill commands, so you can override skill names.

## Human Delay

```yaml
human_delay:
  mode: "off"        # off | natural | custom
  min_ms: 800        # Minimum delay in ms (custom mode)
  max_ms: 2500       # Maximum delay in ms (custom mode)
```

Simulates human-like response pacing in messaging platforms. `natural` uses preset ranges; `custom` allows explicit min/max milliseconds.

## Code Execution

```yaml
code_execution:
  timeout: 300          # Max execution time in seconds
  max_tool_calls: 50    # Max tool calls within code execution
```

## Web Search Backends

```yaml
web:
  backend: firecrawl  # firecrawl | parallel | tavily | exa
```

| Backend     | Env Var              | Search | Extract | Crawl |
|-------------|----------------------|--------|---------|-------|
| `firecrawl` | `FIRECRAWL_API_KEY`  | yes    | yes     | yes   |
| `parallel`  | `PARALLEL_API_KEY`   | yes    | yes     | —     |
| `tavily`    | `TAVILY_API_KEY`     | yes    | yes     | yes   |
| `exa`       | `EXA_API_KEY`        | yes    | yes     | —     |

Backend is auto-detected from available API keys. Additional options:
- `FIRECRAWL_API_URL` — self-hosted Firecrawl instance URL
- `PARALLEL_SEARCH_MODE` — `fast`, `one-shot`, or `agentic`

## Browser

Every browser key lives under `browser:` (v0.23.1; see the Browser feature page for browser sources):

```yaml
browser:
  inactivity_timeout: 120        # Seconds before an idle browser is closed
  command_timeout: 30            # Chromium launch timeout floor (seconds)
  headed: false                  # true = visible Chromium window (local); keeps the browser open between turns
  engine: auto                   # auto (Chromium) | lightpanda ("chrome" is accepted as auto)
  # Local Chromium launched by Hermes
  executable_path: ""            # Chromium binary override; "" = the packaged Chromium
  user_data_dir: ""              # Persistent profile shared by every session; "" = fresh profile per session
  chromium_args: []              # Extra Chromium command-line flags, e.g. ["--lang=de-DE"]
  # Cloud browser selection (written by `hermes tools` -> Browser Automation)
  cloud_provider: local          # local | browserbase | browser-use | firecrawl | nous | <provider plugin>; unset = autodetect from credentials
  auto_local_for_private_urls: true  # With a cloud provider, open LAN/localhost URLs in a local Chromium
                                     # (ignores allow_private_urls; false = refuse them instead)
  allow_private_urls: false      # Legacy alias of security.allow_private_urls (guards cloud/CDP browsers, not the local Chromium)
  # Optional CDP override — when set, the browser tools attach to your own
  # Chromium-family browser (as /browser connect does) instead of launching one.
  cdp_url: ""
  use_real_profile: false        # Browse on a managed copy of your real browser profile (opt-in)
  # Dialog supervisor — how native JS dialogs (alert / confirm / prompt / beforeunload) are handled
  dialog_policy: must_respond    # must_respond | auto_dismiss | auto_accept
  dialog_timeout_s: 300          # Safety auto-dismiss under must_respond (seconds)
```

Executable resolution: `browser.executable_path` -> the Chromium installed by `hermes pm install chromium` -> `/etc/hermes/chromium-executable-path` (official Docker image) -> a system `chromium` / `chromium-browser` on `PATH`. There is no browser config switch to turn browsing off: disable the `browser` toolset with `hermes tools` (or `hermes tools disable browser [--platform NAME]`). Dialog policies: `must_respond` (default, waits for `browser_dialog(action=...)`, auto-dismissed after `dialog_timeout_s`), `auto_dismiss`, `auto_accept`.

## Timezone

```yaml
timezone: "America/New_York"  # IANA timezone (default: "" = server-local)
```

Affects timestamps in logs, cron scheduling, and system prompt time injection. Accepts any IANA timezone identifier.

## Discord

```yaml
discord:
  require_mention: true           # Require @mention in server channels
  free_response_channels: ""      # Comma-separated channel IDs (no mention required)
  auto_thread: true               # Auto-create threads on @mention
```

DMs always work without a mention. Free-response channels bypass the mention requirement.

## Security

```yaml
security:
  redact_secrets: true           # Redact API key patterns in tool output and logs
  website_blocklist:
    enabled: false
    domains: []                  # Exact or wildcard domain rules
    shared_files: []             # Paths to files with one rule per line
```

Blocklist supports: exact domains (`admin.example.com`), wildcard subdomains (`*.internal.company.com`), TLD wildcards (`*.local`). Policy cached for 30 seconds.

Removed in v0.22.0: the `security.tirith_*` keys (`tirith_enabled`, `tirith_path`, `tirith_timeout`, `tirith_fail_open`) for the bundled command scanner. Upgrading drops those keys; content-level command checks are described in the Security page.

## Prompt Caching

Cross-session prompt caching is automatic when the provider supports it (Claude on native Anthropic, OpenRouter, and Nous Portal get `cache_control` breakpoints with the 1-hour TTL by default; Qwen Cloud caps at 5 minutes). The one explicit knob:

```yaml
prompt_caching:
  cache_ttl: "5m"   # "5m", "1h" (Anthropic-supported tiers) or "auto"; other values are ignored
```

`"auto"` picks `1h` for human-paced sessions (CLI, TUI, Desktop, messaging platforms) and `5m` for machine-paced ones (subagents, cron, `hermes -q` one-shots, webhooks, Kanban workers, API server, batch runs). The 1h tier writes at 2x the base input price (5m at 1.25x). Delegated subagents are always clamped to `5m`.

## Sessions: auto-prune and reset

```yaml
sessions:
  auto_prune: true       # default false in v0.23.1 (opt in); true deletes ended sessions past retention_days
  retention_days: 90     # whole number >= 0
```

- With `auto_prune: true`, ended sessions inactive for `retention_days` (default 90) are pruned at CLI / gateway / cron startup; pinned and open sessions are never touched. While `config.yaml` has no `sessions.auto_prune` key, a low-disk prompt (`/autoprune on|off|later`) asks once (see sessions.md). A negative or missing `retention_days` skips the sweep with a warning.
- Retired in v0.22.0: `session_reset` idle / daily modes. Core ignores legacy `session_reset` settings, reset-policy overrides, and reset-timer environment variables (a config that still sets them logs a warning); `/new` or `/reset` starts a fresh session explicitly. To keep time-based resets, install the catalog plugin that reads the same block: `hermes plugins install hermes-session-reset-policy`.
- One multiplexed messaging gateway and desktop backend per machine serves all profiles by default; `hermes update` folds existing per-profile gateways into it when nothing conflicts.

## Smart Approvals

```yaml
approvals:
  mode: manual  # manual | smart | off
```

| Mode     | Behavior |
|----------|----------|
| `manual` (default) | Prompt user before executing flagged commands |
| `smart`  | Use auxiliary LLM to assess danger; auto-approve low-risk, escalate high-risk |
| `off`    | Skip all checks (equivalent to `HERMES_YOLO_MODE=true`) |

## Checkpoints

```yaml
checkpoints:
  enabled: true         # Enable automatic checkpoints
  max_snapshots: 50     # Max checkpoints per directory
```

Automatic filesystem snapshots before destructive file operations.

## Delegation

```yaml
delegation:
  backend: default   # "default" = the keys below, or a plugin strategy (model_map, profile_routes, ...); settings under delegation.backends.<name>
  model: ""       # Override model for subagents (empty = inherit parent)
  provider: ""    # Override provider (empty = inherit parent)
  base_url: ""    # Direct OpenAI-compatible endpoint (highest precedence)
  api_key: ""     # API key for base_url (falls back to OPENAI_API_KEY)
  prefix_stagger_seconds: 0   # Prompt-cache warm-up for batches; N (max 60) only caps the wait for the first child's first streamed response; 0 = off
  gateway_mode: auto          # Gateway sessions: auto | inline | background
```

Precedence: `delegation.base_url` → `delegation.provider` → parent provider. Setting only `model` changes the model within the same provider credentials. A strategy backend whose plugin is missing or disabled fails closed: `delegate_task` returns a tool error naming it and the fix (`/delegation default`, or `hermes config set delegation.backend default`). One-shot runs (`hermes chat -q` / `--oneshot`) also run without the `clarify` tool and with a `delegate_task` schema that omits `action` / `subagent_id` / `message`; `skill_manage` stays available there (v0.22.2 docs said it was not offered).

## Clarify

```yaml
agent:
  clarify_timeout: 90   # Seconds to wait for user clarification response (0 or less = unlimited)
```

Controls how long Hermes waits for clarification when ambiguity requires user input. Canonical key is `agent.clarify_timeout` (v0.23.1 default `90`; v0.22.2 docs said `3600`); a legacy top-level `clarify.timeout` is still honored if set. On timeout the agent continues with `"outcome": "timed_out"`; on a messaging platform, sending any other message instead of an answer cancels the question at once.

## Context Files (SOUL.md, AGENTS.md)

| File | Purpose | Scope |
|------|---------|-------|
| `SOUL.md` | Primary agent identity (slot #1 system prompt) | `~/.hermes/` or `$HERMES_HOME/` |
| `.hermes.md` / `HERMES.md` | Project-specific instructions (highest priority) | Walks to git root |
| `AGENTS.md` | Project-specific conventions (hierarchical) | Recursive directory walk |
| `CLAUDE.md` | Claude context files | Working directory only |
| `.cursorrules` | Cursor IDE rules | Working directory only |
| `.cursor/rules/*.mdc` | Cursor rule files | Working directory only |

Priority (first match wins): `.hermes.md` → `AGENTS.md` → `CLAUDE.md` → `.cursorrules`. SOUL.md always loads independently. AGENTS.md is hierarchical — subdirectory files are combined. All context files capped at 20,000 characters with smart truncation.

## Working Directory

```
MESSAGING_CWD=/home/myuser/projects   # Gateway sessions
TERMINAL_CWD=/workspace               # All terminal sessions
```

Defaults:
- CLI: directory where the command runs
- Messaging gateway: home directory `~`
- Docker / Singularity / Modal / SSH: user's home inside container/remote

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/user-guide/configuration (pinned to v0.23.1)
- This page is a condensed digest; the v0.23.1 source is much larger. Only the changes from v0.22.2 are folded in above and below.

### Webapp

The gateway can serve the Desktop workspace in a browser on its own listener (see desktop.md). Off until enabled; restart the gateway after changing (`hermes gateway restart`).

```yaml
webapp:
  enabled: false     # true: the gateway serves the Webapp
  host: 127.0.0.1    # 127.0.0.1, ::1 or localhost; or 0.0.0.0 / :: for other machines (dashboard sign-in required)
  port: 9120         # fixed, so the browser's address stays the same across gateway restarts
  public_url: ""     # the https:// address a reverse proxy or tunnel serves the Webapp at (sign-in required)
```

- `host`: `0.0.0.0` / `::` require a dashboard sign-in provider (without one the gateway serves native clients only and `hermes webapp --status` says why); any other value, another loopback address such as `127.0.0.2` included, keeps the Webapp off. In a container use `0.0.0.0`.
- `port`: a standalone profile's gateway needs a port other than the default gateway's; Settings -> Web Access -> Start picks the first free port above 9120 no other profile uses and saves it, never replacing a port you set.
- `public_url`: must be an `http://` or `https://` address with no credentials, query or fragment, else the Webapp stays off; turns on sign-in even on a loopback host. `dashboard.public_url` never applies to the Webapp, but `dashboard.trusted_proxies` does (the Webapp takes `X-Forwarded-*` only from loopback and listed addresses; `*` and `/0` networks are rejected).
- Native clients (CLI, TUI, Desktop) never sign in to the gateway's own listener.

### Gateway restart drain

```yaml
agent:
  restart_drain_timeout: 0          # default: interrupt in-flight chat turns at once
  cron_drain_timeout: 30            # floor for cron jobs and api_server (/v1) runs
  restart_after_turn_timeout: 1800  # /restart and `gateway restart`: wait for turns BEFORE stopping
```

With `0` a restart interrupts a running turn immediately (it settles as interrupted, is never rerun; queued messages behind it run in order on the new gateway). `HERMES_RESTART_DRAIN_TIMEOUT` overrides the config value. The generated systemd unit sizes `TimeoutStopSec` from this value (the larger of `restart_drain_timeout` and `cron_drain_timeout` + 10 s, plus 30 s headroom, at least 60 s): after raising `restart_drain_timeout`, re-run `hermes gateway install`, otherwise systemd SIGKILLs the gateway mid-drain. launchd caps its stop timeout at 60 s.

### Native hosted-room discussion limits

```yaml
hosted_rooms:
  discussion:
    max_rounds: 3      # Default maximum scheduling rounds per discussion
    max_messages: 10   # Default total visible bot replies across all members
```

Positive integers only; an invalid value is ignored with a gateway-log warning and the defaults apply. Set in the `config.yaml` of the root Hermes home that holds the room store (beside `shared-state.db`), read once at startup (restart every process sharing the store). Reaching a ceiling pauses the discussion; **Continue** (`groups.continue`) grants one more budget, at most 5 times. Rooms with `routing: auto` make one short JSON model call per unaddressed message via `auxiliary.group_router` (default timeout 20 s).

### Other v0.23 changes

- `runtime.malloc_arena_max: 4` (Linux glibc): the gateway, `hermes serve` and `hermes dashboard` cap malloc arenas at startup; an explicit `MALLOC_ARENA_MAX` or `GLIBC_TUNABLES=glibc.malloc.arena_max=...` takes precedence; `0`, `false` or `null` keeps glibc's default; other platforms ignore it.
- `terminal.client_env_passthrough: []`: extra non-secret toolchain names (e.g. `GEM_HOME`) a local CLI/TUI session's tools take from the launching shell. The terminal backend list is six built-in backends (`local`, `docker`, `ssh`, `modal`, `daytona`, `vercel_sandbox`) plus plugin backends (`singularity`, `sprites`).
- Docker backend: with `container_persistent: true` and `docker_mount_cwd_to_workspace: false` (the defaults), sessions in the same profile share its original sandbox, and Desktop working-directory selection creates no separate workspace sandbox; with mounting on, containers are keyed by profile and selected workspace. A named profile's gateway, Desktop, cron and Kanban all use the profile's one sandbox (`profile_<name>-*` under `TERMINAL_SANDBOX_DIR/docker`); older `*_ws_*` and per-profile `default` sandbox directories are kept but unused. On Linux, removing a root container first hands its own sandbox bind-mount files (`/root`, `/workspace`) back to your user and strips setuid/setgid bits and file capabilities there.
- Scratch directory pruning runs in a background process after startup, ignores hardlinked files when judging idleness, never stops processes Hermes tracks (or the shell that started it), logs to `~/.hermes/logs/scratch-prune.log`, and skips (once, with the removal command logged) entries holding files your user cannot delete.
- `hermes update` auto-stashes dirty tracked files plus untracked files at paths the update adds; interactive updates ask whether to keep changes before stashing (answering no deletes them); only WhatsApp bridge and Photon sidecar `package-lock.json` diffs are auto-restored.
- Provider timeouts on AWS Bedrock: the resolved request timeout is the socket read timeout of the boto3 Converse client and the AnthropicBedrock client (connect timeout fixed at botocore's 60 s on Converse, 10 s on AnthropicBedrock; unset keeps a 60 s read on Converse, 900 s on AnthropicBedrock). `agent.stream_max_lifetime` (seconds, default `0` = off) is an opt-in cap on one streaming response's total wall-clock time for Chat Completions and Anthropic Messages streams (not Codex/Responses or Bedrock).
- `agent.daybreak: false`: on `openai-codex`, `true` requests OpenAI Daybreak (Trusted Access for Cyber) `access_programs.cyber: daybreak_blue` only when the account and model are listed in the Codex catalog; only your own CLI/TUI/Desktop chat turns use it, not messaging, rooms, A2A, ACP, cron or subagents. Desktop shows a **Daybreak** switch next to **Fast** on listed models.
- `vision.replay_recent_images` (default `3`, `0` = off) re-sends the newest user images on turns rebuilt from the session database. A local `hermes chat` / TUI session served by the gateway resolves `${VAR}` references, `provider_routing` and `prefill_messages_file` when the gateway creates the session. A spill file in `$HERMES_HOME/cache/spillover/` is kept while any session transcript points at it.
- Tool disabling by toolset is per tool: a listed toolset (e.g. `search`) also removes its tools from an enabled toolset sharing them (`web_search` from `web`); `hermes tools list` and `hermes doctor` flag the loss.
- Copilot is no longer named in the v0.23.1 docs for the provider setup pointer, auxiliary provider list, delegation provider list or the fast-mode "never receive" list; the page does not say why. The `same_tool_failure` warn-only tool list names `browser_exec` instead of `browser_navigate`.

### Migration (v0.22 -> v0.23)

- Migration (v0.22 -> v0.23): `browser.backend` is removed (`browser_exec` is the only browser path). `backend: off` becomes a notice to disable the `browser` toolset; other values are removed with a note (`camofox` -> the Camofox plugin, `local` -> the packaged Chromium, a cloud name -> `browser.cloud_provider`). `snapshot_threshold`, `record_sessions`, `allow_unsafe_evaluate` and `restrict_evaluate` no longer have any effect; `browser.camofox.*` is read by the Camofox plugin (`hermes plugins install camofox`). `AGENT_BROWSER_*` environment variables are no longer read; on update their values are copied from `.env` into unset keys (`AGENT_BROWSER_EXECUTABLE_PATH` -> `executable_path`, `AGENT_BROWSER_PROFILE` -> `user_data_dir`, `AGENT_BROWSER_ARGS` -> `chromium_args`, `AGENT_BROWSER_HEADED` -> `headed`, `AGENT_BROWSER_ENGINE` -> `engine`; a relative profile path is written as an absolute path with a notice).
- Migration (v0.22 -> v0.23): the `auxiliary.skills_hub` block is removed from the documented auxiliary config (and from the `fallback_chain` task list); Singularity/Apptainer moved from core to the `singularity` plugin and `terminal.singularity_image` is no longer in the documented `terminal:` block; `sessions.auto_prune` default flipped to `false`; `agent.clarify_timeout` default is `90`.
- Migration (v0.22 -> v0.23): STT language resolution is documented as "first nonempty string wins" (blank no longer means force auto-detect); v0.22.2 described `stt.language: ""` as restoring auto-detection.

## Related

- [Security](../security/security.md)
- [Tools & Toolsets](../features/tools.md)
- [Voice Mode](../features/voice-mode.md)
- [MCP](../features/mcp.md)
- [Memory](../features/memory.md)
- [CLI Commands](../cli/commands.md)
