<!-- source: https://code.claude.com/docs/en/desktop.md / last verified: 2026-11-14 -->

# Desktop application

Full reference for the **Code** tab of Claude Desktop: parallel sessions with Git isolation, drag-and-drop pane layout, integrated terminal and file editor, side chats, computer use, Dispatch sessions from your phone, visual diff review, app previews, PR monitoring, connectors, and enterprise configuration.

## Signature / Usage

Each conversation in the Code tab is a **session**: its own chat history, project folder, and code changes. Configure four things before sending the first message: **Environment** (Local / Cloud / SSH / WSL), **Project folder**, **Model**, and **Permission mode**.

```text
Environment: Local | Cloud | SSH connection | WSL (Windows)
Project folder: <path or repo>
Model: <model picker toward the right end of the row under the prompt box>
Permission mode: Manual | Accept edits | Plan | Auto | Bypass permissions
```

Preview server configuration lives in `.claude/launch.json` at the project root:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "my-app",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 3000
    }
  ]
}
```

## Options / Props

### Permission modes

| Mode | Settings key | Behavior |
|------|-------------|----------|
| Manual | `default` | Claude asks before editing files or running commands; default mode |
| Accept edits | `acceptEdits` | Auto-accepts file edits and common filesystem commands; still asks before other terminal commands |
| Plan | `plan` | Explores and proposes a plan without editing source code |
| Auto | `auto` | Runs without routine prompts; a background classifier checks actions such as shell commands and network requests against your request. Requires Claude Opus 4.6 or later, Sonnet 4.6 or later, Haiku 5.5, or a Fable model; no separate Settings toggle. Admins can turn it off with `disableAutoMode` |
| Bypass permissions | `bypassPermissions` | No permission prompts except the actions no mode auto-approves, safety classifiers when Claude acts on external sites, and desktop actions such as deleting a session (archiving one is not prompted). Equivalent to `--dangerously-skip-permissions`. Enable "Allow bypass permissions mode" in **Settings > Code** or **Settings > Claude Code** on Pro, Max, and Ultra; on Team and Enterprise there is no Settings toggle and organization policy controls it. Only for sandboxed containers or VMs |

A mode you pick in a local session is remembered per folder and outranks a `defaultMode` in the project's `.claude/` settings, except Plan, which applies to the current session only. A new local session can still start in a `defaultMode` from `~/.claude/settings.json` or managed settings, so check the selector before the first message. Cloud sessions support Accept edits (corresponds to `default`; file edits are pre-approved), Plan, and Auto (not Bypass permissions, including in a self-hosted environment). `dontAsk` is CLI-only. Earlier versions labeled the modes Ask permissions, Auto accept edits, and Plan mode.

### `.claude/launch.json` configuration fields

| Field | Type | Description |
|------|------|-------------|
| `name` | string | Unique identifier for this server |
| `runtimeExecutable` | string | Command to run, e.g. `npm`, `yarn`, `node` |
| `runtimeArgs` | string[] | Arguments passed to `runtimeExecutable` |
| `port` | number | Port the server listens on; defaults to 3000 |
| `cwd` | string | Working directory relative to project root; use `${workspaceFolder}` for project root |
| `env` | object | Extra environment variables (no secrets; use local environment editor for secrets) |
| `autoPort` | boolean | `true` finds a free port automatically; `false` fails on conflict (use when OAuth callbacks or CORS allowlists need an exact port); unset gives the next free port, except when started through an `npm`/`yarn`/`pnpm`/`bun` script with a hardcoded or uninspectable port not passed in `runtimeArgs`, where the server stays stopped. Before Claude Desktop v2.37337.0, unset asks once and saves the answer |
| `program` | string | Standalone script to run with `node` (alternative to `runtimeExecutable`) |
| `args` | string[] | Arguments passed to `program` |
| `url` | string | Address the preview opens instead of `http://localhost:<port>`; localhost URLs must match origin/port exactly, external URLs prompt once |

### Enterprise managed settings keys

