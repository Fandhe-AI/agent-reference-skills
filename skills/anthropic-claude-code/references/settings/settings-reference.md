<!-- source: https://code.claude.com/docs/en/settings-reference.md / last verified: 2026-10-17 -->

# All settings

Complete reference for every Claude Code `settings.json` key: where each one goes, its type and default, and a paste-ready example, with an index of every key. This page distills the index plus the per-topic structure; each key's full entry (type, default, per-session overrides, example) is on the official page.

## Signature / Usage

Each key's entry on the official page uses the same fields: **Scope**, **Type**, **Default**, optional **Per-session overrides**, then a JSON example.

```json
{
  "permissions": {
    "allow": ["Bash(npm run *)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(./.env)"],
    "defaultMode": "acceptEdits"
  }
}
```

Scope values used in the index (the files a key can go in): `User` is `~/.claude/settings.json`, `Project` is `.claude/settings.json`, `Local` is `.claude/settings.local.json`, `Managed` is what your organization deploys. `Any file` means all four; `Global config` means `~/.claude.json`.

## Options / Props

Sections of the official page that hold each key's entry (the Topic column below): Model and responses, Permission settings, Sandbox settings, Memory and context, Interface and terminal, Git and attribution, Hooks and automation, Plugins and skills, MCP, Agents / sessions / worktrees, Remote / desktop / notifications, Authentication and providers, Updates and versioning, Tools, Privacy and telemetry, Enterprise and managed settings, Global config settings.

### Settings index

