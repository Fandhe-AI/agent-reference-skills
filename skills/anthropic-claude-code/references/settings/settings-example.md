<!-- source: https://code.claude.com/docs/en/settings-example.md / last verified: 2026-10-17 -->

# Example settings files

Realistic `settings.json` files for a developer, a team, and an organization: copy one, keep the keys you want, and change the values. None is a recommended baseline.

## Signature / Usage

Personal settings, saved as `~/.claude/settings.json` (applies to every project). Valid JSON with no comments; Claude Code does not accept comments in a settings file.

```json
{
  "model": "claude-sonnet-5",
  "modelSettings": {
    "claude-sonnet-5": { "effortLevel": "xhigh" }
  },
  "editorMode": "vim",
  "theme": "light-daltonized",
  "statusLine": {
    "type": "command",
    "command": "jq -r '\"[\\(.model.display_name)] \\(.context_window.used_percentage // 0)% context\"'",
    "padding": 2
  },
  "spinnerTipsEnabled": false,
  "preferredNotifChannel": "terminal_bell",
  "permissions": {
    "allow": [
      "Bash(git diff *)",
      "Read(~/.zshrc)"
    ]
  },
  "autoUpdatesChannel": "stable",
  "cleanupPeriodDays": 20
}
```

Team settings, saved as `.claude/settings.json` at the top of the repository and committed:

```json
{
  "permissions": {
    "allow": ["Bash(npm run *)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"${CLAUDE_PROJECT_DIR}\"/.claude/hooks/block-rm.sh"
          }
        ]
      }
    ]
  },
  "extraKnownMarketplaces": {
    "acme-tools": {
      "source": { "source": "github", "repo": "acme-corp/claude-plugins" }
    }
  },
  "enabledPlugins": { "code-formatter@acme-tools": true },
  "sandbox": {
    "enabled": true,
    "filesystem": { "allowWrite": ["/tmp/build"] },
    "network": { "allowedDomains": ["registry.npmjs.org", "*.example.com"] }
  },
  "plansDirectory": "./plans"
}
```

Organization settings, deployed as `managed-settings.json` (or the same JSON through MDM or the claude.ai console). Replace the example organization UUID, server URL, and marketplace with your own:

```json
{
  "forceLoginMethod": "claudeai",
  "forceLoginOrgUUID": ["xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"],
  "availableModels": ["opus", "sonnet"],
  "enforceAvailableModels": true,
  "permissions": {
    "deny": ["Bash(curl *)", "Read(./.env)", "Read(./secrets/**)"],
    "disableBypassPermissionsMode": "disable"
  },
  "allowManagedPermissionRulesOnly": true,
  "allowedMcpServers": [
    { "serverUrl": "https://api.githubcopilot.com/*" }
  ],
  "allowManagedMcpServersOnly": true,
  "strictKnownMarketplaces": [
    { "source": "github", "repo": "acme-corp/approved-plugins" }
  ],
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false,
    "network": {
      "allowedDomains": ["registry.npmjs.org", "github.com"],
      "allowManagedDomainsOnly": true
    }
  },
  "requiredMinimumVersion": "2.1.150",
  "cleanupPeriodDays": 7,
  "companyAnnouncements": [
    "Welcome to Acme Corp! Review our code guidelines at docs.example.com"
  ]
}
```

## Notes

- The official settings-example leaves `${CLAUDE_PROJECT_DIR}` unquoted in the team file's hook command; it is quoted here in case the path contains spaces or glob characters (exec form / `args` can also be used).
- Each example is a plausible file for its reader, not a recommended policy. Every value comes from the key's entry in settings-reference.md, which has its type, default, and where it can be set.
- The source page shows each file in two tabs: a copyable JSON file and the same file as `jsonc` with a comment above each key. Copy from the JSON version; comments are not accepted in a settings file.
- Personal file: starts every session on Sonnet 5 (`model`), runs it above its default high level with `modelSettings` (`/effort` saves a level per model; `--effort` sets one for a single session), uses vim keybindings, the colorblind-friendly light theme, a command status line, hides spinner tips, rings the terminal bell for notifications, pre-allows `git diff` and reading `~/.zshrc`, follows the stable update channel, and deletes local session data older than 20 days.
- Team file, before committing:
  - Cloud sessions start from a clone of the repository, so the committed file applies there as well.
  - Claude Code ignores the OpenTelemetry exporter variables in a repository's settings files (apart from some values that turn telemetry off); set them in managed settings or in each person's `~/.claude/settings.json`.
  - Allow rules and `extraKnownMarketplaces` entries take effect after each person trusts this folder itself, not only a parent folder; deny and ask rules apply in every session, trusted or not.
  - The hook runs a script in the repo (`.claude/hooks/block-rm.sh`).
  - Rules match the command and path as written: `Bash(git push *)` does not match `git -C . push`. `Read(./.env)` alone stops the file tools and commands that name the file (such as `cat .env`) but not `grep -r` over the directory; the `sandbox` block closes that gap because the sandbox adds your `Read` deny paths to what every sandboxed command cannot read.
  - A plugin from an external source such as a GitHub repository still needs each person to install it once, even when listed in `enabledPlugins`.
- Organization file:
  - `forceLoginMethod` and `forceLoginOrgUUID` pin the login method and organization.
  - `availableModels` with `enforceAvailableModels` restricts models; the Default option obeys the list too.
  - `permissions.deny` denies two file reads and `curl` commands as Claude writes them; `disableBypassPermissionsMode` removes the bypass permission mode.
  - `allowManagedPermissionRulesOnly` ignores permission rules from user, project, and local settings; `allowManagedMcpServersOnly` makes the managed MCP allowlist the only one that applies.
  - `allowedMcpServers` pins the server by URL rather than name, since a user can name any server "github". User-added servers that do not match do not load, including every stdio server when the list has only URL entries.
  - `strictKnownMarketplaces` allows one plugin marketplace.
  - `sandbox` sandboxes every command with a fixed network allowlist and no unsandboxed retry; `failIfUnavailable` refuses to start where the sandbox cannot run.
  - `requiredMinimumVersion` refuses to start on older versions; `cleanupPeriodDays: 7` shortens retention; `companyAnnouncements` shows a startup message.
  - One deployed file applies to every machine or account it reaches. Server-managed settings do not support per-group policy yet; deploy a different file or profile to give a group different values.

## Related

- [All settings](./settings-reference.md)
- [Claude Code settings](./settings.md)
