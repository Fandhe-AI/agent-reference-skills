<!-- source: https://code.claude.com/docs/en/desktop.md / last verified: 2026-08-07 -->

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
| Auto | `auto` | Executes all actions with background safety checks; requires Opus 4.6+/Sonnet 4.6+/Fable 5 |
| Bypass permissions | `bypassPermissions` | No permission prompts except forced ask rules/connector `ask` tools/`requiresUserInteraction` MCP tools/external-site safety classifiers; only for sandboxed containers or VMs |

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

Top-level `autoVerify: false` disables automatic post-edit verification (screenshots, error checks) per project.

### Enterprise managed settings keys

| Key | Description |
|------|-------------|
| `permissions.disableBypassPermissionsMode` | `"disable"` prevents enabling Bypass permissions mode |
| `disableAutoMode` | `"disable"` removes Auto from the mode selector |
| `autoMode` | Customize auto mode classifier trust/block rules |
| `browserExternalPageTools` | `"disabled"` blocks Claude's tools on external Browser pane pages |
| `disableMobileSimulatorTools` | `true` blocks Claude's iOS Simulator tools |
| `disableBrowserExternalNavigation` | `true` blocks all external navigation in the Browser pane |
| `sshConfigs` | Pre-configure SSH connections shown in the environment dropdown |
| `sshHostAllowlist` | Restrict SSH sessions to hostname patterns; empty array disables SSH sessions |
| `managedMcpServers` | Push MCP server configs to all users (third-party deployments only) |

## Notes

- Worktrees are stored in `<project-root>/.claude/worktrees/` by default; each session gets its own isolated worktree copy of the project
- Cloud sessions run on Anthropic-managed VMs and continue after closing the app; SSH sessions run on a remote machine you connect to; WSL sessions run inside a WSL 2 distribution (see `desktop-wsl.md`)
- Computer use is a research preview (macOS/Windows, Pro/Max only) that controls the actual desktop; per-app access tiers are View only / Click only / Full control, fixed by app category
- Desktop and CLI share configuration files (`CLAUDE.md`, `~/.claude/settings.json`, `~/.claude.json`, `.mcp.json`, hooks, skills) but Desktop lacks `--print`/scripting, agent teams, and full third-party provider routing by default
- `/desktop` in the CLI moves a terminal session into Desktop (macOS and x64 Windows, subscription auth only)

## Related

- [Get started with the desktop app](./desktop-quickstart.md)
- [Claude Desktop on Linux (beta)](./desktop-linux.md)
- [Claude Code Desktop in WSL](./desktop-wsl.md)
- [Test iOS apps in the simulator](./desktop-ios-simulator.md)
- [Schedule recurring tasks in Claude Code Desktop](./desktop-scheduled-tasks.md)