| Key | Description |
|------|-------------|
| `permissions.disableBypassPermissionsMode` | `"disable"` prevents enabling Bypass permissions mode |
| `disableAutoMode` | `"disable"` removes Auto from the mode selector. Also accepted under `permissions` |
| `autoMode` | Customize auto mode classifier trust/block rules |
| `browserExternalPageTools` | `"disabled"` blocks Claude's tools on external Browser pane pages; users can still browse, local dev server previews unaffected |
| `disableMobileSimulatorTools` | `true` (JSON boolean; the string `"true"` is ignored) blocks Claude's iOS Simulator tools; the pane stays usable for the user's own taps |
| `disableBrowserExternalNavigation` | `true` (JSON boolean) blocks all external navigation in the Browser pane for users and Claude; localhost previews unaffected; HTML previews in SSH/WSL sessions don't run scripts |
| `disableRemotePreviewScripts` | `true` (JSON boolean) turns off only scripts in HTML previews in SSH and WSL sessions. Not read from the remote machine or WSL distribution. Requires Claude Desktop v5.1231.0+ |
| `sshConfigs` | Pre-configure SSH connections shown in the environment dropdown (`id`, `name`, `sshHost` required; `sshPort`, `sshIdentityFile` optional). Users can't delete managed connections or edit anything but their own **Worktree folder** |
| `sshHostCommands` | SSH connections whose host comes from a command (`id`, `name`, `command` required; `sshIdentityFile`, `startDirectory` optional). Read from the managed settings file or MDM policy on the computer, ignored in server-managed settings. Requires Desktop v3.6556.0+ (macOS/Linux) or v4.16336.0+ (Windows, which must connect through the OpenSSH client), Claude account sign-in |
| `sshHostAllowlist` | Restrict SSH sessions to hostname patterns (case-insensitive; `*` any host, `*.example.com` matches `example.com` and subdomains); empty array disables SSH sessions. Checked against the hostname after `ssh -G` resolution; jump hosts must match too. Managed settings only |
| `disableDesktopLocalSessions` | `true` (JSON boolean) turns off Code sessions that run on the device, leaving SSH and cloud sessions. Managed settings only. Requires Claude Desktop v1.37937.0+ |
| `disableSshSavedPasswords` | `true` stops Desktop offering to remember SSH passwords and from using or showing saved ones (does not delete them). Managed settings only. Requires Claude Desktop v1.49585.0+ |
| `managedMcpServers` | Push MCP server configs to all users (third-party deployments only). Each entry sets a transport of `"http"`, `"sse"`, or `"stdio"`, connection details, and optionally a `toolPolicy` map restricting which tools users can invoke. Deliver through the managed settings file, MDM, or a Claude apps gateway policy's `desktop` block (the gateway server needs Claude Code v2.1.232+). Claude Code reads a same-named setting of its own with a different entry shape |

Feature-off keys (`browserExternalPageTools`, `disableMobileSimulatorTools`, `disableBrowserExternalNavigation` need Desktop v4.4212.0+; `disableRemotePreviewScripts` needs v5.1231.0+) set in a computer's highest-ranked MDM policy or managed settings file stay off even if server-managed settings leave them unset. Don't use a user-level `HKCU` registry value for this.

## Notes

