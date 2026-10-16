<!-- source: https://code.claude.com/docs/en/desktop.md / last verified: 2026-10-17 -->

# Desktop application

Full reference for the **Code** tab of Claude Desktop: parallel sessions with Git isolation, drag-and-drop pane layout, integrated terminal and file editor, side chats, computer use, Dispatch sessions from your phone, visual diff review, app previews, PR monitoring, connectors, and enterprise configuration.

## Signature / Usage

Each conversation in the Code tab is a **session**: its own chat history, project folder, and code changes. Configure four things before sending the first message: **Environment** (Local / Cloud / SSH / WSL), **Project folder**, **Model**, and **Permission mode**.

```text
Environment: Local | Cloud | SSH connection | WSL (Windows)
Project folder: <path or repo>
Model: <dropdown next to send button>
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
| Bypass permissions | `bypassPermissions` | No permission prompts except the actions no mode auto-approves, safety classifiers when Claude acts on external sites, and desktop actions such as deleting a session (archiving one is not prompted). Equivalent to `--dangerously-skip-permissions`. Enable it in Settings → Claude Code ("Allow bypass permissions mode") on Pro and Max; on Team and Enterprise, organization policy controls it. Only for sandboxed containers or VMs |

A mode you pick in the selector is remembered per folder and takes precedence over `permissions.defaultMode` for that folder, except Plan, which applies to the current session only. Cloud sessions support Accept edits, Plan, and Auto (not Bypass permissions, including in a self-hosted environment).

### `.claude/launch.json` configuration fields

| Field | Type | Description |
|------|------|-------------|
| `name` | string | Unique identifier for this server |
| `runtimeExecutable` | string | Command to run, e.g. `npm`, `yarn`, `node` |
| `runtimeArgs` | string[] | Arguments passed to `runtimeExecutable` |
| `port` | number | Port the server listens on; defaults to 3000 |
| `cwd` | string | Working directory relative to project root; use `${workspaceFolder}` for project root |
| `env` | object | Extra environment variables (no secrets; use local environment editor for secrets) |
| `autoPort` | boolean | `true` finds a free port automatically; `false` fails on conflict; unset asks once and saves the answer |
| `program` | string | Standalone script to run with `node` (alternative to `runtimeExecutable`) |
| `args` | string[] | Arguments passed to `program` |
| `url` | string | Address the preview opens instead of `http://localhost:<port>`; localhost URLs must match origin/port exactly, external URLs prompt once |

### Enterprise managed settings keys

| Key | Description |
|------|-------------|
| `permissions.disableBypassPermissionsMode` | `"disable"` prevents enabling Bypass permissions mode |
| `disableAutoMode` | `"disable"` removes Auto from the mode selector. Also accepted under `permissions` |
| `autoMode` | Customize auto mode classifier trust/block rules |
| `browserExternalPageTools` | `"disabled"` blocks Claude's tools on external Browser pane pages |
| `disableMobileSimulatorTools` | `true` blocks Claude's iOS Simulator tools |
| `disableBrowserExternalNavigation` | `true` blocks all external navigation in the Browser pane |
| `sshConfigs` | Pre-configure SSH connections shown in the environment dropdown |
| `sshHostAllowlist` | Restrict SSH sessions to hostname patterns; empty array disables SSH sessions |
| `disableDesktopLocalSessions` | `true` (JSON boolean) turns off Code sessions that run on the device, leaving SSH and cloud sessions. Managed settings only. Requires Claude Desktop v1.37937.0+ |
| `disableSshSavedPasswords` | `true` stops Desktop offering to remember SSH passwords and from using or showing saved ones (does not delete them). Managed settings only. Requires Claude Desktop v1.49585.0+ |
| `managedMcpServers` | Push MCP server configs to all users (third-party deployments only). Deliver through the managed settings file, MDM, or a Claude apps gateway policy's `desktop` block (the gateway server needs Claude Code v2.1.232+) |

## Notes

- In `.claude/launch.json`, top-level `autoVerify: false` disables automatic post-edit verification (screenshots, error checks) per project
- Worktrees are stored in `<project-root>/.claude/worktrees/` by default; each session gets its own isolated worktree copy of the project
- Cloud sessions run on Anthropic-managed VMs and continue after closing the app; SSH sessions run on a remote machine you connect to; WSL sessions run inside a WSL 2 distribution (see `desktop-wsl.md`)
- Computer use is a research preview (macOS/Windows, Pro/Max only) that controls the actual desktop; per-app access tiers are View only / Click only / Full control, fixed by app category
- Desktop and CLI share configuration files (`CLAUDE.md`, `~/.claude/settings.json`, `~/.claude.json`, `.mcp.json`, hooks, skills) but Desktop lacks `--print`/scripting, agent teams, and full third-party provider routing by default
- `/desktop` in the CLI moves a terminal session into Desktop (macOS and x64 Windows, subscription auth only)
- `claude --desktop` (v2.1.285+) opens Desktop from your shell without starting a terminal session; add `--continue` for the most recent conversation in this directory, or `--resume <session-id>` (the ID from `/status`; a name doesn't work). Inside Desktop, `/resume` picks up a session started from the CLI (local sessions only, not SSH, WSL, or cloud)
- On macOS, computer use can also run in the background while you keep working. Computer Use isn't available in the Linux desktop app
- Panes such as the diff or terminal can pop out into their own window and dock back
- Selecting **Projects** in the sidebar creates a project, where Claude starts and tracks many cloud sessions from one conversation (see `claude-projects.md`)

## Related

- [Get started with the desktop app](./desktop-quickstart.md)
- [Claude Desktop on Linux (beta)](./desktop-linux.md)
- [Claude Code Desktop in WSL](./desktop-wsl.md)
- [Test iOS apps in the simulator](./desktop-ios-simulator.md)
- [Schedule recurring tasks in Claude Code Desktop](./desktop-scheduled-tasks.md)
