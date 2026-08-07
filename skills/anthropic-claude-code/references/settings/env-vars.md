<!-- source: https://code.claude.com/docs/en/env-vars.md / last verified: 2026-08-07 -->

# Environment variables

Reference for environment variables that control Claude Code behavior: model selection, authentication, request routing, and feature toggles. Many behaviors are also configurable via a settings file field, a CLI flag, or an in-session command like `/model`.

## Set environment variables

**In your shell**: lasts for that terminal session.

```bash
export API_TIMEOUT_MS="1200000"
claude
```

**In a settings file**: applies every time `claude` runs, under the `env` key.

```json ~/.claude/settings.json
{
  "env": {
    "API_TIMEOUT_MS": "1200000",
    "BASH_DEFAULT_TIMEOUT_MS": "300000"
  }
}
```

| File | Applies to |
| --- | --- |
| `~/.claude/settings.json` | You, in every project |
| `.claude/settings.json` | Everyone in the project, checked into source control |
| `.claude/settings.local.json` | You, in this project only (gitignored) |
| Managed settings | Everyone in your organization |

A running session applies new/changed `env` values on file save; a feature that reads its variables once at startup (e.g. OpenTelemetry monitoring) keeps its startup values until relaunch. Removing a variable from the file doesn't unset it in a running session.

## Precedence

When a behavior has both an env var and a settings key, **the environment variable takes precedence** (e.g. `ANTHROPIC_MODEL` overrides `model`; `CLAUDE_CODE_AUTO_CONNECT_IDE` overrides `autoConnectIde`). When the same variable is set in both your shell and a settings file `env` block, **the settings file value applies** (Claude Code writes it into the process environment, replacing the shell-inherited value). To force-unset a variable you can't remove from your shell profile, set it to `""` in the `env` block — Claude Code treats an empty value as unset for provider selection (subprocesses still inherit the empty value). Between settings files, `env` follows normal settings precedence (managed > local > project > user).

