<!-- source: https://code.claude.com/docs/en/settings.md / last verified: 2026-08-07 -->

# Claude Code settings

Configure Claude Code with global and project-level settings, environment variables, and managed policy. Run `/config` for an interactive settings UI, or `/config key=value` (v2.1.181+) to change one option directly.

## Configuration scopes

| Scope | Location | Who it affects | Shared with team? |
| --- | --- | --- | --- |
| Managed | Server-managed settings, plist/registry, or system-level `managed-settings.json` | All org members (server-managed) or all users on the machine (plist/registry/file) | Yes (deployed by IT) |
| User | `~/.claude/` | You, across all projects | No |
| Project | `.claude/` in repository | All collaborators on this repository | Yes (committed to git) |
| Local | `.claude/settings.local.json` at repo root | You, in this repository only | No (gitignored when Claude Code saves a setting to it) |

Precedence, highest to lowest: **Managed** > command-line arguments > **Local** > **Project** > **User**. Permission rules merge across scopes rather than override; a few security-sensitive settings honor a restrictive value from certain scopes that otherwise couldn't override them.

What uses scopes:

| Feature | User location | Project location | Local location |
| --- | --- | --- | --- |
| Settings | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| Subagents | `~/.claude/agents/` | `.claude/agents/` | None |
| MCP servers | `~/.claude.json` | `.mcp.json` | `~/.claude.json` (per-project) |
| Plugins | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| CLAUDE.md | `~/.claude/CLAUDE.md` | `CLAUDE.md` or `.claude/CLAUDE.md` | `CLAUDE.local.md` |

On Windows, `~/.claude` resolves to `%USERPROFILE%\.claude`.

## Settings files