- In `.claude/launch.json`, top-level `autoVerify: false` disables automatic post-edit verification (screenshots, error checks) per project
- Worktrees are stored in `<project-root>/.claude/worktrees/` by default; each session gets its own isolated worktree copy of the project
- Cloud sessions run on Anthropic-managed VMs and continue after closing the app; SSH sessions run on a remote machine you connect to; WSL sessions run inside a WSL 2 distribution (see `desktop-wsl.md`)
- Computer use is a research preview (macOS 14+ and Windows; Pro, Max, or Ultra; not Team or Enterprise) that controls the actual desktop and is off by default (**Settings > This computer > System** or **Capabilities**; macOS also needs Accessibility and Screen Recording permissions). Claude prefers connectors, Bash, Claude in Chrome, and the iOS Simulator pane before screen control. Per-app access tiers are fixed by app category: View only (browsers, trading platforms), Click only (terminals, IDEs), Full control (everything else); approvals last for the session, or 30 minutes in Dispatch-spawned sessions
- Desktop and CLI share configuration files (`CLAUDE.md`, `~/.claude/settings.json`, `~/.claude.json`, `.mcp.json`, hooks, skills) but Desktop lacks `--print`/scripting, agent teams, and full third-party provider routing by default
- `/desktop` in the CLI moves a terminal session into Desktop (macOS and x64 Windows, subscription auth only)
- `claude --desktop` (v2.1.285+) opens Desktop from your shell without starting a terminal session; add `--continue` for the most recent conversation in this directory, or `--resume <session-id>` (the ID from `/status`; a name doesn't work). Inside Desktop, `/resume` picks up a session started from the CLI (local sessions only, not SSH, WSL, or cloud)
- On macOS, computer use can also run in the background while you keep working. Computer Use isn't available in the Linux desktop app
- Panes such as the diff or terminal can pop out into their own window and dock back
- When one body of work needs many cloud sessions, use a project: Claude starts and tracks the sessions for you from one conversation (see `claude-projects.md`)
- Source: https://code.claude.com/docs/en/desktop.md (fetched 2026-11-14)

### Layout and workspace

- Current layout: environment selector, project folder, **Worktree** toggle, permission mode, and model sit in the row under the prompt box; saved local and SSH environments and the session details panel exist only here. If a new session shows the environment above the prompt box you have the earlier layout: update Desktop to v2.37337.0+ (v3.1623.0+ with a third-party provider on your computer; v4.29.0+ with a third-party provider on your organization's infrastructure)
- Pane layout, terminal, file editor, and view modes require Claude Desktop v1.2581.0+. Panes: chat, diff, browser, terminal, file, plan, tasks, subagent, and the iOS Simulator on macOS. Close the focused pane with **Cmd+\\** / **Ctrl+\\**; the **Minimize** pane button needs v4.0.0+ and a Claude account (not a third-party provider)
- Shortcuts (macOS keys; on Windows/Linux **Cmd** becomes **Ctrl**, **Cmd+Option** becomes **Alt**): **Cmd+/** show shortcuts, **Cmd+N** new session, **Cmd+Shift+D** diff pane, **Cmd+Shift+B** Browser pane, **Cmd+Shift+S** select element in the Browser, **Ctrl+\`** terminal, **Cmd+;** side chat (or `/btw`), **Ctrl+O** cycle view modes (Normal / Thinking / Verbose), **Cmd+Shift+M** / **Cmd+Shift+I** / **Cmd+Shift+E** permission mode / model / effort menus, **Cmd+Option+1-9** select environment on the new session screen, **Cmd+Ctrl+W** take the focused session out of split view. `Shift+Tab` doesn't cycle permission modes in Desktop
- Split view: hold **Option** (macOS) or **Alt** (Windows) and click a session, or right-click the session and choose **Open in** > **Split view** / **New window**
- Check context with the **Context** card (current layout) or the usage ring; `/context` prints a per-category breakdown, `/compact` summarizes early
- Side chats (local, SSH, WSL) read the main thread but add nothing back and aren't saved to disk. The tasks pane (**Background tasks** in the title bar's **⋮** menu) shows subagents, background shell commands, and dynamic workflows
- Code review: `/code-review` shows a **Code review** card in local, SSH, and WSL sessions with **Walk through in diff** and **Apply fixes**
- PR monitoring: **Auto-fix** (also addresses new review comments from the repo owner, an organization member, a collaborator, or a GitHub App) and **Merge when ready** (GitHub auto-merge; squash unless the base branch uses a merge queue; disabled in SSH and WSL sessions). Requires the GitHub CLI (`gh`) installed and authenticated; in SSH sessions set up `git` and `gh` on the remote machine yourself. **Auto-archive after PR merge or close** is in Settings
- Worktrees: default location `<project-root>/.claude/worktrees/`; custom location via **Worktree location** in Settings (local) or **Worktree folder** on the SSH connection; **Branch prefix** in Settings; `.worktreeinclude` copies gitignored files. Uncommitted changes in an archived session's worktree can be lost (Desktop asks, or removes worktree and changes about 30 days after the session is archived or last opened)
- Work across sessions: Claude can list (20 most recent, local/SSH/WSL only, not cloud, CLI, or VS Code sessions), read, message, rename, and archive other Code tab sessions; archiving asks for approval except in Auto and Bypass permissions mode. Messages are checked against the receiving session's `crossSessionInbound` (`refuse` drops them); before Claude Code v2.1.234 every message to a session without cross-session messaging was dropped
- Suggested tasks: **Start**, **Do it here**, **Options**, **Start all** cards in local and SSH sessions on the current layout; a **Suggested task** card elsewhere
- Continue in another surface: session menu > **Open in** > **Cloud** (conversation carried as a summary; not for SSH or WSL sessions) or an editor / file manager
- Remote Control: a local session appears on your other devices once connected, via its **Remote Control** switch, `/remote-control`, or automatically when **Connect new sessions to Remote Control** is on (unless `remoteControlAtStartup` is `false` in managed settings; managed `false` needs Desktop v4.4212.0+). Turn off per session, in Settings, or with `disableRemoteControl: true` in `~/.claude/settings.json`
- Dispatch (Cowork) can spawn Code sessions; requires Pro, Max, or Ultra (not Team or Enterprise); you get a push notification when it finishes or needs approval
- Connectors are MCP servers with a graphical flow (**+** > **Add connectors**, manage under **Customize** > **Connectors**) in local and SSH sessions with a Claude account. Skills: local sessions load `~/.claude/skills/` (SSH reads the remote host's) plus skills enabled for your claude.ai account, except under `disableSideloadFlags`. Plugins: **+** > **Add plugins** in local and SSH sessions; not in cloud or WSL sessions

### Preview and Browser pane

- Claude auto-verifies after every edit by default (`"autoVerify": false` in `launch.json`, or **Auto-verify changes** in the Browser pane's **⋮** menu); in an SSH session Claude has no Browser pane tools, so forward the port yourself (`ssh -N -L 3000:localhost:3000 devbox`). **Keep cookies**, **Clear browsing data**, and **Browser tools** (Settings) control browser state; **Cmd+Shift+B** / **Ctrl+Shift+B** opens the Browser
- Clicking an HTML file path in an SSH or WSL session previews it; the notice above the preview says whether scripts or web content are blocked (`This preview doesn't load anything from the web` means scripts run; `This preview doesn't run scripts or load anything from the web` means Desktop before v4.23118.0 or scripts turned off by policy). Set `disableRemotePreviewScripts` or `disableBrowserExternalNavigation` to turn scripts off
- On external sites, safety classifiers review Claude's write actions in every permission mode; modes other than Auto and Bypass permissions also check a domain allowlist. Each site needs its own approval (**Allow once**, **Always allow**, **Deny**). The Browser uses a clean profile; use Claude in Chrome to act as you in logged-in sessions
- `launch.json` `url` for a localhost address must be the server's origin alone (no path or query) with a port matching `port`; with no command it attaches to a server you already run; it must be `http` or `https` and carry no credentials. Set secrets for dev servers in your shell profile (macOS/Linux) or user/system environment variables (Windows), or the local environment editor, then restart Desktop; `env` in `launch.json` is committed

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "my-app",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 8443,
      "url": "https://localhost:8443"
    }
  ]
}
```

### Environments and environment variables

- Environments: Local, Cloud (Anthropic-managed by default; continues after the app closes), SSH, WSL. A saved environment (**New environment** at the bottom of the selector) records where Claude runs and, for local and SSH, the folders. On first open of the current layout, Desktop creates up to eight environments from the local and SSH folders you used most in the last month
- Set variables for local sessions in a saved local environment (**Environment variables**, one `KEY=value` per line) or for every local session in the `env` key of `~/.claude/settings.json` (ignored if the variable is already in the environment Desktop starts the session with). Dev servers don't get these; set them in your shell profile, Windows environment variables, or the local environment editor (stored encrypted on your machine), then restart Desktop
- Desktop sets some variables itself and its value wins in local sessions: `API_TIMEOUT_MS` is `900000` (use the CLI for a longer timeout) and `ANTHROPIC_BASE_URL` is Anthropic's API host when signed in with a Claude account (use Desktop's third-party inference configuration for a gateway). `PATH`: Desktop doesn't read PowerShell profiles on Windows; set it in user or system environment variables, then restart Desktop. Before Claude Code v2.1.304 exported variables aren't passed to commands Claude runs
- `MAX_THINKING_TOKENS=0` in a saved local environment turns off extended thinking on the Anthropic API except on Opus 5.5, Sonnet 5.5, Haiku 5.5, and Fable models, which always think; on Opus 5 also select effort `high` or lower before the session starts. On models with adaptive reasoning a positive `MAX_THINKING_TOKENS` number is ignored; Opus 4.6 and Sonnet 4.6 accept `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` for a fixed budget
- Local sessions on managed devices: when `disableDesktopLocalSessions` is set, the local entry is grayed out (**Disabled by your organization**) and new sessions default to the first SSH connection

### SSH sessions

- Add a connection in **New environment** > **SSH** > **Add SSH connection…**: **Name**, **SSH host** (`user@hostname` or a `~/.ssh/config` host), **SSH port** (default 22), **SSH key** (optional), **Worktree folder** (optional; needs v1.44121.0+ to edit later). Desktop installs Claude Code on the remote machine on first connect, under `~/.claude/remote/` (about 1 GB; the folder can't be on a `noexec` file system)
- Remote requirements (Linux/macOS): x86_64 or arm64; glibc 2.17+ or musl; SSH server with the SFTP subsystem; a shell that runs commands sent over SSH; network access Claude Code needs. With `MaxSessions 1`, update to v3.1623.0+ (macOS/Linux computer) or connect through the OpenSSH client (Windows computer)
- OpenSSH client: macOS/Linux (v1.37937.0+) use `~/.ssh/config`, OpenSSH 7.6+. Windows needs v2.2553.0+, Microsoft's OpenSSH 9.4+, and Desktop installed from the download buttons (not the Microsoft Store); otherwise the built-in client is used, which ignores `CertificateFile` and fails on `ProxyJump`. Windows remote machines need v2.31226.0+ and have extra limits (terminal doesn't open for a Windows-path folder, no sandbox, worktrees always in `<project-root>/.claude/worktrees/`)
- Desktop leaves `ForwardAgent`, `ForwardX11`, `LocalForward`, `RemoteForward`, `DynamicForward`, and `Tunnel` off. Set a proxy or CA on a Linux remote machine under `env` in the remote `~/.claude/settings.json` (use `NODE_EXTRA_CA_CERTS`, not `SSL_CERT_FILE`); variables from the remote shell profiles aren't read in SSH sessions
- Raise `ConnectTimeout` in the host's `~/.ssh/config` entry (more than 90 seconds, plus any prompt waits) for jump hosts and `ProxyCommand`; without it Desktop gives `ssh` 30 seconds (macOS/Linux v4.4212.0+ gets a second try at 90 seconds). A remote that waits for an approval on your phone must be approved within 45 seconds
- Keep a task running while disconnected (v2.31226.0+): Claude Code runs under a background helper on the remote machine. With a Claude account the task's sign-in is renewed only while Desktop runs, connected and signed in, so it can expire (minutes); use a cloud session for overnight work. Limits: remote restart or `KillUserProcesses=yes`, idle-terminal logout (`StopIdleSessionSec`), Desktop updates replacing the helper, and 30 days without connecting (helper stops). Worktree edits, folder restrictions, connectors, and workflows can fail while disconnected; the helper keeps the most recent 16 MiB of output. Don't run `claude --resume` on the remote for a still-running conversation
- Worktree location precedence for SSH: **Worktree folder** on the connection, then `worktree.location` in the remote `~/.claude/settings.json`, then `<project-root>/.claude/worktrees/`
- `claude://code/new` links open a new session and can name an SSH connection (v2.110.0+); `ssh_host` is required, `ssh_port` (1-65535), `ssh_folder` (starts with `/` or `~/`, or `~`), `q` (URL-encoded prompt) are optional; Desktop asks for confirmation, never sends the prompt, and a link doesn't bypass `sshHostAllowlist`

```text
claude://code/new?ssh_host=dev%40build.example.com&ssh_port=2222&ssh_folder=/srv/payments&q=Investigate%20the%20failed%20deploy
```

- Connections from a command: `sshHostCommands` in `~/.claude/settings.json` (entries `id`, `name`, `command` required; `sshIdentityFile`, `startDirectory` optional). Desktop runs the command only when you create the connection or create another machine, and doesn't stop or delete machines. On macOS/Linux the program starts directly with no shell or terminal, a 10-minute limit, no input; on Windows start `command` with the full path of an `.exe`, `.cmd`, or `.bat`. The program must exit 0 and print only `host` / `user@host` on one line, or one JSON object (`sshHost`, optional numeric `sshPort`, `startDirectory`)

```json
{
  "sshHostCommands": [
    {
      "id": "devbox",
      "name": "Dev box",
      "command": "acme-dev create",
      "startDirectory": "~/project"
    }
  ]
}
```

- Distribute `sshHostCommands` in Claude Code's managed settings file or MDM policy (not Desktop's own policy); restrict user entries with `strictPluginOnlyCustomization: ["hooks"]`; `disableAllHooks` turns off all entries; an `sshHostAllowlist` must match each hostname the tool prints (checked after the command has run)
- SSH troubleshooting: host key refusals (`SSH host key verification failed`, `Connection failed: Host key changed or not trusted`) mean compare the fingerprint with the machine's own before **Trust new key**; on Windows without an OpenSSH client even a correct key is refused. Failure cards carry codes `[SFTP_UNAVAILABLE]`, `[SFTP_NOT_STARTED]`, `[SESSION_LIMIT]`, `[ENOSPC]` / `[EDQUOT]`, `[CLI_UNRESPONSIVE]`, `[SERVER_NOT_RUNNABLE]` / `[SETUP_DIR_NOEXEC]`, `[DOWNLOAD_BUSY]`. Desktop's `ssh.log` is in the zip from **Help > Troubleshooting** > **Show Logs…**; helper logs are `remote-server.log` and `remote-server.log.old` under `~/.claude/remote/run/`. Desktop's port tests can appear as connections closed before login (fail2ban `aggressive` mode or OpenSSH 9.8+ `PerSourcePenaltyExemptList` may count them)

### Enterprise and device management

- Admin console controls: **Desktop**, **Cloud sessions**, **Remote Control**. In Enterprise organizations with HIPAA, **Desktop** is off by default (applying the HIPAA configuration turns it off, an Owner turns it on again), and **Cloud sessions** and **Remote Control** can't be turned on once HIPAA is applied
- Which managed settings reach a session: local sessions read the managed settings file on disk (plus admin-console settings on Anthropic's API with an eligible login); cloud sessions get server-managed settings only (self-hosted environments also read the runner image's file); SSH sessions read the remote host's file, while Desktop reads `sshConfigs`, `sshHostAllowlist`, `disableSshSavedPasswords`, and `disableDesktopLocalSessions` locally; Cowork sessions never fetch admin-console settings. If `sshHostAllowlist` is delivered via server-managed settings, also keep the same list in the computer's highest-ranked MDM policy or file. Add jump hosts to the allowlist before users update to v3.1623.0+
- Telemetry for Code tab sessions: set `CLAUDE_CODE_ENABLE_TELEMETRY` and `OTEL_*` in the `env` block of Claude Code managed settings; the admin console's Cowork OpenTelemetry form applies to Cowork sessions only
- Some keys behave differently in the Code tab (they still apply in the terminal): `askUserQuestionTimeout`, `awaySummaryEnabled`, `bashEditDiffEnabled`, `companyAnnouncements`, `defaultShell`, `fileSuggestion`, `modelPicker` (use `availableModels`), `pluginTrustMessage`, `prUrlTemplate`, `respectGitignore`, `respondToBashCommands`, `showClearContextOnPlanAccept`, `skipDangerousModePermissionPrompt`, `verbose` / `viewMode`, `worktree.baseRef` / `worktree.sparsePaths` / `worktree.symlinkDirectories`
- Device policies: macOS preference domain `com.anthropic.claudefordesktop` (Jamf, Kandji), Windows registry `SOFTWARE\Policies\Claude`, Linux root-owned `/etc/claude-desktop/managed-settings.json` (refused if anyone but root can write to it or its folder; distinct from Claude Code's managed settings file). Policies include enabling Claude Code, controlling auto-updates on macOS and Windows, and a custom deployment URL
- `forceLoginOrgUUID` in the Claude Desktop policy (v1.2581.0+; `HKLM` on Windows) restricts sign-in to a claude.ai organization ID and, unlike Claude Code's `forceLoginMethod` / `forceLoginOrgUUID` managed settings, also stops Desktop using a person's own API key or Console account. A wrong ID locks out your organization; don't deploy it alone with a Claude Console organization's ID; Desktop before v2.37337.0 ignores an Enterprise Admin Console configuration once it is set; Desktop ignores users' own third-party inference configuration after it is set
- Network: HTTPS 443 to `anthropic.com`, `*.anthropic.com`, `claude.ai`, `*.claude.ai`, `claude.com`, `*.claude.com`, `claude.app`, `*.claude.app`, `*.claudeusercontent.com`, `*.claudemcpcontent.com`. With IP allowlisting, route `bridge.claudeusercontent.com` through the same egress as `claude.ai` and `api.anthropic.com`. Artifacts may also load fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) and libraries (`cdnjs.cloudflare.com`, `cdn.jsdelivr.net`, `cdn.tailwindcss.com`, `code.jquery.com`, `unpkg.com`)
- Deployment: macOS via MDM with the `.dmg`; Windows via the MSIX package

### Coming from the CLI

- Desktop and the CLI run the same engine, can run at once on one project, and share `CLAUDE.md` / `CLAUDE.local.md`, `~/.claude.json` and `.mcp.json` MCP servers, hooks, skills, and `~/.claude/settings.json`. Desktop also loads MCP servers from `claude_desktop_config.json` into local Code tab sessions; the CLI doesn't (macOS and WSL: `claude mcp add-from-claude-desktop`)
- `/desktop` and `claude --desktop` need a Claude subscription (not API key auth or Bedrock, Google Cloud's Agent Platform, or Foundry); `/resume` in Desktop continues the same session, so `claude --resume` still finds it
- CLI flag equivalents: `--model` = model picker; `--permission-mode` = mode selector; `--dangerously-skip-permissions` = Bypass permissions; `--add-dir` = **Add folder** (local and SSH) or several repositories (cloud); `--verbose` = Verbose view mode; `--allowedTools` / `--disallowedTools` have no per-session equivalent; `--print` / `--output-format` are not available; `MAX_THINKING_TOKENS` see the thinking notes above
- Not available in Desktop: inline code suggestions, agent teams (use dynamic workflows), and terminal-dialog commands (no-argument forms like `/permissions` reply `isn't available in this environment`; `/config` opens **Settings > Code** or **Settings > Claude Code**). Third-party providers route through a gateway or Claude Desktop on 3P. Computer use isn't in the Linux app

### Troubleshooting

- Check your version: **Claude > About Claude** (macOS) or **Help > About Claude** (Windows). In a local session `/status` shows the Claude Code version, which is Desktop's own copy and can differ from the terminal `claude`; update with **Check for Updates…** and start a new session
- 403 / authentication: sign out and in, confirm an active paid plan (Pro, Max, Ultra, Team, or Enterprise), fully quit and reopen the app if the CLI works but Desktop doesn't. Blank screen: restart, check for updates (Linux: apt), allow the CDN hosts, check Event Viewer on Windows
- `Failed to load session` means the folder may be gone, Git LFS may be missing, or permissions block access. "Git is required" for worktree sessions: install Git; "Git LFS is required…": install Git LFS and run `git lfs install`. A cloud branch that doesn't exist locally: copy the branch name from the session, then `git fetch origin <branch-name>`

## Related

- [Get started with the desktop app](./desktop-quickstart.md)
- [Claude Desktop on Linux (beta)](./desktop-linux.md)
- [Claude Code Desktop in WSL](./desktop-wsl.md)
- [Test iOS apps in the simulator](./desktop-ios-simulator.md)
- [Schedule recurring tasks in Claude Code Desktop](./desktop-scheduled-tasks.md)