Numeric variables (timeouts, token budgets, retry counts) accept scientific notation and digit separators (`2e3` = 2000, `64_000` = 64000), except where noted as plain-digits-only. For on/off variables, `1`/`true` = on, `0`/`false` = off (any casing), **except** these which read only "is it set at all" (any non-empty value including `0` turns it on; unset or empty turns it off): `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, `DISABLE_TELEMETRY`, `DISABLE_ERROR_REPORTING`, `CLAUDE_CODE_TMUX_TRUECOLOR`, `FALLBACK_FOR_ALL_PRIMARY_MODELS`, `IS_DEMO`. `FORCE_HYPERLINK` reads a number; only `0` turns it off.

## Variables

Alphabetical reference of every environment variable.

| Variable | Purpose |
| --- | --- |
| `ANTHROPIC_API_KEY` | API key sent as `X-Api-Key`. Overrides a Pro/Max/Team/Enterprise subscription when set. In `-p` mode always used; interactive mode prompts to approve once. `unset ANTHROPIC_API_KEY` to use subscription instead |
| `ANTHROPIC_AUTH_TOKEN` | Custom `Authorization` header value (prefixed with `Bearer `) |
| `ANTHROPIC_AWS_API_KEY` | Workspace API key for Claude Platform on AWS; sent as `x-api-key`, takes precedence over AWS SigV4 |
| `ANTHROPIC_AWS_BASE_URL` | Override Claude Platform on AWS endpoint URL |
| `ANTHROPIC_AWS_WORKSPACE_ID` | Required for Claude Platform on AWS; sent as `anthropic-workspace-id` header |
| `ANTHROPIC_BASE_URL` | Override the API endpoint (proxy/gateway). Non-first-party host disables MCP tool search by default (`ENABLE_TOOL_SEARCH=true` to re-enable if the proxy forwards `tool_reference`). Disables Remote Control when not `api.anthropic.com` |
| `ANTHROPIC_BEDROCK_BASE_URL` | Override Amazon Bedrock endpoint URL |
| `ANTHROPIC_BEDROCK_MANTLE_BASE_URL` | Override Amazon Bedrock Mantle endpoint URL |
| `ANTHROPIC_BEDROCK_SERVICE_TIER` | Amazon Bedrock service tier (`default`, `flex`, `priority`); sent as `X-Amzn-Bedrock-Service-Tier` |
| `ANTHROPIC_BETAS` | Comma-separated `anthropic-beta` header values, works with all auth methods |
| `ANTHROPIC_CUSTOM_HEADERS` | Custom headers, `Name: Value` newline-separated |
| `ANTHROPIC_CUSTOM_MODEL_OPTION` | Model ID added as a custom entry in the `/model` picker |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION` | Description for the custom model entry (default `Custom model (<model-id>)`) |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_NAME` | Display name for the custom model entry (default: the model ID) |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES` | Comma-separated capabilities the custom model supports, e.g. `effort,thinking` |
| `ANTHROPIC_DEFAULT_FABLE_MODEL` | Model ID for the `fable` alias and Fable-5 recognition for automatic fallback on third-party providers |
| `ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION` / `_NAME` / `_SUPPORTED_CAPABILITIES` | Pinned Fable model display/capability overrides |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Model ID for the `haiku` alias and background functionality |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION` / `_NAME` / `_SUPPORTED_CAPABILITIES` | Pinned Haiku model display/capability overrides |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Model ID for the `opus` alias and plan-mode phase of `opusplan` |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION` / `_NAME` / `_SUPPORTED_CAPABILITIES` | Pinned Opus model display/capability overrides |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Model ID for the `sonnet` alias and execution phase of `opusplan` |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION` / `_NAME` / `_SUPPORTED_CAPABILITIES` | Pinned Sonnet model display/capability overrides |
| `ANTHROPIC_FOUNDRY_API_KEY` | API key for Microsoft Foundry |
| `ANTHROPIC_FOUNDRY_AUTH_TOKEN` | Bearer token for Microsoft Foundry, e.g. Entra access token; takes precedence over `ANTHROPIC_FOUNDRY_API_KEY` and the Azure default credential chain |
| `ANTHROPIC_FOUNDRY_BASE_URL` | Full base URL for the Microsoft Foundry resource |
| `ANTHROPIC_FOUNDRY_RESOURCE` | Microsoft Foundry resource name (required if `ANTHROPIC_FOUNDRY_BASE_URL` unset) |
| `ANTHROPIC_MODEL` | Model setting name (see model-config.md) |
| `ANTHROPIC_SMALL_FAST_MODEL` | Deprecated; use `ANTHROPIC_DEFAULT_HAIKU_MODEL` |
| `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION` | Override AWS region for the Haiku-class model on Amazon Bedrock/Mantle |
| `ANTHROPIC_VERTEX_BASE_URL` | Override Google Cloud's Agent Platform endpoint URL |
| `ANTHROPIC_VERTEX_PROJECT_ID` | GCP project ID for Google Cloud's Agent Platform; overridden by `GCLOUD_PROJECT`/`GOOGLE_CLOUD_PROJECT`/credential file project |
| `ANTHROPIC_WORKSPACE_ID` | Workspace ID for workload identity federation, when the federation rule spans multiple workspaces |
| `API_FORCE_IDLE_TIMEOUT` | Override the 5-minute streaming body idle timeout; `0` disables it, `1` forces it on for every provider |
| `API_TIMEOUT_MS` | API request timeout in ms (default 600000/10 min; max 2147483647) |
| `AWS_BEARER_TOKEN_BEDROCK` | Amazon Bedrock API key |
| `BASH_DEFAULT_TIMEOUT_MS` | Default long-running Bash command timeout (default 120000/2 min) |
| `BASH_MAX_OUTPUT_LENGTH` | Max characters of Bash output read back (default 30000; max 150000) |
| `BASH_MAX_TIMEOUT_MS` | Max timeout the model can set for Bash commands (default 600000/10 min); ceiling is the larger of this and `BASH_DEFAULT_TIMEOUT_MS` |
| `CCR_FORCE_BUNDLE` | `1` forces `claude --cloud` to bundle/upload the local repo even when GitHub access is available |
| `CLAUDECODE` | `1` in subprocesses Claude Code spawns (Bash/PowerShell tools, tmux, hooks, status line, stdio MCP subprocesses); IDE extensions also set it |
| `CLAUDE_AFK_COUNTDOWN_MS` | On-screen countdown before an unanswered `AskUserQuestion` auto-continues (default 20000) |
| `CLAUDE_AFK_TIMEOUT_MS` | Idle ms before an unanswered `AskUserQuestion` auto-continues; overrides the `askUserQuestionTimeout` setting when set |
| `CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS` | `1` disables built-in subagent types (Explore, Plan) in non-interactive (`-p`) mode |
| `CLAUDE_AGENT_SDK_MCP_NO_PREFIX` | `1` skips the `mcp__<server>__` prefix on SDK-created MCP server tool names |
| `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS` | Stall timeout for background subagents (default 600000/10 min); resets on each streaming progress event |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | Percentage (1-100) of the auto-compact window that triggers compaction; can only lower, not raise, the default |
| `CLAUDE_AUTO_BACKGROUND_TASKS` | `1` force-enables auto-backgrounding of long-running agent tasks (~2 min) and long MCP tool calls in non-interactive mode |
| `CLAUDE_AX_SCREEN_READER` | `1` enables screen-reader flat-text output; `0` forces it off even if the `axScreenReader` setting is `true` |
| `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` | Return to the original working directory after each Bash/PowerShell command in the main session |
| `CLAUDE_BYTE_STREAM_IDLE_TIMEOUT_MS` | Timeout for the byte-level streaming idle watchdog only (clamped 10s-30min) |
| `CLAUDE_CLIENT_PRESENCE_FILE` | Path to a file an external tool creates on unlock/deletes on lock; while present, skips Remote Control mobile push notifications |
| `CLAUDE_CODE_ACCESSIBILITY` | `1` keeps the native terminal cursor visible (disables inverted-text cursor) for screen magnifiers |
| `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` | `1` loads memory files (`CLAUDE.md`, `.claude/CLAUDE.md`, `.claude/rules/*.md`, `CLAUDE.local.md`) from `--add-dir` directories |
| `CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT` | `1` repaints the full screen every frame in fullscreen rendering instead of incremental updates |
| `CLAUDE_CODE_ALWAYS_ENABLE_EFFORT` | `1` sends the effort parameter on every request, even for unrecognized model IDs (except models known to reject it) |
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | Interval (ms) to refresh credentials via `apiKeyHelper` |
| `CLAUDE_CODE_ARTIFACT_AUTO_OPEN` | `0` stops auto-opening the browser when a new artifact is published |
| `CLAUDE_CODE_ATTRIBUTION_HEADER` | `0` omits the attribution block (client version + prompt fingerprint) from the system prompt start |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW` | Auto-compact window in tokens (100000-1000000), plain integer only; takes precedence over `/autocompact`, `--autocompact`, and the `autoCompactWindow` setting |
| `CLAUDE_CODE_AUTO_CONNECT_IDE` | Override automatic IDE connection (`false`/`true`); takes precedence over the `autoConnectIde` setting |
| `CLAUDE_CODE_AWS_CHAIN_RESOLVE_TIMEOUT_MS` | Wait time for the AWS default credential provider chain (default 60000) |
| `CLAUDE_CODE_BRIDGE_SESSION_ID` | Set automatically in Bash/hook subprocesses while a Remote Control connection is active; the session's `session_` ID |
| `CLAUDE_CODE_CERT_STORE` | Comma-separated CA sources for TLS: `bundled` (Mozilla set) and/or `system`. Default `bundled,system` |
| `CLAUDE_CODE_CHILD_SESSION` | `1` in subprocesses Claude Code spawns directly (Bash/PowerShell/Monitor tools, hooks, status line); not set for stdio MCP subprocesses |
| `CLAUDE_CODE_CLIENT_CERT` | Path to client certificate file for mTLS |
| `CLAUDE_CODE_CLIENT_KEY` | Path to client private key file for mTLS |
| `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` | Passphrase for encrypted `CLAUDE_CODE_CLIENT_KEY` |
| `CLAUDE_CODE_CONNECT_TIMEOUT_MS` | Removed (no-op) since v2.1.186; use `API_TIMEOUT_MS` |
| `CLAUDE_CODE_DEBUG_LOGS_DIR` | Override debug log file path (a file path, not a directory). Requires `--debug`/`/debug`/`DEBUG` to actually enable logging. Default `~/.claude/debug/<session-id>.txt` |
| `CLAUDE_CODE_DEBUG_LOG_LEVEL` | Min log level written to the debug log: `verbose`, `debug` (default), `info`, `warn`, `error` |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | `1` disables 1M context window support entirely |
| `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` | `1` disables adaptive reasoning on Opus 4.6/Sonnet 4.6, falling back to a fixed `MAX_THINKING_TOKENS` budget. No effect on Fable 5, Sonnet 5, or Opus 4.7+ |
| `CLAUDE_CODE_DISABLE_ADMIN_ENV_UNION` | `1` stops merging managed-settings `env` blocks per key across admin sources; only the highest-priority source's whole `env` block applies (pre-v2.1.223 behavior) |
| `CLAUDE_CODE_DISABLE_ADVISOR_TOOL` | `1` disables the advisor tool; `/advisor` unavailable, `advisorModel` ignored, `--advisor` accepted but no-op |
| `CLAUDE_CODE_DISABLE_AGENT_VIEW` | `1` turns off background agents/agent view (`claude agents`, `--bg`, `/background`). Same as `disableAgentView` setting |
| `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN` | `1` disables fullscreen rendering, using the classic main-screen renderer; native scrollback stays usable. Takes precedence over `CLAUDE_CODE_NO_FLICKER` and the `tui` setting |
| `CLAUDE_CODE_DISABLE_ARTIFACT` | `1` disables the Artifact tool. Same as `disableArtifact` setting |
| `CLAUDE_CODE_DISABLE_ATTACHMENTS` | `1` disables attachment processing; `@` file mentions sent as plain text instead of expanded content |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | `1` disables auto memory; `0` forces it on even under `--bare` or `autoMemoryEnabled: false` |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | `1` disables all background task functionality: `run_in_background`, auto-backgrounding, Ctrl+B |
| `CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_GUARD` | `1` skips the check that an Amazon Bedrock streaming response has `application/vnd.amazon.eventstream` content-type (for gateways that rewrite only the header) |
| `CLAUDE_CODE_DISABLE_BG_EXIT_HANDOFF` | `1` stops handing off a background session's running shells/workflows/subagents to the next process when the supervisor stops/restarts |
| `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP` | `1` stops terminating background shell commands on OS memory-pressure signals (macOS/Linux only) |
| `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS` | `1` disables bundled skills/workflows. Same as `disableBundledSkills` setting |
| `CLAUDE_CODE_DISABLE_CLAUDE_MDS` | `1` prevents loading any CLAUDE.md memory files (user, project, auto-memory) |
| `CLAUDE_CODE_DISABLE_CRON` | `1` disables scheduled tasks; `/loop` and cron tools unavailable, already-scheduled tasks stop firing |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | `1` strips `anthropic-beta` headers and beta tool-schema fields for gateways that reject them; also disables MCP tool search |
| `CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS` | `1` disables the built-in Explore/Plan subagents; Claude explores directly or via general-purpose subagent instead |
| `CLAUDE_CODE_DISABLE_FAST_MODE` | `1` disables fast mode |
| `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY` | `1` disables the session quality survey. Also disabled by `DISABLE_TELEMETRY`/`DO_NOT_TRACK`/`CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` unless `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` opts back in |
| `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING` | `1` disables file checkpointing; `/rewind` can't restore code changes. Overrides `fileCheckpointingEnabled` |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | `1` removes built-in commit/PR workflow instructions and git status from the system prompt |
| `CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP` | `1` prevents auto-remapping Opus 4.0/4.1 to the current Opus version on the Anthropic API |
| `CLAUDE_CODE_DISABLE_MOUSE` | `1` disables mouse tracking in fullscreen rendering (keyboard scrolling with PgUp/PgDn still works) |
| `CLAUDE_CODE_DISABLE_MOUSE_CLICKS` | `1` disables click/drag/hover in fullscreen rendering while keeping wheel scrolling |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | Any non-empty value disables auto-updates, telemetry, error reporting, `/feedback`, release notes, gateway model discovery, and availability checks. Unlike most on/off vars, `0`/`false` still disables it |
| `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | `1` disables the non-streaming fallback when a streaming request fails mid-stream |
| `CLAUDE_CODE_DISABLE_NOTIFICATION_PRESENCE_CHECK` | `1` sends the `PushNotification` tool's desktop notification even while you're actively typing/focused on the terminal |
| `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL` | `1` disables automatic registration of the official plugin marketplace (checked at first interactive launch) |
| `CLAUDE_CODE_DISABLE_POLICY_SKILLS` | `1` skips loading skills from the system-wide managed skills directory |
| `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` | `1` disables automatic terminal title updates; also skips the background title-generation request in Agent SDK/`claude -p` |
| `CLAUDE_CODE_DISABLE_THINKING` | `1` omits the `thinking` parameter entirely, for proxies/gateways that reject it |
| `CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL` | `1` disables virtual scrolling in fullscreen rendering, rendering every message |
| `CLAUDE_CODE_DISABLE_WORKFLOWS` | `1` disables dynamic workflows. Same as `disableWorkflows` setting |
| `CLAUDE_CODE_EFFORT_LEVEL` | Effort level for supported models: `low`/`medium`/`high`/`xhigh`/`max`/`auto`. Takes precedence over `/effort` and the `effortLevel` setting |
| `CLAUDE_CODE_ENABLE_APPEND_SUBAGENT_PROMPT` | `1` enables appending extra text to every subagent's system prompt (set automatically by `--append-subagent-system-prompt`) |
| `CLAUDE_CODE_ENABLE_AUTO_MODE` | No-op, kept for compatibility; auto mode is available by default on every provider |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | Override session-recap availability: `0` forces off, `1` forces on regardless of `awaySummaryEnabled` |
| `CLAUDE_CODE_ENABLE_BACKGROUND_PLUGIN_REFRESH` | `1` refreshes plugin state at turn boundaries in non-interactive mode after a background install completes |
| `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` | `1` routes the session quality survey to your own OTEL collector instead of Anthropic when nonessential traffic is blocked |
| `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING` | Controls whether tool call inputs stream as Claude generates them; `0` opts out, `1` forces on behind a proxy |
| `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | `1` populates the `/model` picker from the gateway's `/v1/models` endpoint when `ANTHROPIC_BASE_URL` points at an Anthropic-compatible gateway |
| `CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE` | Removed in v2.1.142 |
| `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION` | `false` disables prompt suggestions (the grayed-out predictions after Claude responds) |
| `CLAUDE_CODE_ENABLE_TASKS` | Controls structured Task tools vs. legacy `TodoWrite`; Task tools are default since v2.1.142, `0` reverts to `TodoWrite` |
| `CLAUDE_CODE_ENABLE_TELEMETRY` | `1` enables OpenTelemetry data collection; required before configuring OTel exporters |
| `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY` | Milliseconds to wait after the query loop becomes idle before auto-exiting (automated workflows/SDK) |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | `1` enables agent teams (experimental, disabled by default) |
| `CLAUDE_CODE_EXTRA_BODY` | JSON object merged into the top level of every API request body, for provider-specific parameters |
| `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` | Override the default token limit for file reads |
| `CLAUDE_CODE_FORCE_SESSION_PERSISTENCE` | `1` forces transcript persistence/prompt history/`claude agents` registration even when launched from inside another Claude Code session |
| `CLAUDE_CODE_FORCE_STRIKETHROUGH` | `1` forces `~~text~~` strikethrough rendering when the terminal supports it but isn't auto-detected |
| `CLAUDE_CODE_FORCE_SYNC_OUTPUT` | `1` force-enables synchronized output (DEC 2026) for terminals not auto-detected; no effect under tmux |
| `CLAUDE_CODE_FORK_SUBAGENT` | `1`/`0` lets Claude spawn forked subagents (inherit full conversation context), overriding server-side rollout |
| `CLAUDE_CODE_FORWARD_SUBAGENT_TEXT` | `1` emits subagent text/thinking blocks in `claude -p --output-format stream-json` output, same as `--forward-subagent-text` |
| `CLAUDE_CODE_GIT_BASH_PATH` | Windows only: path to the Git Bash `bash.exe` when not on PATH |
| `CLAUDE_CODE_GLOB_HIDDEN` | `false` excludes dotfiles from Glob tool results (included by default) |
| `CLAUDE_CODE_GLOB_NO_IGNORE` | `false` makes the Glob tool respect `.gitignore` patterns (ignored by default) |
| `CLAUDE_CODE_GLOB_TIMEOUT_SECONDS` | Timeout for Glob tool file discovery (default 20s, 60s on WSL) |
| `CLAUDE_CODE_HIDE_CWD` | `1` hides the working directory in the startup logo (screenshares/recordings) |
| `CLAUDE_CODE_IDE_HOST_OVERRIDE` | Override the host address used to connect to the IDE extension |
| `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL` | `1` skips IDE extension auto-installation. Same as `autoInstallIdeExtension: false` |
| `CLAUDE_CODE_IDE_SKIP_VALID_CHECK` | `1` skips validation of IDE lockfile entries during connection |
| `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` | Max concurrently running subagents per session before the Agent tool refuses to spawn another (default 20) |
| `CLAUDE_CODE_MAX_CONTEXT_TOKENS` | Override the assumed context window size for the active model, e.g. for a gateway-routed model with a nonstandard window |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | Max output tokens for most requests; defaults to 32000 for unrecognized model IDs |
| `CLAUDE_CODE_MAX_RETRIES` | Number of retry attempts for failed API requests (default 10, capped 15 unless `CLAUDE_CODE_RETRY_WATCHDOG` is set) |
| `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION` | Cap on subagents one session can spawn (default 200) |
| `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` | Subagent nesting depth below the main conversation (default 3); `1` disables nesting |
| `CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY` | Max read-only tools/subagents executing in parallel (default 10) |
| `CLAUDE_CODE_MAX_TURNS` | Cap agentic turns when no explicit `--max-turns` is passed |
| `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION` | Cap on total WebSearch calls one session can make (default 200) |
| `CLAUDE_CODE_MCP_ALLOWLIST_ENV` | `1` spawns stdio MCP servers with only a safe baseline environment plus the server's configured `env` |
| `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` | Elapsed time before a still-running MCP tool call moves to a background task (default 120000); `0` disables |
| `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` | Idle timeout for MCP tool calls with no response/progress; overrides per-transport defaults |
| `CLAUDE_CODE_NATIVE_CURSOR` | `1` shows the terminal's own cursor at the input caret instead of a drawn block |
| `CLAUDE_CODE_NEW_INIT` | `1` makes `/init` run an interactive setup flow (asks which files to generate) |
| `CLAUDE_CODE_NO_FLICKER` | `1` enables fullscreen rendering. Same as the `tui` setting; also `/tui fullscreen` |
| `CLAUDE_CODE_OAUTH_REFRESH_TOKEN` | OAuth refresh token for Claude.ai auth; `claude auth login` exchanges it directly. Requires `CLAUDE_CODE_OAUTH_SCOPES` |
| `CLAUDE_CODE_OAUTH_SCOPES` | Space-separated OAuth scopes the refresh token was issued with |
| `CLAUDE_CODE_OAUTH_TOKEN` | OAuth access token for Claude.ai auth; alternative to `/login` for SDK/automation. Generate with `claude setup-token` |
| `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` | Removed in v2.1.160, now a no-op |
| `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` | Max length of content-bearing OTEL attributes in UTF-16 code units (default 61440, i.e. 60KB) |
| `CLAUDE_CODE_OTEL_DIAG_STDERR` | `1` writes OpenTelemetry exporter diagnostic errors to stderr (otherwise only with `--debug`) |
| `CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS` | Timeout for flushing pending OTEL spans (default 5000) |
| `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS` | Interval for refreshing dynamic OTEL headers (default 1740000/29 min) |
| `CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS` | Timeout for the OTEL exporter to finish on shutdown (default 2000) |
| `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` | `1` lets Claude Code run your package manager's upgrade command in the background (Homebrew/WinGet) |
| `CLAUDE_CODE_PERFORCE_MODE` | `1` enables Perforce-aware write protection (Edit/Write/NotebookEdit fail with a `p4 edit` hint) |
| `CLAUDE_CODE_PLUGIN_CACHE_DIR` | Override the plugins root directory (default `~/.claude/plugins`) |
| `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS` | Timeout for git operations installing/updating plugins (default 120000) |
| `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE` | `1` keeps the existing marketplace cache when `git pull` fails instead of re-cloning (offline/airgapped) |
| `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` | `1` clones GitHub `owner/repo` shorthand over HTTPS instead of SSH |
| `CLAUDE_CODE_PLUGIN_SEED_DIR` | Path(s) to read-only plugin seed directories (`:`/`;`-separated), for pre-populated container images |
| `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY` | `1` stops passing `-ExecutionPolicy Bypass` when spawning PowerShell; respects the machine's effective policy instead |
| `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS` | Max wait after the final turn for background subagents/workflows in `-p` mode (default 600000/10 min); `0` waits indefinitely |
| `CLAUDE_CODE_PROCESS_WRAPPER` | Corporate launcher argv prefix for processes Claude Code starts from its own binary. Set in `env` block only, not shell export |
| `CLAUDE_CODE_PROPAGATE_TRACEPARENT` | `1` propagates W3C trace context (`traceparent` header/env var) when `ANTHROPIC_BASE_URL` points at a custom proxy |
| `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` | Set by embedding host platforms; Claude Code ignores provider-selection/model-selection env vars and managed keys in favor of the host's routing |
| `CLAUDE_CODE_PROXY_RESOLVES_HOSTS` | `1` allows the proxy to perform DNS resolution instead of the caller |
| `CLAUDE_CODE_REMOTE` | Set automatically to `true` in cloud sessions; read to detect cloud-session context |
| `CLAUDE_CODE_REMOTE_SESSION_ID` | Set automatically in cloud sessions to the current session ID |
| `CLAUDE_CODE_RESUME_INTERRUPTED_TURN` | `1` auto-resumes if the previous session ended mid-turn (SDK mode) |
| `CLAUDE_CODE_RESUME_INTERRUPTED_TURN_MAX_AGE_MS` | Max age of the last transcript message for auto-resume to continue automatically; unset/`0` = no bound |
| `CLAUDE_CODE_RESUME_PROMPT` | Override the injected continuation message when resuming a mid-turn session (default `Continue from where you left off.`) |
| `CLAUDE_CODE_RETRY_WATCHDOG` | `1` retries `429`/`529` indefinitely for unattended sessions; also raises other transient-error retries to ~300 |
| `CLAUDE_CODE_SAFE_MODE` | `1` starts in safe mode (see `--safe-mode` in `cli-reference.md`); set automatically by that flag |
| `CLAUDE_CODE_SCRIPT_CAPS` | JSON object limiting how many times specific scripts may be invoked per session (with `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`) |
| `CLAUDE_CODE_SCROLL_SPEED` | Mouse wheel scroll multiplier in fullscreen rendering (0-20, fractional allowed) |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | Time budget for `SessionEnd` hooks (default 1.5s, auto-raised up to 60s) |
| `CLAUDE_CODE_SESSION_ID` | Set automatically to the current session ID in Bash/PowerShell/hook/stdio-MCP subprocesses |
| `CLAUDE_CODE_SHELL` | Shell Claude Code uses for Bash tool commands: a `bash` or `zsh` binary path |
| `CLAUDE_CODE_SHELL_PREFIX` | Command prefix wrapping shell commands Claude Code spawns (Bash tool, hooks, status line, stdio MCP startup), for logging/auditing |
| `CLAUDE_CODE_SIMPLE` | `1` runs with a minimal system prompt and only Bash/file-read/file-edit tools. Same as `--bare` |
| `CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT` | `1` uses a shorter system prompt and abbreviated tool descriptions on any model; `0`/`false`/`no`/`off` opts out |
| `CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH` | Skip client-side auth for Claude Platform on AWS (gateways that sign requests themselves) |
| `CLAUDE_CODE_SKIP_AWS_CRED_CACHE` | `1` turns off the in-process AWS credential cache; resolves the chain on every API request |
| `CLAUDE_CODE_SKIP_BEDROCK_AUTH` | Skip AWS authentication for Amazon Bedrock (e.g. via an LLM gateway) |
| `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS` | `1` treats a failed fast mode availability check as available; still honors an org-disabled response |
| `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK` | `1` skips the fast mode availability check entirely (for intercepting proxies) |
| `CLAUDE_CODE_SKIP_FOUNDRY_AUTH` | Skip Azure authentication for Microsoft Foundry, for a proxy that injects its own `Authorization` header |
| `CLAUDE_CODE_SKIP_MANTLE_AUTH` | Skip AWS authentication for Amazon Bedrock Mantle |
| `CLAUDE_CODE_SKIP_PROMPT_HISTORY` | `1` skips writing prompt history/session transcripts to disk (ephemeral scripted sessions) |
| `CLAUDE_CODE_SKIP_VERTEX_AUTH` | Skip Google authentication for Google Cloud's Agent Platform |
| `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` | Max consecutive times a `Stop`/`SubagentStop` hook may block the turn before Claude Code overrides it (default 8); `0` disables |
| `CLAUDE_CODE_SUBAGENT_MODEL` | Model for all subagents/agent teams/workflow agents; takes precedence over per-invocation `model` and frontmatter |
| `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` | `1` strips Anthropic/cloud-provider credentials from subprocess environments (Bash tool, hooks, MCP stdio) |
| `CLAUDE_CODE_SYNC_PLUGIN_INSTALL` | `1` in `-p` mode waits for plugin installation to complete before the first query |
| `CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS` | Timeout for synchronous plugin installation; proceeds without plugins on exceed |
| `CLAUDE_CODE_SYNC_SKILLS` | `1` downloads enabled claude.ai skills into `~/.claude/skills/` before the first query, resyncs every 10 min (`-p` mode only) |
| `CLAUDE_CODE_SYNC_SKILLS_INSTALL_TIMEOUT_MS` | Timeout for a mid-session skills resync (default 30000) |
| `CLAUDE_CODE_SYNC_SKILLS_WAIT_TIMEOUT_MS` | Timeout for the first query to wait on the initial skills sync (default 5000) |
| `CLAUDE_CODE_SYNTAX_HIGHLIGHT` | `false` disables syntax highlighting in diff output |
| `CLAUDE_CODE_TASK_LIST_ID` | Share a task list across sessions by setting the same ID in multiple instances |
| `CLAUDE_CODE_TEAM_TEARDOWN_PARK_TIMEOUT_MS` | How long a non-interactive session waits at exit for its agent team to tear down (default 10000, range 1000-60000) |
| `CLAUDE_CODE_TMPDIR` | Override the temp directory for internal temp files (default `/tmp` macOS, `os.tmpdir()` Linux/Windows) |
| `CLAUDE_CODE_TMUX_TRUECOLOR` | Any non-empty value allows 24-bit truecolor inside tmux (default clamps to 256 colors) |
| `CLAUDE_CODE_USE_ANTHROPIC_AWS` | Use Claude Platform on AWS |
| `CLAUDE_CODE_USE_BEDROCK` | Use Amazon Bedrock |
| `CLAUDE_CODE_USE_FOUNDRY` | Use Microsoft Foundry |
| `CLAUDE_CODE_USE_MANTLE` | Use the Amazon Bedrock Mantle endpoint |
| `CLAUDE_CODE_USE_NATIVE_FILE_SEARCH` | `1` discovers custom commands/subagents/output styles using Node.js file APIs instead of ripgrep |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL` | Controls the PowerShell tool; behavior varies by platform (auto on Windows without Git Bash, opt-in elsewhere, requires `pwsh` on Linux/macOS/WSL) |
| `CLAUDE_CODE_USE_VERTEX` | Use Google Cloud's Agent Platform |
| `CLAUDE_CONFIG_DIR` | Override the configuration directory (default `~/.claude`); useful for multiple accounts side by side |
| `CLAUDE_DISABLE_ADOPT` | `1` stops in-flight background work instead of carrying it over when backgrounding a session |
| `CLAUDE_EFFORT` | Set automatically in Bash/hook subprocesses to the active effort level for the turn |
| `CLAUDE_ENABLE_BYTE_WATCHDOG` | `1`/`0` force-enable/disable the byte-level streaming idle watchdog |
| `CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK` | `1` enables the byte-level watchdog on Amazon Bedrock eventstream responses (off by default) |
| `CLAUDE_ENABLE_STREAM_WATCHDOG` | `0`/`1` force-disable/enable the event-level streaming idle watchdog (on by default for all providers) |
| `CLAUDE_ENV_FILE` | Path to a shell script Claude Code runs before each Bash command in the same shell process (persist venv/conda activation) |
| `CLAUDE_PID` | Set automatically to Claude Code's own process ID in spawned subprocesses; used to refuse a self-matching `pkill` pattern |
| `CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX` | Prefix for auto-generated Remote Control session names (default: hostname) |
| `CLAUDE_STREAM_IDLE_TIMEOUT_MS` | Timeout before the event-/byte-level streaming watchdogs close a stalled connection (min 300000 when set explicitly) |
| `DEBUG` | `1` enables debug mode (equivalent to `--debug`); only `1`/`true`/`yes`/`on` are truthy |
| `DISABLE_AUTOUPDATER` | `1` disables automatic background updates; manual `claude update` still works |
| `DISABLE_AUTO_COMPACT` | `1` disables automatic compaction; manual `/compact` remains available. Overrides `autoCompactEnabled` |
| `DISABLE_COMPACT` | `1` disables all compaction, automatic and manual `/compact` |
| `DISABLE_COST_WARNINGS` | `1` disables cost warning messages |
| `DISABLE_DOCTOR_COMMAND` | `1` hides the `/doctor` skill and `/checkup` alias (doesn't affect `claude doctor` terminal command) |
| `DISABLE_ERROR_REPORTING` | Any non-empty value opts out of error reporting; `0`/`false` still opts out |
| `DISABLE_EXTRA_USAGE_COMMAND` | `1` hides `/usage-credits` |
| `DISABLE_FEEDBACK_COMMAND` | `1` disables `/feedback` (also `/bug`, `/share`). Older name `DISABLE_BUG_COMMAND` also accepted |
| `DISABLE_GROWTHBOOK` | `1` disables GrowthBook feature-flag fetching; uses code defaults, makes Remote Control unavailable |
| `DISABLE_INSTALLATION_CHECKS` | `1` disables installation warnings |
| `DISABLE_INSTALL_GITHUB_APP_COMMAND` | `1` hides `/install-github-app` |
| `DISABLE_INTERLEAVED_THINKING` | `1` prevents sending the interleaved-thinking beta header |
| `DISABLE_LOGIN_COMMAND` | `1` hides `/login` |
| `DISABLE_LOGOUT_COMMAND` | `1` hides `/logout` |
| `DISABLE_PROMPT_CACHING` | `1` disables prompt caching for all models (takes precedence over per-model settings) |
| `DISABLE_PROMPT_CACHING_FABLE` | `1` disables prompt caching for Fable models |
| `DISABLE_PROMPT_CACHING_HAIKU` | `1` disables prompt caching for Haiku models |
| `DISABLE_PROMPT_CACHING_OPUS` | `1` disables prompt caching for Opus models |
| `DISABLE_PROMPT_CACHING_SONNET` | `1` disables prompt caching for Sonnet models |
| `DISABLE_TELEMETRY` | Any non-empty value opts out of telemetry; `0`/`false` still opts out. Also disables feature-flag fetching |
| `DISABLE_UPDATES` | `1` blocks all updates including manual `claude update`/`claude install` (stricter than `DISABLE_AUTOUPDATER`) |
| `DISABLE_UPGRADE_COMMAND` | `1` hides `/upgrade` |
| `DO_NOT_TRACK` | `1` opts out of telemetry, same effect as `DISABLE_TELEMETRY`; standard boolean semantics (`0` leaves telemetry on) |
| `ENABLE_CLAUDEAI_MCP_SERVERS` | `false` disables claude.ai MCP servers (enabled by default for logged-in users) |
| `ENABLE_PROMPT_CACHING_1H` | `1` requests a 1-hour prompt cache TTL instead of the default 5 minutes (billed at a higher rate) |
| `ENABLE_PROMPT_CACHING_1H_BEDROCK` | Deprecated; use `ENABLE_PROMPT_CACHING_1H` |
| `ENABLE_TOOL_SEARCH` | Controls MCP tool search: unset (auto per-provider), `true` (always defer), `auto`/`auto:N` (threshold mode), `false` (load all upfront) |
| `FALLBACK_FOR_ALL_PRIMARY_MODELS` | Any non-empty value stops every model from retrying with a repeated-overload error when no fallback model is configured; `0`/`false` still enables it |
| `FORCE_AUTOUPDATE_PLUGINS` | `1` forces plugin auto-updates even when `DISABLE_AUTOUPDATER` disables the main auto-updater |
| `FORCE_HYPERLINK` | `1` enables OSC 8 hyperlinks when not auto-detected, `0` disables. Parsed as a number, not a boolean |
| `FORCE_PROMPT_CACHING_5M` | `1` forces the 5-minute prompt cache TTL, overriding `ENABLE_PROMPT_CACHING_1H` |
| `HTTP_PROXY` | HTTP proxy server for network connections |
| `HTTPS_PROXY` | HTTPS proxy server for network connections |
| `IS_DEMO` | Any non-empty value enables demo mode (hides email/org from header and `/status`, skips onboarding); `0`/`false` still enables it |
| `MAX_MCP_OUTPUT_TOKENS` | Max tokens allowed in MCP tool responses (default 25000); warning above 10,000 |
| `MAX_STRUCTURED_OUTPUT_RETRIES` | Retries when the model's response fails `--json-schema` validation in `-p` mode (default 5) |
| `MAX_THINKING_TOKENS` | Fixed extended-thinking token budget; `0` disables thinking on the Anthropic API except Fable 5 |
| `MCP_CLIENT_SECRET` | OAuth client secret for MCP servers requiring pre-configured credentials |
| `MCP_CONNECTION_NONBLOCKING` | Controls whether startup waits for MCP servers to connect (non-blocking by default); `0` restores the blocking 5s wait |
| `MCP_CONNECT_TIMEOUT_MS` | How long blocking MCP startup waits for the connection batch (default 5000) |
| `MCP_DISCOVERY_CACHE` | `0` turns off the cross-process MCP discovery cache |
| `MCP_OAUTH_CALLBACK_PORT` | Fixed port for the OAuth redirect callback, alternative to `--callback-port` |
| `MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE` | Max remote MCP servers (HTTP/SSE) to connect in parallel at startup (default 20) |
| `MCP_SERVER_CONNECTION_BATCH_SIZE` | Max local MCP servers (stdio) to connect in parallel at startup (default 3) |
| `MCP_TIMEOUT` | Timeout for MCP server startup (default 30000/30s) |
| `MCP_TOOL_TIMEOUT` | Timeout for MCP tool execution (default 100000000, ~28 hours); HTTP/SSE/connector servers also have a 60s per-request timer |
| `NO_PROXY` | Domains/IPs to bypass the proxy for |
| `OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT` | Standard OTEL SDK attribute value length limit; Claude Code caps content attributes at the smaller of this and `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` |
| `OTEL_LOG_ASSISTANT_RESPONSES` | `1` includes the model's response text on `assistant_response` OTEL log events |
| `OTEL_LOG_RAW_API_BODIES` | `1` emits request/response JSON as OTEL log events; `file:<dir>` writes untruncated bodies to disk |
| `OTEL_LOG_TOOL_CONTENT` | `1` includes tool input/output content in OTEL span events (off by default) |
| `OTEL_LOG_TOOL_DETAILS` | `1` includes tool input arguments, MCP server names, workflow names, raw errors, refusal categories in OTEL (off by default) |
| `OTEL_LOG_USER_PROMPTS` | `1` includes user prompt text in OTEL traces/logs (redacted by default) |
| `OTEL_METRICS_INCLUDE_ACCOUNT_UUID` | `false` excludes account UUID from metrics attributes (included by default) |
| `OTEL_METRICS_INCLUDE_ENTRYPOINT` | `true` includes the session entrypoint in metrics attributes (excluded by default) |
| `OTEL_METRICS_INCLUDE_RESOURCE_ATTRIBUTES` | `false` excludes `OTEL_RESOURCE_ATTRIBUTES` keys from metric datapoint labels (included by default) |
| `OTEL_METRICS_INCLUDE_SESSION_ID` | `false` excludes session ID from metrics attributes (included by default) |
| `OTEL_METRICS_INCLUDE_VERSION` | `true` includes Claude Code version in metrics attributes (excluded by default) |
| `SLASH_COMMAND_TOOL_CHAR_BUDGET` | Character budget for skill metadata shown to the Skill tool (default 1% of context window, fallback 8000) |
| `TASK_MAX_OUTPUT_LENGTH` | Max characters in subagent output before truncation (default 32000, max 160000) |
| `USE_BUILTIN_RIPGREP` | `0` uses system-installed `rg` instead of the bundled one |
| `VERTEX_REGION_CLAUDE_*` (per model, e.g. `VERTEX_REGION_CLAUDE_5_OPUS`, `VERTEX_REGION_CLAUDE_FABLE_5`, `VERTEX_REGION_CLAUDE_HAIKU_4_5`) | Override the Google Cloud's Agent Platform region for that specific model version |

Standard OpenTelemetry exporter variables (`OTEL_METRICS_EXPORTER`, `OTEL_LOGS_EXPORTER`, `OTEL_EXPORTER_OTLP_ENDPOINT`, `OTEL_EXPORTER_OTLP_PROTOCOL`, `OTEL_EXPORTER_OTLP_HEADERS`, `OTEL_METRIC_EXPORT_INTERVAL`, `OTEL_RESOURCE_ATTRIBUTES`, and signal-specific variants) are also supported; see the monitoring-usage docs.

## Retry-tuning variables

Also documented in `errors.md`: `CLAUDE_CODE_MAX_RETRIES` (default 10, capped 15), `CLAUDE_CODE_RETRY_WATCHDOG` (unset by default; `1` retries `429`/`529` indefinitely and raises other retry counts to ~300), and `API_TIMEOUT_MS` (default 600000).

## Related

- [settings.md](./settings.md): the settings-file equivalents and precedence rules
- [model-config.md](./model-config.md): the `ANTHROPIC_DEFAULT_*_MODEL` family in context
- [errors.md](./errors.md): retry-tuning variables in action