- **User settings**: `~/.claude/settings.json`, applies to all projects.
- **Project settings**: `.claude/settings.json` (checked into source control) or `.claude/settings.local.json` (not checked in; Claude Code adds it to your global git excludes the first time it saves a setting there). Read/written at the git repository root (resolved through worktrees), except outside a git repo, when the repo root is your home directory, or in Agent SDK sessions.
- **Managed settings**: for centralized control, delivered via server-managed settings (claude.ai admin console or a self-hosted Claude apps gateway), MDM/OS-level policy (macOS `com.anthropic.claudecode` plist, Windows `HKLM\SOFTWARE\Policies\ClaudeCode` or `HKCU\...`), or file-based `managed-settings.json` / `managed-mcp.json` (macOS `/Library/Application Support/ClaudeCode/`, Linux/WSL `/etc/claude-code/`, Windows `C:\Program Files\ClaudeCode\`). File-based managed settings also support a `managed-settings.d/` drop-in directory, merged alphabetically on top of the base file (systemd-style; use numeric prefixes to control order).
- **Other configuration**: `~/.claude.json` holds OAuth session, user/local-scope MCP server configs, per-project state, and caches. Project-scoped MCP servers live in `.mcp.json`.

Claude Code keeps the 5 most recent timestamped backups of configuration files.

```json Example settings.json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": ["Bash(npm run lint)", "Bash(npm run test *)", "Read(~/.zshrc)"],
    "deny": ["Bash(curl *)", "Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "http/protobuf"
  },
  "companyAnnouncements": ["Welcome to Acme Corp! Review our code guidelines at docs.acme.com"]
}
```

### When edits take effect

Most keys (`permissions`, `hooks`, `apiKeyHelper`, etc.) reload live without a restart, across user/project/local/managed scopes; the `ConfigChange` hook fires per change. Two keys apply only on next restart: `model` (use `/model` to switch mid-session) and `outputStyle` (part of the system prompt, rebuilt on `/clear` or restart).

### Invalid entries in managed settings

Managed settings parse tolerantly: an invalid entry is stripped with a warning, and the rest of the policy still applies (`/doctor` lists stripped entries). Certain security-enforcement fields (`allowedMcpServers`, `allowManagedMcpServersOnly`, `availableModels`, `enforceAvailableModels`, `forceLoginOrgUUID`, `deniedMcpServers`, `sandbox.credentials`) fail toward the more restrictive behavior instead of being dropped outright. `requiredMinimumVersion`/`requiredMaximumVersion` fail open (stripped, not enforced). This tolerance applies only to managed settings — user/project/local settings files that fail validation are rejected wholesale.

## Available settings

`settings.json` supports many keys, listed alphabetically below.

| Key | Description | Example |
| --- | --- | --- |
| `advisorModel` | Model for the server-side advisor tool. Accepts `"opus"`, `"sonnet"`, or a full model ID. Written automatically by `/advisor`. Unset to disable | `"opus"` |
| `agent` | Run the main thread as a named subagent; sets the default agent for `claude agents` | `"code-reviewer"` |
| `agentPushNotifEnabled` | Default `false`. Allow Claude to send proactive push notifications via Remote Control | `true` |
| `allowAllClaudeAiMcps` | (Managed only) Load claude.ai connectors alongside a deployed `managed-mcp.json` | `true` |
| `allowedChannelPlugins` | (Managed only) Allowlist of channel plugins that may push messages | `[{ "marketplace": "claude-plugins-official", "plugin": "telegram" }]` |
| `allowedHttpHookUrls` | Allowlist of URL patterns HTTP hooks may target (`*` wildcard). Undefined = no restriction, `[]` = block all | `["https://hooks.example.com/*"]` |
| `allowedMcpServers` | (Managed) Allowlist of MCP servers users can configure. Undefined = no restriction, `[]` = lockdown | `[{ "serverName": "github" }]` |
| `allowManagedHooksOnly` | (Managed only) Only managed/SDK/force-enabled-plugin hooks load | `true` |
| `allowManagedMcpServersOnly` | (Managed only) Only managed `allowedMcpServers` respected; `deniedMcpServers` still merges | `true` |
| `allowManagedPermissionRulesOnly` | (Managed only) Only managed settings can define `allow`/`ask`/`deny` permission rules | `true` |
| `alwaysThinkingEnabled` | Enable extended thinking by default. Set `MAX_THINKING_TOKENS=0` in `env` to force off (except Fable 5) | `true` |
| `apiKeyHelper` | Shell command that generates an auth value, sent as `X-Api-Key`/`Authorization: Bearer`. Refresh interval via `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | `/bin/generate_temp_api_key.sh` |
| `askUserQuestionTimeout` | Default `"never"`. Idle time before an unanswered `AskUserQuestion` dialog auto-continues (`"60s"`, `"5m"`, `"10m"`, `"never"`) | `"5m"` |
| `attribution` | Customize git commit/PR attribution | `{"commit": "Generated with Claude Code", "pr": ""}` |
| `autoCompactEnabled` | Default `true`. Auto-compact when context nears the limit | `false` |
| `autoCompactWindow` | Tokens (100000-1000000) before auto-compact triggers. Set via `/autocompact`; `--autocompact` flag and `CLAUDE_CODE_AUTO_COMPACT_WINDOW` env var can override | `500000` |
| `autoMemoryDirectory` | Custom directory for auto memory storage | `"~/my-memory-dir"` |
| `autoMemoryEnabled` | Default `true`. Toggle with `/memory` or `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | `false` |
| `autoMode` | Customize auto mode classifier: `environment`, `allow`, `soft_deny`, `hard_deny` prose-rule arrays; include `"$defaults"` to inherit built-ins. Read from user settings, `--settings`, and managed settings only (not project/local) | `{"soft_deny": ["$defaults", "Never run terraform apply"]}` |
| `autoMode.classifyAllShell` | Default `false`. Route every Bash/PowerShell command through the classifier while auto mode is active | `true` |
| `autoScrollEnabled` | Default `true`. Follow output to bottom in fullscreen rendering | `false` |
| `autoUpdatesChannel` | Default `"latest"`. `"stable"` or `"latest"` release channel | `"stable"` |
| `availableModels` | Restrict which models are selectable for main session, subagents, skills, advisor | `["sonnet", "haiku"]` |
| `awaySummaryEnabled` | Show a one-line session recap on return. Same as `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | `true` |
| `awsAuthRefresh` | Script that refreshes the `.aws` directory | `aws sso login --profile myprofile` |
| `awsCredentialExport` | Script that outputs JSON AWS credentials | `/bin/generate_aws_grant.sh` |
| `axScreenReader` | Screen-reader friendly flat-text output; forces classic renderer. `CLAUDE_AX_SCREEN_READER` and `--ax-screen-reader` take precedence | `true` |
| `blockedMarketplaces` | (Managed only) Blocklist of plugin marketplace sources | `[{ "source": "github", "repo": "untrusted/plugins" }]` |
| `browserExternalPageTools` | (Managed only) `"disabled"` blocks Claude's tools for external pages in the Desktop Browser pane | `"disabled"` |
| `channelsEnabled` | (Managed only) Allow channels for the organization | `true` |
| `claudeMd` | (Managed only) Org-managed CLAUDE.md-style memory | `"Always run make lint before committing."` |
| `claudeMdExcludes` | Glob patterns/paths of CLAUDE.md files to skip loading | `["**/vendor/**/CLAUDE.md"]` |
| `cleanupPeriodDays` | Default `30`, min `1`. Age cutoff for deleting old session files/app data at startup | `20` |
| `companyAnnouncements` | Startup announcements, cycled randomly if multiple | `["Welcome to Acme Corp!"]` |
| `defaultShell` | Default `"bash"` (or `"powershell"` on Windows without Bash). Default shell for `!` commands | `"powershell"` |
| `deniedMcpServers` | (Managed) Denylist of MCP servers, applies to all scopes, takes precedence over allowlist | `[{ "serverName": "filesystem" }]` |
| `disableAgentView` | Turn off background agents/agent view (`claude agents`, `--bg`, `/background`) | `true` |
| `disableAllHooks` | Disable all hooks and any custom status line | `true` |
| `disableArtifact` | Disable the Artifact tool | `true` |
| `disableAutoMode` | `"disable"` prevents auto mode activation; also `permissions.disableAutoMode` | `"disable"` |
| `disableBrowserExternalNavigation` | (Managed only) Turn off external browsing in the Desktop Browser pane | `true` |
| `disableBundledSkills` | Disable bundled skills/workflows (built-ins like `/init` stay typable but hidden from the model) | `true` |
| `disableClaudeAiConnectors` | Disable claude.ai MCP connectors. `true` in any source wins | `true` |
| `disableDeepLinkRegistration` | `"disable"` prevents registering the `claude-cli://` protocol handler | `"disable"` |
| `disabledMcpjsonServers` | Specific `.mcp.json` servers to reject | `["filesystem"]` |
| `disableMobileSimulatorTools` | (Managed only) Block Claude's tools for the Desktop iOS Simulator pane | `true` |
| `disableRemoteControl` | Disable Remote Control entirely | `true` |
| `disableSideloadFlags` | (Managed only) Reject `--plugin-dir`, `--plugin-url`, `--agents`, `--mcp-config` CLI flags | `true` |
| `disableSkillShellExecution` | Disable inline shell execution (`` !`...` ``) in skills/commands from non-bundled sources | `true` |
| `disableWorkflows` | Default `false`. Disable dynamic workflows and bundled workflow commands | `true` |
| `editorMode` | Default `"normal"`. `"normal"` or `"vim"` prompt key-binding mode | `"vim"` |
| `effortLevel` | Persist effort level (`"low"`, `"medium"`, `"high"`, `"xhigh"`) across sessions. Set via `/effort` | `"xhigh"` |
| `emojiCompletionEnabled` | Default `true`. Emoji shortcode suggestions on `:` | `false` |
| `enableAllProjectMcpServers` | Auto-approve all `.mcp.json` project servers | `true` |
| `enableArtifact` | Enable/disable the Artifact tool for this user; ignored in project/local settings | `true` |
| `enabledMcpjsonServers` | Specific `.mcp.json` servers to approve | `["memory", "github"]` |
| `enforceAvailableModels` | Extend `availableModels` allowlist to the Default model option | `true` |
| `env` | Environment variables applied to every session and spawned subprocesses. Set to `""` to override a shell export as unset | `{"FOO": "bar"}` |
| `fallbackModel` | Ordered fallback model(s) when primary is overloaded/unavailable. `"default"` expands to the default model; capped at 3 models; does not merge across files (highest-precedence file wins) | `["claude-sonnet-5", "claude-haiku-4-5"]` |
| `fastMode` | Turn fast mode on for sessions where available. `/fast` writes `true` here | `true` |
| `fastModePerSessionOptIn` | `true` disables fast mode persistence across sessions; each session starts with fast mode off | `true` |
| `feedbackSurveyRate` | Probability (0-1) the session quality survey appears when eligible. `0` suppresses it entirely | `0.05` |
| `fileCheckpointingEnabled` | Default `true`. Snapshot files before each edit so `/rewind` can restore them | `false` |
| `fileSuggestion` | Custom script for `@` file autocomplete | `{"type": "command", "command": "~/.claude/file-suggestion.sh"}` |
| `footerLinksRegexes` | Render extra clickable footer badges when a regex matches turn output (`pattern`, `url` template, optional `label`). User/`--settings`/managed settings only | `[{"type": "regex", "pattern": "\\b(?<key>PROJ-\\d+)\\b", "url": "https://issues.example.com/browse/{key}", "label": "{key}"}]` |
| `forceLoginMethod` | `claudeai`/`console`/`gateway` restricts which login type is allowed | `claudeai` |
| `forceLoginGatewayUrl` | Pre-fills and locks the gateway URL on the `/login` Cloud gateway screen. Managed policy tier only | `"https://claude-gateway.example.com"` |
| `forceLoginOrgUUID` | Require login to belong to a specific Anthropic org (single UUID or array of UUIDs) | `"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"` |
| `forceRemoteSettingsRefresh` | (Managed only) Block CLI startup until remote managed settings are freshly fetched; exits on fetch failure | `true` |
| `gcpAuthRefresh` | Custom script that refreshes GCP Application Default Credentials | `gcloud auth application-default login` |
| `hooks` | Configure custom commands to run at lifecycle events | See hooks documentation |
| `httpHookAllowedEnvVars` | Allowlist of env var names HTTP hooks may interpolate into headers | `["MY_TOKEN", "HOOK_SECRET"]` |
| `includeGitInstructions` | Default `true`. Include built-in commit/PR workflow instructions and git status in the system prompt | `false` |
| `inputNeededNotifEnabled` | Default `false`. Push notification via Remote Control when a permission prompt/question is waiting | `true` |
| `language` | Claude's preferred response language; also sets voice dictation and auto-generated session title language | `"japanese"` |
| `minimumVersion` | Floor that prevents background auto-updates/`claude update` from installing a version below this | `"2.1.100"` |
| `model` | Override the default model. `--model` and `ANTHROPIC_MODEL` override this for one session | `"claude-sonnet-5"` |
| `modelOverrides` | Map Anthropic model IDs to provider-specific model IDs (e.g. Amazon Bedrock inference profile ARNs) | `{"claude-opus-4-6": "arn:aws:bedrock:..."}` |
| `otelHeadersHelper` | Script to generate dynamic OpenTelemetry headers, run at startup and periodically | `/bin/generate_otel_headers.sh` |
| `outputStyle` | Configure an output style to adjust the system prompt | `"Explanatory"` |
| `parentSettingsBehavior` | (Managed only) Default `"first-wins"`. Whether parent-process-supplied managed settings (Agent SDK/IDE) apply alongside an admin-deployed managed tier: `"first-wins"` or `"merge"` | `"merge"` |
| `permissions` | See Permission settings below | — |
| `plansDirectory` | Default `~/.claude/plans`. Customize where plan files are stored | `"./plans"` |
| `pluginSuggestionMarketplaces` | (Managed only) Marketplace names whose plugins can appear as contextual install suggestions | `["acme-corp-plugins"]` |
| `pluginTrustMessage` | (Managed only) Custom message appended to the plugin trust warning before installation | `"All plugins from our marketplace are approved by IT"` |
| `policyHelper` | Admin-deployed executable that computes managed settings dynamically at startup. MDM/system `managed-settings.json` only | `{"path": "/usr/local/bin/claude-policy"}` |
| `preferredNotifChannel` | Default `"auto"`. `"auto"`, `"terminal_bell"`, `"iterm2"`, `"iterm2_with_bell"`, `"kitty"`, `"ghostty"`, `"notifications_disabled"` | `"terminal_bell"` |
| `prefersReducedMotion` | Reduce/disable UI animations (spinners, shimmer, flash effects) | `true` |
| `processWrapper` | Corporate launcher command prefixing background processes Claude Code starts. `CLAUDE_CODE_PROCESS_WRAPPER` env var takes precedence | `"/opt/corp/launcher --profile claude"` |
| `prUrlTemplate` | URL template for the PR badge/tool-result summaries; substitutes `{host}`/`{owner}`/`{repo}`/`{number}`/`{url}` | `"https://reviews.example.com/{owner}/{repo}/pull/{number}"` |
| `remote.defaultEnvironmentId` | Default cloud environment for cloud sessions created from the CLI (e.g. `claude --cloud`) | `"env_0123abcd"` |
| `remoteControlAtStartup` | Auto-connect Remote Control at every session start instead of waiting for `/remote-control` | `false` |
| `requiredMaximumVersion` | (Managed only) Max Claude Code version allowed to start; exits at startup if the running version is newer | `"2.1.150"` |
| `requiredMinimumVersion` | (Managed only) Min Claude Code version required to start; exits at startup if the running version is older | `"2.1.150"` |
| `respectGitignore` | Default `true`. Whether the `@` file picker respects `.gitignore` patterns | `false` |
| `respondToBashCommands` | Default `true`. Whether Claude responds after an input-box `!` shell command runs | `false` |
| `showClearContextOnPlanAccept` | Default `false`. Show the "clear context" option on the plan accept screen | `true` |
| `showThinkingSummaries` | Default `false`. Show extended thinking summaries (unredacted) in interactive sessions | `true` |
| `showTurnDuration` | Default `true`. Show turn duration messages after responses (e.g. "Cooked for 1m 6s") | `false` |
| `skillListingBudgetFraction` | Default `0.01`. Fraction of the model's context window reserved for the skill listing shown each turn | `0.02` |
| `skillListingMaxDescChars` | Default `1536`. Per-skill character cap on combined `description`/`when_to_use` text in the skill listing | `2048` |
| `skillOverrides` | Per-skill visibility overrides keyed by skill name: `"on"`, `"name-only"`, `"user-invocable-only"`, `"off"` | `{"legacy-context": "name-only", "deploy": "off"}` |
| `skipWebFetchPreflight` | Skip the WebFetch domain safety check that pings `api.anthropic.com` before fetching; for egress-restricted deployments | `true` |
| `spinnerTipsEnabled` | Default `true`. Show tips in the spinner while Claude is working | `false` |
| `spinnerTipsOverride` | Override spinner tips with custom strings (`tips` array, `excludeDefault` boolean) | `{ "excludeDefault": true, "tips": ["Use our internal tool X"] }` |
| `spinnerVerbs` | Customize action verbs shown during a turn (`mode`: `"replace"` or `"append"`) | `{"mode": "append", "verbs": ["Pondering", "Crafting"]}` |
| `sshConfigs` | SSH connections shown in the Desktop environment dropdown (`id`, `name`, `sshHost`, optional `sshPort`/`sshIdentityFile`/`startDirectory`). Managed/user settings only | `[{"id": "dev-vm", "name": "Dev VM", "sshHost": "user@dev.example.com"}]` |
| `statusLine` | Configure a custom status line (`padding`, `refreshInterval`, `hideVimModeIndicator`) | `{"type": "command", "command": "~/.claude/statusline.sh"}` |
| `strictKnownMarketplaces` | (Managed only) Allowlist of plugin marketplace sources | `[{ "source": "github", "repo": "acme-corp/plugins" }]` |
| `strictPluginOnlyCustomization` | (Managed only) Block skills/agents/hooks/MCP servers from user and project sources; `true` locks all four, array locks named ones | `["skills", "hooks"]` |
| `switchModelsOnFlag` | Default `true`. Auto-switch to the fallback model when a safety classifier flags a request; `false` pauses to choose instead | `false` |
| `syntaxHighlightingDisabled` | Disable syntax highlighting in diffs, code blocks, file previews | `true` |
| `teammateMode` | Default `in-process`. Agent team teammate display: `in-process`, `auto`, `tmux`, `iterm2` | `"auto"` |
| `terminalProgressBarEnabled` | Default `true`. Show the terminal progress bar (ConEmu, Ghostty 1.2+, iTerm2 3.6.6+) | `false` |
| `theme` | Default `"dark"`. `"auto"`, `"dark"`, `"light"`, `"dark-daltonized"`, `"light-daltonized"`, `"dark-ansi"`, `"light-ansi"`, or `"custom:<slug>"` | `"dark"` |
| `tui` | Terminal UI renderer: `"fullscreen"` (flicker-free alt-screen) or `"default"` (classic). Set via `/tui` | `"fullscreen"` |
| `ultracode` | Turn on ultracode for the current session. Not read from `settings.json` directly — set via `/effort ultracode`, `--settings`, or an Agent SDK control request | `true` |
| `useAutoModeDuringPlan` | Default `true`. Whether plan mode uses auto mode semantics when auto mode is available. Not read from shared project settings | `false` |
| `verbose` | Default `false`. Show full tool output instead of truncated summaries. `--verbose` flag overrides for one session | `true` |
| `viewMode` | Default transcript view mode on startup: `"default"`, `"verbose"`, `"focus"` | `"verbose"` |
| `vimInsertModeRemaps` | Map two-key INSERT-mode sequences to Escape in vim editor mode. User/`--settings`/managed settings only | `{"jj": "<Esc>"}` |
| `voice` | Voice dictation settings: `enabled`, `mode` (`"hold"`/`"tap"`), `autoSubmit` | `{ "enabled": true, "mode": "tap" }` |
| `voiceEnabled` | Legacy alias for `voice.enabled`; prefer the `voice` object | `true` |
| `wheelScrollAccelerationEnabled` | Default `true`. Accelerate mouse-wheel scroll speed during fast scrolls in fullscreen rendering | `false` |
| `workflowKeywordTriggerEnabled` | Default `true`. Whether the keyword `ultracode` in a prompt triggers a dynamic workflow | `false` |
| `workflowSizeGuideline` | Default `medium`. Agent-count guidance for dynamic workflows Claude writes: `unrestricted`, `small`, `medium`, `large` | `"small"` |
| `wslInheritsWindowsSettings` | (Windows managed settings only) `true` makes Claude Code on WSL also read managed settings from the Windows policy chain | `true` |

