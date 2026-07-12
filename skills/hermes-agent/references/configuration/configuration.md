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
  docker_image: "nikolaik/python-nodejs:python3.11-nodejs20"
  docker_mount_cwd_to_workspace: false  # Mount launch dir to /workspace
  docker_forward_env:                   # Env vars to forward into container
    - "GITHUB_TOKEN"
  docker_volumes:                       # Host directory mounts
    - "/home/user/projects:/workspace/projects"
    - "/home/user/data:/data:ro"        # :ro for read-only
  container_cpu: 1                      # CPU cores (0 = unlimited)
  container_memory: 5120               # MB (0 = unlimited)
  container_disk: 51200                # MB (requires overlay2 on XFS+pquota)
  container_persistent: true           # Persist /workspace and /root across sessions
```

Security hardening applied automatically: `--cap-drop ALL` with only `DAC_OVERRIDE`, `CHOWN`, `FOWNER` re-added; `--security-opt no-new-privileges`; `--pids-limit 256`; sized tmpfs mounts.

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
  modal_image: "nikolaik/python-nodejs:python3.11-nodejs20"
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
  daytona_image: "nikolaik/python-nodejs:python3.11-nodejs20"
  container_cpu: 1
  container_memory: 5120   # MB, converted to GiB
  container_disk: 10240    # MB, max 10 GiB enforced
  container_persistent: true  # Stop/resume instead of delete
```

Required: `DAYTONA_API_KEY`. Sandboxes follow naming pattern `hermes-{task_id}`. Disk requests above 10 GiB are capped with a warning.

### Singularity / Apptainer

HPC-friendly containerization.

```yaml
terminal:
  backend: singularity
  singularity_image: "docker://nikolaik/python-nodejs:python3.11-nodejs20"
  container_cpu: 1
  container_memory: 5120   # MB
  container_persistent: true  # Writable overlay persists
```

Required: `apptainer` or `singularity` binary in `$PATH`.

Scratch directory resolution order:
1. `TERMINAL_SCRATCH_DIR`
2. `TERMINAL_SANDBOX_DIR/singularity`
3. `/scratch/$USER/hermes-agent`
4. `~/.hermes/sandboxes/singularity`

Full namespace isolation with `--containall --no-home`.

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
```

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

  skills_hub:      # Skill matching and search
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

Provider hierarchy: `base_url` (if set) overrides `provider`. `"auto"` selects best available. Supported providers: `auto`, `openrouter`, `nous`, `codex`, `copilot`, `anthropic`, `main`, `zai`, `kimi-coding`, `minimax`.

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

```yaml
browser:
  inactivity_timeout: 120     # Seconds before browser context closes
  command_timeout: 30         # Seconds per browser command
  record_sessions: false      # Auto-record sessions as WebM
  camofox:
    managed_persistence: false
```

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
  tirith_enabled: true           # Enable Tirith command scanning
  tirith_path: "tirith"          # Path to tirith binary (default: "tirith" in $PATH)
  tirith_timeout: 5              # Seconds to wait before timing out
  tirith_fail_open: true         # Allow execution if tirith is unavailable
  website_blocklist:
    enabled: false
    domains: []                  # Exact or wildcard domain rules
    shared_files: []             # Paths to files with one rule per line
```

Blocklist supports: exact domains (`admin.example.com`), wildcard subdomains (`*.internal.company.com`), TLD wildcards (`*.local`). Policy cached for 30 seconds.

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
  model: ""       # Override model for subagents (empty = inherit parent)
  provider: ""    # Override provider (empty = inherit parent)
  base_url: ""    # Direct OpenAI-compatible endpoint (highest precedence)
  api_key: ""     # API key for base_url (falls back to OPENAI_API_KEY)
```

Precedence: `delegation.base_url` → `delegation.provider` → parent provider. Setting only `model` changes the model within the same provider credentials.

## Clarify

```yaml
clarify:
  timeout: 120  # Seconds to wait for user clarification response
```

Controls how long Hermes waits for clarification when ambiguity requires user input.

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

## Related

- [Security](../security/security.md)
- [Tools & Toolsets](../features/tools.md)
- [Voice Mode](../features/voice-mode.md)
- [MCP](../features/mcp.md)
- [Memory](../features/memory.md)
- [CLI Commands](../cli/commands.md)