| Key | Description | Topic | Scope |
| --- | --- | --- | --- |
| `advisorModel` | Pick which model answers when Claude asks the advisor tool | Model and responses | Any file |
| `agent` | Start every session as a named subagent with its prompt, tools, and model | Agents, sessions, and worktrees | Any file |
| `agentPushNotifEnabled` | Let Claude send a push notification to your phone when it decides to | Remote, desktop, and notifications | Any file |
| `allowAllClaudeAiMcps` | Load the claude.ai connectors Claude Code fetches itself alongside a deployed `managed-mcp.json` | MCP | Managed |
| `allowClaudeInChromeWithManagedMcp` | Let the built-in Claude in Chrome server run alongside a deployed `managed-mcp.json` | MCP | Managed |
| `allowedChannelPlugins` | Replace the default allowlist of channel plugins that can push messages | Plugins and skills | Managed |
| `allowedHttpHookUrls` | Limit which URLs HTTP hooks can target | Hooks and automation | Any file |
| `allowedMcpServers` | Allowlist which MCP servers users can add | MCP | Any file |
| `allowedProviders` | Limit which API providers a machine may use | Authentication and providers | Managed |
| `allowManagedHooksOnly` | Run only the hooks your organization deploys | Hooks and automation | Managed |
| `allowManagedMcpServersOnly` | Make the managed MCP allowlist the only one that applies | MCP | Managed |
| `allowManagedPermissionRulesOnly` | Make managed settings the only settings source of permission rules | Permission settings | Managed |
| `alwaysThinkingEnabled` | Turn extended thinking off for every session | Model and responses | Any file |
| `apiKeyHelper` | Generate the API credential with your own command | Authentication and providers | Any file |
| `askUserQuestionTimeout` | Let an unanswered question auto-continue after idle time | Interface and terminal | User or managed |
| `appendPlugins` | Run your organization's mods after every mod a user installs | Plugins and skills | User or managed |
| `attribution` | Customize the attribution Claude Code adds to commits and pull requests | Git and attribution | Any file |
| `attribution.commit` | Change or hide the trailer Claude Code adds to commits | Git and attribution | Any file |
| `attribution.pr` | Change or hide the attribution line in pull request descriptions | Git and attribution | Any file |
| `attribution.sessionUrl` | Omit the claude.ai session link from cloud and Remote Control commits | Git and attribution | Any file |
| `autoCompactEnabled` | Turn automatic compaction off or on | Memory and context | Any file |
| `autoCompactWindow` | Set how full the context gets before Claude Code compacts | Memory and context | Any file |
| `autoConnectIde` | Connect to a running VS Code or JetBrains IDE automatically from an external terminal | Global config settings | Global config |
| `autoContinueAtUsageLimit` | Wait in the open session and continue the task automatically after a claude.ai usage limit resets | Interface and terminal | User or managed |
| `autoInstallIdeExtension` | Turn off automatic install of the IDE extension from a VS Code terminal | Global config settings | Global config |
| `autoMemoryDirectory` | Store auto memory in a directory you choose | Memory and context | Any file |
| `autoMemoryEnabled` | Turn auto memory off or on | Memory and context | Any file |
| `autoMode` | Add your own allow and deny rules to the auto mode classifier | Permission settings | User or managed |
| `autoMode.classifyAllShell` | Send every shell command through the auto mode classifier, even ones a narrow allow rule matches | Permission settings | User or managed |
| `autoScrollEnabled` | Follow new output to the bottom in fullscreen rendering | Interface and terminal | Any file |
| `autoUpdatesChannel` | Follow the stable release channel instead of latest | Updates and versioning | Any file |
| `availableModels` | Restrict which models people can pick | Model and responses | Any file |
| `availableModelsMatch` | Make each `availableModels` model ID entry permit only the version it names | Model and responses | Managed |
| `awaySummaryEnabled` | Turn off the session recap shown when you come back to the terminal | Remote, desktop, and notifications | Any file |
| `awsAuthRefresh` | Refresh expired Bedrock credentials in `.aws` with your own command | Authentication and providers | Any file |
| `awsCredentialExport` | Supply Bedrock credentials as JSON from your own command | Authentication and providers | Any file |
| `axScreenReader` | Render screen-reader friendly output | Interface and terminal | Any file |
| `bashEditDiffEnabled` | Record the files that changed while a Bash command ran in every permission mode | Interface and terminal | User or managed |
| `bashOutputMaxChars` | Set how much of a successful command's output Claude receives inline | Memory and context | Any file |
| `blockedMarketplaces` | Block plugin marketplace sources for your organization | Plugins and skills | Managed |
| `browserExternalPageTools` | Keep Claude's tools off external pages in the desktop Browser pane | Tools | Managed |
| `channelsEnabled` | Allow channels for your organization | Plugins and skills | Managed |
| `claudeInChromeDefaultEnabled` | Turn on Chrome integration when a session starts, in the interactive CLI and the VS Code extension | Global config settings | Global config |
| `claudeMd` | Inject organization-wide CLAUDE.md instructions from managed settings | Memory and context | Managed |
| `claudeMdExcludes` | Skip specific CLAUDE.md files when memory loads | Memory and context | Any file |
| `cleanupPeriodDays` | Choose how many days Claude Code keeps transcripts before deleting them | Privacy and telemetry | Any file |
| `companyAnnouncements` | Show your organization's announcements at startup | Interface and terminal | Any file |
| `copyFullResponse` | Make `/copy` copy the full response without showing the picker | Global config settings | Global config |
| `copyOnSelect` | Turn off automatic copying of text you select with the mouse in fullscreen rendering and agent view | Global config settings | Global config |
| `crossSessionInbound` | Choose whether Claude Code delivers messages from your other sessions, shows a notice without delivering them, or refuses them | Agents, sessions, and worktrees | Any file |
| `defaultShell` | Choose whether Bash or PowerShell runs the shell commands you type with the `!` prefix | Interface and terminal | Any file |
| `defaultToAgentsView` | Open agent view instead of a new conversation when you run `claude` with no arguments | Global config settings | Global config |
| `deniedMcpServers` | Block specific MCP servers by URL, command, or name | MCP | Any file |
| `deniedModels` | Block specific models, even ones `availableModels` permits | Model and responses | Managed |
| `desktopSessionCleanupPeriodDays` | Set an age limit in days for Claude Desktop and Cowork transcripts | Privacy and telemetry | User or managed |
| `dialogExpiry` | Set how long Claude Code waits for Remote Control or an SDK host to answer a forwarded dialog before it cancels the dialog | Interface and terminal | User or managed |
| `diffTool` | Choose whether Claude's proposed file changes open in the VS Code or JetBrains diff viewer or stay in the terminal | Global config settings | Global config |
| `disableAgentView` | Turn off background agents and agent view | Agents, sessions, and worktrees | Any file |
| `disableAllHooks` | Turn off hooks, a custom status line, and a custom `@` file suggestion command at once | Hooks and automation | Any file |
| `disableArtifact` | Deprecated; use `enableArtifact` to turn the Artifact tool off | Remote, desktop, and notifications | Any file |
| `disableAutoMode` | Remove auto mode from the permission mode cycle | Permission settings | Any file |
| `disableBrowserExternalNavigation` | Limit the desktop Browser pane to localhost for people and Claude | Tools | Managed |
| `disableBundledSkills` | Turn off the skills and workflows included with Claude Code | Plugins and skills | Any file |
| `disableClaudeAiConnectors` | Turn off claude.ai connectors so Claude Code doesn't fetch them | MCP | Any file |
| `disableCommandPluginSources` | Block plugins that install by running a marketplace-declared command | Plugins and skills | Managed |
| `disableDeepLinkRegistration` | Stop Claude Code from registering the `claude-cli://` handler | Remote, desktop, and notifications | Any file |
| `disableDesktopLocalSessions` | Turn off Desktop Code sessions that run on the device, leaving SSH to other hosts and cloud | Remote, desktop, and notifications | Managed |
| `disabledMcpjsonServers` | Reject specific servers from a project's `.mcp.json` | MCP | Any file |
| `disableMobileSimulatorTools` | Block Claude's tools in the desktop iOS Simulator pane | Tools | Managed |
| `disableRemoteControl` | Turn off Remote Control everywhere it can start | Remote, desktop, and notifications | Any file |
| `disableSideloadFlags` | Reject the CLI flags that sideload plugins, subagents, and MCP servers | Enterprise and managed settings | Managed |
| `disableSkillShellExecution` | Stop skills and custom commands from running inline shell | Plugins and skills | Any file |
| `disableWorkflows` | Turn dynamic workflows off for everyone; use `enableWorkflows` for yourself | Hooks and automation | Any file |
| `editorMode` | Use vim key bindings in the input prompt | Interface and terminal | Any file |
| `effortLevel` | Set a default effort level for models without a saved level of their own | Model and responses | Any file |
| `emojiCompletionEnabled` | Turn off `:shortcode:` emoji suggestions and replacement in the prompt input | Interface and terminal | Any file |
| `enableAllProjectMcpServers` | Approve every server in project `.mcp.json` files without a prompt | MCP | Any file |
| `enableArtifact` | Turn the Artifact tool off with a `false` in any file; no file can turn it back on | Remote, desktop, and notifications | Any file |
| `enabledMcpjsonServers` | Approve specific servers from a project's `.mcp.json` | MCP | Any file |
| `enabledPlugins` | Turn individual plugins on or off per scope | Plugins and skills | Any file |
| `enableWorkflows` | Turn dynamic workflows on or off against your plan's default | Hooks and automation | Any file |
| `enforceAvailableModels` | Keep the `/model` Default choice inside your `availableModels` allowlist | Model and responses | Any file |
| `env` | Set environment variables for every session and its subprocesses | Memory and context | Any file |
| `externalEditorContext` | Show Claude's last response as comments when you press Ctrl+G to edit | Global config settings | Global config |
| `extraKnownMarketplaces` | Register marketplaces for a repository or an organization | Plugins and skills | Any file |
| `fallbackModel` | Name backup models for when the primary is overloaded | Model and responses | Any file |
| `fastMode` | Turn fast mode on for sessions where it's available | Model and responses | Any file |
| `fastModePerSessionOptIn` | Require people to turn fast mode on each session | Model and responses | Any file |
| `feedbackDrafts` | Control whether Claude queues feedback drafts for you to review | Privacy and telemetry | User or managed |
| `feedbackSurveyRate` | Change how often the session quality survey appears | Privacy and telemetry | Any file |
| `fileCheckpointingEnabled` | Turn off or on the file snapshots that `/rewind` restores | Memory and context | Any file |
| `fileSuggestion` | Supply `@` file autocomplete from your own command | Interface and terminal | Any file |
| `footerLinksRegexes` | Make issue or review IDs in output into clickable links below the input box | Interface and terminal | User or managed |
| `forceLoginGatewayUrl` | Set the gateway URL the login screen connects to | Authentication and providers | User or managed |
| `forceLoginMethod` | Restrict login to claude.ai, Claude Console, or a cloud gateway | Authentication and providers | Any file |
| `forceLoginOrgUUID` | Pin claude.ai logins to your organization; only a managed source enforces it | Authentication and providers | Any file |
| `forceRemoteSettingsRefresh` | Block startup until server-managed settings are freshly fetched | Enterprise and managed settings | Managed |
| `gatewayInternalNetworks` | Let `/login` reach a cloud gateway on public IPv4 space your organization uses internally | Authentication and providers | Managed |
| `gcpAuthRefresh` | Refresh Google Cloud credentials with your own command | Authentication and providers | Any file |
| `hooks` | Run your own commands as hooks at points in Claude Code's lifecycle | Hooks and automation | Any file |
| `httpHookAllowedEnvVars` | Limit which env vars HTTP hooks can put in headers | Hooks and automation | Any file |
| `idleCompaction` | Stop Claude Code from compacting a long conversation while your terminal session is idle | Memory and context | Any file |
| `includeCoAuthoredBy` | Deprecated; use `attribution` to hide or change commit and PR attribution | Git and attribution | Any file |
| `includeGitInstructions` | Remove the built-in commit and PR instructions from Claude's context | Git and attribution | Any file |
| `inputNeededNotifEnabled` | Get a push notification when Claude is waiting on you | Remote, desktop, and notifications | Any file |
| `isolatePeerMachines` | Ask you before Claude messages one of your sessions on another machine | Agents, sessions, and worktrees | Any file |
| `keybindingFlavor` | Deprecated and has no effect; the word-editing shortcuts always follow readline conventions | Interface and terminal | Any file |
| `language` | Have Claude respond in a language other than English | Model and responses | Any file |
| `leftArrowOpensAgents` | Turn off the `←` shortcut that backgrounds the session and opens agent view | Global config settings | Global config |
| `managedMcpServers` | Provide remote MCP servers to every user alongside the ones they add | MCP | Managed |
| `managedSourcesBehavior` | Compose every managed source you deploy instead of using the highest-priority one alone | Enterprise and managed settings | Managed |
| `maxEffortLevel` | Cap the effort level for every model or per model, on every provider | Model and responses | Any file |
| `maxProseWidth` | Cap how wide the prose in Claude's responses runs in a wide terminal | Interface and terminal | Any file |
| `minimumVersion` | Keep auto-updates from installing anything below a version | Updates and versioning | Any file |
| `model` | Change the model Claude Code starts with | Model and responses | Any file |
| `modelOverrides` | Map model IDs to your provider's IDs, such as Bedrock ARNs | Model and responses | Any file |
| `modelPicker` | Choose which models the `/model` picker lists, in your own order and with your own labels | Model and responses | User or managed |
| `modelPricing` | Report spend at your organization's contracted rates instead of list price | Model and responses | Managed |
| `modelSettings` | Keep a saved effort level or auto-compact window per model, or cap one model's effort | Model and responses | Any file |
| `otelHeadersHelper` | Generate rotating OpenTelemetry headers with your own command | Authentication and providers | Any file |
| `outputStyle` | Change Claude's role, tone, and output format with an output style | Model and responses | Any file |
| `parentSettingsBehavior` | Apply or drop restrictions an SDK or IDE host passes when you deploy managed settings | Enterprise and managed settings | Managed |
| `permissionExplainerEnabled` | Removed in v2.1.257, together with the `Ctrl+E` command explanation on shell permission prompts | Global config settings | Global config |
| `permissions` | Set allow, ask, and deny rules and the starting permission mode | Permission settings | Any file |
| `permissions.additionalDirectories` | Give Claude file access to directories outside the current one | Permission settings | Any file |
| `permissions.allow` | Approve listed tool uses without a prompt | Permission settings | Any file |
| `permissions.ask` | Always prompt before listed tool uses | Permission settings | Any file |
| `permissions.blockReadsOutsideWorkingDirectories` | Make the file tools refuse reads outside the working directories in every permission mode | Permission settings | Any file |
| `permissions.defaultMode` | Set the permission mode new sessions start in | Permission settings | Any file |
| `permissions.deny` | Block listed tool uses, including reads of files that hold secrets | Permission settings | Any file |
| `permissions.disableBypassPermissionsMode` | Prevent anyone from entering bypassPermissions mode | Permission settings | Any file |
| `plansDirectory` | Choose where plan mode writes plan files | Memory and context | Any file |
| `pluginConfigs` | Store the answers you gave a plugin's configuration dialog | Plugins and skills | User or managed |
| `pluginSuggestionMarketplaces` | Choose which marketplaces can surface plugin install suggestions in `/plugin` | Plugins and skills | Managed |
| `pluginTrustMessage` | Add your own text to the plugin trust warning | Plugins and skills | Managed |
| `policyHelper` | Run an executable that computes managed settings at startup | Enterprise and managed settings | Managed |
| `policyHelper.path` | Name the helper executable Claude Code runs | Enterprise and managed settings | Managed |
| `policyHelper.refreshIntervalMs` | Re-run the helper in the background on an interval | Enterprise and managed settings | Managed |
| `policyHelper.timeoutMs` | Set how long Claude Code waits for the helper | Enterprise and managed settings | Managed |
| `preferredNotifChannel` | Choose a terminal bell or desktop notification for task completion | Remote, desktop, and notifications | Any file |
| `prefersReducedMotion` | Reduce or turn off spinner, shimmer, and flash animations | Interface and terminal | Any file |
| `prependPlugins` | Run your organization's mods before every mod a user installs | Plugins and skills | User or managed |
| `processWrapper` | Run Claude Code's background processes through a corporate launcher on macOS and Linux | Agents, sessions, and worktrees | User or managed |
| `promptCacheTtl` | Choose the prompt cache lifetime for the main conversation | Model and responses | Any file |
| `promptSuggestionEnabled` | Hide the grayed-out prompt suggestions in the input box | Interface and terminal | Any file |
| `prStatusFooterEnabled` | Turn off the prompt footer's PR review status badge and the pull request check behind it | Global config settings | Global config |
| `prUrlTemplate` | Point PR links at an internal code-review tool instead of github.com | Git and attribution | Any file |
| `remote.defaultEnvironmentId` | Pick the default cloud environment for `claude --cloud`; a self-hosted `ccpool_` ID is read only from user and managed settings and `--settings` | Remote, desktop, and notifications | Any file |
| `remoteControlAtStartup` | Connect Remote Control automatically when a session starts | Remote, desktop, and notifications | Any file |
| `requiredMaximumVersion` | Refuse to start on a version newer than your organization allows | Updates and versioning | Managed |
| `requiredMinimumVersion` | Refuse to start on a version older than your organization requires | Updates and versioning | Managed |
| `respectGitignore` | Keep gitignored files out of the `@` file picker | Interface and terminal | Any file |
| `respondToBashCommands` | Stop Claude from responding after a `!` shell command runs | Interface and terminal | Any file |
| `sandbox` | Isolate Bash commands from your filesystem and network on macOS, Linux, and WSL2 | Sandbox settings | Any file |
| `sandbox.allowAppleEvents` | Let sandboxed commands send Apple Events on macOS | Sandbox settings | User or managed |
| `sandbox.allowUnsandboxedCommands` | Let Claude retry a blocked command outside the sandbox, or forbid it | Sandbox settings | Any file |
| `sandbox.autoAllowBashIfSandboxed` | Run sandboxed commands without a permission prompt | Sandbox settings | Any file |
| `sandbox.bwrapPath` | Point the sandbox at a bubblewrap binary outside `PATH` | Sandbox settings | Managed |
| `sandbox.credentials` | Hide or mask credential files and variables inside the sandbox | Sandbox settings | Any file |
| `sandbox.credentials.allowPlaintextInject` | Let masked credentials reach plain HTTP services on trusted test networks | Sandbox settings | User or managed |
| `sandbox.credentials.awsPairs` | Link custom-named AWS key variables into one credential for re-signing | Sandbox settings | User or managed |
| `sandbox.credentials.envVars` | Unset or mask an environment variable inside the sandbox | Sandbox settings | Any file |
| `sandbox.credentials.files` | Block or mask reads of a credential file inside the sandbox | Sandbox settings | Any file |
| `sandbox.credentials.sigv4` | Choose whether streaming, presigned, or SigV4A AWS requests fail or pass through | Sandbox settings | User or managed |
| `sandbox.enabled` | Turn on Bash sandboxing on macOS, Linux, and WSL2 | Sandbox settings | Any file |
| `sandbox.enableWeakerNestedSandbox` | Run the Linux sandbox inside an unprivileged container | Sandbox settings | Any file |
| `sandbox.enableWeakerNetworkIsolation` | Let `gh`, `gcloud`, and `terraform` verify TLS behind a MITM proxy inside the sandbox on macOS | Sandbox settings | Any file |
| `sandbox.excludedCommands` | Name commands Claude Code can run outside the sandbox | Sandbox settings | Any file |
| `sandbox.failIfUnavailable` | Refuse to start when the sandbox can't, instead of running unsandboxed | Sandbox settings | Any file |
| `sandbox.filesystem` | Control which paths sandboxed commands can read and write | Sandbox settings | Any file |
| `sandbox.filesystem.allowManagedReadPathsOnly` | Stop developers from re-opening read paths your organization blocked | Sandbox settings | Managed |
| `sandbox.filesystem.allowRead` | Re-open reading inside a region `denyRead` blocks | Sandbox settings | Any file |
| `sandbox.filesystem.allowWrite` | Add paths sandboxed commands can write to | Sandbox settings | Any file |
| `sandbox.filesystem.denyRead` | Block sandboxed commands from reading specific paths | Sandbox settings | Any file |
| `sandbox.filesystem.denyWrite` | Block sandboxed commands from writing to specific paths | Sandbox settings | Any file |
| `sandbox.filesystem.disabled` | Turn off filesystem isolation while keeping network isolation | Sandbox settings | User or managed |
| `sandbox.ignoreViolations` | Silence violation reports for paths a command is expected to probe | Sandbox settings | Any file |
| `sandbox.network` | Control which hosts, ports, and sockets sandboxed commands reach | Sandbox settings | Any file |
| `sandbox.network.allowAllUnixSockets` | Let sandboxed commands connect to every Unix socket | Sandbox settings | Any file |
| `sandbox.network.allowedDomains` | Pre-allow domains so sandboxed commands don't prompt for them | Sandbox settings | Any file |
| `sandbox.network.allowLocalBinding` | Let sandboxed commands listen on network ports and connect to localhost on macOS | Sandbox settings | Any file |
| `sandbox.network.allowMachLookup` | Let macOS sandboxed tools like the iOS Simulator or Playwright reach their XPC services | Sandbox settings | Any file |
| `sandbox.network.allowManagedDomainsOnly` | Lock the network allowlist to managed settings | Sandbox settings | Managed |
| `sandbox.network.allowUnixSockets` | List Unix socket paths sandboxed commands can use on macOS | Sandbox settings | Any file |
| `sandbox.network.deniedDomains` | Block domains for sandboxed commands, even inside an allowed wildcard | Sandbox settings | Any file |
| `sandbox.network.httpProxyPort` | Route sandbox HTTP traffic through your own proxy | Sandbox settings | Any file |
| `sandbox.network.socksProxyPort` | Route sandbox SOCKS traffic through your own proxy | Sandbox settings | Any file |
| `sandbox.network.strictAllowlist` | Deny hosts outside the allowlist instead of prompting | Sandbox settings | User or managed |
| `sandbox.network.tlsTerminate` | Have the sandbox proxy terminate TLS so it can read HTTPS requests | Sandbox settings | User or managed |
| `sandbox.ripgrep` | Use your own ripgrep binary inside the sandbox | Sandbox settings | User or managed |
| `sandbox.socatPath` | Point the sandbox proxy at a `socat` binary outside `PATH` | Sandbox settings | Managed |
| `showClearContextOnPlanAccept` | Show a "clear context" option on the plan accept screen | Interface and terminal | Any file |
| `showThinkingSummaries` | See summaries of Claude's thinking instead of a collapsed stub | Model and responses | Any file |
| `showTurnDuration` | Hide the "Cooked for" duration after each response | Interface and terminal | Any file |
| `skillListingBudgetFraction` | Reserve more or less context for the skill listing | Memory and context | Any file |
| `skillListingMaxDescChars` | Cap each skill's description length in the skill listing | Memory and context | Any file |
| `skillOverrides` | Hide or collapse a skill without editing its SKILL.md | Plugins and skills | Any file |
| `skipAutoPermissionPrompt` | Skip the one-time notice Claude Code shows when you first enter auto mode yourself rather than through the built-in default | Permission settings | User or managed |
| `skipDangerousModePermissionPrompt` | Skip the confirmation dialog before bypassPermissions mode | Permission settings | User, local, or managed |
| `skipWebFetchPreflight` | Skip the WebFetch hostname check when Anthropic is unreachable | Privacy and telemetry | Any file |
| `spellcheck` | Underline misspelled words in the prompt input with a spell checker you install | Interface and terminal | User or managed |
| `spinnerTipsEnabled` | Hide tips in the spinner while Claude works | Interface and terminal | Any file |
| `spinnerTipsOverride` | Add your own tips to the spinner rotation, or replace the built-in tips | Interface and terminal | Any file |
| `spinnerVerbs` | Add or replace the verbs shown while a turn runs | Interface and terminal | Any file |
| `sshConfigs` | Add SSH connections to the Desktop environment dropdown | Remote, desktop, and notifications | User or managed |
| `sshHostAllowlist` | Limit which hosts Desktop SSH sessions can reach | Remote, desktop, and notifications | Managed |
| `statusLine` | Run your own command to render a status line below the prompt | Interface and terminal | Any file |
| `strictKnownMarketplaces` | Allowlist the marketplace sources users can add and install from | Plugins and skills | Managed |
| `strictPluginOnlyCustomization` | Block skills, agents, hooks, and MCP servers from user and project sources | Plugins and skills | Managed |
| `strictPluginOnlyCustomization.agents` | Lock agents to plugin and managed sources | Plugins and skills | Managed |
| `strictPluginOnlyCustomization.hooks` | Lock hooks to plugin and managed sources | Plugins and skills | Managed |
| `strictPluginOnlyCustomization.mcp` | Lock MCP servers to plugin and managed sources | Plugins and skills | Managed |
| `strictPluginOnlyCustomization.skills` | Lock skills to plugin and managed sources | Plugins and skills | Managed |
| `subagentPromptCacheTtl` | Choose the prompt cache lifetime for subagents and other requests outside the main conversation | Model and responses | Any file |
| `subagentStatusLine` | Rewrite rows in the subagent task display with your own command | Interface and terminal | Any file |
| `switchModelsOnFlag` | Switch models automatically or pause when a safety classifier flags a request | Model and responses | Any file |
| `syncClaudeAiPlugins` | Stop loading the plugins enabled on your claude.ai account and stop downloading new ones | Plugins and skills | User, local, or managed |
| `syncClaudeAiSkills` | Stop loading the skills enabled on your claude.ai account and stop downloading new ones | Plugins and skills | User, local, or managed |
| `syntaxHighlightingDisabled` | Turn off syntax highlighting in diffs and code blocks | Interface and terminal | Any file |
| `taskOutputMaxChars` | Removed in v2.1.277, together with the `TaskOutput` tool it sized | Memory and context | Any file |
| `teammateDefaultModel` | Removed in v2.1.234; see "Specify teammates and models" in the agent teams docs for how Claude Code picks a teammate's model | Global config settings | Global config |
| `teammateMode` | Choose how agent team teammates display | Agents, sessions, and worktrees | Any file |
| `terminalProgressBarEnabled` | Hide the terminal progress bar in terminals that support it | Interface and terminal | Any file |
| `terminalTitleFromRename` | Stop `/rename` and `--name` from changing the terminal tab title | Interface and terminal | Any file |
| `theme` | Pick the interface color theme, built-in or custom | Interface and terminal | Any file |
| `timeFormat` | Show the times in the interface on a 12-hour or 24-hour clock, in UTC, or with a strftime pattern | Interface and terminal | Any file |
| `timeZone` | Show the times in the interface in a time zone other than your system's | Interface and terminal | Any file |
| `tui` | Choose the fullscreen or classic terminal renderer | Interface and terminal | Any file |
| `ultracode` | Have Claude plan a workflow for each substantive task without being asked | Model and responses | Any file |
| `useAutoModeDuringPlan` | Let the auto mode classifier review shell commands in plan mode; set `false` to get prompts instead | Permission settings | User, local, or managed |
| `verbose` | Show full tool output instead of truncated summaries; `viewMode` takes precedence when both are set | Interface and terminal | Any file |
| `viewMode` | Start every session in default, verbose, or focus view | Interface and terminal | Any file |
| `vimInsertModeRemaps` | Map a two-key INSERT-mode sequence such as `jj` to Escape | Interface and terminal | User or managed |
| `voice` | Turn on voice dictation and pick hold or tap mode | Interface and terminal | Any file |
| `voiceEnabled` | Turn on voice dictation with the older single-key form | Interface and terminal | Any file |
| `wheelScrollAccelerationEnabled` | Turn off mouse-wheel acceleration in fullscreen rendering | Interface and terminal | Any file |
| `workflowKeywordTriggerEnabled` | Let the word `ultracode` in a prompt start a workflow; set `false` to type it without starting one | Hooks and automation | Any file |
| `workflowSizeGuideline` | Set the agent count Claude aims for in dynamic workflows | Hooks and automation | Any file |
| `worktree` | Configure how Claude Code creates git worktrees | Agents, sessions, and worktrees | Any file |
| `worktree.baseRef` | Branch new worktrees from the remote default branch or your local HEAD | Agents, sessions, and worktrees | Any file |
| `worktree.bgIsolation` | Let background sessions edit the working copy without a worktree | Agents, sessions, and worktrees | Any file |
| `worktree.location` | Choose where Desktop SSH sessions create their worktrees on a remote machine | Agents, sessions, and worktrees | User |
| `worktree.sparsePaths` | Check out only the directories you need in each worktree | Agents, sessions, and worktrees | Any file |
| `worktree.symlinkDirectories` | Symlink large directories into each worktree instead of duplicating them | Agents, sessions, and worktrees | Any file |
| `wslInheritsWindowsSettings` | Have WSL read managed settings from the Windows policy chain | Enterprise and managed settings | Managed |