## Global config settings

Stored in `~/.claude.json` rather than `settings.json`; adding these keys to `settings.json` is silently ignored at startup.

| Key | Description | Example |
| --- | --- | --- |
| `autoConnectIde` | Default `false`. Auto-connect to a running IDE when Claude Code starts from an external terminal | `true` |
| `autoInstallIdeExtension` | Default `true`. Auto-install the Claude Code IDE extension when running from a VS Code terminal | `false` |
| `diffTool` | Default `auto`. Where to display file diffs when an IDE is connected: `auto` (IDE diff viewer) or `terminal` | `"terminal"` |
| `externalEditorContext` | Default `false`. Prepend Claude's previous response as `#`-commented context when opening the external editor (Ctrl+G) | `true` |
| `permissionExplainerEnabled` | Default `true`. Show a model-generated command explanation on Ctrl+E at a Bash/PowerShell permission prompt | `false` |
| `teammateDefaultModel` | Default model for agent team teammates when the spawn prompt doesn't specify one; `null` inherits the lead's `/model` selection | `"sonnet"` |

## Worktree settings

Configure how `--worktree` creates and manages git worktrees.

| Key | Description | Example |
| --- | --- | --- |
| `worktree.baseRef` | Which ref new worktrees branch from: `"fresh"` (default, `origin/<default-branch>`) or `"head"` (current local `HEAD`) | `"head"` |
| `worktree.symlinkDirectories` | Directories to symlink from the main repository into each worktree (avoid duplicating large dirs) | `["node_modules", ".cache"]` |
| `worktree.sparsePaths` | Directories to check out per worktree via git sparse-checkout | `["packages/my-app", "shared/utils"]` |
| `worktree.bgIsolation` | Isolation mode for background sessions: `"worktree"` (default, blocks Edit/Write in main checkout until `EnterWorktree`) or `"none"` | `"none"` |

To copy gitignored files like `.env` into new worktrees, use a `.worktreeinclude` file in the project root instead of a setting.

## Permission settings

The `permissions` key's structure:

| Key | Description | Example |
| --- | --- | --- |
| `allow` | Array of permission rules to allow tool use. See Permission rule syntax (permissions docs) | `[ "Bash(git diff *)" ]` |
| `ask` | Array of permission rules to ask for confirmation | `[ "Bash(git push *)" ]` |
| `deny` | Array of permission rules to deny tool use; `"*"` denies every tool, `"mcp__*"` denies every MCP tool | `[ "WebFetch", "Bash(curl *)", "Read(./.env)", "Read(./secrets/**)" ]` |
| `additionalDirectories` | Additional working directories for file access (most `.claude/` configuration is not discovered from these) | `[ "../docs/" ]` |
| `defaultMode` | Default permission mode on open: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`, `manual` (alias for `default`). `auto` is ignored in project/local settings | `"acceptEdits"` |
| `disableAutoMode` | `"disable"` prevents auto mode activation (same as the top-level setting) | `"disable"` |
| `disableBypassPermissionsMode` | `"disable"` prevents `bypassPermissions` mode (disables `--dangerously-skip-permissions`) | `"disable"` |
| `skipDangerousModePermissionPrompt` | Skip the confirmation prompt before entering bypass permissions mode. Ignored in project settings | `true` |

## Attribution settings

`attribution` customizes git commit and pull request attribution text, for example `{"commit": "Generated with Claude Code", "pr": ""}` (empty string omits the PR attribution line).

## Related

- [env-vars.md](./env-vars.md): the environment-variable counterparts and precedence rules
- [claude-directory.md](./claude-directory.md): where each settings file lives on disk
- [debug-your-config.md](./debug-your-config.md): `/status`, `/doctor`, and other inspection commands
- [auto-mode-config.md](./auto-mode-config.md): the full `autoMode` reference
- [model-config.md](./model-config.md), [statusline.md](./statusline.md), [keybindings.md](./keybindings.md): the pages dedicated to `model`/`modelOverrides`, `statusLine`, and keybindings respectively