### Value types

Type and Default per key, copied from each key's entry on the official page. `unset` means the key has no default value. `taskOutputMaxChars` is removed and has no Type.

| Key | Type / values | Default |
| --- | --- | --- |
| `advisorModel` | string: alias `"fable"`, `"opus"`, or `"sonnet"`, or a full model ID such as `"claude-opus-5-5"` | unset (advisor off) |
| `alwaysThinkingEnabled` | Boolean (`true` no effect; `false` turns extended thinking off) | unset (thinking on) |
| `availableModels` | array of model aliases or IDs | unset (every model available) |
| `availableModelsMatch` | string: `"prefix"` or `"exact"` | `"prefix"` |
| `deniedModels` | array of model aliases or IDs | unset (no model blocked) |
| `effortLevel` | string: `"low"`, `"medium"`, `"high"`, `"xhigh"` | unset |
| `enforceAvailableModels` | Boolean | `false` |
| `fallbackModel` | array of model aliases or IDs; `"default"` expands to the default model | unset |
| `fastMode` | Boolean | unset (off) |
| `fastModePerSessionOptIn` | Boolean | `false` |
| `language` | string, any language name such as `"japanese"`; not validated | unset |
| `maxEffortLevel` | string: `"low"`, `"medium"`, `"high"`, `"xhigh"`, `"max"` (`"max"` sets no cap) | unset (no cap) |
| `model` | string, a model alias or full model ID | unset (account default model) |
| `modelOverrides` | object mapping model ID to provider model ID | unset |
| `modelPicker` | object with `options` array and optional `replaceBuiltInOptions` Boolean | unset (built-in lineup) |
| `modelPricing` | object with optional `multiplier` and optional `overrides` map | unset (list price) |
| `modelSettings` | object mapping a model name to an object with `effortLevel` (`"low"`/`"medium"`/`"high"`/`"xhigh"`), `maxEffortLevel`, `autoCompactWindow` (100000 to 1000000, or `"auto"`; v2.1.288+) | unset |
| `outputStyle` | string, name of a built-in or custom output style | unset (default style) |
| `promptCacheTtl` | string: `"5m"` or `"1h"` | unset |
| `showThinkingSummaries` | Boolean | `false` |
| `subagentPromptCacheTtl` | string: `"5m"` or `"1h"` | unset |
| `switchModelsOnFlag` | Boolean | unset (switches automatically, may ask first in interactive sessions) |
| `ultracode` | Boolean | unset (off) |
| `allowManagedPermissionRulesOnly` | Boolean | unset |
| `autoMode` | object with `environment`, `allow`, `soft_deny`, `hard_deny` arrays of prose rules, plus `classifyAllShell` Boolean | unset (built-in rules only) |
| `autoMode.classifyAllShell` | Boolean | `false` |
| `disableAutoMode` | the string `"disable"` | unset |
| `permissions` | object with `allow`, `ask`, `deny`, `additionalDirectories`, `blockReadsOutsideWorkingDirectories`, `defaultMode`, `disableBypassPermissionsMode`, `disableAutoMode` | unset |
| `useAutoModeDuringPlan` | Boolean | `true` |
| `permissions.allow` / `.ask` / `.deny` | array of permission rule strings | unset |
| `permissions.additionalDirectories` | array of directory paths | unset |
| `permissions.blockReadsOutsideWorkingDirectories` | Boolean | unset (follows permission mode) |
| `permissions.defaultMode` | string: `"default"`, `"acceptEdits"`, `"plan"`, `"auto"`, `"dontAsk"`, `"bypassPermissions"`, `"manual"` (alias for `"default"`) | unset |
| `permissions.disableBypassPermissionsMode` | the string `"disable"` | unset |
| `skipAutoPermissionPrompt` | Boolean | unset (notice appears once) |
| `skipDangerousModePermissionPrompt` | Boolean | unset (dialog appears) |
| `sandbox` | object with `enabled`, `failIfUnavailable`, `autoAllowBashIfSandboxed`, `excludedCommands`, `allowUnsandboxedCommands`, `enableWeakerNestedSandbox`, `enableWeakerNetworkIsolation`, `allowAppleEvents`, `bwrapPath`, `socatPath`, `ignoreViolations`, `ripgrep`, plus `filesystem`, `network`, `credentials` objects | unset (no sandbox) |
| `sandbox.enabled` | Boolean | `false` |
| `sandbox.failIfUnavailable` | Boolean | `false` |
| `sandbox.autoAllowBashIfSandboxed` | Boolean | `true` |
| `sandbox.excludedCommands` | array of command patterns | unset |
| `sandbox.allowUnsandboxedCommands` | Boolean | `true` |
| `sandbox.filesystem` | object with `allowWrite`, `denyWrite`, `denyRead`, `allowRead` arrays, plus `allowManagedReadPathsOnly` and `disabled` Booleans | unset |
| `sandbox.filesystem.allowWrite` / `.denyWrite` / `.denyRead` / `.allowRead` | array of path strings using the sandbox path prefixes | unset |
| `sandbox.filesystem.allowManagedReadPathsOnly` | Boolean | `false` |
| `sandbox.filesystem.disabled` | Boolean | `false` (filesystem isolation stays on) |
| `sandbox.ignoreViolations` | object mapping a command substring to an array of violation substrings | unset |
| `sandbox.enableWeakerNestedSandbox` | Boolean | `false` |
| `sandbox.enableWeakerNetworkIsolation` | Boolean | `false` |
| `sandbox.allowAppleEvents` | Boolean | `false` |
| `sandbox.ripgrep` | object with `command` (path to ripgrep binary) and optional `args` array | unset |
| `sandbox.bwrapPath` / `sandbox.socatPath` | string, an absolute path (relative path dropped; falls back to `PATH` lookup) | unset |
| `sandbox.credentials` | object with `files`, `envVars`, `allowPlaintextInject`, `awsPairs`, `sigv4` | unset |
| `sandbox.credentials.files` | array of objects with `path` and `mode` of `"deny"` or `"mask"`, plus optional mask fields | unset |
| `sandbox.credentials.envVars` | array of objects with `name` and `mode` of `"deny"` or `"mask"`, plus optional mask fields | unset |
| `sandbox.credentials.allowPlaintextInject` | Boolean | `false` |
| `sandbox.credentials.awsPairs` | array of objects with `accessKeyIdVar`, `secretAccessKeyVar`, optional `sessionTokenVar` | unset |
| `sandbox.credentials.sigv4` | object with `streaming`, `presigned`, `sigv4a`, each `"deny"` or `"passthrough"` | unset (every form `"deny"`) |
| `sandbox.network` | object with the sub-keys below | unset |
| `sandbox.network.allowUnixSockets` | array of strings, each a socket path | unset (macOS sandbox blocks every Unix socket) |
| `sandbox.network.allowAllUnixSockets` / `.allowLocalBinding` | Boolean | `false` |
| `sandbox.network.allowMachLookup` | array of service-name strings; trailing `*` matches a prefix, `"*"` alone matches all | unset |
| `sandbox.network.allowedDomains` / `.deniedDomains` | array of strings: domain, wildcard pattern, or IP literal, optional `:port` suffix | unset |
| `sandbox.network.strictAllowlist` / `.allowManagedDomainsOnly` | Boolean | `false` |
| `sandbox.network.httpProxyPort` / `.socksProxyPort` | number, a local TCP port | unset (own proxy) |
| `sandbox.network.tlsTerminate` | object with optional `caCertPath` and `caKeyPath` strings | unset |
| `autoCompactEnabled` | Boolean | `true` |
| `autoCompactWindow` | number of tokens, 100000 to 1000000 (capped at the model's context window) | unset |
| `autoMemoryDirectory` | string, absolute or `~/`-prefixed directory path | unset (`~/.claude/projects/<project>/memory/`) |
| `autoMemoryEnabled` | Boolean | `true` |
| `bashOutputMaxChars` | positive integer, clamped to 4000 to 128000 | unset (up to 30,000 characters inline) |
| `claudeMd` | string, the text of a CLAUDE.md file (line breaks as `\n`) | unset |
| `claudeMdExcludes` | array of glob patterns or absolute paths | unset |
| `env` | object mapping variable names to string values | unset |
| `fileCheckpointingEnabled` / `idleCompaction` | Boolean | `true` |
| `plansDirectory` | string, a path relative to the project root | unset (`~/.claude/plans`) |
| `skillListingBudgetFraction` | number greater than 0 and at most 1 | `0.01` |
| `skillListingMaxDescChars` | positive integer | `1536` |
| `askUserQuestionTimeout` | string: `"60s"`, `"5m"`, `"10m"`, `"never"` | `"never"` |
| `autoContinueAtUsageLimit` / `autoScrollEnabled` | Boolean | `true` |
| `axScreenReader` | Boolean | unset (off) |
| `bashEditDiffEnabled` | Boolean | unset |
| `companyAnnouncements` | array of strings | unset |
| `defaultShell` | string: `"bash"` or `"powershell"` | `"bash"`, or `"powershell"` on Windows when Bash isn't available |
| `dialogExpiry` | string: `"60s"`, `"5m"`, `"10m"`, `"never"` (disables the deadline) | `"5m"` |
| `editorMode` | string: `"normal"` or `"vim"` | `"normal"` |
| `emojiCompletionEnabled` | Boolean | `true` |
| `fileSuggestion` | object with `type` (always `"command"`) and `command` | unset |
| `footerLinksRegexes` | array of objects with `type` `"regex"`, `pattern`, `url` template, optional `label` | unset |
| `keybindingFlavor` | string: `"classic"` or `"readline"` (deprecated, no effect) | unset |
| `maxProseWidth` | whole number of terminal columns, minimum 40 (other values ignored) | unset |
| `prefersReducedMotion` | Boolean | `false` |
| `promptSuggestionEnabled` / `respectGitignore` / `respondToBashCommands` / `showTurnDuration` | Boolean | `true` |
| `showClearContextOnPlanAccept` | Boolean | `false` |
| `spellcheck` | object with `enabled`, `checker` (`"aspell"`, `"hunspell"`, `"ispell"`, `"auto"`), `language`, `color` | unset (off); `checker` defaults to `"auto"` |
| `spinnerTipsEnabled` | Boolean | `true` |
| `spinnerTipsOverride` | object with optional `tips`, `tipsFile`, `label`, `excludeDefault` | unset |
| `spinnerVerbs` | object with `verbs` array of strings and `mode` `"append"` or `"replace"` | unset |
| `statusLine` | object with `type` `"command"`, `command`, optional `padding`, `refreshInterval` (seconds, min 1), `hideVimModeIndicator` | unset |
| `subagentStatusLine` | object with `type` `"command"` and `command` | unset |
| `syntaxHighlightingDisabled` | Boolean | `false` |
| `terminalProgressBarEnabled` / `terminalTitleFromRename` / `wheelScrollAccelerationEnabled` | Boolean | `true` |
| `theme` | string: `"auto"`, `"dark"`, `"light"`, `"dark-daltonized"`, `"light-daltonized"`, `"dark-ansi"`, `"light-ansi"`, `"custom:<slug>"`, `"custom:<plugin-name>:<slug>"` | `"dark"` |
| `timeFormat` | string: `"auto"`, `"12-hour"`, `"24-hour"`, `"24-hour-utc"`, or a strftime pattern containing `%` | `"auto"` |
| `timeZone` | string, an IANA time zone name | unset (system time zone) |
| `tui` | string: `"default"` or `"fullscreen"` | unset |
| `verbose` | Boolean | `false` |
| `viewMode` | string: `"default"`, `"verbose"`, `"focus"` | unset |
| `vimInsertModeRemaps` | object mapping a two-character sequence to `"<Esc>"` | unset |
| `voice` | object with `enabled` Boolean, `autoSubmit` Boolean (hold mode only), `mode` `"hold"` or `"tap"` | unset (off); `"hold"` when `enabled` and `mode` unset |
| `voiceEnabled` | Boolean | unset |
| `attribution` | object with `commit` and `pr` strings and `sessionUrl` Boolean, or `false` to hide all (`false` needs v2.1.281+) | unset |
| `includeCoAuthoredBy` / `includeGitInstructions` | Boolean | `true` |
| `prUrlTemplate` | string, a URL template | unset |
| `attribution.commit` / `attribution.pr` | string | unset (standard attribution) |
| `attribution.sessionUrl` | Boolean | `true` |
| `allowedHttpHookUrls` | array of URL patterns (`*` wildcard) | unset (any URL allowed) |
| `allowManagedHooksOnly` / `disableAllHooks` | Boolean | unset |
| `disableWorkflows` | Boolean | `false` |
| `enableWorkflows` | Boolean | unset (on unless Pro plan) |
| `hooks` | object keyed by hook event; each value an array of `{ "matcher", "hooks" }` groups, hook `type` one of `"command"`, `"prompt"`, `"agent"`, `"http"`, `"mcp_tool"` | unset |
| `httpHookAllowedEnvVars` | array of environment variable names | unset |
| `workflowKeywordTriggerEnabled` | Boolean | `true` |
| `workflowSizeGuideline` | string: `"unrestricted"`, `"small"` (< 5 agents), `"medium"` (< 10), `"large"` (< 50) | `"medium"`, or `"small"` on a Pro plan with v2.1.271+ |
| `disableBundledSkills` / `disableSkillShellExecution` | Boolean | unset |
| `skillOverrides` | object mapping skill name to `"on"`, `"name-only"`, `"user-invocable-only"`, or `"off"` | unset (every skill `"on"`) |
| `syncClaudeAiSkills` / `syncClaudeAiPlugins` | Boolean | unset (synced when signed in with claude.ai) |
| `allowedChannelPlugins` | array of `{ marketplace, plugin }` objects or `"plugin@marketplace"` strings (string form needs v2.1.267+) | unset (default Anthropic allowlist) |
| `blockedMarketplaces` / `strictKnownMarketplaces` | array of marketplace source objects | unset (`strictKnownMarketplaces`: empty array blocks every source) |
| `channelsEnabled` | Boolean | unset (plan dependent) |
| `disableCommandPluginSources` | Boolean | unset (follows `allowManagedHooksOnly`) |
| `pluginSuggestionMarketplaces` | array of marketplace names | unset |
| `pluginTrustMessage` | string | unset |
| `strictPluginOnlyCustomization` | `true`, or an array of `"skills"`, `"agents"`, `"hooks"`, `"mcp"` | unset |
| `strictPluginOnlyCustomization.skills` / `.agents` / `.hooks` / `.mcp` | the string of that name inside the `strictPluginOnlyCustomization` array | not locked |
| `enabledPlugins` | object mapping `plugin-name@marketplace-name` to Boolean | unset (follows `defaultEnabled`) |
| `extraKnownMarketplaces` | object mapping a marketplace name to an object with `source` and optional `autoUpdate` Boolean | unset |
| `pluginConfigs` | object mapping a plugin ID to an object with `options` and optional `mcpServers` | unset |
| `prependPlugins` / `appendPlugins` | array of `plugin-name@marketplace-name` strings | unset |
| `allowAllClaudeAiMcps` / `allowClaudeInChromeWithManagedMcp` / `allowManagedMcpServersOnly` / `disableClaudeAiConnectors` | Boolean | `false` |
| `allowedMcpServers` / `deniedMcpServers` | array of objects each with exactly one of `serverName`, `serverCommand` (array), `serverUrl` (pattern with `*`) | unset (`allowedMcpServers`: every server allowed, an empty array blocks every server users add; `deniedMcpServers`: no server blocked) |
| `disabledMcpjsonServers` / `enabledMcpjsonServers` | array of server names as in `.mcp.json` | unset |
| `enableAllProjectMcpServers` | Boolean | unset (asks to approve each server) |
| `managedMcpServers` | object keyed by server name, `.mcp.json` shape for `http` or `sse` (required `https://` `url`) | unset |
| `agent` | string, name of a built-in or custom agent | unset |
| `crossSessionInbound` | string: `"accept"`, `"hold"`, `"refuse"` | unset (decided per message) |
| `disableAgentView` / `isolatePeerMachines` | Boolean | unset |
| `processWrapper` | string, launcher command as an argv prefix | unset |
| `teammateMode` | string: `"in-process"`, `"auto"`, `"tmux"`, `"iterm2"` | `"in-process"` |
| `worktree` | object with `baseRef`, `symlinkDirectories`, `sparsePaths`, `bgIsolation` | unset |
| `worktree.baseRef` | string: `"fresh"` or `"head"` | `"fresh"` |
| `worktree.symlinkDirectories` / `worktree.sparsePaths` | array of directory paths relative to the repository root | unset |
| `worktree.bgIsolation` | string: `"worktree"` or `"none"` | `"worktree"` |
| `worktree.location` | string, an absolute path or one starting with `~/` | unset (worktrees go inside the project) |
| `agentPushNotifEnabled` / `inputNeededNotifEnabled` / `disableRemoteControl` | Boolean | `false` |
| `awaySummaryEnabled` | Boolean | unset (recap on) |
| `disableArtifact` / `enableArtifact` | Boolean | unset (follows account availability) |
| `disableDeepLinkRegistration` | the string `"disable"` | unset |
| `disableDesktopLocalSessions` | Boolean; only JSON `true` takes effect | unset |
| `preferredNotifChannel` | string: `"auto"`, `"terminal_bell"`, `"iterm2"`, `"iterm2_with_bell"`, `"kitty"`, `"ghostty"`, `"notifications_disabled"` | `"auto"` |
| `remote.defaultEnvironmentId` | string, an environment ID such as `env_...` or `ccpool_...` | unset |
| `remoteControlAtStartup` | Boolean | unset |
| `sshConfigs` | array of objects with required `id`, `name`, `sshHost`, optional `sshPort`, `sshIdentityFile` | unset |
| `sshHostAllowlist` | array of hostname patterns | unset (any host allowed) |
| `allowedProviders` | array of strings: `"anthropic"`, `"bedrock"`, `"vertex"`, `"foundry"`, `"anthropicAws"`, `"mantle"`, `"customEndpoint"`, `"gateway"` | unset (any provider) |
| `apiKeyHelper` / `awsAuthRefresh` / `awsCredentialExport` / `gcpAuthRefresh` | string, a shell command line | unset |
| `otelHeadersHelper` | string, an executable path or shell command line | unset |
| `forceLoginMethod` | string: `"claudeai"`, `"console"`, `"gateway"` | unset |
| `forceLoginGatewayUrl` | string, a full URL including the scheme | unset |
| `forceLoginOrgUUID` | string (one UUID) or array of strings | unset |
| `gatewayInternalNetworks` | array of at most four IPv4 CIDR blocks, `/8` to `/32`, non-overlapping | unset |
| `autoUpdatesChannel` | string: `"latest"` or `"stable"` | unset (follows `"latest"`) |
| `minimumVersion` / `requiredMaximumVersion` / `requiredMinimumVersion` | string version number such as `"2.1.100"` (invalid value ignored) | unset |
| `browserExternalPageTools` | string `"disabled"` (desktop app also accepts `"disable"`) | unset |
| `disableBrowserExternalNavigation` / `disableMobileSimulatorTools` | Boolean; only JSON `true` takes effect | unset |
| `cleanupPeriodDays` | whole number of days, minimum 1 | `30` |
| `desktopSessionCleanupPeriodDays` | whole number of days, minimum 0 | `0` (no age limit) |
| `feedbackDrafts` | string: `"notify"`, `"quiet"`, `"off"` | `"notify"` |
| `feedbackSurveyRate` | number between 0 and 1 | unset (remote rate; 0.005 on Bedrock, Agent Platform, Foundry) |
| `skipWebFetchPreflight` | Boolean | unset (check runs) |
| `disableSideloadFlags` / `forceRemoteSettingsRefresh` | Boolean | `false` |
| `managedSourcesBehavior` | string: `"first-wins"` or `"merge"` | `"first-wins"` |
| `parentSettingsBehavior` | string: `"first-wins"` or `"merge"` | `"first-wins"` |
| `policyHelper` | object with `path`, `timeoutMs`, `refreshIntervalMs` | unset |
| `policyHelper.path` | string, absolute normalized path (Windows: drive-letter or UNC path ending in `.exe`) | none; required when `policyHelper` is set |
| `policyHelper.timeoutMs` | integer ms, minimum 1000 | `10000` |
| `policyHelper.refreshIntervalMs` | integer ms: `0` disables refresh, otherwise at least 60000 | unset (runs once at startup) |
| `wslInheritsWindowsSettings` | Boolean | `false` |
| `autoConnectIde` | Boolean | `false` |
| `autoInstallIdeExtension` | Boolean | `true` |
| `claudeInChromeDefaultEnabled` | Boolean | unset (off) |
| `copyFullResponse` / `defaultToAgentsView` / `externalEditorContext` | Boolean | `false` |
| `copyOnSelect` / `leftArrowOpensAgents` / `prStatusFooterEnabled` | Boolean | `true` |
| `diffTool` | string: `"auto"` or `"terminal"` | `"auto"` |
| `permissionExplainerEnabled` | Boolean (removed in v2.1.257) | `true` |
| `teammateDefaultModel` | string (model alias or ID) or `null` (removed in v2.1.234) | unset |

## Notes

- Global config keys (`autoConnectIde`, `autoInstallIdeExtension`, `claudeInChromeDefaultEnabled`, `copyFullResponse`, `copyOnSelect`, `defaultToAgentsView`, `diffTool`, `externalEditorContext`, `leftArrowOpensAgents`, `prStatusFooterEnabled`, plus removed `permissionExplainerEnabled` and `teammateDefaultModel`) go in `~/.claude.json`, not a settings file; Claude Code ignores them in `settings.json`. Claude Code and `/config` write most of them for you.
- Removed keys: `permissionExplainerEnabled` removed in v2.1.257 (with the `Ctrl+E` command explanation on Bash and PowerShell permission prompts); `teammateDefaultModel` removed in v2.1.234 (with its `/config` row); `taskOutputMaxChars` removed in v2.1.277 (with the `TaskOutput` tool it sized). Setting them has no effect on current versions.
- Deprecated keys: `disableArtifact` (use `enableArtifact`), `includeCoAuthoredBy` (use `attribution`), `keybindingFlavor` (no effect; word-editing shortcuts always follow readline conventions).
- `permissions` object: nests `allow`, `ask`, `deny`, `additionalDirectories`, `blockReadsOutsideWorkingDirectories`, `defaultMode`, `disableBypassPermissionsMode`, and `disableAutoMode`. The three rule arrays share one syntax; permission rules merge across scopes rather than override.
- `permissions.allow` entries: in an MCP rule, `*` can appear only in the tool name after the `mcp__<server>__` prefix (such as `mcp__github__get_*`), never in the server name. `--allowedTools` adds allow rules for one session; a deny rule from any settings file still blocks a tool it names.
- `useAutoModeDuringPlan` (User, local, or managed) cannot be turned off by a repository; a `false` in any of those files turns it off.
- `enableArtifact`: a `false` in any file turns the Artifact tool off and no file can turn it back on.
- `forceLoginOrgUUID` is enforced only by a managed source. `remote.defaultEnvironmentId` reads a self-hosted `ccpool_` ID only from user and managed settings and `--settings`.
- `/config key=value` changes one option directly (see settings.md).
- The official page is large (about 6,500 lines); this page holds the index, the Value types table (type, allowed values, default), and notes. JSON examples and per-session overrides are on the official page's per-key entry.
- Per-key entries for the keys not shown in detail here are in the sibling pages where they overlap: env-vars.md for the `env` key's variables, model-config.md for model keys, statusline.md for `statusLine`, keybindings.md for key bindings.

## Related

- [Claude Code settings](./settings.md)
- [Example settings files](./settings-example.md)
- [Environment variables](./env-vars.md)
- [Model configuration](./model-config.md)
- [Status line](./statusline.md)
- [Debug your config](./debug-your-config.md)
